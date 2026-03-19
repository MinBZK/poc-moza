"""Host — orkestreert twee LLM-backends (VLAM en Claude) met dezelfde MCP-tools.

De host fungeert als tussenstap:
  Gebruiker → Host → LLM (VLAM/Mistral óf Claude) + MCP-tools → antwoord
"""

import asyncio
import json
import logging
from collections.abc import AsyncGenerator

import anthropic
import openai

from config import (
    ANTHROPIC_API_KEY,
    CLAUDE_MODEL,
    CLAUDE_TIMEOUT,
    MCP_SERVERS,
    VLAM_API_KEY,
    VLAM_BASE_URL,
    VLAM_MODEL_ID,
    VLAM_TIMEOUT,
    get_system_prompt,
)
from mcp_client import MCPToolRegistry

logger = logging.getLogger("vlam.host")

# Gebruiksvriendelijke labels voor tools (getoond in de UI tijdens verwerking)
TOOL_LABELS = {
    "kvk__mijn_bedrijf": "Bedrijfsgegevens ophalen",
    "koop__zoek_regelgeving": "Regelgeving zoeken",
    "regelrecht__check": "Verplichting controleren",
    "rvo__zoek_regeling": "Subsidieregeling zoeken",
    "rvo__indienen": "Rapportage indienen",
}


def _tool_label(tool_key: str) -> str:
    """Geef een gebruiksvriendelijk label voor een tool-key."""
    return TOOL_LABELS.get(tool_key, tool_key)


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
    # Streaming — yieldt status-events voor de UI
    # ------------------------------------------------------------------

    async def chat_stream(
        self, session_id: str, user_message: str, mode: str = "vlam"
    ) -> AsyncGenerator[dict, None]:
        """Verwerk een bericht en yield status-events als dicts.

        Event-types:
          {"type": "status", "message": "Nadenken..."}
          {"type": "tool",   "message": "Bedrijfsgegevens ophalen", "tool": "kvk__mijn_bedrijf"}
          {"type": "answer", "message": "Het antwoord...", "session_id": "..."}
          {"type": "done"}
        """
        conv_key = f"{session_id}:{mode}"
        if conv_key not in self.conversations:
            self.conversations[conv_key] = []
        messages = self.conversations[conv_key]
        messages.append({"role": "user", "content": user_message})

        yield {"type": "status", "message": "Nadenken..."}

        if mode == "vlam":
            if not self.vlam_client:
                yield {
                    "type": "answer",
                    "message": "VLAM-backend is niet geconfigureerd.",
                    "session_id": session_id,
                }
                yield {"type": "done"}
                return
            gen = self._chat_vlam_stream(messages)
        else:
            gen = self._chat_claude_stream(messages)

        async for event in gen:
            yield event

        yield {"type": "done"}

    # ------------------------------------------------------------------
    # Claude (Anthropic API) — agentic loop met MCP-tools
    # ------------------------------------------------------------------

    async def _chat_claude_stream(
        self, messages: list[dict]
    ) -> AsyncGenerator[dict, None]:
        """Claude agentic loop die status-events yieldt."""
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

            try:
                response = await asyncio.wait_for(
                    self.claude_client.messages.create(**api_kwargs),
                    timeout=CLAUDE_TIMEOUT,
                )
            except (TimeoutError, anthropic.APIStatusError) as e:
                logger.error("Claude-call mislukt: %s", e)
                yield {
                    "type": "answer",
                    "message": (
                        "De assistent is op dit moment niet bereikbaar. "
                        "Probeer het later opnieuw."
                    ),
                }
                return

            assistant_content = response.content
            messages.append({"role": "assistant", "content": assistant_content})

            tool_uses = [b for b in assistant_content if b.type == "tool_use"]
            if not tool_uses:
                text = "\n".join(
                    b.text for b in assistant_content if hasattr(b, "text")
                )
                yield {"type": "answer", "message": text}
                return

            for tu in tool_uses:
                yield {
                    "type": "tool",
                    "message": _tool_label(tu.name),
                    "tool": tu.name,
                }

            tool_results = await self._execute_tools(tool_uses)
            messages.append({"role": "user", "content": tool_results})
            yield {"type": "status", "message": "Antwoord formuleren..."}

        yield {
            "type": "answer",
            "message": "Het antwoord kon niet worden voltooid (te veel stappen).",
        }

    async def _chat_vlam_stream(
        self, messages: list[dict]
    ) -> AsyncGenerator[dict, None]:
        """VLAM agentic loop die status-events yieldt.

        Bij een timeout of serverfout wordt automatisch opnieuw geprobeerd
        zonder tools, zodat de gebruiker alsnog een antwoord krijgt.
        """
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

            try:
                response = await asyncio.wait_for(
                    self.vlam_client.chat.completions.create(**api_kwargs),
                    timeout=VLAM_TIMEOUT,
                )
            except (TimeoutError, openai.APIStatusError) as e:
                logger.warning("VLAM-call mislukt (%s), retry zonder tools", e)
                yield {
                    "type": "status",
                    "message": "Bronnen niet bereikbaar, antwoord op eigen kennis...",
                }
                async for event in self._chat_vlam_no_tools(messages, system_prompt):
                    yield event
                return

            choice = response.choices[0]
            assistant_msg = choice.message

            openai_messages.append(assistant_msg.model_dump(exclude_none=True))
            messages.append(
                {"role": "assistant", "content": assistant_msg.content or ""}
            )

            tool_calls = assistant_msg.tool_calls
            if not tool_calls:
                yield {"type": "answer", "message": assistant_msg.content or ""}
                return

            for tc in tool_calls:
                tool_key = tc.function.name
                yield {
                    "type": "tool",
                    "message": _tool_label(tool_key),
                    "tool": tool_key,
                }

                arguments = json.loads(tc.function.arguments)
                logger.info("Tool-aanroep [vlam]: %s(%s)", tool_key, arguments)
                try:
                    result = await self.registry.call_tool(tool_key, arguments)
                except Exception as e:
                    result = f"Fout bij tool '{tool_key}': {e}"
                    logger.error(result)

                openai_messages.append(
                    {"role": "tool", "tool_call_id": tc.id, "content": result}
                )

            yield {"type": "status", "message": "Antwoord formuleren..."}

        yield {
            "type": "answer",
            "message": "Het antwoord kon niet worden voltooid (te veel stappen).",
        }

    async def _chat_vlam_no_tools(
        self, messages: list[dict], system_prompt: str
    ) -> AsyncGenerator[dict, None]:
        """VLAM fallback zonder tools — snelle call op eigen kennis."""
        openai_messages = self._to_openai_messages(messages, system_prompt)
        try:
            response = await asyncio.wait_for(
                self.vlam_client.chat.completions.create(
                    model=VLAM_MODEL_ID,
                    max_tokens=4096,
                    messages=openai_messages,
                ),
                timeout=VLAM_TIMEOUT,
            )
            content = response.choices[0].message.content or ""
            disclaimer = (
                "\n\n*Let op: dit antwoord is gebaseerd op eigen kennis. "
                "Er is geen actuele bron geraadpleegd.*"
            )
            messages.append({"role": "assistant", "content": content + disclaimer})
            yield {"type": "answer", "message": content + disclaimer}
        except (TimeoutError, openai.APIStatusError) as e:
            logger.error("VLAM ook zonder tools niet bereikbaar: %s", e)
            yield {
                "type": "answer",
                "message": (
                    "De assistent is op dit moment niet bereikbaar. "
                    "Probeer het later opnieuw."
                ),
            }

    # ------------------------------------------------------------------
    # Claude (Anthropic API) — blocking (non-streaming, backwards-compatibel)
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

            try:
                response = await asyncio.wait_for(
                    self.claude_client.messages.create(**api_kwargs),
                    timeout=CLAUDE_TIMEOUT,
                )
            except (TimeoutError, anthropic.APIStatusError) as e:
                logger.error("Claude-call mislukt: %s", e)
                return (
                    "De assistent is op dit moment niet bereikbaar. "
                    "Probeer het later opnieuw."
                )

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

            try:
                response = await asyncio.wait_for(
                    self.vlam_client.chat.completions.create(**api_kwargs),
                    timeout=VLAM_TIMEOUT,
                )
            except (TimeoutError, openai.APIStatusError) as e:
                logger.warning("VLAM-call mislukt (%s), retry zonder tools", e)
                return await self._vlam_no_tools_blocking(messages, system_prompt)

            choice = response.choices[0]
            assistant_msg = choice.message

            openai_messages.append(assistant_msg.model_dump(exclude_none=True))
            messages.append(
                {
                    "role": "assistant",
                    "content": assistant_msg.content or "",
                }
            )

            tool_calls = assistant_msg.tool_calls
            if not tool_calls:
                return assistant_msg.content or ""

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

    async def _vlam_no_tools_blocking(
        self, messages: list[dict], system_prompt: str
    ) -> str:
        """VLAM fallback zonder tools (blocking variant)."""
        openai_messages = self._to_openai_messages(messages, system_prompt)
        try:
            response = await asyncio.wait_for(
                self.vlam_client.chat.completions.create(
                    model=VLAM_MODEL_ID,
                    max_tokens=4096,
                    messages=openai_messages,
                ),
                timeout=VLAM_TIMEOUT,
            )
            content = response.choices[0].message.content or ""
            disclaimer = (
                "\n\n*Let op: dit antwoord is gebaseerd op eigen kennis. "
                "Er is geen actuele bron geraadpleegd.*"
            )
            messages.append({"role": "assistant", "content": content + disclaimer})
            return content + disclaimer
        except (TimeoutError, openai.APIStatusError) as e:
            logger.error("VLAM ook zonder tools niet bereikbaar: %s", e)
            return (
                "De assistent is op dit moment niet bereikbaar. "
                "Probeer het later opnieuw."
            )

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
