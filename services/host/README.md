# `services/host` — FastAPI-host van de Digitale Assistent

De host is de tussenstap tussen browser en LLM. Eén proces, twee LLM-backends (VLAM en Claude), twee transportmechanismen voor tools (MCP en CLI). Voor de architectuur en routering zie [`../README.md`](../README.md). Voor de beslissingen achter deze opzet zie [`../decisions/`](../decisions/).

## Wat staat waar

| Bestand | Doel |
|---|---|
| `api.py` | FastAPI-applicatie. Endpoints `/chat` (streaming), `/health`, `/tools`, en `/<path>` voor het mounten van de Eleventy-build. |
| `vlam_host.py` | Orkestratie-laag: agentic loops voor Claude en VLAM, in MCP- en CLI-modus. Bevat ook `CLI_TOOL_DEFINITIONS_*` (zie waarschuwing hieronder). |
| `mcp_client.py` | `MCPToolRegistry` en `MCPServerConnection` — onderhoudt verbindingen met de vier MCP-servers. |
| `cli_executor.py` | Vertaalt `tool_use`-blokken naar CLI-commando's en voert ze uit als subprocess. |
| `config.py` | `.env`-laden, MCP-server-paden, timeout-instellingen, CORS- en API-key-overrides. |
| `prompts/` | Modulaire systeemprompts. `composer.py` zet identity + shared + model-specific blokken samen tot één prompt. |
| `prompts/blocks/` | Prompt-blokken per categorie (identity, shared, model_specific, examples). |
| `requirements.txt` | Python-dependencies. |
| `Dockerfile` | Container-opzet voor de host alleen (zie `../docker-compose.yml` voor de volledige stack). |
| `test_scenarios.py` | Mock-based tests voor de chat-stream — controleert event-volgorde bij happy path en foutcondities. |
| `test_vlam_toolcalling.py` | Integratie-test tegen het VLAM-endpoint — één tool-aanroep, geen MCP-server nodig. |
| `test_vlam_toolcalling_chain.py` | Idem, maar met een 3-rondes chain met meerdere tools. Onderbouwt waarom PDR-002 en PDR-003 ongeldig zijn verklaard. |

## Lokaal draaien

```bash
cd services/host
cp .env.example .env        # Vul minimaal ANTHROPIC_API_KEY in
pip install -r requirements.txt
python api.py               # Standaard poort: 8001 (zie .env)
```

De host serveert ook de gebouwde Eleventy-site uit `_site/` op dezelfde poort, dus de Digitale Assistent is bereikbaar op `http://localhost:8001/moza/digitale-assistent/`.

## Tests draaien

```bash
python test_scenarios.py
python test_vlam_toolcalling.py
python test_vlam_toolcalling_chain.py
```

Zie ook `../test-vragen.md` voor handmatige testvragen per tool en toolcombinatie.

## MCP-servers valideren tegen de standaard

```bash
../validate-mcp-servers.sh
```

Dit script draait `mcp-standaard validate` tegen alle vier servers, inclusief functionele resource-checks via `--test-uri`. Zonder die test-URIs blijft een type-mismatch op `ReadResourceContents` (zie [`docs/feasibility-mcp-cli.md` §2.3.A](../../docs/feasibility-mcp-cli.md)) onzichtbaar in de check-output. Voer dit script ook uit na elke wijziging in `services/mcp/*/server.py`.

Vereist `uv` en de repo `moza-mcp-standaard-poc` lokaal (default-pad: `../moza-mcp-standaard-poc` of zet `STANDAARD_REPO`-env).

## Aandachtspunten

**Sync tussen `CLI_TOOL_DEFINITIONS_*` en `cli_executor.py`** — de CLI-modus gebruikt twee handmatige bronnen die op elkaar moeten passen: de tool-definities die het LLM ziet (`vlam_host.py`) en de commando-mapping die wordt uitgevoerd (`cli_executor.py`). MCP doet dit automatisch via `tools/list`. Zie [PDR-005, "CLI tool-definities zijn hardcoded"](../decisions/PDR-005-cli-vs-mcp-transport.md) en [`docs/feasibility-mcp-cli.md` §2.3.B](../../docs/feasibility-mcp-cli.md) voor de nu bekende sync-gaten.

**`_site/` in deze map** — wordt aangemaakt door de FastAPI-mount op runtime, niet handmatig beheren. Staat in `.gitignore`.

**Streaming events** — de UI verwacht `status`, `tool`, `case`, `answer`, `error` en `done`. Zie de docstrings van `chat_stream` voor het exacte contract.
