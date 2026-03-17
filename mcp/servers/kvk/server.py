"""KvK MCP-server — Handelsregister gegevens via MCP.

Ontsluit bedrijfsgegevens uit het Handelsregister (KvK) als MCP Resources
en Tools. Gebruikt de KvK test-API (developers.kvk.nl).

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

logging.basicConfig(level=logging.INFO, format="%(asctime)s [kvk] %(message)s")
logger = logging.getLogger("kvk")

server = Server(name="kvk")

# ---------------------------------------------------------------------------
# KvK API configuratie
# ---------------------------------------------------------------------------

KVK_BASE_URL = os.getenv("KVK_BASE_URL", "https://api.kvk.nl/test/api")
KVK_API_KEY = os.getenv("KVK_API_KEY", "l7xx1f2691f2520d487b902f4e0b57a0b197")

SOURCE_LABEL = "KvK Handelsregister"
SERVER_VERSION = "0.1.0"


async def _kvk_request(path: str, params: dict | None = None) -> dict:
    """Doe een request naar de KvK API."""
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{KVK_BASE_URL}{path}",
            headers={"apikey": KVK_API_KEY},
            params=params,
            timeout=10.0,
        )
        response.raise_for_status()
        return response.json()


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
        "output": {"type": type(output_data).__name__, "keys": list(output_data.keys())},
    }
    logger.info("AUDIT: %s", json.dumps(entry, ensure_ascii=False, default=str))


# ---------------------------------------------------------------------------
# Resources — read-only bedrijfsgegevens (standaard §4.1)
# ---------------------------------------------------------------------------


@server.list_resources()
async def list_resources() -> list[Resource]:
    return []


@server.list_resource_templates()
async def list_resource_templates() -> list[ResourceTemplate]:
    """Publiceer resource templates voor dynamisch opvragen."""
    return [
        ResourceTemplate(
            uriTemplate="kvk://basisprofiel/{kvk_nummer}",
            name="Basisprofiel",
            description=(
                "Haal het basisprofiel op uit het Handelsregister op basis van "
                "een KvK-nummer. Bevat naam, rechtsvorm, SBI-activiteiten, "
                "hoofdvestiging en adresgegevens."
            ),
            mimeType="application/json",
        ),
    ]


@server.read_resource()
async def read_resource(uri: str) -> list[TextResourceContents]:
    """Haal bedrijfsgegevens op bij de bron. Geen caching (standaard §2.1)."""
    kvk_nummer = str(uri).rstrip("/").split("/")[-1]

    try:
        data = await _kvk_request(f"/v1/basisprofielen/{kvk_nummer}")
    except httpx.HTTPStatusError as e:
        error_body = {
            "error": "SOURCE_UNAVAILABLE" if e.response.status_code >= 500 else "NIET_GEVONDEN",
            "message": f"KvK API fout bij ophalen {kvk_nummer}: {e.response.status_code}",
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
            "message": f"KvK API niet bereikbaar: {e}",
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
    """Publiceer beschikbare tools met beschrijving, schema en annotaties (standaard §7)."""
    return [
        Tool(
            name="zoek_bedrijf",
            description=(
                "Zoek bedrijven in het KvK Handelsregister. Minimaal één van "
                "naam, kvkNummer of vestigingsnummer is verplicht. De overige "
                "velden (plaats, postcode, huisnummer) zijn optionele filters "
                "die alleen werken in combinatie met een zoekterm. "
                "Retourneert een lijst met basisgegevens per gevonden bedrijf."
            ),
            inputSchema={
                "type": "object",
                "properties": {
                    "naam": {
                        "type": "string",
                        "description": "Zoek op (deel van) de bedrijfsnaam.",
                    },
                    "kvkNummer": {
                        "type": "string",
                        "description": "Zoek op exact KvK-nummer (8 cijfers).",
                    },
                    "vestigingsnummer": {
                        "type": "string",
                        "description": "Zoek op vestigingsnummer (12 cijfers).",
                    },
                    "plaats": {
                        "type": "string",
                        "description": "Filter op plaatsnaam.",
                    },
                    "postcode": {
                        "type": "string",
                        "description": "Filter op postcode (alleen in combinatie met huisnummer).",
                    },
                    "huisnummer": {
                        "type": "integer",
                        "description": "Filter op huisnummer (alleen in combinatie met postcode).",
                    },
                    "type": {
                        "type": "string",
                        "description": "Filter op type: hoofdvestiging, nevenvestiging, of rechtspersoon.",
                    },
                    "resultatenPerPagina": {
                        "type": "integer",
                        "description": "Aantal resultaten per pagina (standaard 10, max 100).",
                    },
                },
                "additionalProperties": False,
            },
            annotations=ToolAnnotations(
                readOnlyHint=True,
                destructiveHint=False,
                openWorldHint=True,
            ),
        ),
        Tool(
            name="haal_basisprofiel_op",
            description=(
                "Haal het volledige basisprofiel op uit het KvK Handelsregister "
                "voor een specifiek KvK-nummer. Bevat naam, rechtsvorm, "
                "SBI-activiteiten, hoofdvestiging, adresgegevens en handelsnamen."
            ),
            inputSchema={
                "type": "object",
                "properties": {
                    "kvkNummer": {
                        "type": "string",
                        "description": "Het 8-cijferige KvK-nummer van het bedrijf.",
                    },
                },
                "required": ["kvkNummer"],
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
    if name == "zoek_bedrijf":
        result = await _zoek_bedrijf(arguments)
        _audit_log("zoek_bedrijf", arguments, result)
        return [TextContent(type="text", text=json.dumps(result, ensure_ascii=False))]

    if name == "haal_basisprofiel_op":
        result = await _haal_basisprofiel_op(arguments["kvkNummer"])
        _audit_log("haal_basisprofiel_op", arguments, result)
        return [TextContent(type="text", text=json.dumps(result, ensure_ascii=False))]

    raise ValueError(f"Onbekende tool: {name}")


async def _zoek_bedrijf(params: dict) -> dict:
    """Zoek bedrijven via de KvK Zoeken API."""
    try:
        data = await _kvk_request("/v2/zoeken", params=params)
    except httpx.HTTPStatusError as e:
        return {
            "error": "SOURCE_UNAVAILABLE",
            "message": f"KvK Zoeken API fout: {e.response.status_code}",
        }
    except httpx.RequestError as e:
        return {
            "error": "SOURCE_UNAVAILABLE",
            "message": f"KvK API niet bereikbaar: {e}",
        }

    # KvK API retourneert fouten in een "fout" veld
    if "fout" in data:
        return {
            "error": "INPUT_INVALID",
            "message": data["fout"][0].get("omschrijving", "Onbekende fout"),
            "hint": "Minimaal naam, kvkNummer of vestigingsnummer is verplicht.",
        }

    data["provenance"] = {
        "source": SOURCE_LABEL,
        "timestamp": datetime.now(UTC).isoformat(),
        "version": SERVER_VERSION,
    }
    return data


async def _haal_basisprofiel_op(kvk_nummer: str) -> dict:
    """Haal het basisprofiel op via de KvK Basisprofiel API."""
    try:
        data = await _kvk_request(f"/v1/basisprofielen/{kvk_nummer}")
    except httpx.HTTPStatusError as e:
        return {
            "error": "NIET_GEVONDEN" if e.response.status_code == 404 else "SOURCE_UNAVAILABLE",
            "message": f"KvK API fout bij ophalen {kvk_nummer}: {e.response.status_code}",
        }
    except httpx.RequestError as e:
        return {
            "error": "SOURCE_UNAVAILABLE",
            "message": f"KvK API niet bereikbaar: {e}",
        }

    return {
        "data": data,
        "provenance": {
            "source": SOURCE_LABEL,
            "timestamp": datetime.now(UTC).isoformat(),
            "version": SERVER_VERSION,
        },
    }


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
