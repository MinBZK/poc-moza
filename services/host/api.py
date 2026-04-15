"""FastAPI-server voor de VLAM MCP-host.

Biedt een REST API waarmee het moza-portaal met VLAM kan communiceren.
Ondersteunt zowel blocking (/chat) als streaming (/chat/stream) responses.
"""

import json
import logging
import os
import uuid
from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from config import ALLOW_API_KEY_OVERRIDE, ALLOWED_ORIGINS, VLAM_HOST, VLAM_PORT
from vlam_host import VLAMHost

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(name)s] %(levelname)s: %(message)s",
)

host = VLAMHost()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Start en stop de VLAM-host met de FastAPI-levenscyclus."""
    await host.startup()
    yield
    await host.shutdown()


app = FastAPI(
    title="VLAM Host",
    description="Rijksbrede digitale assistent — MCP-host wrapper",
    version="0.1.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["*"],
    allow_headers=["*"],
)
logging.getLogger("vlam.api").info(
    "CORS allow_origins=%s | api_key_override=%s",
    ALLOWED_ORIGINS, ALLOW_API_KEY_OVERRIDE,
)


# --- Request/Response modellen ---


class ChatRequest(BaseModel):
    """Inkomend chatbericht."""

    message: str
    session_id: str | None = None
    mode: str = "vlam"  # "vlam" (met MCP-tools) of "claude" (zonder tools)


class ChatResponse(BaseModel):
    """Antwoord van de assistent."""

    reply: str
    session_id: str
    mode: str
    has_tools: bool


class ToolInfo(BaseModel):
    """Beschikbare tool-informatie."""

    name: str
    description: str
    server: str


# --- Endpoints ---


def _extract_api_keys(request: Request) -> dict:
    """Lees optionele API key overrides uit request headers.

    Alleen actief als ALLOW_API_KEY_OVERRIDE=true in de omgeving.
    Anders worden de headers genegeerd en gebruikt de host de server-env keys.
    """
    if not ALLOW_API_KEY_OVERRIDE:
        return {"vlam_api_key_override": "", "claude_api_key_override": ""}
    return {
        "vlam_api_key_override": request.headers.get("x-vlam-api-key", "").strip(),
        "claude_api_key_override": request.headers.get("x-claude-api-key", "").strip(),
    }


@app.post("/chat", response_model=ChatResponse)
async def chat(body: ChatRequest, request: Request):
    """Stuur een bericht naar de assistent en ontvang een antwoord."""
    session_id = body.session_id or str(uuid.uuid4())
    VALID_MODES = ("vlam", "claude", "cli:vlam", "cli:claude")
    mode = body.mode if body.mode in VALID_MODES else "vlam"
    api_keys = _extract_api_keys(request)
    reply = await host.chat(session_id, body.message, mode=mode, **api_keys)
    return ChatResponse(
        reply=reply, session_id=session_id, mode=mode, has_tools=host.has_tools
    )


@app.post("/chat/stream")
async def chat_stream(body: ChatRequest, request: Request):
    """Stuur een bericht en ontvang status-updates via Server-Sent Events.

    Events:
      event: status  — de assistent is bezig (nadenken, tool aanroepen)
      event: tool    — een specifieke tool wordt aangeroepen
      event: case    — een lopende zaak is aangemaakt (na indiening)
      event: answer  — het definitieve antwoord
      event: done    — stream is afgelopen
    """
    session_id = body.session_id or str(uuid.uuid4())
    VALID_MODES = ("vlam", "claude", "cli:vlam", "cli:claude")
    mode = body.mode if body.mode in VALID_MODES else "vlam"
    api_keys = _extract_api_keys(request)
    logging.getLogger("vlam.api").info("POST /chat/stream — mode=%r (raw=%r)", mode, body.mode)

    async def event_generator():
        async for event in host.chat_stream(session_id, body.message, mode=mode, **api_keys):
            event_type = event.get("type", "status")
            # Voeg session_id en mode toe aan answer-events
            if event_type == "answer":
                event["session_id"] = session_id
                event["mode"] = mode
                event["has_tools"] = host.has_tools
            payload = json.dumps(event, ensure_ascii=False)
            yield f"event: {event_type}\ndata: {payload}\n\n"

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "X-Accel-Buffering": "no",
        },
    )


@app.delete("/chat/{session_id}")
async def clear_session(session_id: str):
    """Wis de gespreksgeschiedenis van een sessie."""
    host.clear_session(session_id)
    return {"status": "gewist", "session_id": session_id}


@app.get("/tools", response_model=list[ToolInfo])
async def list_tools():
    """Toon alle beschikbare tools van verbonden MCP-servers."""
    tools = []
    for tool_key, (server_name, tool) in host.registry.tool_map.items():
        tools.append(
            ToolInfo(
                name=tool_key,
                description=tool.description or "",
                server=server_name,
            )
        )
    return tools


@app.get("/health")
async def health():
    """Gezondheidscontrole met status van backends en MCP-servers."""
    return {
        "status": "actief",
        **host.get_status(),
    }


_default_static = Path(__file__).resolve().parent.parent.parent / "_site"
_static_dir = Path(os.getenv("STATIC_DIR") or _default_static)
if _static_dir.is_dir():
    app.mount("/", StaticFiles(directory=_static_dir, html=True), name="site")
    logging.getLogger("vlam.api").info("Statische site gemount vanuit %s", _static_dir)
else:
    logging.getLogger("vlam.api").warning("Geen statische site gevonden op %s", _static_dir)


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host=VLAM_HOST, port=VLAM_PORT)
