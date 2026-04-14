# PDR-005: CLI vs MCP als transport voor tool-uitvoering

| Veld           | Waarde                          |
|----------------|---------------------------------|
| Status         | Geaccepteerd                    |
| Datum          | 2026-04-09                      |
| Beslisser(s)   | Projectteam poc-moza            |
| Gerelateerd    | PDR-001, PDR-004                |

## Context

De digitale assistent gebruikt vier MCP-servers (KvK, KOOP, RegelRecht, RVO) om overheidsbronnen te raadplegen. Deze servers bieden twee soorten MCP-primitives aan:

- **Tools** — acties die het LLM kan aanroepen (zoeken, controleren, indienen)
- **Resources** — statische of parametrische databronnen die het LLM kan lezen

| Server | Tools | Resources |
|---|---|---|
| KvK | `mijn_bedrijf` (basisprofiel ophalen) | Basisprofiel resource + URI-templates |
| KOOP | `zoek_regelgeving` (zoeken op trefwoord) | Regelingen resources (`koop://regeling/{bwb_id}`) |
| RegelRecht | `check` (verplichting toetsen) | — |
| RVO | `zoek_regeling`, `indienen` | — |

Zowel de MCP-servers als de CLI-tools zijn **API-wrappers**: ze vertalen aanroepen van het LLM naar HTTP-calls naar externe overheids-API's (api.kvk.nl, wetten.overheid.nl, etc.) en geven het resultaat gestructureerd terug. Het verschil zit niet in *wat* ze doen, maar in *hoe* ze worden aangeroepen. Er zijn twee transportmechanismen geimplementeerd in deze repo: **MCP** (Model Context Protocol) en **CLI** (Command Line Interface).

## Hoe werkt MCP?

MCP is een protocol (JSON-RPC over stdio) waarbij de host permanente verbindingen onderhoudt met MCP-servers. Elke server is een Python-proces dat continu draait.

**Architectuur:**
```
LLM → Host (vlam_host.py) → MCPToolRegistry → MCP-server (Python, persistent)
                                                 ↓
                                            Externe API (kvk.nl, etc.)
```

**Pad van een tool-aanroep** (voorbeeld: `kvk__mijn_bedrijf`):

1. Host start bij boot alle MCP-servers als child-processen (`mcp_client.py`)
2. Servers registreren hun tools via `ListToolsRequest` en hun resources via `ListResourcesRequest`/`ListResourceTemplatesRequest`
3. LLM genereert een `tool_use`-blok met tool-naam en argumenten
4. Host roept `registry.call_tool("kvk__mijn_bedrijf", {})` aan
5. Registry stuurt JSON-RPC `CallToolRequest` via stdin naar het server-proces
6. Server (`services/mcp/kvk/server.py`) doet een HTTP-call naar `api.kvk.nl`
7. Server retourneert JSON met data + provenance via stdout
8. Host geeft het resultaat terug aan het LLM als `tool_result`

**Implementatie:** `services/mcp/kvk/server.py` — Python, gebruikt `mcp.server.Server`, `mcp.types.Tool`, `ToolAnnotations`. Draait continu in geheugen.

**Voorbeeld tool-definitie (MCP):**
```python
@server.list_tools()
async def handle_list_tools():
    return [Tool(
        name="mijn_bedrijf",
        description="Haal het basisprofiel op van het bedrijf van de ingelogde gebruiker.",
        inputSchema={"type": "object", "properties": {}, "required": []},
        annotations=ToolAnnotations(readOnlyHint=True, openWorldHint=False),
    )]
```

## Hoe werkt CLI?

CLI-tools zijn Bash-scripts die on-demand worden aangeroepen als subprocessen. Er draait geen permanent proces.

**Architectuur:**
```
LLM → Host (vlam_host.py) → cli_executor.py → subprocess (Bash, tijdelijk)
                                                 ↓
                                            Externe API (kvk.nl, etc.)
```

**Pad van een tool-aanroep** (voorbeeld: `kvk__mijn_bedrijf`):

1. Host biedt dezelfde tool-definities aan het LLM (hardcoded in `CLI_TOOL_DEFINITIONS_ANTHROPIC`)
2. LLM genereert een `tool_use`-blok (identiek aan MCP-modus)
3. Host roept `execute_cli_tool("kvk__mijn_bedrijf", {})` aan
4. `cli_executor.py` vertaalt dit naar: `services/cli/kvk-cli basisprofiel get --provenance --output raw`
5. Bash-script start, doet een `curl` naar `api.kvk.nl`, formatteert met `jq`
6. Script retourneert JSON op stdout en stopt
7. Host leest stdout en geeft resultaat terug aan het LLM

**Implementatie:** `services/cli/kvk-cli` — Bash + `curl` + `jq`. Gebruikt gedeelde libraries (`lib/provenance.sh`, `lib/audit.sh`, `lib/output.sh`). Start en stopt per aanroep.

**Voorbeeld CLI-aanroep:**
```bash
$ kvk-cli basisprofiel get --provenance --output raw
{
  "data": {"kvkNummer": "68750110", "naam": "Test BV Donald", ...},
  "provenance": {"source": "KvK Handelsregister (testomgeving)", "timestamp": "2026-04-09T..."}
}
```

## Vergelijking

### Wat is gelijk

- **Dezelfde bronnen**: Beide raadplegen dezelfde externe API's (api.kvk.nl, wetten.overheid.nl, etc.)
- **Dezelfde tool-interface voor het LLM**: Het LLM ziet identieke tool-namen en parameters, ongeacht transport
- **Provenance**: Beide voegen herkomstmetadata toe aan de response
- **Dezelfde host-orchestratie**: `vlam_host.py` verwerkt tool-resultaten op dezelfde manier

### Wat verschilt

| Aspect | MCP | CLI |
|---|---|---|
| **Proces-levensduur** | Permanent (draait continu) | Tijdelijk (start/stop per aanroep) |
| **Taal** | Python + `mcp`-pakket | Bash + `curl` + `jq` |
| **Protocol** | JSON-RPC over stdio | Subprocess met args, stdout/stderr |
| **Discovery** | Automatisch via `ListToolsRequest` + `ListResourcesRequest` | Hardcoded in `CLI_TOOL_DEFINITIONS_ANTHROPIC` (alleen tools, geen resources) |
| **Token-efficientie** | Volledige response | Filterbaar via `--fields` (tot 97% reductie) |
| **Geheugengebruik** | ~20MB per server (4 servers = ~80MB) | 0MB in rust, ~5MB per aanroep |
| **Dependencies** | Python 3.11+, `mcp`, `anthropic`/`openai` | `bash`, `curl`, `jq` (overal aanwezig) |
| **Foutafhandeling** | Gestructureerde MCP error types | Exit codes + stderr |
| **Mutatie-beveiliging** | `ToolAnnotations` (readOnlyHint) | `--dry-run` en `--confirm` flags |

### Concrete voorbeelden

**Voorbeeld 1: Bedrijfsgegevens ophalen**

MCP:
```
Host → JSON-RPC {"method": "tools/call", "params": {"name": "mijn_bedrijf"}}
      → MCP-server (Python, al draaiend) → HTTP GET api.kvk.nl/test/api/v1/basisprofielen/68750110
      → JSON response (2126 bytes, ~531 tokens)
```

CLI:
```
Host → subprocess: kvk-cli basisprofiel get --fields naam,kvkNummer --provenance --output raw
      → curl + jq → HTTP GET api.kvk.nl/test/api/v1/basisprofielen/68750110
      → Gefilterde JSON response (58 bytes, ~14 tokens)
```

**Voorbeeld 2: Regelgeving zoeken**

MCP:
```
Host → JSON-RPC {"method": "tools/call", "params": {"name": "zoek_regelgeving", "arguments": {"trefwoord": "energie"}}}
      → koop MCP-server → HTTP GET wetten.overheid.nl/...
```

CLI:
```
Host → subprocess: koop-cli regeling zoek energie --provenance --output raw
      → curl + jq → HTTP GET wetten.overheid.nl/...
```

**Voorbeeld 3: Rapportage indienen (mutatie)**

MCP: `ToolAnnotations(readOnlyHint=False)` — LLM en host moeten zelf bevestiging regelen.

CLI: `rvo-cli rapportage indienen 68750110 EBR-2026 "led,isolatie" --dry-run` toont preview. Pas met `--confirm` wordt het daadwerkelijk ingediend.

## Beslissing

**Beide transportmechanismen worden ondersteund naast elkaar.** De gebruiker kan in de admin panel wisselen tussen MCP en CLI. Dit maakt vergelijkend onderzoek mogelijk naar:

1. **Token-efficientie** — CLI met `--fields` vs MCP volledige responses
2. **Betrouwbaarheid** — Persistent proces vs on-demand subprocess
3. **Complexiteit** — Python MCP-stack vs Bash-scripts
4. **Standaard-compliance** — Welk transport leent zich beter voor overheidsstandaarden

Het kerninzicht uit PDR-004: **de waarde zit in de standaard (provenance, audit, dataminimalisatie), niet in het transport**. MCP en CLI zijn inwisselbare transportlagen onder dezelfde eisen.

## Consequenties

1. **Dubbele implementatie** — Elke tool bestaat als MCP-server (Python) en CLI-tool (Bash). Dit is bewust voor vergelijking; in productie kiest men een.
2. **CLI tool-definities zijn hardcoded** — Anders dan MCP (automatische discovery) moeten CLI tool-schema's handmatig gesynchroniseerd worden in `vlam_host.py`. CLI ondersteunt daarnaast geen MCP-resources (zoals `koop://regeling/{bwb_id}`); alleen tools zijn beschikbaar via CLI.
3. **Admin panel** — De transport-keuze is verplaatst van de chatpagina naar het admin panel (feature flags), samen met de LLM-keuze (VLAM/Claude).
4. **Vier combinaties** — VLAM+MCP, VLAM+CLI, Claude+MCP, Claude+CLI zijn allemaal beschikbaar voor vergelijking.
5. **Standaardisatie** — De huidige MCP-standaard voor de overheid dekt alleen het MCP-protocol. Als CLI een volwaardig alternatief transport is, moet de standaard worden uitgebreid met een CLI-profiel (discovery via `--help --json`, provenance via `--provenance`, gestandaardiseerde exit codes, dataminimalisatie via `--fields`). Zie PDR-004 voor een uitgewerkt voorstel. Zonder standaardisatie ontstaat fragmentatie: elke CLI-tool hanteert eigen conventies.
