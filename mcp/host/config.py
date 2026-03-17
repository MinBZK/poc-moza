"""Configuratie voor de VLAM MCP-host."""

import os
from pathlib import Path
from dotenv import load_dotenv

load_dotenv()

# Pad-basis relatief aan dit bestand
BASE_DIR = Path(__file__).resolve().parent
SERVERS_DIR = BASE_DIR.parent / "servers"

# Claude API (Anthropic)
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY", "")
CLAUDE_MODEL = os.getenv("CLAUDE_MODEL", "claude-sonnet-4-20250514")

# VLAM API (UbiOps/Mistral — OpenAI-compatibele API)
VLAM_API_KEY = os.getenv("VLAM_API_KEY", "")
VLAM_BASE_URL = os.getenv("VLAM_BASE_URL", "")
VLAM_MODEL_ID = os.getenv("VLAM_MODEL_ID", "")

# MCP-servers: naam → pad naar server.py
MCP_SERVERS: dict[str, Path] = {
    "kvk": Path(os.getenv("MCP_SERVER_KVK", str(SERVERS_DIR / "kvk" / "server.py"))),
    "koop": Path(os.getenv("MCP_SERVER_KOOP", str(SERVERS_DIR / "koop" / "server.py"))),
    "regelrecht": Path(os.getenv("MCP_SERVER_REGELRECHT", str(SERVERS_DIR / "regelrecht" / "server.py"))),
    "rvo": Path(os.getenv("MCP_SERVER_RVO", str(SERVERS_DIR / "rvo" / "server.py"))),
}

# Host
VLAM_HOST = os.getenv("VLAM_HOST", "0.0.0.0")
VLAM_PORT = int(os.getenv("VLAM_PORT", "8000"))

# Systeemprompts — worden dynamisch samengesteld op basis van beschikbare tools

_BASE_INSTRUCTIE = """
Antwoord altijd in het Nederlands op B1-taalniveau. Wees helder en behulpzaam.
Verwijs waar mogelijk naar de officiële bron."""

_TOOL_BESCHRIJVING = """
Je hebt toegang tot de volgende bronnen via tools:
- KvK (Kamer van Koophandel): bedrijfsgegevens, registratie, handelsregister
- KOOP Regelingenbank: wet- en regelgeving, besluiten, publicaties
- RegelRecht: uitvoeringsregels en beslisbomen van MinBZK/Digilab
- RVO: subsidies, regelingen en meldingen (O2-uploads)"""

_GEEN_TOOLS_BESCHRIJVING = """
Je hebt momenteel geen toegang tot externe bronnen. Beantwoord vragen op basis
van je eigen kennis. Geef aan wanneer informatie mogelijk niet actueel is en
verwijs de gebruiker naar de juiste overheidsinstantie voor verificatie."""


def get_system_prompt(mode: str, has_tools: bool) -> str:
    """Genereer systeemprompt op basis van modus en tool-beschikbaarheid."""
    if mode == "vlam":
        identiteit = "Je bent VLAM, de digitale assistent van de Rijksoverheid."
    else:
        identiteit = "Je bent Claude, ingezet als digitale assistent van MijnOverheid Zakelijk."

    taak = """Je helpt ondernemers en burgers met vragen over regelgeving, vergunningen,
subsidies en bedrijfsregistratie."""

    bronnen = _TOOL_BESCHRIJVING if has_tools else _GEEN_TOOLS_BESCHRIJVING

    return f"{identiteit}\n{taak}\n{bronnen}\n{_BASE_INSTRUCTIE}"
