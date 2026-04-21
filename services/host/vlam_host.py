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
from cli_executor import execute_cli_tool, CLI_DIR

logger = logging.getLogger("vlam.host")

# Gebruiksvriendelijke labels voor tools (getoond in de UI tijdens verwerking)
TOOL_LABELS = {
    "kvk__mijn_bedrijf": "KvK Handelsregister raadplegen",
    "koop__zoek_regelgeving": "KOOP Regelingenbank doorzoeken",
    "regelrecht__check": "RegelRecht: verplichting toetsen",
    "rvo__zoek_regeling": "RVO: subsidieregeling zoeken",
    "rvo__indienen": "RVO: rapportage indienen",
}


def _tool_label(tool_key: str) -> str:
    """Geef een gebruiksvriendelijk label voor een tool-key."""
    return TOOL_LABELS.get(tool_key, tool_key)


def _extract_lopende_zaak(tool_name: str, result: str) -> dict | None:
    """Extraheer lopende_zaak uit een rvo__indienen resultaat."""
    if tool_name != "rvo__indienen":
        return None
    try:
        parsed = json.loads(result)
        data = parsed.get("data", parsed)
        return data.get("lopende_zaak")
    except (json.JSONDecodeError, AttributeError):
        return None


def _log_tokens(backend: str, response) -> None:
    """Log token-gebruik uit een LLM-response (Anthropic of OpenAI)."""
    usage = getattr(response, "usage", None)
    if not usage:
        return
    # Anthropic: input_tokens / output_tokens
    # OpenAI:    prompt_tokens / completion_tokens
    input_t = getattr(usage, "input_tokens", None) or getattr(usage, "prompt_tokens", None) or 0
    output_t = getattr(usage, "output_tokens", None) or getattr(usage, "completion_tokens", None) or 0
    total = input_t + output_t
    logger.info(
        "TOKENS [%s] input=%d output=%d total=%d",
        backend, input_t, output_t, total,
    )


# Tool-definities voor CLI-modus (onafhankelijk van MCP-registry)
CLI_TOOL_DEFINITIONS_ANTHROPIC = [
    {
        "name": "kvk__mijn_bedrijf",
        "description": "Haal het KvK-basisprofiel op van het bedrijf van de ingelogde gebruiker. Geeft bedrijfsnaam, KvK-nummer, rechtsvorm, SBI-activiteiten, vestigingsadres en aantal medewerkers. Het profiel wordt automatisch verrijkt met BAG-gegevens (gebruiksdoel pand en is_woonfunctie) via het Kadaster.",
        "input_schema": {"type": "object", "properties": {}, "required": []},
    },
    {
        "name": "koop__zoek_regelgeving",
        "description": "Doorzoek de KOOP Regelingenbank (wetten.overheid.nl) op trefwoord. Retourneert titel, identificatie (BWB-ID), type, organisatie en geldigheid.",
        "input_schema": {
            "type": "object",
            "properties": {
                "trefwoord": {"type": "string", "description": "Zoekterm (trefwoord of frase)"},
                "onderwerp": {"type": "string", "description": "Filter op onderwerp (bijv. 'energie', 'milieu')"},
                "type_regeling": {"type": "string", "description": "Filter op type: 'wet', 'AMvB', 'ministerieleregeling', 'verdrag'"},
                "max_resultaten": {"type": "integer", "description": "Maximaal aantal resultaten (standaard 10, max 50)"},
            },
            "required": ["trefwoord"],
        },
    },
    {
        "name": "regelrecht__check",
        "description": "Controleer of de Informatieplicht Energiebesparing van toepassing is op een bedrijf, op basis van het Besluit activiteiten leefomgeving.",
        "input_schema": {
            "type": "object",
            "properties": {
                "kvk_nummer": {"type": "string", "description": "8-cijferig KvK-nummer"},
                "jaarlijks_elektriciteitsverbruik_kwh": {"type": "number", "description": "Jaarlijks elektriciteitsverbruik in kWh (drempel: 50.000)"},
                "jaarlijks_gasverbruik_m3": {"type": "number", "description": "Jaarlijks gasverbruik in m³ (drempel: 25.000)"},
                "is_woonfunctie": {"type": "boolean", "description": "Of het gebouw uitsluitend een woonfunctie heeft"},
            },
            "required": ["kvk_nummer"],
        },
    },
    {
        "name": "rvo__zoek_regeling",
        "description": "Zoek beschikbare RVO-subsidies en regelingen op trefwoord. Retourneert naam, status, deadline en beschrijving.",
        "input_schema": {
            "type": "object",
            "properties": {
                "trefwoord": {"type": "string", "description": "Zoekterm (bijv. 'energiebesparing', 'subsidie', 'warmtepomp')"},
            },
            "required": ["trefwoord"],
        },
    },
    {
        "name": "rvo__indienen",
        "description": "Dien een energiebesparingsrapportage in bij RVO namens de ondernemer. Dit is een muterende actie — vraag bevestiging aan de gebruiker.",
        "input_schema": {
            "type": "object",
            "properties": {
                "kvk_nummer": {"type": "string", "description": "8-cijferig KvK-nummer"},
                "regeling_id": {"type": "string", "description": "Regeling-ID (bijv. 'EBR-2026')"},
                "maatregelen": {"type": "array", "items": {"type": "string"}, "description": "Lijst van genomen energiebesparingsmaatregelen"},
            },
            "required": ["kvk_nummer", "regeling_id", "maatregelen"],
        },
    },
]

CLI_TOOL_DEFINITIONS_OPENAI = [
    {"type": "function", "function": {"name": t["name"], "description": t["description"], "parameters": t["input_schema"]}}
    for t in CLI_TOOL_DEFINITIONS_ANTHROPIC
]


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
        cli_tools = {
            "kvk": (CLI_DIR / "kvk-cli").is_file(),
            "koop": (CLI_DIR / "koop-cli").is_file(),
            "regelrecht": (CLI_DIR / "regelrecht-cli").is_file(),
            "rvo": (CLI_DIR / "rvo-cli").is_file(),
        }
        return {
            "backends": {
                "claude": bool(ANTHROPIC_API_KEY),
                "vlam": self.vlam_client is not None,
            },
            "servers": self.server_status,
            "cli": {k: "verbonden" if v else "niet beschikbaar" for k, v in cli_tools.items()},
            "tools": len(self.registry.tool_map),
        }

    def _resolve_clients(
        self,
        vlam_api_key_override: str = "",
        claude_api_key_override: str = "",
    ) -> tuple:
        """Geef (claude_client, vlam_client) terug, met overrides indien opgegeven."""
        claude = self.claude_client
        vlam = self.vlam_client
        if claude_api_key_override:
            claude = anthropic.AsyncAnthropic(api_key=claude_api_key_override)
        if vlam_api_key_override and VLAM_BASE_URL:
            vlam = openai.AsyncOpenAI(
                api_key=vlam_api_key_override, base_url=VLAM_BASE_URL
            )
        return claude, vlam

    async def chat(
        self,
        session_id: str,
        user_message: str,
        mode: str = "vlam",
        vlam_api_key_override: str = "",
        claude_api_key_override: str = "",
    ) -> str:
        """Verwerk een gebruikersbericht en retourneer het antwoord.

        mode: "vlam" (Mistral via UbiOps) of "claude" (Anthropic).
        Beide modi hebben toegang tot dezelfde MCP-tools (indien beschikbaar).
        """
        orig_claude, orig_vlam = self.claude_client, self.vlam_client
        self.claude_client, self.vlam_client = self._resolve_clients(
            vlam_api_key_override, claude_api_key_override
        )
        conv_key = f"{session_id}:{mode}"
        if conv_key not in self.conversations:
            self.conversations[conv_key] = []
        messages = self.conversations[conv_key]
        messages.append({"role": "user", "content": user_message})

        try:
            if mode == "vlam":
                if not self.vlam_client:
                    return "VLAM-backend is niet geconfigureerd. Stel VLAM_API_KEY en VLAM_BASE_URL in."
                return await self._chat_vlam(messages)
            return await self._chat_claude(messages)
        finally:
            self.claude_client, self.vlam_client = orig_claude, orig_vlam

    # ------------------------------------------------------------------
    # Streaming — yieldt status-events voor de UI
    # ------------------------------------------------------------------

    async def chat_stream(
        self,
        session_id: str,
        user_message: str,
        mode: str = "vlam",
        vlam_api_key_override: str = "",
        claude_api_key_override: str = "",
    ) -> AsyncGenerator[dict, None]:
        """Verwerk een bericht en yield status-events als dicts.

        Event-types:
          {"type": "status", "message": "Nadenken..."}
          {"type": "tool",   "message": "Bedrijfsgegevens ophalen", "tool": "kvk__mijn_bedrijf"}
          {"type": "answer", "message": "Het antwoord...", "session_id": "..."}
          {"type": "done"}
        """
        orig_claude, orig_vlam = self.claude_client, self.vlam_client
        self.claude_client, self.vlam_client = self._resolve_clients(
            vlam_api_key_override, claude_api_key_override
        )

        conv_key = f"{session_id}:{mode}"
        if conv_key not in self.conversations:
            self.conversations[conv_key] = []
        messages = self.conversations[conv_key]
        messages.append({"role": "user", "content": user_message})

        yield {"type": "status", "message": "Vraag analyseren..."}

        # Bepaal LLM en transport
        use_cli = mode.startswith("cli:")
        llm = mode.split(":")[-1] if use_cli else mode

        if llm == "vlam":
            if not self.vlam_client:
                yield {
                    "type": "answer",
                    "message": "VLAM-backend is niet geconfigureerd.",
                    "session_id": session_id,
                }
                yield {"type": "done"}
                return
            if use_cli:
                gen = self._chat_vlam_cli_stream(messages)
            else:
                gen = self._chat_vlam_stream(messages)
        elif llm == "claude":
            if use_cli:
                gen = self._chat_cli_stream(messages)
            else:
                gen = self._chat_claude_stream(messages)
        else:
            gen = self._chat_claude_stream(messages)

        try:
            async for event in gen:
                yield event
        finally:
            self.claude_client, self.vlam_client = orig_claude, orig_vlam

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
                _log_tokens("claude", response)
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
            # Emit lopende zaak als case-event bij succesvolle indiening
            for tu, tr in zip(tool_uses, tool_results):
                zaak = _extract_lopende_zaak(tu.name, tr.get("content", ""))
                if zaak:
                    yield {"type": "case", "data": zaak}
            messages.append({"role": "user", "content": tool_results})
            yield {"type": "status", "message": "Antwoord opstellen..."}

        yield {
            "type": "answer",
            "message": "Het antwoord kon niet worden voltooid (te veel stappen).",
        }

    async def _chat_vlam_stream(
        self, messages: list[dict]
    ) -> AsyncGenerator[dict, None]:
        """VLAM agentic loop (native OpenAI tool-calling) die status-events yieldt."""
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
                _log_tokens("vlam", response)
            except (TimeoutError, openai.APIStatusError) as e:
                logger.error("VLAM-call mislukt: %s", e)
                yield {
                    "type": "answer",
                    "message": (
                        "De assistent is op dit moment niet bereikbaar. "
                        "Probeer het later opnieuw."
                    ),
                }
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

                zaak = _extract_lopende_zaak(tool_key, result)
                if zaak:
                    yield {"type": "case", "data": zaak}

                openai_messages.append(
                    {"role": "tool", "tool_call_id": tc.id, "content": result}
                )

            yield {"type": "status", "message": "Antwoord opstellen..."}

        yield {
            "type": "answer",
            "message": "Het antwoord kon niet worden voltooid (te veel stappen).",
        }

    # ------------------------------------------------------------------
    # CLI-modus — zelfde LLM (Claude), maar tools via CLI i.p.v. MCP
    # ------------------------------------------------------------------

    async def _chat_cli_stream(
        self, messages: list[dict]
    ) -> AsyncGenerator[dict, None]:
        """Claude agentic loop die CLI-tools aanroept i.p.v. MCP-servers."""
        tools = CLI_TOOL_DEFINITIONS_ANTHROPIC
        system_prompt = get_system_prompt("claude", True)

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
                _log_tokens("claude", response)
            except (TimeoutError, anthropic.APIStatusError) as e:
                logger.error("Claude-call (CLI-modus) mislukt: %s", e)
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

            tool_results = []
            for tu in tool_uses:
                yield {
                    "type": "tool",
                    "message": f"CLI: {_tool_label(tu.name)}",
                    "tool": tu.name,
                }

                logger.info("CLI tool-aanroep: %s(%s)", tu.name, tu.input)
                try:
                    result = await execute_cli_tool(tu.name, tu.input)
                except Exception as e:
                    result = f"Fout bij CLI tool '{tu.name}': {e}"
                    logger.error(result)

                zaak = _extract_lopende_zaak(tu.name, result)
                if zaak:
                    yield {"type": "case", "data": zaak}

                tool_results.append(
                    {
                        "type": "tool_result",
                        "tool_use_id": tu.id,
                        "content": result,
                    }
                )

            messages.append({"role": "user", "content": tool_results})
            yield {"type": "status", "message": "Antwoord opstellen..."}

        yield {
            "type": "answer",
            "message": "Het antwoord kon niet worden voltooid (te veel stappen).",
        }

    # ------------------------------------------------------------------
    # VLAM + CLI — native tool-calling met CLI-tools i.p.v. MCP
    # ------------------------------------------------------------------

    async def _chat_vlam_cli_stream(
        self, messages: list[dict]
    ) -> AsyncGenerator[dict, None]:
        """VLAM agentic loop (native tool-calling) met CLI-tools i.p.v. MCP."""
        tools_openai = CLI_TOOL_DEFINITIONS_OPENAI
        system_prompt = get_system_prompt("vlam", True)
        openai_messages = self._to_openai_messages(messages, system_prompt)

        max_iterations = 10
        for _ in range(max_iterations):
            try:
                response = await asyncio.wait_for(
                    self.vlam_client.chat.completions.create(
                        model=VLAM_MODEL_ID,
                        max_tokens=4096,
                        messages=openai_messages,
                        tools=tools_openai,
                    ),
                    timeout=VLAM_TIMEOUT,
                )
                _log_tokens("vlam", response)
            except (TimeoutError, openai.APIStatusError) as e:
                logger.error("VLAM CLI-call mislukt: %s", e)
                yield {
                    "type": "answer",
                    "message": (
                        "De assistent is op dit moment niet bereikbaar. "
                        "Probeer het later opnieuw."
                    ),
                }
                return

            assistant_msg = response.choices[0].message
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
                    "message": f"CLI: {_tool_label(tool_key)}",
                    "tool": tool_key,
                }

                arguments = json.loads(tc.function.arguments or "{}")
                logger.info("CLI tool-aanroep [vlam]: %s(%s)", tool_key, arguments)
                try:
                    result = await execute_cli_tool(tool_key, arguments)
                except Exception as e:
                    result = f"Fout bij CLI tool '{tool_key}': {e}"
                    logger.error(result)

                zaak = _extract_lopende_zaak(tool_key, result)
                if zaak:
                    yield {"type": "case", "data": zaak}

                openai_messages.append(
                    {"role": "tool", "tool_call_id": tc.id, "content": result}
                )

            yield {"type": "status", "message": "Antwoord opstellen..."}

        yield {
            "type": "answer",
            "message": "Het antwoord kon niet worden voltooid (te veel stappen).",
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
                _log_tokens("claude", response)
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
                _log_tokens("vlam", response)
            except (TimeoutError, openai.APIStatusError) as e:
                logger.error("VLAM-call mislukt: %s", e)
                return (
                    "De assistent is op dit moment niet bereikbaar. "
                    "Probeer het later opnieuw."
                )

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
        for mode in ("vlam", "claude", "cli"):
            self.conversations.pop(f"{session_id}:{mode}", None)
