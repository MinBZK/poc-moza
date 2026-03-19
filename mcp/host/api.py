"""FastAPI-server voor de VLAM MCP-host.

Biedt een REST API waarmee het moza-portaal met VLAM kan communiceren.
"""

import logging
import uuid
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from config import VLAM_HOST, VLAM_PORT
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
    allow_origins=["*"],  # In productie: beperken tot moza-portaal domein
    allow_methods=["*"],
    allow_headers=["*"],
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


@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Stuur een bericht naar de assistent en ontvang een antwoord."""
    session_id = request.session_id or str(uuid.uuid4())
    mode = request.mode if request.mode in ("vlam", "claude") else "vlam"
    reply = await host.chat(session_id, request.message, mode=mode)
    return ChatResponse(
        reply=reply, session_id=session_id, mode=mode, has_tools=host.has_tools
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


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host=VLAM_HOST, port=VLAM_PORT)
