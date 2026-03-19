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
    "regelrecht": Path(
        os.getenv(
            "MCP_SERVER_REGELRECHT", str(SERVERS_DIR / "regelrecht" / "server.py")
        )
    ),
    "rvo": Path(os.getenv("MCP_SERVER_RVO", str(SERVERS_DIR / "rvo" / "server.py"))),
}

# Host
VLAM_HOST = os.getenv("VLAM_HOST", "0.0.0.0")
VLAM_PORT = int(os.getenv("VLAM_PORT", "8000"))

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
    "get_system_prompt",
]
