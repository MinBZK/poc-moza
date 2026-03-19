"""Host — orkestreert twee LLM-backends (VLAM en Claude) met dezelfde MCP-tools.

De host fungeert als tussenstap:
  Gebruiker → Host → LLM (VLAM/Mistral óf Claude) + MCP-tools → antwoord
"""

import json
import logging

import anthropic
import openai

from config import (
    ANTHROPIC_API_KEY,
    CLAUDE_MODEL,
    MCP_SERVERS,
    VLAM_API_KEY,
    VLAM_BASE_URL,
    VLAM_MODEL_ID,
    get_system_prompt,
)
from mcp_client import MCPToolRegistry

logger = logging.getLogger("vlam.host")


class VLAMHost:
    """Orkestrator die twee LLM-backends koppelt aan MCP-servers."""

    def __init__(self):
        self.claude_client = anthropic.AsyncAnthropic(api_key=ANTHROPIC_API_KEY)
        self.vlam_client = (
            openai.AsyncOpenAI(
                api_key=VLAM_API_KEY,
                base_url=VLAM_BASE_URL,
            )
            if VLAM_API_KEY and VLAM_BASE_URL
            else None
        )
        self.registry = MCPToolRegistry()
        self.conversations: dict[str, list[dict]] = {}
        # Houdt bij welke servers gelukt/mislukt zijn
        self.server_status: dict[str, str] = {}

    async def startup(self):
        """Verbind met alle geconfigureerde MCP-servers."""
        for name, path in MCP_SERVERS.items():
            try:
                await self.registry.register_server(name, path)
                self.server_status[name] = "verbonden"
            except Exception as e:
                logger.warning("Kan server '%s' niet starten: %s", name, e)
                self.server_status[name] = "niet beschikbaar"

        tool_count = len(self.registry.tool_map)
        backends = ["claude"]
        if self.vlam_client:
            backends.append("vlam")
        logger.info(
            "Host gestart — %d tools, backends: %s",
            tool_count,
            ", ".join(backends),
        )

    async def shutdown(self):
        """Sluit alle verbindingen."""
        await self.registry.disconnect_all()
        logger.info("Host afgesloten")

    @property
    def has_tools(self) -> bool:
        return len(self.registry.tool_map) > 0

    def get_status(self) -> dict:
        """Geeft de status van backends en MCP-servers."""
        return {
            "backends": {
                "claude": bool(ANTHROPIC_API_KEY),
                "vlam": self.vlam_client is not None,
            },
            "servers": self.server_status,
            "tools": len(self.registry.tool_map),
        }

    async def chat(self, session_id: str, user_message: str, mode: str = "vlam") -> str:
        """Verwerk een gebruikersbericht en retourneer het antwoord.

        mode: "vlam" (Mistral via UbiOps) of "claude" (Anthropic).
        Beide modi hebben toegang tot dezelfde MCP-tools (indien beschikbaar).
        """
        conv_key = f"{session_id}:{mode}"
        if conv_key not in self.conversations:
            self.conversations[conv_key] = []
        messages = self.conversations[conv_key]
        messages.append({"role": "user", "content": user_message})

        if mode == "vlam":
            if not self.vlam_client:
                return "VLAM-backend is niet geconfigureerd. Stel VLAM_API_KEY en VLAM_BASE_URL in."
            return await self._chat_vlam(messages)
        return await self._chat_claude(messages)

    # ------------------------------------------------------------------
    # Claude (Anthropic API) — agentic loop met MCP-tools
    # ------------------------------------------------------------------

    async def _chat_claude(self, messages: list[dict]) -> str:
        tools = self.registry.get_anthropic_tools()
        system_prompt = get_system_prompt("claude", self.has_tools)

        max_iterations = 10
        for _ in range(max_iterations):
            api_kwargs = {
                "model": CLAUDE_MODEL,
                "max_tokens": 4096,
                "system": system_prompt,
                "messages": messages,
            }
            if tools:
                api_kwargs["tools"] = tools

            response = await self.claude_client.messages.create(**api_kwargs)
            assistant_content = response.content
            messages.append({"role": "assistant", "content": assistant_content})

            tool_uses = [b for b in assistant_content if b.type == "tool_use"]
            if not tool_uses:
                return "\n".join(
                    b.text for b in assistant_content if hasattr(b, "text")
                )

            tool_results = await self._execute_tools(tool_uses)
            messages.append({"role": "user", "content": tool_results})

        return "Het antwoord kon niet worden voltooid (te veel stappen)."

    # ------------------------------------------------------------------
    # VLAM (OpenAI-compatibele API — UbiOps/Mistral) — agentic loop
    # ------------------------------------------------------------------

    async def _chat_vlam(self, messages: list[dict]) -> str:
        tools_openai = self.registry.get_openai_tools()
        system_prompt = get_system_prompt("vlam", self.has_tools)
        openai_messages = self._to_openai_messages(messages, system_prompt)

        max_iterations = 10
        for _ in range(max_iterations):
            api_kwargs = {
                "model": VLAM_MODEL_ID,
                "max_tokens": 4096,
                "messages": openai_messages,
            }
            if tools_openai:
                api_kwargs["tools"] = tools_openai

            response = await self.vlam_client.chat.completions.create(**api_kwargs)
            choice = response.choices[0]
            assistant_msg = choice.message

            # Bewaar in OpenAI-formaat voor de volgende call
            openai_messages.append(assistant_msg.model_dump(exclude_none=True))

            # Bewaar ook in ons intern formaat
            messages.append(
                {
                    "role": "assistant",
                    "content": assistant_msg.content or "",
                }
            )

            tool_calls = assistant_msg.tool_calls
            if not tool_calls:
                return assistant_msg.content or ""

            # Voer tool-aanroepen uit en voeg resultaten toe
            for tc in tool_calls:
                arguments = json.loads(tc.function.arguments)
                tool_key = tc.function.name
                logger.info("Tool-aanroep [vlam]: %s(%s)", tool_key, arguments)
                try:
                    result = await self.registry.call_tool(tool_key, arguments)
                except Exception as e:
                    result = f"Fout bij tool '{tool_key}': {e}"
                    logger.error(result)

                openai_messages.append(
                    {
                        "role": "tool",
                        "tool_call_id": tc.id,
                        "content": result,
                    }
                )

        return "Het antwoord kon niet worden voltooid (te veel stappen)."

    # ------------------------------------------------------------------
    # Helpers
    # ------------------------------------------------------------------

    async def _execute_tools(self, tool_uses) -> list[dict]:
        """Voer Anthropic tool_use-blokken uit via MCP-servers."""
        tool_results = []
        for tool_use in tool_uses:
            logger.info("Tool-aanroep [claude]: %s(%s)", tool_use.name, tool_use.input)
            try:
                result = await self.registry.call_tool(tool_use.name, tool_use.input)
            except Exception as e:
                result = f"Fout bij tool '{tool_use.name}': {e}"
                logger.error(result)

            tool_results.append(
                {
                    "type": "tool_result",
                    "tool_use_id": tool_use.id,
                    "content": result,
                }
            )
        return tool_results

    @staticmethod
    def _to_openai_messages(messages: list[dict], system_prompt: str) -> list[dict]:
        """Converteer intern berichtformaat naar OpenAI-messages (voor eerste call)."""
        openai_msgs = [{"role": "system", "content": system_prompt}]
        for msg in messages:
            content = msg.get("content", "")
            if isinstance(content, str):
                openai_msgs.append({"role": msg["role"], "content": content})
        return openai_msgs

    def clear_session(self, session_id: str):
        """Wis de gespreksgeschiedenis van een sessie (beide modi)."""
        for mode in ("vlam", "claude"):
            self.conversations.pop(f"{session_id}:{mode}", None)
