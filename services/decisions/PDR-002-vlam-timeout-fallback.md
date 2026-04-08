# PDR-002: VLAM timeout en graceful fallback bij tool-calling

| Veld           | Waarde                          |
|----------------|---------------------------------|
| Status         | Geaccepteerd                    |
| Datum          | 2026-03-19                      |
| Beslisser(s)   | Projectteam poc-moza            |
| Gerelateerd    | PDR-001                         |

## Context

De VLAM-backend (Mistral via UbiOps) vertoont instabiel gedrag bij tool-calling. Systematisch testen toonde aan dat het probleem in het UbiOps-platform zit, niet in onze code:

| Scenario | Responstijd | Resultaat |
|---|---|---|
| Geen tools | ~1,3s | OK |
| 1 tool (KvK mijn_bedrijf) | ~23s | OK |
| 1 tool (RegelRecht) | ~53s | OK |
| 2 tools (KvK + RegelRecht) | ~37s | OK |
| 1 tool (KOOP only) | ~39s | 500-fout |
| 3 tools (alle) | ~37s | 500-fout |
| 2 tools + lang prompt | ~110s | 500-fout |

Conclusies:
- Zonder tools antwoordt VLAM in ~1,3 seconde.
- Met tools neemt de responstijd toe tot 20-50+ seconden, ongeacht welke tool.
- Bij meerdere tools of langere prompts crasht het platform regelmatig met een HTTP 500.
- Het probleem is niet specifiek voor een bepaalde MCP-server; zelfs KOOP alleen kan een 500 veroorzaken.

De gebruiker wacht hierdoor soms meer dan een minuut op een antwoord dat nooit komt.

## Beslissing

**Configureerbare timeout per LLM-call met automatische fallback naar een call zonder tools.**

### Mechanisme

1. Elke LLM-call wordt gewrapped in `asyncio.wait_for()` met een configureerbare timeout.
2. Bij een `TimeoutError` of `APIStatusError` (HTTP 500) op de VLAM-call:
   - De call wordt automatisch opnieuw gedaan **zonder tools** (geen `tools`-parameter).
   - De gebruiker krijgt een statusbericht: *"Bronnen niet bereikbaar, antwoord op eigen kennis..."*
   - Het uiteindelijke antwoord bevat een disclaimer: *"Let op: dit antwoord is gebaseerd op eigen kennis. Er is geen actuele bron geraadpleegd."*
3. Als ook de retry zonder tools faalt, krijgt de gebruiker een foutmelding: *"De assistent is op dit moment niet bereikbaar."*
4. De Claude-backend krijgt dezelfde timeout-bescherming, maar zonder tool-fallback (Claude is stabiel met tools).

### Configuratie

```bash
VLAM_TIMEOUT=30    # seconden per VLAM-call (default: 30)
CLAUDE_TIMEOUT=60  # seconden per Claude-call (default: 60)
```

De VLAM-timeout is bewust kort (30s) omdat VLAM zonder tools ~1,3s doet. Een call die na 30 seconden niet terugkomt, is waarschijnlijk vastgelopen. De Claude-timeout is ruimer omdat Claude-calls met tool-aanroepen betrouwbaar zijn maar soms langer duren.

### Betroffene bestanden

| Bestand | Wijziging |
|---|---|
| `host/config.py` | `VLAM_TIMEOUT` en `CLAUDE_TIMEOUT` configuratie |
| `host/vlam_host.py` | `asyncio.wait_for()` rond alle LLM-calls, `_chat_vlam_no_tools()` en `_vlam_no_tools_blocking()` fallback-methodes |

## Alternatieven overwogen

### A. Langere timeout zonder fallback

- (+) Eenvoudiger — geen retry-logica.
- (-) De gebruiker wacht tot 2 minuten om daarna alsnog een foutmelding te krijgen.
- (-) Lost het 500-probleem niet op; de call komt nooit terug.

### B. Aantal tools beperken voor VLAM

- (+) Minder kans op crashes met minder tools.
- (-) Beperkt de functionaliteit van de assistent voor VLAM-gebruikers.
- (-) Fragiel — het is niet voorspelbaar bij hoeveel tools het misgaat.

### C. Automatisch wisselen naar Claude bij VLAM-fout

- (+) Gebruiker krijgt altijd het beste antwoord.
- (-) Verwarrend: de gebruiker heeft bewust VLAM gekozen en krijgt dan onverwacht Claude-output.
- (-) Maskeert het platformprobleem, waardoor het niet wordt opgelost.

### D. Queue-mechanisme met retry

- (+) Robuuster bij intermitterende fouten.
- (-) Overkill voor een POC — voegt complexiteit toe die het probleem niet bij de bron oplost.

## Consequenties

1. **Gebruikerservaring** — bij een VLAM-timeout krijgt de gebruiker binnen ~32 seconden alsnog een antwoord (30s timeout + ~2s retry zonder tools), in plaats van minutenlang wachten op een fout.
2. **Beperkte antwoordkwaliteit bij fallback** — het antwoord zonder tools bevat geen actuele bedrijfsgegevens of regelgeving-checks. De disclaimer maakt dit transparant.
3. **Logging** — timeouts en fallbacks worden gelogd (`WARNING` bij eerste fout, `ERROR` als ook de retry faalt), zodat de frequentie van UbiOps-problemen meetbaar is.
4. **Geen dependency** — de oplossing gebruikt alleen `asyncio.wait_for()` uit de standaardbibliotheek.
5. **Platformsignaal** — de logs bieden onderbouwing om het timeout-gedrag bij het UbiOps-team aan te kaarten.
