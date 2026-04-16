"""MCP-clientbeheer: verbindt met MCP-servers en verzamelt beschikbare tools."""

import asyncio
import logging
from pathlib import Path

from mcp import ClientSession, StdioServerParameters
from mcp.client.stdio import stdio_client

logger = logging.getLogger("vlam.mcp_client")


class MCPServerConnection:
    """Eén actieve verbinding met een MCP-server."""

    def __init__(self, name: str, server_path: Path):
        self.name = name
        self.server_path = server_path
        self.session: ClientSession | None = None
        self._context = None
        self._read = None
        self._write = None

    async def connect(self) -> list[dict]:
        """Start de MCP-server als subprocess en retourneer beschikbare tools."""
        if not self.server_path.exists():
            raise FileNotFoundError(
                f"Server-script niet gevonden: {self.server_path}"
            )

        server_params = StdioServerParameters(
            command="python",
            args=[str(self.server_path)],
        )

        self._context = stdio_client(server_params)
        self._read, self._write = await self._context.__aenter__()
        self.session = ClientSession(self._read, self._write)
        await self.session.__aenter__()
        await self.session.initialize()

        tools_response = await self.session.list_tools()
        logger.info(
            "Server '%s' verbonden — %d tools beschikbaar",
            self.name,
            len(tools_response.tools),
        )
        return tools_response.tools

    async def call_tool(self, tool_name: str, arguments: dict) -> str:
        """Roep een tool aan op deze server."""
        if not self.session:
            raise RuntimeError(f"Server '{self.name}' is niet verbonden")
        result = await self.session.call_tool(tool_name, arguments)
        # Combineer alle content-blokken tot tekst
        return "\n".join(
            block.text for block in result.content if hasattr(block, "text")
        )

    async def disconnect(self):
        """Sluit de verbinding."""
        if self.session:
            await self.session.__aexit__(None, None, None)
        if self._context:
            await self._context.__aexit__(None, None, None)
        logger.info("Server '%s' losgekoppeld", self.name)


class MCPToolRegistry:
    """Beheert alle MCP-serververbindingen en hun tools."""

    def __init__(self):
        self.connections: dict[str, MCPServerConnection] = {}
        # tool_name → (server_name, tool_schema)
        self.tool_map: dict[str, tuple[str, dict]] = {}

    async def register_server(self, name: str, server_path: Path):
        """Verbind met een MCP-server en registreer diens tools."""
        conn = MCPServerConnection(name, server_path)
        tools = await conn.connect()
        self.connections[name] = conn

        for tool in tools:
            tool_key = f"{name}__{tool.name}"
            self.tool_map[tool_key] = (name, tool)
            logger.info("  Tool geregistreerd: %s", tool_key)

    def get_anthropic_tools(self) -> list[dict]:
        """Converteer MCP-tools naar Anthropic API tool-formaat."""
        anthropic_tools = []
        for tool_key, (_, tool) in self.tool_map.items():
            anthropic_tools.append(
                {
                    "name": tool_key,
                    "description": tool.description or "",
                    "input_schema": tool.inputSchema,
                }
            )
        return anthropic_tools

    def get_openai_tools(self) -> list[dict]:
        """Converteer MCP-tools naar OpenAI API tool-formaat."""
        openai_tools = []
        for tool_key, (_, tool) in self.tool_map.items():
            openai_tools.append(
                {
                    "type": "function",
                    "function": {
                        "name": tool_key,
                        "description": tool.description or "",
                        "parameters": tool.inputSchema,
                    },
                }
            )
        return openai_tools

    async def call_tool(self, tool_key: str, arguments: dict) -> str:
        """Roep een tool aan via de juiste server."""
        if tool_key not in self.tool_map:
            return f"Onbekende tool: {tool_key}"

        server_name, _ = self.tool_map[tool_key]
        # Haal de originele tool-naam terug (zonder server-prefix)
        original_name = tool_key.split("__", 1)[1]
        conn = self.connections[server_name]
        return await conn.call_tool(original_name, arguments)

    async def disconnect_all(self):
        """Sluit alle serververbindingen."""
        for conn in self.connections.values():
            await conn.disconnect()
        self.connections.clear()
        self.tool_map.clear()
