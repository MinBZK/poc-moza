"""RVO MCP-server — Subsidies, regelingen en rapportage-indienen via MCP.

Mock-implementatie van de RVO (Rijksdienst voor Ondernemend Nederland)
indienings-API. Biedt twee tools:

- zoek_regeling: zoek naar subsidies en regelingen (read-only)
- indienen: dien een energiebesparingsrapportage in (muterend)

In productie worden de mocks vervangen door calls naar de RVO API
(mijn.rvo.nl). Voor de poc simuleren we zoekresultaten en een
succesvolle indienings-response.

Voldoet aan de MCP-standaard voor Generieke Interactieservices:
- Provenance metadata bij elke response (§4.1, §7)
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
    TextContent,
    Tool,
    ToolAnnotations,
)

logging.basicConfig(level=logging.INFO, format="%(asctime)s [rvo] %(message)s")
logger = logging.getLogger("rvo")

server = Server(name="rvo")

SOURCE_LABEL = "RVO (mock)"
SERVER_VERSION = "0.1.0"

# ---------------------------------------------------------------------------
# Mock-data
# ---------------------------------------------------------------------------

MOCK_REGELINGEN = [
    {
        "id": "EBR-2026",
        "naam": "Informatieplicht Energiebesparing",
        "status": "open",
        "deadline": "2027-12-01",
        "beschrijving": (
            "Bedrijven en instellingen die meer dan 50.000 kWh elektriciteit "
            "of 25.000 m3 aardgas per jaar verbruiken, moeten vierjaarlijks "
            "rapporteren welke energiebesparende maatregelen zij hebben genomen."
        ),
        "wettelijke_grondslag": "art. 5.15d Besluit activiteiten leefomgeving",
        "eherkenning_niveau": "2+",
        "url": "https://mijn.rvo.nl/informatieplicht-energiebesparing",
    },
    {
        "id": "SDE-2026",
        "naam": "SDE++ (Stimulering Duurzame Energieproductie)",
        "status": "gesloten",
        "deadline": "2026-10-15",
        "beschrijving": (
            "Subsidie voor de productie van hernieuwbare energie en "
            "CO2-reducerende technieken. Openstellingsronde 2026 is gesloten."
        ),
        "wettelijke_grondslag": "Besluit stimulering duurzame energieproductie",
        "url": "https://mijn.rvo.nl/sde",
    },
    {
        "id": "EIA-2026",
        "naam": "Energie-investeringsaftrek (EIA)",
        "status": "open",
        "deadline": "2026-12-31",
        "beschrijving": (
            "Fiscaal voordeel voor bedrijven die investeren in "
            "energiebesparende bedrijfsmiddelen of duurzame energie."
        ),
        "wettelijke_grondslag": "Wet inkomstenbelasting 2001, art. 3.42",
        "url": "https://mijn.rvo.nl/eia",
    },
    {
        "id": "ISDE-2026",
        "naam": "Investeringssubsidie Duurzame Energie (ISDE)",
        "status": "open",
        "deadline": "2026-12-31",
        "beschrijving": (
            "Subsidie voor zakelijke gebruikers die investeren in "
            "warmtepompen, zonneboilers, isolatie of aansluiting op een warmtenet."
        ),
        "wettelijke_grondslag": "Regeling nationale EZK- en LNV-subsidies",
        "url": "https://mijn.rvo.nl/isde",
    },
]


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------


def _wrap_provenance(data: dict | list) -> str:
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


def _audit_log(tool_name: str, input_data: dict, output_data: dict | list) -> None:
    """Log een tool-aanroep conform standaard §2.2 (Audit by default)."""
    entry = {
        "timestamp": datetime.now(UTC).isoformat(),
        "tool": tool_name,
        "input": input_data,
        "output_type": type(output_data).__name__,
    }
    logger.info("AUDIT: %s", json.dumps(entry, ensure_ascii=False, default=str))


# ---------------------------------------------------------------------------
# Tools (standaard §4.2)
# ---------------------------------------------------------------------------


@server.list_tools()
async def list_tools() -> list[Tool]:
    """Publiceer beschikbare tools met beschrijving, schema en annotaties."""
    return [
        Tool(
            name="zoek_regeling",
            description=(
                "Zoek naar RVO-subsidies en regelingen op basis van een "
                "trefwoord. Retourneert naam, status (open/gesloten), "
                "deadline en beschrijving."
            ),
            inputSchema={
                "type": "object",
                "properties": {
                    "trefwoord": {
                        "type": "string",
                        "description": (
                            "Zoekterm, bijv. 'energiebesparing', 'subsidie', "
                            "'warmtepomp'. Zoekt in naam en beschrijving."
                        ),
                    },
                },
                "required": ["trefwoord"],
                "additionalProperties": False,
            },
            annotations=ToolAnnotations(
                readOnlyHint=True,
                destructiveHint=False,
                openWorldHint=False,
            ),
        ),
        Tool(
            name="indienen",
            description=(
                "Dien een energiebesparingsrapportage in bij RVO namens het "
                "bedrijf van de ingelogde gebruiker. Dit is een MUTERENDE "
                "actie — vraag ALTIJD om bevestiging van de gebruiker voordat "
                "deze tool wordt aangeroepen."
            ),
            inputSchema={
                "type": "object",
                "properties": {
                    "kvk_nummer": {
                        "type": "string",
                        "description": "KvK-nummer van het indienende bedrijf (8 cijfers).",
                    },
                    "regeling_id": {
                        "type": "string",
                        "description": (
                            "ID van de regeling waarvoor wordt ingediend "
                            "(bijv. 'EBR-2026')."
                        ),
                    },
                    "maatregelen": {
                        "type": "array",
                        "items": {"type": "string"},
                        "description": (
                            "Lijst van genomen energiebesparende maatregelen "
                            "(bijv. ['LED-verlichting', 'HR++ beglazing'])."
                        ),
                    },
                },
                "required": ["kvk_nummer", "regeling_id", "maatregelen"],
                "additionalProperties": False,
            },
            annotations=ToolAnnotations(
                readOnlyHint=False,
                destructiveHint=False,
                openWorldHint=False,
            ),
        ),
    ]


@server.call_tool()
async def call_tool(name: str, arguments: dict) -> list[TextContent]:
    """Voer een tool uit en log de aanroep (standaard §2.2)."""
    if name == "zoek_regeling":
        return _zoek_regeling(arguments)
    if name == "indienen":
        return _indienen(arguments)
    raise ValueError(f"Onbekende tool: {name}")


def _zoek_regeling(arguments: dict) -> list[TextContent]:
    """Zoek regelingen op trefwoord (mock)."""
    trefwoord = arguments.get("trefwoord", "").lower()
    if not trefwoord:
        return [
            TextContent(
                type="text",
                text=json.dumps(
                    {"error": "ONTBREKEND_VELD", "message": "Trefwoord is verplicht."},
                    ensure_ascii=False,
                ),
            )
        ]

    resultaten = [
        r
        for r in MOCK_REGELINGEN
        if trefwoord in r["naam"].lower() or trefwoord in r["beschrijving"].lower()
    ]

    output = {
        "trefwoord": trefwoord,
        "aantal": len(resultaten),
        "resultaten": resultaten,
    }
    _audit_log("zoek_regeling", arguments, output)
    return [TextContent(type="text", text=_wrap_provenance(output))]


def _indienen(arguments: dict) -> list[TextContent]:
    """Dien een rapportage in (mock — simuleert succesvolle indiening)."""
    kvk_nummer = arguments.get("kvk_nummer", "")
    regeling_id = arguments.get("regeling_id", "")
    maatregelen = arguments.get("maatregelen", [])

    # Validatie
    missing = []
    if not kvk_nummer:
        missing.append("kvk_nummer")
    if not regeling_id:
        missing.append("regeling_id")
    if not maatregelen:
        missing.append("maatregelen")
    if missing:
        return [
            TextContent(
                type="text",
                text=json.dumps(
                    {
                        "error": "ONTBREKENDE_VELDEN",
                        "message": f"Verplichte velden ontbreken: {', '.join(missing)}",
                    },
                    ensure_ascii=False,
                ),
            )
        ]

    # Mock succesvolle indiening
    referentienummer = f"RVO-{regeling_id}-{kvk_nummer}-001"
    ingediend_op = datetime.now(UTC).isoformat()
    output = {
        "status": "INGEDIEND",
        "referentienummer": referentienummer,
        "kvk_nummer": kvk_nummer,
        "regeling_id": regeling_id,
        "maatregelen": maatregelen,
        "ingediend_op": ingediend_op,
        "bevestiging": (
            f"Uw rapportage voor {regeling_id} is succesvol ingediend. "
            f"U ontvangt een bevestiging op het e-mailadres dat gekoppeld is "
            f"aan uw eHerkenning-account."
        ),
        "lopende_zaak": {
            "referentienummer": referentienummer,
            "zaak_type": "Energiebesparingsrapportage",
            "regeling": regeling_id,
            "status": "In behandeling",
            "ingediend_op": ingediend_op,
            "melding": (
                f"Deze indiening is opgenomen als lopende zaak onder "
                f"referentienummer {referentienummer}. U kunt de voortgang "
                f"volgen op MijnOverheid Zakelijk onder 'Lopende zaken'."
            ),
        },
    }
    _audit_log("indienen", arguments, output)
    logger.info(
        "INDIENING: %s voor %s door KvK %s (%d maatregelen)",
        regeling_id,
        kvk_nummer,
        kvk_nummer,
        len(maatregelen),
    )
    return [TextContent(type="text", text=_wrap_provenance(output))]


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
