# Prompt: Breid de MCP-standaard uit met een CLI-profiel

Gebruik deze prompt in de repo `moza-mcp-standaard-poc` met Claude Code.

---

## Context

We hebben in de poc-moza repo (https://github.com/user/poc-moza, branch feat/add_digitale_assistent) een vergelijkend onderzoek gedaan tussen MCP en CLI als interface tussen AI-agents en overheidsdiensten. De bevindingen:

### Bevindingen: MCP-protocol (zonder standaard) vs CLI

| Criterium | MCP (protocol) | CLI | Winnaar |
|---|---|---|---|
| Token-efficiëntie | Volledige response, geen filtering | ~14 tokens met `--fields` (97% reductie) | CLI |
| Dataminimalisatie | Niet in protocol | Ingebouwd via `--fields`, `--select` | CLI |
| Provenance | Niet in protocol | Niet standaard | Gelijk |
| Audit logging | Niet in protocol | Niet standaard | Gelijk |
| Tool discovery | Automatisch via schema | Expliciet via `--help` | MCP |
| Mutatie-beveiliging | `ToolAnnotations` (optioneel) | Zelf implementeren | MCP |
| Foutafhandeling | Gestructureerde error types | Exit codes + stderr | MCP |
| Infra-kosten | Server-proces moet draaien | Geen server, alleen bij aanroep | CLI |
| Protocol-overhead | JSON-RPC + handshake + capability negotiation | Directe HTTP call | CLI |
| Dependencies | Python, mcp-pakket, asyncio | bash, curl, jq (overal aanwezig) | CLI |
| Geheugengebruik | Continu in geheugen | Tijdelijk bij aanroep | CLI |
| Onderhoudslast | MCP-library updates | POSIX — stabiel | CLI |
| Aanvalsvlak | Extra proces met credentials | Credentials alleen bij aanroep | CLI |
| Composability | Chaining via LLM-iteraties | Unix piping zonder LLM | CLI |
| Adoptiedrempel | MCP-kennis nodig | Bash-kennis voldoende | CLI |

**Score: CLI 10, MCP 3, Gelijk 2**

### Bevindingen: MCP + standaard vs CLI + standaard

Wanneer beide een overheidsstandaard krijgen (provenance, audit, discovery, mutatie-beveiliging) verschuift de balans:

| Criterium | MCP + standaard | CLI + standaard | Winnaar |
|---|---|---|---|
| Token-efficiëntie | ~14 tokens (met field filtering) | ~14 tokens | Gelijk |
| Dataminimalisatie | Capability in standaard | Ingebouwd | Gelijk |
| Provenance | Verplicht | Verplicht | Gelijk |
| Audit logging | Verplicht | Verplicht | Gelijk |
| Tool discovery | Automatisch via schema | Gestandaardiseerd via `--help --json` | Gelijk |
| Mutatie-beveiliging | ToolAnnotations | Gestandaardiseerde flags | Gelijk |
| Foutafhandeling | Gestructureerde error types | Gestandaardiseerde exit codes + JSON | Gelijk |
| Infra-kosten | Server moet draaien | Geen server | CLI |
| Protocol-overhead | JSON-RPC + handshake | Directe HTTP call | CLI |
| Dependencies | Python, mcp-pakket | bash, curl, jq | CLI |
| Geheugengebruik | Continu in geheugen | Tijdelijk bij aanroep | CLI |
| Onderhoudslast | MCP-library updates | POSIX — stabiel | CLI |
| Aanvalsvlak | Extra proces met credentials | Credentials bij aanroep | CLI |
| Composability | Chaining via LLM | Unix piping zonder LLM | CLI |

**Score: CLI 6, Gelijk 8, MCP 0**

### Kerninzicht

De waarde zit in de standaard, niet in het transport. MCP is geschikt voor omgevingen zonder shell (managed AI-platforms). CLI is zuiniger voor omgevingen met shell (servers, Docker, lokale agents). De standaard moet beide ondersteunen.

### Bewijs: kvk-cli

We hebben een kvk-cli gebouwd (Bash + jq) die dezelfde KvK API aanspreekt als de bestaande MCP-server. Resultaten:

| Methode | Bytes | Tokens (geschat) | Reductie |
|---|---|---|---|
| MCP (volledige response) | 2126 | ~531 | — |
| CLI --fields naam,kvkNummer | 58 | ~14 | 97% |
| CLI --fields sbiActiviteiten | 156 | ~39 | 93% |
| CLI + provenance | 237 | ~59 | 89% |

### Referentie-implementatie

De CLI-tools staan in `poc-moza/services/cli/`:
```
services/
├── host/          ← orchestratie (transport-agnostisch)
├── mcp/           ← MCP-servers (kvk, koop, regelrecht, rvo)
├── cli/           ← CLI-tools (kvk, koop, regelrecht, rvo)
│   ├── kvk-cli
│   ├── koop-cli
│   ├── regelrecht-cli
│   ├── rvo-cli
│   └── lib/       ← gedeelde modules (output, provenance, audit)
└── decisions/     ← architectuurbeslissingen
```

---

## Opdracht

Breid de MCP-standaard uit met ondersteuning voor CLI als derde deployment-profiel. De standaard heeft nu twee lagen:

- **Laag 1 (§2-7)**: Host-agnostisch — servereisen die voor alle implementaties gelden
- **Laag 2 (§8)**: Deploymentprofielen — VLAM-profiel (on-premise) en Cloud-profiel (managed)

### Wat moet er gebeuren

#### 1. Standaard-document (`docs/standaard.md`)

**§4 — MCP Capabilities**: Voeg field-level filtering toe als optionele capability. Servers MOGEN een `fields`-parameter ondersteunen in tool- en resource-aanroepen waarmee de client specificeert welke velden worden geretourneerd. Dit vermindert token-gebruik en bevordert dataminimalisatie (§7).

**§7 — Servereisen**: Voeg een eis toe:
- Dataminimalisatie: Servers MOETEN field-level filtering ondersteunen via een `fields`-parameter. Response bevat alleen de gevraagde velden plus verplichte provenance-metadata.

**§8 — Deploymentprofielen**: Voeg §8.3 toe: CLI-profiel. Structureer het analoog aan §8.1 (VLAM) en §8.2 (Cloud):

- **Transport**: Shell subprocess (stdin/stdout), geen persistent server-proces
- **Serverdiscovery**: Via `<cli-naam> --help --json` dat een JSON-schema retourneert conform het MCP tool-schema formaat (naam, beschrijving, inputSchema, ToolAnnotations)
- **Provenance**: MOET beschikbaar zijn via `--provenance` flag. Response bevat dan `provenance`-object conform §4.1
- **Audit logging**: MOET loggen naar stderr (standaard) of configureerbaar bestand. Formaat conform §7 logging-eisen
- **Foutafhandeling**: Gestandaardiseerde exit codes (0=succes, 1=client-fout, 2=server-fout, 3=bron-onbeschikbaar) + JSON error object op stderr
- **Mutatie-beveiliging**: Muterende commando's MOETEN `--dry-run` ondersteunen (preview) en MOETEN interactieve bevestiging vragen tenzij `--confirm` is meegegeven
- **Dataminimalisatie**: `--fields` parameter voor field-level filtering. `--select` voor jq-expressies (optioneel)
- **Output**: `--output raw|pretty|table` voor verschillende consumers (agent vs mens)
- **Authenticatie**: Via omgevingsvariabelen of config-bestand, niet als CLI-argument (voorkom credentials in process listing)

#### 2. Technische specificaties (`docs/technische-specificaties.md`)

Voeg een sectie toe voor CLI-profiel specificaties:

- **Command-structuur**: `<cli-naam> [opties] <resource> <actie> [id] [--param waarde]`
- **Discovery-formaat**: JSON-schema dat `--help --json` retourneert, inclusief ToolAnnotations-equivalent
- **Exit codes**: Tabel met gestandaardiseerde codes
- **Stderr-formaat**: JSON error objects met dezelfde error codes als MCP (CONSENT_MISSING, SOURCE_UNAVAILABLE, etc.)
- **Provenance-formaat**: Zelfde structuur als MCP provenance, als wrapper om de data

#### 3. Validatie-pakket uitbreiden (`src/mcp_standaard/`)

Voeg CLI-validatie checks toe naast de bestaande MCP-checks:

- `CLI-DISC`: `--help --json` retourneert geldig discovery-schema
- `CLI-FIELDS`: `--fields` parameter werkt en retourneert alleen gevraagde velden
- `CLI-PROV`: `--provenance` flag voegt correct provenance-object toe
- `CLI-AUDIT`: Audit logging naar stderr conform standaardformaat
- `CLI-ERR`: Exit codes en stderr JSON conform specificatie
- `CLI-DRY`: Muterende commando's ondersteunen `--dry-run`
- `CLI-AUTH`: Credentials niet zichtbaar in process listing

#### 4. Skill uitbreiden (`skills/`)

- Update `mcp-standaard/SKILL.md` met CLI-profiel in het overzicht
- Maak een nieuwe skill `cli-server-bouwen/SKILL.md` analoog aan `mcp-server-bouwen/SKILL.md`
- Update `mcp-validatie/SKILL.md` met de CLI-checks

#### 5. ADR toevoegen (`docs/adr/`)

Voeg `003-cli-als-deployment-profiel.md` toe:

- **Status**: Proposed
- **Context**: Onderzoek in poc-moza toonde aan dat CLI 97% token-reductie biedt t.o.v. MCP zonder field filtering. MCP voegt protocol-overhead toe (JSON-RPC, handshake, persistent proces) die niet altijd nodig is. Managed AI-platforms zonder shell-toegang hebben MCP nodig, maar omgevingen met shell-toegang zijn zuiniger met CLI.
- **Besluit**: CLI als derde deployment-profiel opnemen in Laag 2 van de standaard. Laag 1 servereisen (provenance, audit, dataminimalisatie) gelden ongewijzigd — het transport verschilt.
- **Gevolgen**: Standaard wordt transport-agnostisch. Bestaande MCP-servers hoeven niet te veranderen. CLI-profiel verlaagt adoptiedrempel. Validatie-pakket moet uitgebreid worden.

### Richtlijnen

- Lees EERST de volledige bestaande standaard (`docs/standaard.md`, `docs/technische-specificaties.md`) en de bestaande skills/checks voordat je wijzigingen maakt
- Behoud de bestaande structuur en schrijfstijl van het document
- Voeg toe, vervang niet — MCP en Cloud profielen blijven ongewijzigd
- Houd rekening met de NeRDS-richtlijnen: open standaarden (richtlijn 4), dataminimalisatie, en vermijd vendor lock-in (richtlijn 12)
- De standaard is in het Nederlands, schrijf in het Nederlands
- Status van nieuwe toevoegingen is "concept" (consistent met de rest)
- Voeg field-level filtering toe als capability in Laag 1, niet alleen in het CLI-profiel — MCP-servers profiteren hier ook van
