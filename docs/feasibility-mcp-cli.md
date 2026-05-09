# Feasibility-onderzoek: MCP en CLI als koppellaag voor de Digitale Assistent

| Veld | Waarde |
|---|---|
| Status | Definitief (eerste versie) |
| Datum | 9 mei 2026 |
| Auteur | Projectteam poc-moza |
| Scope | `services/` in poc-moza; verwijzingen naar `moza-mcp-standaard-poc` |
| Bijbehorende beslissing | [PDR-006](../services/decisions/PDR-006-feasibility-conclusie.md) |

## Hoe dit document te lezen

Dit rapport is gelaagd:

1. **Samenvatting voor stakeholders** — één pagina, zonder code.
2. **Voor het team** — wat we hebben gebouwd, wat werkt, wat niet, en de vier vergelijkingsdimensies.
3. **Bijlagen** — meetdata, validator-output, opruim-kandidaten, voorstel voor de standaard, wetenschappelijke onderbouwing.

Wie alleen de aanbevelingen wil, leest deel 1 en de eerste alinea van deel 2.

---

# Deel 1 — Samenvatting voor stakeholders

## Wat is gebouwd

In poc-moza is een Digitale Assistent toegevoegd waarmee een ondernemer in natuurlijke taal kan vragen naar regelgeving, subsidies en eigen bedrijfsgegevens. Onder de motorkap raadpleegt de assistent vier overheidsbronnen: **KvK** (Handelsregister), **KOOP** (wetten.overheid.nl), **RegelRecht** (beslislogica Informatieplicht Energiebesparing) en **RVO** (subsidies en rapportages).

Wij hebben twee koppelmechanismen naast elkaar geïmplementeerd om te kunnen vergelijken:

- **MCP** — Model Context Protocol: een door Anthropic geïntroduceerde, sinds 2024 in opkomst zijnde open standaard. Permanente Python-processen die tools en resources publiceren via JSON-RPC.
- **CLI** — klassieke Bash-scripts (`kvk-cli`, `koop-cli`, `regelrecht-cli`, `rvo-cli`) die per aanroep starten en stoppen.

Beide spreken dezelfde externe API's aan. Het LLM (Claude of VLAM) ziet identieke tool-namen.

## Belangrijkste bevindingen

1. **MCP en CLI zijn beide werkbaar.** De vier MCP-servers passeren 7 t/m 11 van de standaard-checks zonder fouten; de CLI-tools dekken dezelfde bronnen met minder code en zonder permanente processen.
2. **De waarde zit in de gedeelde standaard, niet in het transport.** Provenance, audit logging en mutatie-bevestiging zijn de echte vereisten. Beide transporten kunnen daaraan voldoen — als de standaard het transport-agnostisch maakt.
3. **Twee gaten in het bewijs**:
   - De resource-functionaliteit van de KvK- en KOOP-server werkt niet meer met de actuele MCP-bibliotheek. Dit is een implementatie-bug die met één commit te repareren is, maar het laat zien dat de validator te summier is om dit zelf aan te tonen.
   - De LLM benut via CLI nooit de `--fields`-optie, waardoor de geadverteerde 97% tokenreductie in de praktijk niet wordt gehaald.
4. **De repo bevat oude rommel** (een lege `mcp/`-map met verouderde verwijzingen, twee ongeldig verklaarde PDRs, een misleidend genoemde PDR-004) die voor nieuwkomers verwarrend is.
5. **De overheidsstandaard dekt nu alleen MCP.** Een CLI-profiel is voorbereid in PDR-004 maar nog niet doorgevoerd in `moza-mcp-standaard-poc`.
6. **AI Act-classificatie is nog niet uitgevoerd.** De assistent doet meer dan alleen informeren (RVO-rapportage indienen is een muterende handeling); een formele classificatie en risico-impactanalyse ontbreken nog.

## Aanbevelingen

| # | Wat | Prioriteit |
|---|---|---|
| 1 | Repareer de KvK- en KOOP-resource-bug (return type aanpassen aan `mcp.types.ReadResourceContents`) | hoog — anders is een feature stuk |
| 2 | Voer een AI Act-classificatie en IAMA/DPIA uit voor de assistent (zie deel 2.5) | hoog — wettelijk traject loopt |
| 3 | Breid de overheidsstandaard uit met een CLI-profiel; trek field-level filtering, exit-codes en provenance-flag mee | hoog — voorkomt fragmentatie |
| 4 | Laat het host-orkestratielaag `--fields` doorgeven aan de CLI-tools, anders blijft de tokenwinst theoretisch | middel |
| 5 | Verbreed de validator: functionele provenance-check, mutatie-bevestiging-check, schemavalidatie van inputs | middel |
| 6 | Repo-hygiëne uitgevoerd in dezelfde PR (`mcp/`-map weg, oude PDR-namen rechtgezet, `services/decisions/README.md` toegevoegd, `.gitignore` opgeschoond) | laag — afgerond |
| 7 | Kies één transport voor productie; behoud beide alleen tijdens onderzoeksfase | laag — nu nog te vroeg |

---

# Deel 2 — Voor het team

## 2.1 Architectuur in één plaatje

```
                  Browser (moza-portaal)
                         │  /chat
                         ▼
            ┌──────────────────────────────┐
            │  Host (FastAPI, services/host)│
            │  ─────────────────────────── │
            │  vlam_host.py: agentic loop  │
            │  · Claude (Anthropic SDK)    │
            │  · VLAM   (OpenAI-compat.)   │
            └──────┬───────────────────┬───┘
                   │ MCP (stdio)       │ CLI (subprocess)
        ┌──────────┴──────────┐  ┌─────┴──────────────┐
        │                     │  │                    │
   kvk koop regelrecht rvo    │  kvk-cli koop-cli rr-cli rvo-cli
   (Python, persistent)       │  (Bash, on-demand)
        │                        │
        └──────────────┬─────────┘
                       ▼
          api.kvk.nl · wetten.overheid.nl
          poc-machine-law · RVO mock
```

Eén host, één LLM-orchestratie, twee transportlagen. Volledige stroom-diagrammen staan in [services/README.md](../services/README.md).

## 2.2 Wat werkt

- **Identieke tool-interface**: het LLM ziet `kvk__mijn_bedrijf`, `koop__zoek_regelgeving`, `regelrecht__check`, `rvo__zoek_regeling`, `rvo__indienen` — ongeacht of MCP of CLI eronder hangt.
- **Compliance basisniveau** (zie [Bijlage A](#bijlage-a--validator-runs)): alle vier MCP-servers slagen voor metadata, beschrijvingen, inputschema's en alle drie de `ToolAnnotations` (`readOnlyHint`, `destructiveHint`, `openWorldHint`).
- **Provenance** wordt structureel toegevoegd door zowel MCP-servers (`_wrap_provenance`) als CLI-tools (`--provenance`).
- **Audit logging** zit in de servers (`_audit_log`) en CLI-libs (`lib/audit.sh`).
- **Mutatie-bescherming**: `rvo__indienen` is correct gemarkeerd (`readOnlyHint=False`); de CLI vereist `--confirm`.
- **VLAM tool-calling is stabiel** sinds april 2026 (zie ongeldig verklaarde PDR-002 en PDR-003); workarounds zijn opgeruimd.

## 2.3 Wat ontbreekt of verwart

### A. Bug in de KvK- en KOOP-resource-implementatie (opgelost in deze PR)

De `read_resource`-handler in `services/mcp/kvk/server.py` (en idem koop) retourneerde `list[TextResourceContents]`. De huidige `mcp`-bibliotheek (1.26.0) verwacht echter `Iterable[ReadResourceContents]` — een ander type. Het gevolg was een `McpError: 'TextResourceContents' object has no attribute 'content'` zodra een client de resource probeerde te lezen. Wij hebben dit gereproduceerd door direct een MCP-client tegen de KvK-server te draaien.

Niet zichtbaar in de oorspronkelijke tests omdat (a) de validator de fout ving als een ERROR maar niet als FAIL, en (b) de production-code het resource-pad in `vlam_host.py` niet gebruikt — alleen het tool-pad (`mijn_bedrijf` is een tool, niet een resource).

**Fix uitgevoerd**: in beide servers vervangen door `ReadResourceContents(content=…, mime_type=…)` uit `mcp.server.lowlevel.helper_types`. Validator-runs met `--test-uri` retourneren nu `[PASS] Provenance metadata complete` voor zowel KvK (`kvk://basisprofiel/68750110`) als KOOP (`koop://regeling/BWBR0001840`). Eindstand: 8/9 met 0 gefaald.

### B. Synchronisatie tussen host en CLI is niet automatisch

`cli_executor.py` heeft handmatig opgeschreven welke commando's bij welke tool horen. Drie problemen, twee opgelost in deze PR:

1. **CLI's bieden meer dan de host doorgeeft** (opgelost in deze PR). `kvk-cli vestigingen` en `kvk-cli eigenaar` zijn nu toegankelijk als tools `kvk__vestigingen` en `kvk__eigenaar`. `koop-cli regeling get <bwb_id>` heeft een tool-equivalent gekregen: `koop__lees_regeling`. De drie nieuwe tools zijn ook MCP-zijdig toegevoegd in `services/mcp/kvk/server.py` en `services/mcp/koop/server.py` met provenance, audit-logging en `ToolAnnotations`. Validator-resultaten: KvK 18/19 PASS, KOOP 13/14 PASS. Het routerings-blok `tool_usage.md` is bijgewerkt zodat het LLM weet wanneer welke tool van toepassing is.
2. **`--fields` wordt nooit doorgegeven** (opgelost in deze PR). Elke read-only tool in `CLI_TOOL_DEFINITIONS_ANTHROPIC` heeft nu een optionele `fields`-array; `cli_executor.py` vertaalt die naar `--fields v1,v2,...`. Verificatie: `kvk__mijn_bedrijf` met `fields=["naam","kvkNummer"]` retourneert nu 234 bytes (versus 3378 zonder fields) — een **93% reductie inclusief provenance** in de live host. Muterende tool `rvo__indienen` krijgt geen fields-parameter (response is klein en functioneel).
3. **Tool-definities blijven dubbel gedeclareerd** (open). `CLI_TOOL_DEFINITIONS_ANTHROPIC` (in `vlam_host.py`) en het feitelijke commando in `cli_executor.py` moeten met de hand synchroon worden gehouden. MCP doet dit automatisch via `ListToolsRequest`. Echte oplossing zit in het CLI-profiel van de standaard ([Bijlage E](#bijlage-e--voorgestelde-uitbreiding-overheidsstandaard), §8.3.2: `--help --json` als single source of truth), niet in een lokale ad-hoc deduplicatie.

### C. De validator is summier

Het pakket `mcp_standaard` checkt drie zaken: aanwezigheid van metadata, `ToolAnnotations`, en publicatie van resources. Wat ontbreekt:

- **Functionele provenance-check werkt niet end-to-end** door de bug in punt A; de check rapporteert ERROR maar geen FAIL. Een gebruiker die alleen op exit-code let, ziet geen probleem.
- **Geen check op idempotentie** voor muterende tools (standaard §4.2 schrijft dit voor).
- **Geen check op `idempotencyKey`-veld** (standaard §4.2: `ZOUDEN MOETEN`).
- **Geen check op input-schemavalidatie** (standaard §3.2: server-verantwoordelijkheid).
- **Geen CLI-checks** — terwijl PDR-004 ze al heeft uitgewerkt.

### D. Verwarrende bestanden in de repo

Vóór deze PR zag een nieuwkomer bovenaan `mcp/` (alleen een README met verouderde paden) náást `services/` (de echte implementatie). Twee PDRs waren als ongeldig gemarkeerd maar stonden ongedifferentieerd tussen de geldige; PDR-004 heette `structuur.md` maar bevatte een prompt voor het uitbreiden van de standaard. In deze PR is de `mcp/`-map verwijderd, PDR-004 hernoemd naar een sprekende naam, een index-README in `services/decisions/` toegevoegd, testvragen verplaatst naar `services/test-vragen.md`, en `.gitignore` opgeschoond. Zie de commit-historie van deze PR voor het volledige overzicht.

### E. AI Act-classificatie is nog niet uitgevoerd

De Digitale Assistent verwerkt persoons- en bedrijfsgegevens, geeft inhoudelijk advies over regelgeving en kan namens de gebruiker een rapportage indienen bij RVO. Wij hebben nog géén formele classificatie tegen de AI Act-categorieën gedaan. Op basis van een eerste lezing schatten wij dat:

- **De informatie-functie** (KOOP, KvK opvragen, regelgeving uitleggen) valt waarschijnlijk in de categorie *beperkt risico* met transparantieverplichting (Art. 50 AI Act): de gebruiker moet weten dat met een AI-systeem wordt geïnteracteerd.
- **De RVO-indien-functie** kan, afhankelijk van interpretatie, in *hoog risico* vallen wanneer de uitkomst directe juridische gevolgen voor de ondernemer heeft (toegang tot subsidie, voldoen aan wettelijke informatieplicht). Dat zou een conformiteitsbeoordeling, register-inschrijving en aanvullende documentatie vereisen.
- **De RegelRecht-toetsing** (Informatieplicht Energiebesparing) is een geautomatiseerde juridische beoordeling — afhankelijk van de uitvoering ofwel ondersteunend (laag) ofwel determinerend (hoog).

**Vervolgstappen**: laat een AI Act-classificatie + IAMA + DPIA uitvoeren (zie [NeRDS-richtlijn algoritmen](https://nerds.developer.overheid.nl)) vóór de assistent breder dan een gesloten testgroep wordt aangeboden. Documenteer per tool of die als ondersteunend (mens-in-de-loop) of determinerend (geautomatiseerd besluit) is bedoeld.

## 2.4 Vergelijking op de vier dimensies

### Eenvoud / begrijpbaarheid voor het team

| | MCP | CLI |
|---|---|---|
| Talen die je moet kennen | Python, MCP-SDK, asyncio, JSON-RPC | Bash, `curl`, `jq` |
| Stappen voor "Hello World" | `pip install mcp` + handler-decorators | tekstbestand, chmod +x |
| Waar vind je een fout? | server-log + client-log + JSON-RPC frame | exit-code + stderr |
| Lokale debug | proces moet draaien om aan te roepen | direct vanaf shell aanroepbaar |
| Kennis bij ontwerpers/onderzoekers | beperkt | bash-basics is wijdverbreid |

**Indruk**: voor het huidige team (designers + ontwikkelaars met front-end- en Python-achtergrond) is CLI laagdrempeliger om bij te dragen, MCP makkelijker om uit te breiden zonder uniformiteit te verliezen.

### Toekomstbestendigheid / hergebruik

MCP wint hier gemakkelijk:

- **Industrie-standaard sinds 2024** (Anthropic, OpenAI, Google ondersteunen het). Recente academische benchmarks (MCPAgentBench, MCPVerse, eind 2025/begin 2026) noemen MCP "the future trend" voor agentic tool use [1, 2].
- **Servers zijn herbruikbaar** door andere overheidsorganisaties zonder dat ze onze host hoeven over te nemen — een formele eis uit de standaard (§2.1, "Herbruikbaarheid").
- **Schema-driven discovery** voorkomt dat tool-definities handmatig moeten worden gesynchroniseerd; één bron van waarheid.

CLI heeft hier een nadeel: zonder gestandaardiseerd CLI-profiel ontstaat fragmentatie (elke organisatie hanteert eigen flag-conventies). Dat is precies wat PDR-004 wil oplossen.

### Token-efficiëntie en operationele kosten

| Aspect | MCP | CLI |
|---|---|---|
| Geheugen in rust (4 servers) | ~80 MB (4× ~20 MB) | 0 MB |
| Geheugen per aanroep | bestaande server | ~5 MB nieuw proces |
| Opstart-overhead per tool-call | ~0 ms | ~50–150 ms (bash + curl) |
| Volledige response (KvK basisprofiel) | 2126 bytes (~531 tok) | 2126 bytes (~531 tok) |
| Met `--fields naam,kvkNummer` | n.v.t. | 58 bytes (~14 tok) — 97% reductie |
| Met `--fields naam,kvkNummer --provenance` | n.v.t. | 237 bytes (~59 tok) — 89% reductie |

Voor de meting zie [Bijlage B](#bijlage-b--token-metingen). De 97%-reductie is **alleen haalbaar als de aanroeper expliciet om velden vraagt**. In onze huidige host doet het LLM dat niet en geeft `cli_executor.py` `--fields` ook nooit door — dus de winst is theoretisch tot we dit oplossen.

Dit raakt twee actuele onderzoeken: (a) MCPVerse (2025) toonde dat agent-runs zonder dataminimalisatie tot ~147k tokens per taak oplopen, wat de inzet van kleine modellen blokkeert [2]; (b) AgentProp-Bench (2026) wijst op cascading failures bij grote tool-responses, waar irrelevante velden hallucinaties uitlokken [3]. Beide pleiten voor field-level filtering als capability — niet als CLI-eigenaardigheid.

### Compliance en veiligheid

Beide kunnen voldoen aan provenance, audit en mutatie-bevestiging zoals de standaard voorschrijft (zie deel 2.2). De standaard zelf moet alleen worden uitgebreid om CLI als gelijkwaardig profiel te erkennen.

Recent veiligheidsonderzoek (2026) op MCP wijst tool poisoning aan als de meest kritieke aanvalsvector: kwaadaardige tool-beschrijvingen in metadata kunnen een LLM sturen [4, 5, 6]. Vier mitigaties uit dat onderzoek zijn relevant voor onze standaard:

1. **Statische validatie van tool-metadata** vóór registratie (vergelijkbaar met Forum Standaardisatie's pas-toe-of-leg-uit).
2. **Gebruikerstransparantie**: laat zien welke tools actief zijn (al deels in onze admin panel).
3. **Behavioral anomaly detection** op de host — niet in scope voor poc-moza, wel voor productie.
4. **Sandboxing** — de huidige Docker-setup biedt dit al per server.

CLI heeft hier een eenvoudig voordeel: **geen permanent draaiend proces met credentials in het geheugen**. Bij MCP-servers ligt het API-key gedurende de hele sessie in een Python-proces; bij CLI alleen tijdens de aanroep.

## 2.5 AI Act, NeRDS, en validatiekader

De huidige inrichting voldoet al aan een aantal punten uit het Validatiekader van Algorithm Audit (gekoppeld in `moza-mcp-standaard-poc/docs/standaard.md` §1.3):

- **UI.3 / KZ.1 — bronvermelding**: provenance is structureel.
- **M.3 — interactie-logging**: audit-logging zit in alle servers.
- **D.5 — proportionaliteit**: Fase 1 (read-only KOOP, openbare data) is laag risico; de RVO-indiening (Fase 3) vraagt om DPIA en uitgebreidere guardrails.

**Wat ontbreekt** (samengevat uit deel 2.3.E):

- AI Act-classificatie per tool (ondersteunend vs. determinerend).
- IAMA / DPIA voor de muterende RVO-tool.
- Transparantie-melding aan de gebruiker (Art. 50 AI Act): "U interacteert met een AI-systeem".
- Logboek-Dataverwerkingen koppeling (NEN 7513 / NL GOV verwerkingen-logboek), zie [ls-logboek](https://logius.nl/standaarden).
- Menselijke escalatie-link bij elke twijfel (validatiekader UI.5).

---

# Bijlagen

## Bijlage A — Validator-runs

`mcp-standaard validate` op alle vier servers, `mcp-standaard` versie 0.1.0, `mcp` Python-bibliotheek 1.26.0, peildatum 9 mei 2026.

```text
Validatie kvk:        7/9 geslaagd, 0 gefaald, 2 overgeslagen
Validatie koop:       7/9 geslaagd, 0 gefaald, 2 overgeslagen   (na uv run --with httpx --with lxml)
Validatie regelrecht: 5/7 geslaagd, 0 gefaald, 2 overgeslagen
Validatie rvo:       11/13 geslaagd, 0 gefaald, 2 overgeslagen
```

De "overgeslagen" zijn:

- `Resources present` — wij gebruiken alleen resource-templates, geen vaste resources. Dit is geldig.
- `Functional provenance check` — slaat over als geen `--test-uri` is meegegeven; bij KvK met `--test-uri kvk://basisprofiel/68750110` resulteert dit in een ERROR door de bug in deel 2.3.A.

**Notitie 1 — venv-issue**: KOOP en RVO hebben dependencies (`httpx`, `lxml`) die niet in het venv van de validator zitten. Bij een naïeve aanroep (`mcp-standaard validate python …koop/server.py`) crasht de server bij start met "Connection closed". Workaround: `uv run --with httpx --with lxml mcp-standaard …`. **Verbetering voor de standaard**: documenteer hoe te valideren tegen een server met eigen dependencies; eventueel een `--server-venv` of `--exec-prefix`-optie.

**Notitie 2 — bug-detectie**: de KvK-resource-bug is alleen zichtbaar als je `--test-uri` meegeeft. De default-run ziet hem niet. Wij raden aan om de standaard-validatierun altijd minstens één representatieve resource-URI op te nemen.

## Bijlage B — Token-metingen

Identieke vraag: bedrijfsgegevens van Test BV Donald (KvK 68750110), via `kvk-cli`. Tokens zijn een schatting (4 bytes ≈ 1 token).

| Methode | Bytes | Tokens (≈) | Reductie t.o.v. volledige response |
|---|---|---|---|
| Volledige API-response (≈ MCP) | 2126 | 531 | — |
| `kvk-cli … --fields naam,kvkNummer` | 58 | 14 | 97% |
| `kvk-cli … --fields naam,kvkNummer --provenance` | 237 | 59 | 89% |
| `kvk-cli … --provenance` (zonder `--fields`) | 3381 | 845 | -59% (groter, want pretty-printed + provenance) |

Rauwe outputs zijn opgeslagen in `/tmp/kvk-fields.json` en `/tmp/kvk-min.json` tijdens de test.

**Belangrijk**: de huidige host-implementatie geeft `--fields` nooit door aan CLI-tools (zie deel 2.3.B). De winst is dus pas reëel als wij dit doorvoeren — bijvoorbeeld door het LLM expliciet om velden te laten vragen, of door een vast veld-budget per tool te definiëren.

## Bijlage C — Sync-gaten host ↔ CLI

Geanalyseerd in `services/host/cli_executor.py` versus de werkelijke CLI-tools.

| Tool / commando | Ondersteund door CLI | Bereikbaar via host | Opmerking |
|---|---|---|---|
| `kvk-cli basisprofiel get` | ja | ja | mapped naar `kvk__mijn_bedrijf` |
| `kvk-cli basisprofiel vestigingen` | ja | ja | mapped naar `kvk__vestigingen` (toegevoegd in deze PR) |
| `kvk-cli basisprofiel eigenaar` | ja | ja | mapped naar `kvk__eigenaar` (toegevoegd) |
| `koop-cli regeling zoek` | ja | ja | mapped naar `koop__zoek_regelgeving` |
| `koop-cli regeling get <bwb_id>` | ja | ja | mapped naar `koop__lees_regeling` (toegevoegd, MCP-zijdig ook) |
| `regelrecht-cli check` | ja | ja | volledig |
| `rvo-cli regeling zoek` | ja | ja | volledig |
| `rvo-cli rapportage indienen` | ja | ja | volledig (incl. `--confirm`) |
| `--fields` op alle read-only cli's | ja | ja | host geeft `fields=[…]` door (opgelost in deze PR) |
| `--select` (jq-expressie) | ja | **nooit gebruikt** | bewust niet doorgezet — zou willekeurige jq-expressie van het LLM aan een subprocess overhandigen, te onveilig zonder verdere validatie |

De "MCP en CLI doen hetzelfde voor het LLM"-belofte klopt nu voor de leesoperaties. Voor `--select` blijft een functioneel verschil bestaan; dat is bewust gelaten omdat het een execution-vector zou worden voor LLM-gegenereerde jq-expressies zonder review.

## Bijlage D — Wetenschappelijke onderbouwing

Voor de claims over MCP als opkomende standaard, tool-poisoning als kritieke aanvalsvector, en field-filtering als noodzaak voor schaalbare agents:

1. **MCPAgentBench** — Yi e.a., *MCPAgentBench: A Real-world Task Benchmark for Evaluating LLM Agent MCP Tool Use*, arXiv:2512.24565 (december 2025). Stelt MCP-tool-use in een realistische sandbox; concludeert dat MCP "considered a future trend" is voor agentic tool use.
2. **MCPVerse** — *MCPVerse: An Expansive, Real-World Benchmark for Agentic Tool Use*, arXiv:2508.16260 (augustus 2025). Toont dat een Max-Scale agent-run ~147k tokens kost; alleen toonaangevende modellen (Claude-4-Sonnet, Gemini-2.5-Pro) kunnen dit nog aan. Onderbouwt de noodzaak van dataminimalisatie.
3. **AgentProp-Bench** — *Evaluating Tool-Using Language Agents: Judge Reliability, Propagation Cascades, and Runtime Mitigation*, arXiv:2604.16706 (2026). Laat zien dat kleine fouten (mistyped parameter, ignored tool error) door de keten cascaderen — wat dataminimalisatie en strikte schemavalidatie belangrijker maakt.
4. **MCP Threat Modeling** — Huang e.a., *Model Context Protocol Threat Modeling and Analyzing Vulnerabilities to Prompt Injection with Tool Poisoning*, arXiv:2603.22489 (maart 2026), gepubliceerd in *Journal of Cybersecurity and Privacy* 6(3) (mei 2026). Identificeert tool poisoning als belangrijkste aanvalsvector; STRIDE/DREAD-analyse over zes MCP-componenten.
5. **MCP Security Risks & Controls** — *Securing the Model Context Protocol (MCP): Risks, Controls, and Governance*, arXiv:2511.20920. Pleit voor per-user authenticatie, provenance-tracking, sandboxing en gateway-laag.
6. **Enterprise-grade MCP Security** — arXiv:2504.08623, MAESTRO-framework toegepast op MCP. Zeven-laags threat model.
7. **AI Audit Tooling** — Ojewale e.a., *Towards AI Accountability Infrastructure: Gaps and Opportunities in AI Audit Tooling*, arXiv:2402.17861 (geüpdatet 2024). Pleit voor "inspectability API" en gestandaardiseerde provenance — overlap met onze §4.1.
8. **Auditable Clinical AI Framework** — *An auditable and source-verified framework for clinical AI decision support*, PMC12913532 (2025). Maakt provenance een first-class control, koppelt aan FDA / EU AI Act.
9. **GAO AI Accountability Framework** — GAO-21-519SP (2021). Vier pijlers: governance, data, performance, monitoring. Bron voor het Amerikaanse equivalent van onze IAMA.

Aanvullende standaarden die wij volgen of willen aansluiten op:

- **NIST AI RMF 1.0** (Govern/Map/Measure/Manage).
- **ISO/IEC 42001** (AI management system).
- **NEN 7513** (logging-eisen) — koppelvlak met ls-logboek.

## Bijlage E — Voorgestelde uitbreiding overheidsstandaard

Zie [`docs/feasibility-mcp-cli-standaard-voorstel.md`](feasibility-mcp-cli-standaard-voorstel.md). Bevat de tekstuele toevoegingen aan `moza-mcp-standaard-poc/docs/standaard.md` en de nieuwe checks voor het validatie-pakket.
