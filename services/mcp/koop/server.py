"""KOOP MCP-server — Regelingenbank via MCP.

Ontsluit wet- en regelgeving uit de KOOP Regelingenbank als MCP Resources
en Tools. Gebruikt de publieke SRU-zoekservice en het wetten.nl-repository
van zoekservice.overheid.nl.

Voldoet aan de MCP-standaard voor Generieke Interactieservices:
- Provenance metadata bij elke resource-response (§4.1, §7)
- ToolAnnotations op elke tool (§4.2, §7)
- Audit logging bij elke tool-aanroep (§2.2)
- Beschrijvingen en inputschema's (§7)
"""

import asyncio
import json
import logging
import os
from datetime import UTC, datetime

import httpx
from lxml import etree
from mcp.server import Server
from mcp.server.stdio import stdio_server
from mcp.types import (
    Resource,
    ResourceTemplate,
    TextContent,
    TextResourceContents,
    Tool,
    ToolAnnotations,
)

logging.basicConfig(level=logging.INFO, format="%(asctime)s [koop] %(message)s")
logger = logging.getLogger("koop")

server = Server(name="koop")

# ---------------------------------------------------------------------------
# API configuratie
# ---------------------------------------------------------------------------

SRU_BASE_URL = os.getenv("KOOP_SRU_URL", "https://zoekservice.overheid.nl/sru/Search")
# SRU x-connection type: BWB = Basiswettenbestand (landelijke regelgeving)
SRU_CONNECTION = os.getenv("KOOP_SRU_CONNECTION", "BWB")

SOURCE_LABEL = "KOOP Regelingenbank"
SERVER_VERSION = "0.1.0"

# XML namespaces voor SRU/KOOP responses
NS = {
    "sru": "http://docs.oasis-open.org/ns/search-ws/sruResponse",
    "dcterms": "http://purl.org/dc/terms/",
    "overheid": "http://standaarden.overheid.nl/owms/terms/",
    "overheidbwb": "http://standaarden.overheid.nl/bwb/terms/",
}


# ---------------------------------------------------------------------------
# HTTP helpers
# ---------------------------------------------------------------------------


async def _sru_search(query: str, max_records: int = 10) -> bytes:
    """Voer een SRU-zoekopdracht uit en retourneer de ruwe XML-response."""
    params = {
        "version": "2.0",
        "operation": "searchRetrieve",
        "x-connection": SRU_CONNECTION,
        "query": query,
        "maximumRecords": str(max_records),
    }
    async with httpx.AsyncClient(timeout=15.0) as client:
        response = await client.get(
            SRU_BASE_URL,
            params=params,
            headers={"Accept": "text/xml"},
        )
        response.raise_for_status()
        return response.content


async def _fetch_regeling_xml(xml_url: str) -> bytes:
    """Haal de volledige XML van een wet/regeling op via de directe URL."""
    async with httpx.AsyncClient(timeout=15.0) as client:
        response = await client.get(xml_url, headers={"Accept": "text/xml"})
        response.raise_for_status()
        return response.content


async def _resolve_bwb_to_xml_url(bwb_id: str) -> str:
    """Zoek de meest recente toestand-URL op voor een BWB-ID via SRU."""
    query = f'dcterms.identifier = "{bwb_id}"'
    xml_bytes = await _sru_search(query, max_records=1)
    root = etree.fromstring(xml_bytes)

    for record in root.findall(".//sru:record", NS):
        data = record.find(".//sru:recordData", NS)
        if data is None:
            continue
        loc_el = data.find(
            ".//{http://standaarden.overheid.nl/bwb/terms/}locatie_toestand"
        )
        if loc_el is not None and loc_el.text:
            return loc_el.text.strip()

    raise LookupError(f"Geen toestand gevonden voor BWB-ID: {bwb_id}")


# ---------------------------------------------------------------------------
# XML parsing helpers
# ---------------------------------------------------------------------------


def _parse_sru_results(xml_bytes: bytes) -> list[dict]:
    """Parse SRU response XML naar een lijst met regelinggegevens."""
    root = etree.fromstring(xml_bytes)
    results = []
    seen_ids = set()

    for record in root.findall(".//sru:record", NS):
        data = record.find(".//sru:recordData", NS)
        if data is None:
            continue

        entry = {}

        # Identifier (BWB-ID)
        id_el = data.find(".//{http://purl.org/dc/terms/}identifier")
        if id_el is not None and id_el.text:
            bwb_id = id_el.text.strip()
            # Dedupliceer: SRU retourneert meerdere toestanden per regeling
            if bwb_id in seen_ids:
                continue
            seen_ids.add(bwb_id)
            entry["identifier"] = bwb_id

        # Titel
        title_el = data.find(".//{http://purl.org/dc/terms/}title")
        if title_el is not None and title_el.text:
            entry["titel"] = title_el.text.strip()

        # Type regeling
        type_el = data.find(".//{http://purl.org/dc/terms/}type")
        if type_el is not None and type_el.text:
            entry["type"] = type_el.text.strip()

        # Organisatie
        creator_el = data.find(".//{http://purl.org/dc/terms/}creator")
        if creator_el is not None and creator_el.text:
            entry["organisatie"] = creator_el.text.strip()

        # Verantwoordelijke overheid
        authority_el = data.find(
            ".//{http://standaarden.overheid.nl/owms/terms/}authority"
        )
        if authority_el is not None and authority_el.text:
            entry["verantwoordelijke"] = authority_el.text.strip()

        # Rechtsgebied
        rg_el = data.find(".//{http://standaarden.overheid.nl/bwb/terms/}rechtsgebied")
        if rg_el is not None and rg_el.text:
            entry["rechtsgebied"] = rg_el.text.strip()

        # Geldigheidsperiode
        start_el = data.find(
            ".//{http://standaarden.overheid.nl/bwb/terms/}geldigheidsperiode_startdatum"
        )
        if start_el is not None and start_el.text:
            entry["geldig_vanaf"] = start_el.text.strip()

        if entry:
            results.append(entry)

    return results


def _extract_text_from_wetten_xml(xml_bytes: bytes) -> dict:
    """Extract leesbare tekst en metadata uit wetten.nl XML."""
    root = etree.fromstring(xml_bytes)

    result = {}

    # Metadata
    titel_el = root.find(".//wetgeving/intitule")
    if titel_el is None:
        titel_el = root.find(".//{*}intitule")
    if titel_el is not None and titel_el.text:
        result["titel"] = titel_el.text.strip()

    # Artikelen extraheren
    artikelen = []
    for artikel in root.iter("{*}artikel"):
        nummer = artikel.get("nr", "")
        tekst = " ".join(artikel.itertext()).strip()
        if tekst:
            artikelen.append({"nummer": nummer, "tekst": tekst})

    if artikelen:
        result["artikelen"] = artikelen
        result["aantal_artikelen"] = len(artikelen)

    # Als geen artikelen gevonden, probeer alle tekst
    if not artikelen:
        all_text = " ".join(root.itertext()).strip()
        # Beperk tot een redelijk formaat
        if len(all_text) > 5000:
            all_text = all_text[:5000] + "... [ingekort]"
        result["tekst"] = all_text

    return result


# ---------------------------------------------------------------------------
# Provenance en audit helpers (standaard §4.1, §2.2)
# ---------------------------------------------------------------------------


def _wrap_provenance(data: dict) -> str:
    """Wrap data met verplichte provenance metadata (standaard §4.1, §7)."""
    return json.dumps(
        {
            "data": data,
            "provenance": {
                "source": SOURCE_LABEL,
                "timestamp": datetime.now(UTC).isoformat(),
                "version": SERVER_VERSION,
            },
        },
        ensure_ascii=False,
    )


def _audit_log(tool_name: str, input_data: dict, output_data: dict) -> None:
    """Log een tool-aanroep conform standaard §2.2 (Audit by default)."""
    entry = {
        "timestamp": datetime.now(UTC).isoformat(),
        "tool": tool_name,
        "input": input_data,
        "output": {
            "type": type(output_data).__name__,
            "keys": list(output_data.keys()),
        },
    }
    logger.info("AUDIT: %s", json.dumps(entry, ensure_ascii=False, default=str))


# ---------------------------------------------------------------------------
# Resources — read-only regelgeving (standaard §4.1)
# ---------------------------------------------------------------------------


@server.list_resources()
async def list_resources() -> list[Resource]:
    return []


@server.list_resource_templates()
async def list_resource_templates() -> list[ResourceTemplate]:
    """Publiceer resource templates voor dynamisch opvragen van regelgeving."""
    return [
        ResourceTemplate(
            uriTemplate="koop://regeling/{bwb_id}",
            name="Wet of regeling",
            description=(
                "Haal de volledige tekst op van een wet of regeling uit de "
                "KOOP Regelingenbank op basis van een BWB-ID "
                "(Basiswettenbestand-identifier). Bevat de titel, artikelen "
                "en metadata. Voorbeeld BWB-ID: BWBR0001840 (Grondwet)."
            ),
            mimeType="application/json",
        ),
    ]


@server.read_resource()
async def read_resource(uri: str) -> list[TextResourceContents]:
    """Haal een specifieke wet/regeling op bij de bron (standaard §2.1)."""
    bwb_id = str(uri).rstrip("/").split("/")[-1]

    try:
        xml_url = await _resolve_bwb_to_xml_url(bwb_id)
        xml_bytes = await _fetch_regeling_xml(xml_url)
        data = _extract_text_from_wetten_xml(xml_bytes)
        data["bwb_id"] = bwb_id
    except LookupError:
        error_body = {
            "error": "NIET_GEVONDEN",
            "message": f"Geen regeling gevonden voor BWB-ID: {bwb_id}",
        }
        return [
            TextResourceContents(
                uri=uri,
                text=json.dumps(error_body, ensure_ascii=False),
                mimeType="application/json",
            )
        ]
    except httpx.HTTPStatusError as e:
        error_body = {
            "error": (
                "SOURCE_UNAVAILABLE"
                if e.response.status_code >= 500
                else "NIET_GEVONDEN"
            ),
            "message": (
                f"Regeling {bwb_id} niet beschikbaar: {e.response.status_code}"
            ),
        }
        return [
            TextResourceContents(
                uri=uri,
                text=json.dumps(error_body, ensure_ascii=False),
                mimeType="application/json",
            )
        ]
    except httpx.RequestError as e:
        error_body = {
            "error": "SOURCE_UNAVAILABLE",
            "message": f"KOOP Regelingenbank niet bereikbaar: {e}",
        }
        return [
            TextResourceContents(
                uri=uri,
                text=json.dumps(error_body, ensure_ascii=False),
                mimeType="application/json",
            )
        ]

    return [
        TextResourceContents(
            uri=uri,
            text=_wrap_provenance(data),
            mimeType="application/json",
        )
    ]


# ---------------------------------------------------------------------------
# Tools (standaard §4.2)
# ---------------------------------------------------------------------------


@server.list_tools()
async def list_tools() -> list[Tool]:
    """Publiceer beschikbare tools met beschrijving, schema en annotaties."""
    return [
        Tool(
            name="zoek_regelgeving",
            description=(
                "Zoek wet- en regelgeving in de KOOP Regelingenbank via de "
                "SRU-zoekservice van overheid.nl. Zoek op trefwoord, titel "
                "of onderwerp. Retourneert een lijst met gevonden regelingen "
                "inclusief titel, identifier (BWB-ID), type en organisatie."
            ),
            inputSchema={
                "type": "object",
                "properties": {
                    "trefwoord": {
                        "type": "string",
                        "description": (
                            "Zoekterm: een woord of frase waarmee in de "
                            "titel en tekst van regelgeving wordt gezocht."
                        ),
                    },
                    "onderwerp": {
                        "type": "string",
                        "description": (
                            "Filter op onderwerp/thema, bijv. 'energie', "
                            "'milieu', 'arbeidsrecht'."
                        ),
                    },
                    "type_regeling": {
                        "type": "string",
                        "description": (
                            "Filter op type regeling: 'wet', "
                            "'AMvB' (Algemene Maatregel van Bestuur), "
                            "'ministerieleregeling', of 'verdrag'."
                        ),
                    },
                    "max_resultaten": {
                        "type": "integer",
                        "description": (
                            "Maximaal aantal resultaten (standaard 10, max 50)."
                        ),
                    },
                },
                "required": ["trefwoord"],
                "additionalProperties": False,
            },
            annotations=ToolAnnotations(
                readOnlyHint=True,
                destructiveHint=False,
                openWorldHint=True,
            ),
        ),
    ]


@server.call_tool()
async def call_tool(name: str, arguments: dict) -> list[TextContent]:
    """Voer een tool uit en log de aanroep (standaard §2.2)."""
    if name == "zoek_regelgeving":
        result = await _zoek_regelgeving(arguments)
        _audit_log("zoek_regelgeving", arguments, result)
        return [
            TextContent(
                type="text",
                text=json.dumps(result, ensure_ascii=False),
            )
        ]

    raise ValueError(f"Onbekende tool: {name}")


async def _zoek_regelgeving(params: dict) -> dict:
    """Zoek regelgeving via de SRU-zoekservice van overheid.nl."""
    trefwoord = params.get("trefwoord", "")
    onderwerp = params.get("onderwerp", "")
    type_regeling = params.get("type_regeling", "")
    max_resultaten = min(params.get("max_resultaten", 10), 50)

    # Bouw SRU CQL-query op (BWB-indexes: overheidbwb.titel, dcterms.type)
    query_parts = []
    if trefwoord:
        query_parts.append(f'overheidbwb.titel any "{trefwoord}"')
    if onderwerp:
        query_parts.append(f'overheidbwb.rechtsgebied = "{onderwerp}"')
    if type_regeling:
        query_parts.append(f'dcterms.type = "{type_regeling}"')

    if not query_parts:
        return {
            "error": "INPUT_INVALID",
            "message": "Minimaal een trefwoord is verplicht.",
        }

    query = " AND ".join(query_parts)

    try:
        xml_bytes = await _sru_search(query, max_records=max_resultaten)
        resultaten = _parse_sru_results(xml_bytes)
    except httpx.HTTPStatusError as e:
        return {
            "error": "SOURCE_UNAVAILABLE",
            "message": (f"SRU-zoekservice niet beschikbaar: {e.response.status_code}"),
        }
    except httpx.RequestError as e:
        return {
            "error": "SOURCE_UNAVAILABLE",
            "message": f"SRU-zoekservice niet bereikbaar: {e}",
        }
    except etree.XMLSyntaxError:
        return {
            "error": "SOURCE_UNAVAILABLE",
            "message": "Ongeldig antwoord van de SRU-zoekservice.",
        }

    result = {
        "resultaten": resultaten,
        "aantal": len(resultaten),
        "zoekopdracht": query,
    }

    result["provenance"] = {
        "source": SOURCE_LABEL,
        "timestamp": datetime.now(UTC).isoformat(),
        "version": SERVER_VERSION,
    }

    return result


# ---------------------------------------------------------------------------
# Entry point
# ---------------------------------------------------------------------------


async def main():
    async with stdio_server() as (read_stream, write_stream):
        await server.run(
            read_stream,
            write_stream,
            server.create_initialization_options(),
        )


if __name__ == "__main__":
    asyncio.run(main())
