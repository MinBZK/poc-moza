"""Configuratie voor de VLAM MCP-host."""

import os
from pathlib import Path
from dotenv import load_dotenv

# Pad-basis relatief aan dit bestand
BASE_DIR = Path(__file__).resolve().parent
SERVERS_DIR = BASE_DIR.parent / "mcp"
PROJECT_ROOT = BASE_DIR.parent.parent

# Zoek .env op meerdere plekken (eerste die bestaat wint)
for _env_path in [
    BASE_DIR / ".env",          # services/host/.env
    BASE_DIR.parent / ".env",   # services/.env
    PROJECT_ROOT / ".env",      # project root .env
]:
    if _env_path.is_file():
        load_dotenv(_env_path)
        break
else:
    load_dotenv()  # fallback: zoek in cwd

# Claude API (Anthropic)
ANTHROPIC_API_KEY = os.getenv("ANTHROPIC_API_KEY", "")
CLAUDE_MODEL = os.getenv("CLAUDE_MODEL", "claude-sonnet-4-20250514")

# VLAM API (UbiOps/Mistral — OpenAI-compatibele API)
VLAM_API_KEY = os.getenv("VLAM_API_KEY", "")
VLAM_BASE_URL = os.getenv("VLAM_BASE_URL", "")
VLAM_MODEL_ID = os.getenv("VLAM_MODEL_ID", "")

# MCP-servers: naam → pad naar server.py
# Relatieve paden uit .env worden opgelost t.o.v. de host-directory (BASE_DIR)
def _resolve_server_path(env_key: str, default: Path) -> Path:
    raw = os.getenv(env_key)
    if raw is None:
        return default
    p = Path(raw)
    if not p.is_absolute():
        p = (BASE_DIR / p).resolve()
    return p

MCP_SERVERS: dict[str, Path] = {
    "kvk": _resolve_server_path("MCP_SERVER_KVK", SERVERS_DIR / "kvk" / "server.py"),
    "koop": _resolve_server_path("MCP_SERVER_KOOP", SERVERS_DIR / "koop" / "server.py"),
    "regelrecht": _resolve_server_path("MCP_SERVER_REGELRECHT", SERVERS_DIR / "regelrecht" / "server.py"),
    "rvo": _resolve_server_path("MCP_SERVER_RVO", SERVERS_DIR / "rvo" / "server.py"),
}

# Host
VLAM_HOST = os.getenv("VLAM_HOST", "0.0.0.0")
VLAM_PORT = int(os.getenv("VLAM_PORT", "8000"))

# Timeouts (seconden) — per LLM-call, niet per sessie
VLAM_TIMEOUT = int(os.getenv("VLAM_TIMEOUT", "30"))
CLAUDE_TIMEOUT = int(os.getenv("CLAUDE_TIMEOUT", "60"))

# System prompt — assembled from modular blocks
from prompts.composer import compose_system_prompt as get_system_prompt  # noqa: E402

__all__ = [
    "ANTHROPIC_API_KEY",
    "CLAUDE_MODEL",
    "MCP_SERVERS",
    "VLAM_API_KEY",
    "VLAM_BASE_URL",
    "VLAM_HOST",
    "VLAM_MODEL_ID",
    "VLAM_PORT",
    "VLAM_TIMEOUT",
    "CLAUDE_TIMEOUT",
    "get_system_prompt",
]
