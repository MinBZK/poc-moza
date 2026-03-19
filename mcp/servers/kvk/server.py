"""KvK MCP-server — Bedrijfsgegevens van de ingelogde gebruiker via MCP.

Simuleert een sessie-gebonden KvK-koppeling voor de poc. Retourneert het
bedrijfsprofiel van de ingelogde gebruiker (mock: Bloom B.V., Robin Vogel).

In productie zou deze server de gegevens ophalen bij het echte Handelsregister
op basis van de sessie/authenticatie van de ingelogde gebruiker. Voor de poc
gebruiken we een vast profiel dat overeenkomt met het moza-portaal.

De response-structuur volgt het KvK API-schema (api.kvk.nl/test/api/v1 en v2)
zodat een overstap naar de echte API minimale aanpassingen vereist.

Voldoet aan de MCP-standaard voor Generieke Interactieservices:
- Provenance metadata bij elke resource-response (§4.1, §7)
- ToolAnnotations op elke tool (§4.2, §7)
- Audit logging bij elke tool-aanroep (§2.2)
- Beschrijvingen en inputschema's (§7)
"""

import asyncio
import json
import logging
from datetime import UTC, datetime

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

SOURCE_LABEL = "KvK Handelsregister (mock — sessie-gebonden)"
SERVER_VERSION = "0.2.0"

# ---------------------------------------------------------------------------
# Mock-profiel: Bloom B.V. (Robin Vogel)
#
# Structuur volgt exact het KvK API v1/basisprofielen response-schema
# (velden, nesting, naamgeving). Data komt overeen met het moza-portaal
# (bedrijfsgegevens.html). Vervanging door echte API-call vereist enkel
# het vervangen van MOCK_BASISPROFIEL door het response-object.
# ---------------------------------------------------------------------------

MOCK_BASISPROFIEL = {
    "kvkNummer": "12345678",
    "indNonMailing": "Nee",
    "naam": "Bloom B.V.",
    "formeleRegistratiedatum": "20180212",
    "materieleRegistratie": {
        "datumAanvang": "20180212",
    },
    "totaalWerkzamePersonen": 3,
    "handelsnamen": [
        {"naam": "Bloom B.V.", "volgorde": 0},
    ],
    "sbiActiviteiten": [
        {
            "sbiCode": "47761",
            "sbiOmschrijving": (
                "Winkels in bloemen, planten, zaden en tuinbenodigdheden"
            ),
            "indHoofdactiviteit": "Ja",
        },
    ],
    "links": [
        {
            "rel": "self",
            "href": "https://api.kvk.nl/api/v1/basisprofielen/12345678",
        },
        {
            "rel": "vestigingen",
            "href": "https://api.kvk.nl/api/v1/basisprofielen/12345678/vestigingen",
        },
    ],
    "_embedded": {
        "hoofdvestiging": {
            "vestigingsnummer": "000012345678",
            "kvkNummer": "12345678",
            "formeleRegistratiedatum": "20180212",
            "materieleRegistratie": {
                "datumAanvang": "20180212",
            },
            "eersteHandelsnaam": "Bloom B.V.",
            "indHoofdvestiging": "Ja",
            "indCommercieleVestiging": "Ja",
            "totaalWerkzamePersonen": 3,
            "adressen": [
                {
                    "type": "bezoekadres",
                    "indAfgeschermd": "Nee",
                    "volledigAdres": (
                        "Voorbeeldstraat 42                                 "
                        "1234AB Utrecht"
                    ),
                    "straatnaam": "Voorbeeldstraat",
                    "huisnummer": 42,
                    "postcode": "1234AB",
                    "plaats": "Utrecht",
                    "land": "Nederland",
                },
            ],
            "links": [
                {
                    "rel": "self",
                    "href": (
                        "https://api.kvk.nl/api/v1/basisprofielen/"
                        "12345678/hoofdvestiging"
                    ),
                },
                {
                    "rel": "basisprofiel",
                    "href": "https://api.kvk.nl/api/v1/basisprofielen/12345678",
                },
                {
                    "rel": "vestigingsprofiel",
                    "href": (
                        "https://api.kvk.nl/api/v1/vestigingsprofielen/000012345678"
                    ),
                },
            ],
        },
        "eigenaar": {
            "rechtsvorm": "BeslotenVennootschap",
            "uitgebreideRechtsvorm": "Besloten Vennootschap",
            "links": [
                {
                    "rel": "self",
                    "href": (
                        "https://api.kvk.nl/api/v1/basisprofielen/12345678/eigenaar"
                    ),
                },
                {
                    "rel": "basisprofiel",
                    "href": "https://api.kvk.nl/api/v1/basisprofielen/12345678",
                },
            ],
        },
    },
}

# Zoekresultaat-formaat (KvK API v2/zoeken schema)
MOCK_ZOEKRESULTAAT = {
    "links": [
        {
            "rel": "self",
            "href": "https://api.kvk.nl/api/v2/zoeken?kvkNummer=12345678",
        },
    ],
    "pagina": 1,
    "resultatenPerPagina": 10,
    "totaal": 1,
    "resultaten": [
        {
            "links": [
                {
                    "rel": "basisprofiel",
                    "href": "https://api.kvk.nl/api/v1/basisprofielen/12345678",
                },
                {
                    "rel": "vestigingsprofiel",
                    "href": (
                        "https://api.kvk.nl/api/v1/vestigingsprofielen/000012345678"
                    ),
                },
            ],
            "kvkNummer": "12345678",
            "vestigingsnummer": "000012345678",
            "naam": "Bloom B.V.",
            "adres": {
                "binnenlandsAdres": {
                    "type": "bezoekadres",
                    "straatnaam": "Voorbeeldstraat",
                    "plaats": "Utrecht",
                },
            },
            "type": "hoofdvestiging",
        },
    ],
}


# ---------------------------------------------------------------------------
# Helpers
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
                "mock": True,
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
                "Haal het basisprofiel op van het bedrijf van de ingelogde "
                "gebruiker. Bevat naam, rechtsvorm, SBI-activiteiten, "
                "hoofdvestiging en adresgegevens. Alleen het eigen bedrijf "
                "is beschikbaar (sessie-gebonden)."
            ),
            mimeType="application/json",
        ),
    ]


@server.read_resource()
async def read_resource(uri: str) -> list[TextResourceContents]:
    """Retourneer het bedrijfsprofiel van de ingelogde gebruiker.

    Beveiligingsregel: alleen het KvK-nummer van de actieve sessie wordt
    geaccepteerd. Elk ander nummer wordt geweigerd en gelogd.
    """
    kvk_nummer = str(uri).rstrip("/").split("/")[-1]

    if kvk_nummer != MOCK_BASISPROFIEL["kvkNummer"]:
        logger.warning(
            "SECURITY: toegang geweigerd voor kvk-nummer %s (sessie-gebonden aan %s)",
            kvk_nummer,
            MOCK_BASISPROFIEL["kvkNummer"],
        )
        error_body = {
            "error": "NIET_TOEGESTAAN",
            "message": (
                "U kunt alleen uw eigen bedrijfsgegevens inzien. "
                "Gebruik kvk__mijn_bedrijf om uw gegevens op te halen."
            ),
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
            text=_wrap_provenance(MOCK_BASISPROFIEL),
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
            name="mijn_bedrijf",
            description=(
                "Haal de bedrijfsgegevens op van de ingelogde gebruiker. "
                "Retourneert het KvK-basisprofiel met naam, KvK-nummer, "
                "rechtsvorm, SBI-activiteiten, vestigingsadres en aantal "
                "werkzame personen. Geen parameters nodig — de gegevens "
                "zijn gekoppeld aan de huidige sessie."
            ),
            inputSchema={
                "type": "object",
                "properties": {},
                "additionalProperties": False,
            },
            annotations=ToolAnnotations(
                readOnlyHint=True,
                destructiveHint=False,
                openWorldHint=False,
            ),
        ),
    ]


@server.call_tool()
async def call_tool(name: str, arguments: dict) -> list[TextContent]:
    """Voer een tool uit en log de aanroep (standaard §2.2)."""
    if name == "mijn_bedrijf":
        # Negeer eventueel meegegeven arguments — de tool is sessie-gebonden
        # en accepteert geen parameters. Log wel als er onverwachte input is.
        if arguments:
            logger.warning(
                "SECURITY: mijn_bedrijf aangeroepen met onverwachte arguments: %s "
                "(genegeerd — tool is sessie-gebonden)",
                list(arguments.keys()),
            )
        _audit_log("mijn_bedrijf", {}, MOCK_BASISPROFIEL)
        return [
            TextContent(
                type="text",
                text=_wrap_provenance(MOCK_BASISPROFIEL),
            )
        ]

    raise ValueError(f"Onbekende tool: {name}")


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
