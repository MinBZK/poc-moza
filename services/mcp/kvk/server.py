"""KvK MCP-server — Bedrijfsgegevens van de ingelogde gebruiker via MCP.

Haalt bedrijfsgegevens op via de KvK Test API (api.kvk.nl/test/api) en
beperkt toegang tot het bedrijf van de ingelogde gebruiker (demo: Robin
Vogel, KvK-nummer 68750110 — Test BV Donald).

In productie wordt het KvK-nummer bepaald door de sessie/authenticatie
van de ingelogde gebruiker. Voor de poc is dit hardcoded.

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
from urllib.request import Request, urlopen
from urllib.error import HTTPError, URLError

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

SOURCE_LABEL = "KvK Handelsregister (testomgeving — sessie-gebonden)"
SERVER_VERSION = "0.3.0"

# ---------------------------------------------------------------------------
# Configuratie KvK Test API
# ---------------------------------------------------------------------------

KVK_TEST_BASE = "https://api.kvk.nl/test/api"
KVK_TEST_API_KEY = "l7xx1f2691f2520d487b902f4e0b57a0b197"

# Demo-gebruiker Robin Vogel — alleen dit KvK-nummer is toegestaan
SESSIE_KVK_NUMMER = "68750110"

# Cache voor het basisprofiel (wordt één keer opgehaald per server-lifetime)
_profiel_cache: dict | None = None


def _kvk_fetch(path: str) -> dict:
    """Haal data op van de KvK Test API."""
    url = f"{KVK_TEST_BASE}{path}"
    req = Request(url, headers={"apikey": KVK_TEST_API_KEY})
    logger.info("KVK API call: %s", url)
    with urlopen(req, timeout=10) as resp:
        return json.loads(resp.read())


async def _get_basisprofiel() -> dict:
    """Haal het basisprofiel op (met cache)."""
    global _profiel_cache
    if _profiel_cache is not None:
        return _profiel_cache
    loop = asyncio.get_event_loop()
    _profiel_cache = await loop.run_in_executor(
        None, _kvk_fetch, f"/v1/basisprofielen/{SESSIE_KVK_NUMMER}"
    )
    return _profiel_cache


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

    if kvk_nummer != SESSIE_KVK_NUMMER:
        logger.warning(
            "SECURITY: toegang geweigerd voor kvk-nummer %s (sessie-gebonden aan %s)",
            kvk_nummer,
            SESSIE_KVK_NUMMER,
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

    try:
        profiel = await _get_basisprofiel()
    except (HTTPError, URLError) as exc:
        logger.error("KVK API fout: %s", exc)
        return [
            TextResourceContents(
                uri=uri,
                text=json.dumps(
                    {"error": "API_FOUT", "message": str(exc)}, ensure_ascii=False
                ),
                mimeType="application/json",
            )
        ]

    return [
        TextResourceContents(
            uri=uri,
            text=_wrap_provenance(profiel),
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
        if arguments:
            logger.warning(
                "SECURITY: mijn_bedrijf aangeroepen met onverwachte arguments: %s "
                "(genegeerd — tool is sessie-gebonden)",
                list(arguments.keys()),
            )
        try:
            profiel = await _get_basisprofiel()
        except (HTTPError, URLError) as exc:
            logger.error("KVK API fout: %s", exc)
            return [
                TextContent(
                    type="text",
                    text=json.dumps(
                        {"error": "API_FOUT", "message": str(exc)}, ensure_ascii=False
                    ),
                )
            ]
        _audit_log("mijn_bedrijf", {}, profiel)
        return [
            TextContent(
                type="text",
                text=_wrap_provenance(profiel),
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
