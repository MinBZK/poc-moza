# MCP — Digitale Assistent met dual LLM-backend

MCP-laag van poc-moza. Biedt een digitale assistent die ondernemers helpt met regelgeving, subsidies en bedrijfsregistratie. Twee LLM-backends (VLAM en Claude) delen dezelfde MCP-tools.

Zie [Product Decisions Records](mcp/decisions) voor gemaakte keuzes in de opzet.
-  [PDR-001](decisions/PDR-001-dual-llm-backend.md) de achtergrond bij de dual-backend keuze.

## Architectuur

```
                     ┌──────────────────────────────────┐
  moza-portaal ─────▶│  host (poort 8000)                │
  /chat endpoint     │  VLAM (Mistral) of Claude         │
                     │  + MCP-tools (indien beschikbaar)  │
                     └──────┬───────┬───────┬───────┬────┘
                            │       │       │       │
                            ▼       ▼       ▼       ▼
                          kvk    koop   regelrecht  rvo
```

| Server | MCP-type | Bron |
|---|---|---|
| kvk | Resource | Handelsregister KvK (mock) |
| koop | Resource | KOOP Regelingenbank (productie-API) |
| regelrecht | Tool (non-muterend) | Beslislogica Informatieplicht |
| rvo | Tool (muterend) | RVO indienings-API (mock) |

De host werkt ook zonder MCP-servers — de assistent antwoordt dan op basis van eigen kennis.

## Routering: welke bron bij welke vraag?

Het LLM kiest op basis van de systeemprompt welke MCP-server wordt aangesproken. De routeringsregels zijn gedefinieerd in `host/prompts/blocks/shared/tool_usage.md` en volgen onderstaande beslisboom:

```mermaid
flowchart TD
    Start([Gebruikersvraag]) --> Q1{Bevat een\nKvK-nummer?}

    Q1 -- ja --> KVK_RES[/Resource: kvk://basisprofiel/nummer/]
    Q1 -- nee --> Q2{Bevat een\nbedrijfsnaam?}

    Q2 -- ja --> KVK_TOOL[/Tool: kvk__zoek_bedrijf/]
    KVK_TOOL --> Q2b{Wil gebruiker\nmeer details?}
    Q2b -- ja --> KVK_RES
    Q2b -- nee --> Antwoord
    Q2 -- nee --> Q3{Bevat een\nBWB-ID?}

    Q3 -- ja --> KOOP_RES[/Resource: koop://regeling/bwb_id/]
    Q3 -- nee --> Q4{Vraagt naar een\nspecifieke wet of regel?}

    Q4 -- ja --> KOOP_TOOL[/Tool: koop__zoek_regelgeving/]
    KOOP_TOOL --> Q4b{Wil gebruiker\nde inhoud lezen?}
    Q4b -- ja --> KOOP_RES
    Q4b -- nee --> Antwoord
    Q4 -- nee --> Q5{Vraagt of een verplichting\nvan toepassing is?}

    Q5 -- ja --> Q5b{SBI-code of\nbedrijfsgegevens bekend?}
    Q5b -- nee --> KVK_TOOL
    Q5b -- ja --> RR_TOOL[/Tool: regelrecht__check/]
    Q5 -- nee --> Q6{Vraagt naar subsidies\nof rapportage?}

    Q6 -- ja --> Q6b{Wil indienen\nof alleen informatie?}
    Q6b -- informatie --> RVO_ZOEK[/Tool: rvo__zoek_regeling/]
    Q6b -- indienen --> Q6c{Gebruiker\nbevestigt?}
    Q6c -- ja --> RVO_IND[/Tool: rvo__indienen/]
    Q6c -- nee --> Antwoord
    Q6 -- nee --> Q7{Algemene vraag\nover regelgeving?}

    Q7 -- ja --> KOOP_TOOL
    Q7 -- nee --> EIGEN[Eigen kennis\n+ disclaimer]

    KVK_RES --> Antwoord([Antwoord aan gebruiker])
    KOOP_RES --> Antwoord
    RR_TOOL --> Antwoord
    RVO_ZOEK --> Antwoord
    RVO_IND --> Antwoord
    EIGEN --> Antwoord

    style KVK_RES fill:#48BB78,color:#fff
    style KVK_TOOL fill:#4A90D9,color:#fff
    style KOOP_RES fill:#48BB78,color:#fff
    style KOOP_TOOL fill:#4A90D9,color:#fff
    style RR_TOOL fill:#4A90D9,color:#fff
    style RVO_ZOEK fill:#4A90D9,color:#fff
    style RVO_IND fill:#ED8936,color:#fff
    style EIGEN fill:#A0AEC0,color:#fff
```

Legenda: **groen** = Resource (read-only ophalen), **blauw** = Tool (read-only zoeken/berekenen), **oranje** = Tool (muterend, vereist bevestiging), **grijs** = eigen kennis.

Bij gecombineerde vragen geldt de volgorde: KvK (wie?) → KOOP (welke regels?) → RegelRecht (van toepassing?) → RVO (actie ondernemen).

## Voorbeeldscenario's

### Scenario 1: Bedrijf opzoeken (KvK)

> Gebruiker: "Zoek de gegevens van Bol.com"

```mermaid
sequenceDiagram
    actor Gebruiker
    participant Host as AI-platform (Host)
    participant KvK as MCP Server (KvK)
    participant API as KvK API

    Gebruiker->>Host: "Zoek de gegevens van Bol.com"
    Note over Host: Routeringsregel: bedrijfsnaam<br/>→ kvk__zoek_bedrijf
    Host->>KvK: tools/call [zoek_bedrijf, naam="Bol.com"]
    KvK->>API: GET api.kvk.nl/test/api/v2/zoeken?naam=Bol.com
    API-->>KvK: zoekresultaten
    KvK-->>Host: resultaat + provenance
    Host->>Gebruiker: "Bol.com B.V. (KvK 61409804, Utrecht)"

    Gebruiker->>Host: "Meer details graag"
    Note over Host: Routeringsregel: KvK-nummer bekend<br/>→ resource kvk://basisprofiel
    Host->>KvK: resources/read [kvk://basisprofiel/61409804]
    KvK->>API: GET api.kvk.nl/test/api/v1/basisprofielen/61409804
    API-->>KvK: basisprofiel
    KvK-->>Host: profiel + provenance
    Host->>Gebruiker: "Rechtsvorm, SBI-codes, adresgegevens..."
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

> Gebruiker: "Moet mijn bakkerij voldoen aan de Informatieplicht Energiebesparing?"

```mermaid
sequenceDiagram
    actor Gebruiker
    participant Host as AI-platform (Host)
    participant KvK as MCP Server (KvK)
    participant RR as MCP Server (RegelRecht)

    Gebruiker->>Host: "Moet mijn bakkerij voldoen aan de<br/>Informatieplicht Energiebesparing?"
    Note over Host: Routeringsregel: verplichting checken<br/>→ eerst bedrijfsgegevens nodig

    Host->>Gebruiker: "Wat is uw KvK-nummer of bedrijfsnaam?"
    Gebruiker->>Host: "Bakkerij Jansen, KvK 12345678"

    Note over Host: Stap 1: bedrijfsgegevens ophalen
    Host->>KvK: resources/read [kvk://basisprofiel/12345678]
    KvK-->>Host: SBI-code 1071, vestigingsgegevens + provenance

    Note over Host: Stap 2: verplichting checken<br/>met verkregen SBI-code
    Host->>RR: tools/call [check, sbi_code="1071"]
    RR-->>Host: beslisboom-resultaat + provenance

    Host->>Gebruiker: "Uw SBI-code (1071, brood en banket) valt onder<br/>de regeling. Of u moet rapporteren hangt af van<br/>uw jaarlijks energieverbruik."
```

### Scenario 4: Bron niet beschikbaar

> Gebruiker: "Zoek bedrijfsgegevens van ACME B.V."

```mermaid
sequenceDiagram
    actor Gebruiker
    participant Host as AI-platform (Host)
    participant KvK as MCP Server (KvK)
    participant API as KvK API

    Gebruiker->>Host: "Zoek bedrijfsgegevens van ACME B.V."
    Host->>KvK: tools/call [zoek_bedrijf, naam="ACME B.V."]
    KvK->>API: GET api.kvk.nl/...
    API--xKvK: timeout / 503
    KvK-->>Host: error: SOURCE_UNAVAILABLE
    Host->>Gebruiker: "Het KvK Handelsregister is op dit moment<br/>niet bereikbaar. U kunt het rechtstreeks<br/>proberen via kvk.nl."
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
CLAUDE_MODEL=claude-sonnet-4-20250514

# VLAM (UbiOps/Mistral)
VLAM_API_KEY=...
VLAM_BASE_URL=https://api.demo.vlam.ai/v2.1/projects/poc/openai-compatible/v1
VLAM_MODEL_ID=ubiops-deployment/bzk-dig-chat//chat-model
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
mcp/
  README.md
  docker-compose.yml
  decisions/             Product Decision Records
  host/
    api.py               FastAPI REST-server
    vlam_host.py         LLM-orchestrator (VLAM + Claude)
    mcp_client.py        MCP-server verbindingen
    config.py            Configuratie
    prompts/             Modulaire systeemprompts
      composer.py        Stelt blokken samen tot system prompt
      blocks/
        identity/        Per-model identiteit (vlam.md, claude.md)
        shared/          Gedeelde blokken (tone, format, guardrails, ...)
          domain/        Domeinkennis per onderwerp
        model_specific/  Fijnsturing per model
      examples/          Few-shot voorbeelden
    requirements.txt
    Dockerfile
    .env.example
  servers/
    kvk/                 MCP Resource + Tool — Handelsregister
    koop/                MCP Resource + Tool — Regelingenbank
    regelrecht/          MCP Tool — beslislogica
    rvo/                 MCP Tool — indienen rapportage
```
