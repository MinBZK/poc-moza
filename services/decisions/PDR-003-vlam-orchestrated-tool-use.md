# PDR-003: VLAM orchestratie-modus — host-gestuurde tool-aanroepen

| Veld           | Waarde                          |
|----------------|---------------------------------|
| Status         | **Ongeldig** (zie onder)        |
| Datum          | 2026-03-19                      |
| Ongeldig sinds | 2026-04-15                      |
| Beslisser(s)   | Projectteam poc-moza            |
| Gerelateerd    | PDR-001, PDR-002                |

> ## ⚠️ Ongeldig verklaard — 2026-04-15
>
> De aanname onder deze PDR — dat VLAM/UbiOps instabiel is bij
> OpenAI-tool-calling — geldt niet meer. Gecontroleerde tests op het
> huidige endpoint (`ubiops-deployment/bzk-dig-mistralmedium-flexibel`)
> laten een schone 3-rondes tool-calling chain zien met 4 tools,
> parallelle tool-calls en complexe schemas, in ~12s totaal zonder
> 500-fouten. Zie `services/host/test_vlam_toolcalling.py` (simpel) en
> `services/host/test_vlam_toolcalling_chain.py` (realistisch).
>
> De host-gestuurde regex-JSON-parsing is daardoor overbodig geworden.
> Uit `vlam_host.py` zijn verwijderd:
>
> - `VLAM_ORCHESTRATED` env-flag (`config.py`)
> - `_chat_vlam_orchestrated_stream`
> - `_build_tool_catalog`
> - `_extract_tool_request`
> - `_vlam_call` (helper zonder tools)
> - `_ORCHESTRATION_PROMPT`
> - `CLI_TOOL_CATALOG` (was alleen nodig voor orchestratie)
>
> Het VLAM+CLI-pad (`_chat_vlam_cli_stream`) is omgebouwd naar dezelfde
> native tool-calling als het VLAM+MCP-pad, zodat er één agentic-loop-patroon
> is voor alle VLAM-modi.
>
> **Dit document blijft bewaard voor context en audit-trail. De beslissing
> is niet meer van toepassing op de huidige codebase.**

## Context

VLAM (Mistral via UbiOps) is instabiel bij OpenAI-compatibele tool-calling (zie PDR-002). Zonder tools antwoordt VLAM in ~1,5 seconde; met tool-definities in het request stijgt de responstijd naar 20-60+ seconden en crasht het platform regelmatig met HTTP 500-fouten.

Het probleem is niet het **aanroepen** van een specifieke tool, maar het **meesturen van tool-definities** in het request. Zelfs met één tool is VLAM al 15-20x trager. Met drie tools is het onbetrouwbaar.

Eerder werkten we rond dit probleem met een timeout + fallback op eigen kennis (PDR-002). Dat voorkomt dat de gebruiker minutenlang wacht, maar het resultaat is een antwoord zonder actuele bronnen — een degradatie van de functionaliteit.

## Beslissing

**VLAM gebruikt geen OpenAI tool-calling meer. In plaats daarvan stuurt de host de tool-aanroepen aan op basis van VLAM's instructies in platte tekst.**

### Mechanisme

Het principe is: VLAM denkt, de host voert uit.

```
Gebruiker: "Kom ik in aanmerking voor de informatieplicht?"

Ronde 1: VLAM (zonder tools, ~1.5s)
   → ```json {"tool": "kvk__mijn_bedrijf", "arguments": {}}```

         Host voert kvk__mijn_bedrijf uit (~0.1s)

Ronde 2: VLAM (zonder tools + tool-resultaat, ~1.5s)
   → ```json {"tool": "regelrecht__check", "arguments": {"kvk_nummer": "12345678"}}```

         Host voert regelrecht__check uit (~0.5s)

Ronde 3: VLAM (zonder tools + beide resultaten, ~1.5s)
   → "Op basis van art. 5.15d Bal is de informatieplicht van toepassing..."

Totaal: ~5 seconden (was: 30-60s+ met crashes)
```

Elke VLAM-call is een snelle tekst-call (~1,5s) zonder tool-definities in het request. De host:

1. Stuurt de gebruikersvraag naar VLAM met een systeem-prompt die beschikbare tools beschrijft als tekst
2. Parsed VLAM's antwoord op JSON-blokken (`{"tool": "...", "arguments": {...}}`)
3. Voert de gevraagde tool uit via de MCP-server
4. Stuurt het resultaat terug naar VLAM als vervolgbericht
5. Herhaalt tot VLAM een direct antwoord geeft (max 5 rondes)

### Prompt-instructie aan VLAM

VLAM krijgt in de systeemprompt een compacte tool-catalogus (naam, beschrijving, parameters) en de instructie:

> Je kunt GEEN tools zelf aanroepen. Als je een bron nodig hebt, antwoord dan ALLEEN met een JSON-blok: `{"tool": "<naam>", "arguments": {...}}`. Vraag per keer maximaal één tool aan.

### Configuratie

```bash
# Orchestratie aan (standaard) — host stuurt tools aan
VLAM_ORCHESTRATED=true

# Orchestratie uit — klassieke OpenAI tool-calling (instabiel)
VLAM_ORCHESTRATED=false
```

De vlag staat standaard op `true`. Met `false` wordt de oude aanpak gebruikt (met timeout-fallback uit PDR-002), zodat de klassieke modus beschikbaar blijft voor testen of als UbiOps het tool-calling-probleem oplost.

### Betroffen bestanden

| Bestand | Wijziging |
|---|---|
| `host/config.py` | `VLAM_ORCHESTRATED` configuratie |
| `host/vlam_host.py` | `_chat_vlam_orchestrated_stream()`, `_build_tool_catalog()`, `_extract_tool_request()`, `_vlam_call()` |

### Vergelijking

| Aspect | Klassiek (tool-calling) | Orchestratie (nieuw) |
|---|---|---|
| VLAM-calls per vraag | 1-3 (met tools) | 2-4 (zonder tools) |
| Tijd per call | 20-60s | ~1,5s |
| Totale doorlooptijd | 30-120s | 3-8s |
| Stabiliteit | Crasht regelmatig (500) | Stabiel |
| Tool-definities in request | Ja (~400 tokens) | Nee |
| Afhankelijk van UbiOps tool-calling | Ja | Nee |

## Alternatieven overwogen

### A. Timeout + fallback op eigen kennis (PDR-002)

- (+) Simpelste oplossing, al geïmplementeerd.
- (-) Gebruiker krijgt een antwoord zonder actuele bronnen — de kernfunctionaliteit van de assistent (bronverwijzingen) gaat verloren.
- (-) Lost het snelheidsprobleem niet op, alleen de crash.

### B. Compactere tool-definities

- (+) Minder tokens in het request, mogelijk sneller.
- (-) Het probleem zit niet in de grootte maar in de tool-calling functionaliteit van UbiOps. Zelfs met één simpele tool (geen parameters) is VLAM 15x trager.

### C. Host routeert volledig op keywords (zonder VLAM)

- (+) Snelst mogelijk — slechts één VLAM-call voor het eindantwoord.
- (-) Keyword-matching is fragiel en schaalt niet bij nieuwe tools of onverwachte vragen.
- (-) Dupliceert de routeringslogica die VLAM al begrijpt uit de systeemprompt.

### D. Wachten tot UbiOps het oplost

- (+) Geen workaround nodig.
- (-) Geen controle over de tijdlijn. Blokkeert de demo.

## Consequenties

1. **Claude ongewijzigd** — Claude blijft native tool-calling gebruiken via de Anthropic API. De orchestratie geldt alleen voor VLAM.
2. **Parsing-risico** — de host moet JSON uit VLAM's tekst-antwoord extraheren. Als VLAM een ongeldig formaat genereert, wordt het als direct antwoord behandeld (graceful degradation).
3. **Meer VLAM-calls** — een gecombineerde vraag (KvK + RegelRecht) kost nu 3-4 calls in plaats van 1-2. Maar elke call is ~1,5s in plaats van 30-60s, dus de totale doorlooptijd is korter.
4. **Geen dependency** — de oplossing gebruikt alleen standaard Python (`re`, `json`). Geen extra pakketten.
5. **Reversibel** — `VLAM_ORCHESTRATED=false` schakelt terug naar de klassieke aanpak. De oude code is ongewijzigd.
