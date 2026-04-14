# Digitale Assistent

De Digitale Assistent biedt ondernemers hulp met regelgeving, subsidies en bedrijfsregistratie. Twee LLM-backends (VLAM en Claude) raadplegen overheidsbronnen via twee transportmechanismen: MCP en CLI. Beide zijn API-wrappers die dezelfde externe API's aanspreken — het verschil zit in hoe ze worden aangeroepen (zie [PDR-005](decisions/PDR-005-cli-vs-mcp-transport.md)).

Zie [Product Decision Records](decisions/) voor gemaakte keuzes in de opzet.
- [PDR-001](decisions/PDR-001-dual-llm-backend.md) — dual-backend keuze (VLAM + Claude)
- [PDR-005](decisions/PDR-005-cli-vs-mcp-transport.md) — CLI vs MCP als transport

## Architectuur

```
                     ┌──────────────────────────────────────────┐
  moza-portaal ─────▶│  host (poort 8000)                       │
  /chat endpoint     │  VLAM (Mistral) of Claude                │
                     │  + tools via MCP of CLI (instelbaar)      │
                     └──────┬───────┬───────┬───────┬───────────┘
                            │       │       │       │
                   MCP:  server   server  server  server  (Python, persistent)
                   CLI:  kvk-cli koop-cli rr-cli  rvo-cli (Bash, on-demand)
                            │       │       │       │
                            ▼       ▼       ▼       ▼
                          kvk.nl  koop    regelrecht rvo
                         (API)   (API)    (API)    (API)
```

| Bron | MCP-server | CLI-tool | Type | Externe API |
|---|---|---|---|---|
| KvK | Resource + Tool | `kvk-cli` | Bedrijfsgegevens (sessie-gebonden) | KvK Test API |
| KOOP | Resource + Tool | `koop-cli` | Regelingenbank | wetten.overheid.nl |
| RegelRecht | Tool (non-muterend) | `regelrecht-cli` | Beslislogica verplichtingen | poc-machine-law API |
| RVO | Tool (muterend) | `rvo-cli` | Subsidies en rapportages | RVO API (mock) |

De host werkt ook zonder MCP-servers of CLI-tools; de assistent antwoordt dan op basis van eigen kennis.

> **MCP vs CLI:** MCP-servers draaien als permanente processen en ondersteunen zowel tools als resources. CLI-tools zijn Bash-scripts die on-demand worden aangeroepen en alleen tools ondersteunen (geen resources). Zie [PDR-005](decisions/PDR-005-cli-vs-mcp-transport.md) voor een uitgebreide vergelijking.

> **KvK testomgeving:** De KvK-server haalt bedrijfsgegevens op via de KvK Test API (`api.kvk.nl/test/api/v1/basisprofielen`). Toegang is beperkt tot het bedrijf van de ingelogde gebruiker (demo: Test BV Donald, KvK 68750110). In productie wordt het KvK-nummer bepaald door de sessie-authenticatie.

## Routering: welke bron bij welke vraag?

Het LLM kiest op basis van de systeemprompt welke MCP-server wordt aangesproken. De routeringsregels zijn gedefinieerd in `host/prompts/blocks/shared/tool_usage.md` en volgen onderstaande beslisboom:

```mermaid
flowchart TD
    Start([Gebruikersvraag]) --> Q1{Vraagt naar eigen\nbedrijfsgegevens?}

    Q1 -- ja --> KVK_TOOL[/Tool: kvk__mijn_bedrijf/]
    Q1 -- nee --> Q5{Vraagt of een verplichting\nvan toepassing is?}

    Q5 -- ja --> KVK_TOOL
    KVK_TOOL --> Q5b{KvK-nummer\nverkregen}
    Q5b --> RR_TOOL[/Tool: regelrecht__check/]
    RR_TOOL --> Q5c{Wil gebruiker\nde wettekst lezen?}
    Q5c -- ja --> KOOP_RES[/Resource: koop://regeling/bwb_id/]
    Q5c -- nee --> Antwoord
    Q5 -- nee --> Q4{Vraagt naar een\nspecifieke wet of regel?}

    Q4 -- ja --> KOOP_TOOL[/Tool: koop__zoek_regelgeving/]
    KOOP_TOOL --> Q4b{Wil gebruiker\nde inhoud lezen?}
    Q4b -- ja --> KOOP_RES
    Q4b -- nee --> Antwoord
    Q4 -- nee --> Q3{Bevat een\nBWB-ID?}

    Q3 -- ja --> KOOP_RES
    Q3 -- nee --> Q6{Vraagt naar subsidies\nof rapportage?}

    Q6 -- ja --> Q6b{Wil indienen\nof alleen informatie?}
    Q6b -- informatie --> RVO_ZOEK[/Tool: rvo__zoek_regeling/]
    Q6b -- indienen --> Q6c{Gebruiker\nbevestigt?}
    Q6c -- ja --> RVO_IND[/Tool: rvo__indienen/]
    Q6c -- nee --> Antwoord
    Q6 -- nee --> Q7{Algemene vraag\nover regelgeving?}

    Q7 -- ja --> KOOP_TOOL
    Q7 -- nee --> EIGEN[Eigen kennis\n+ disclaimer]

    KOOP_RES --> Antwoord([Antwoord aan gebruiker])
    RVO_ZOEK --> Antwoord
    RVO_IND --> Antwoord
    EIGEN --> Antwoord

    style KVK_TOOL fill:#4A90D9,color:#fff
    style KOOP_RES fill:#48BB78,color:#fff
    style KOOP_TOOL fill:#4A90D9,color:#fff
    style RR_TOOL fill:#4A90D9,color:#fff
    style RVO_ZOEK fill:#4A90D9,color:#fff
    style RVO_IND fill:#ED8936,color:#fff
    style EIGEN fill:#A0AEC0,color:#fff
```

Legenda:
**groen** = Resource (read-only ophalen)
**blauw** = Tool (read-only zoeken/berekenen)
**oranje** = Tool (muterend, vereist bevestiging)
**grijs** = eigen kennis

Bij gecombineerde vragen geldt de volgorde: KvK (wie?) → RegelRecht (wat geldt er?) → KOOP (verdieping wettekst) → RVO (actie ondernemen).

## Voorbeeldscenario's

### Scenario 1: Eigen bedrijfsgegevens opvragen (KvK)

> Gebruiker: "Wat zijn mijn bedrijfsgegevens?"

```mermaid
sequenceDiagram
    actor Gebruiker
    participant Host as AI-platform (Host)
    participant KvK as MCP Server (KvK)

    Gebruiker->>Host: "Wat zijn mijn bedrijfsgegevens?"
    Note over Host: Routeringsregel: eigen gegevens<br/>→ kvk__mijn_bedrijf
    Host->>KvK: tools/call [mijn_bedrijf]
    Note over KvK: Sessie-gebonden:<br/>retourneert profiel van<br/>de ingelogde gebruiker
    KvK-->>Host: basisprofiel (KvK API-formaat) + provenance
    Host->>Gebruiker: "Uw bedrijf Test BV Donald (KvK 68750110)<br/>is een Besloten Vennootschap gevestigd<br/>in Lollum. SBI-code: 01241."
```

### Scenario 2: Regelgeving zoeken (KOOP)

> Gebruiker: "Welke regels gelden er voor energiebesparing?"

```mermaid
sequenceDiagram
    actor Gebruiker
    participant Host as AI-platform (Host)
    participant KOOP as MCP Server (KOOP)
    participant SRU as SRU zoekservice

    Gebruiker->>Host: "Welke regels gelden er voor energiebesparing?"
    Note over Host: Routeringsregel: vraag over regelgeving<br/>→ koop__zoek_regelgeving
    Host->>KOOP: tools/call [zoek_regelgeving, trefwoord="energiebesparing"]
    KOOP->>SRU: GET zoekservice.overheid.nl/sru/Search<br/>?x-connection=BWB&query=overheidbwb.titel any "energiebesparing"
    SRU-->>KOOP: XML met regelingen
    KOOP-->>Host: resultaten + provenance
    Host->>Gebruiker: "Er zijn 86 regelingen gevonden, waaronder..."

    Gebruiker->>Host: "Wat staat er in de Subsidieregeling energiebesparing?"
    Note over Host: Routeringsregel: BWB-ID bekend<br/>→ resource koop://regeling
    Host->>KOOP: resources/read [koop://regeling/BWBR0038472]
    KOOP->>SRU: SRU lookup → resolve naar XML-URL
    SRU-->>KOOP: locatie_toestand URL
    KOOP->>SRU: GET repository XML
    SRU-->>KOOP: volledige wettekst
    KOOP-->>Host: artikelen + provenance
    Host->>Gebruiker: "De regeling bevat X artikelen. Artikel 1 bepaalt..."
```

### Scenario 3: Gecombineerde vraag (KvK + RegelRecht)

> Gebruiker: "Moet mijn bedrijf voldoen aan de Informatieplicht Energiebesparing?"

```mermaid
sequenceDiagram
    actor Gebruiker
    participant Host as AI-platform (Host)
    participant KvK as MCP Server (KvK)
    participant RR as MCP Server (RegelRecht)
    participant Engine as RegelRecht Engine

    Gebruiker->>Host: "Moet mijn bedrijf voldoen aan de<br/>Informatieplicht Energiebesparing?"

    Note over Host: Stap 1: bedrijfsgegevens ophalen<br/>via sessie-gebonden KvK
    Host->>KvK: tools/call [mijn_bedrijf]
    KvK-->>Host: Test BV Donald, KvK 68750110,<br/>SBI 01241 + provenance

    Note over Host: Stap 2: verplichting checken<br/>met verkregen KvK-nummer
    Host->>RR: tools/call [check, kvk_nummer="68750110"]
    RR->>Engine: POST /mcp/rpc [execute_law,<br/>service=RVO, law=informatieplicht]
    Engine-->>RR: beslisboom-resultaat + wettelijke grondslag
    RR-->>Host: resultaat + provenance

    Host->>Gebruiker: "Op basis van art. 5.15d Bal: de informatieplicht<br/>is van toepassing als uw energieverbruik boven<br/>50.000 kWh of 25.000 m³ gas per jaar ligt.<br/>Wat is uw jaarlijks energieverbruik?"
```

### Scenario 4: Subsidie zoeken en rapportage indienen (RVO)

> Gebruiker: "Welke subsidies zijn er voor energiebesparing?"

```mermaid
sequenceDiagram
    actor Gebruiker
    participant Host as AI-platform (Host)
    participant KvK as MCP Server (KvK)
    participant RVO as MCP Server (RVO)

    Gebruiker->>Host: "Welke subsidies zijn er voor energiebesparing?"
    Note over Host: Routeringsregel: vraag over subsidies<br/>→ rvo__zoek_regeling
    Host->>RVO: tools/call [zoek_regeling, trefwoord="energiebesparing"]
    Note over RVO: Zoekt in mock-regelingen<br/>op naam en beschrijving
    RVO-->>Host: 3 resultaten (EBR-2026, EIA-2026, ISDE-2026) + provenance
    Host->>Gebruiker: "Er zijn 3 regelingen gevonden:<br/>1. Informatieplicht Energiebesparing (open, deadline 2027-12-01)<br/>2. Energie-investeringsaftrek EIA (open)<br/>3. Investeringssubsidie Duurzame Energie ISDE (open)"

    Gebruiker->>Host: "Ik wil mijn energiebesparingsrapportage indienen"
    Note over Host: Muterende actie →<br/>eerst bedrijfsgegevens ophalen,<br/>dan bevestiging vragen
    Host->>KvK: tools/call [mijn_bedrijf]
    KvK-->>Host: Test BV Donald, KvK 68750110 + provenance
    Host->>Gebruiker: "Ik kan de rapportage voor Test BV Donald (KvK 68750110)<br/>indienen bij regeling EBR-2026.<br/>Welke maatregelen heeft u genomen?"

    Gebruiker->>Host: "LED-verlichting en HR++ beglazing"
    Host->>Gebruiker: "Ter bevestiging: ik dien de volgende rapportage in:<br/>• Bedrijf: Test BV Donald (68750110)<br/>• Regeling: Informatieplicht Energiebesparing (EBR-2026)<br/>• Maatregelen: LED-verlichting, HR++ beglazing<br/>Wilt u doorgaan?"

    Gebruiker->>Host: "Ja"
    Host->>RVO: tools/call [indienen, kvk_nummer="68750110",<br/>regeling_id="EBR-2026",<br/>maatregelen=["LED-verlichting","HR++ beglazing"]]
    Note over RVO: Mock: simuleert succesvolle<br/>indiening en genereert<br/>referentienummer
    RVO-->>Host: status=INGEDIEND,<br/>ref=RVO-EBR-2026-68750110-001 + provenance
    Host->>Gebruiker: "Uw rapportage is succesvol ingediend.<br/>Referentienummer: RVO-EBR-2026-68750110-001.<br/>U ontvangt een bevestiging per e-mail.<br/>De voortgang is te volgen onder 'Lopende zaken'."
```

> **Let op:** De `indienen`-tool is muterend. Het AI-platform vraagt daarom *altijd* om expliciete bevestiging van de gebruiker voordat de tool wordt aangeroepen. Dit is afgedwongen via de `ToolAnnotations` (`readOnlyHint=False`) én de systeemprompt.

### Scenario 5: Bron niet beschikbaar

> Gebruiker: "Welke regels gelden voor voedselveiligheid?"

```mermaid
sequenceDiagram
    actor Gebruiker
    participant Host as AI-platform (Host)
    participant KOOP as MCP Server (KOOP)
    participant SRU as SRU zoekservice

    Gebruiker->>Host: "Welke regels gelden voor voedselveiligheid?"
    Host->>KOOP: tools/call [zoek_regelgeving, trefwoord="voedselveiligheid"]
    KOOP->>SRU: GET zoekservice.overheid.nl/sru/Search...
    SRU--xKOOP: timeout / 503
    KOOP-->>Host: error: SOURCE_UNAVAILABLE
    Host->>Gebruiker: "De KOOP Regelingenbank is op dit moment<br/>niet bereikbaar. U kunt het rechtstreeks<br/>proberen via wetten.overheid.nl."
```

## Snel starten

```bash
cd mcp/host
cp .env.example .env        # Vul API-keys in
pip install -r requirements.txt
python api.py               # Start host op poort 8000
```

Start daarna het moza-portaal (`npm run dev` in de root) en open de Digitale Assistent-pagina.

### Met MCP-servers (Docker)

```bash
cd mcp
docker compose up --build
```

## Configuratie (.env)

```bash
# Claude (Anthropic)
ANTHROPIC_API_KEY=sk-ant-...
CLAUDE_MODEL=claude-sonnet-4-...

# VLAM (UbiOps/Mistral)
VLAM_API_KEY=...
VLAM_BASE_URL=https://...
VLAM_MODEL_ID=...
```

Zonder VLAM-keys wordt alleen Claude beschikbaar.

## API

| Endpoint | Methode | Beschrijving |
|---|---|---|
| `/chat` | POST | Stuur bericht, ontvang antwoord. Body: `{ message, session_id?, mode? }` |
| `/health` | GET | Status van backends en MCP-servers |
| `/tools` | GET | Lijst van beschikbare MCP-tools |
| `/chat/{id}` | DELETE | Wis sessie |

## Mappenstructuur

```
services/
  README.md
  docker-compose.yml
  decisions/               Product Decision Records (PDR-001 t/m PDR-005)
  host/
    api.py                 FastAPI REST-server
    vlam_host.py           LLM-orchestrator (VLAM + Claude, MCP + CLI)
    mcp_client.py          MCP-server verbindingen
    cli_executor.py        CLI tool-aanroepen via subprocess
    config.py              Configuratie
    prompts/               Modulaire systeemprompts
      composer.py          Stelt blokken samen tot system prompt
      blocks/
        identity/          Per-model identiteit (vlam.md, claude.md)
        shared/            Gedeelde blokken (tone, format, guardrails, ...)
          domain/          Domeinkennis per onderwerp
        model_specific/    Fijnsturing per model
      examples/            Few-shot voorbeelden
    requirements.txt
    Dockerfile
    .env.example
  mcp/                     MCP-servers (Python, persistent)
    kvk/                   Resource + Tool — Bedrijfsgegevens (KvK Test API)
    koop/                  Resource + Tool — Regelingenbank
    regelrecht/            Tool — beslislogica
    rvo/                   Tool — subsidies en rapportages
  cli/                     CLI-tools (Bash, on-demand)
    kvk-cli                API-wrapper KvK
    koop-cli               API-wrapper KOOP
    regelrecht-cli         API-wrapper RegelRecht
    rvo-cli                API-wrapper RVO
    lib/                   Gedeelde modules (output, provenance, audit)
```
