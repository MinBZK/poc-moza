# PDR-001: Dual LLM-backend — VLAM en Claude met gedeelde MCP-tools

| Veld           | Waarde                          |
|----------------|---------------------------------|
| Status         | Geaccepteerd                    |
| Datum          | 2026-03-17                      |
| Beslisser(s)   | Projectteam poc-moza            |
| Gerelateerd    | MCP-02, MCP-07                  |

## Context

De digitale assistent in poc-moza moet ondernemers helpen bij vragen over regelgeving, subsidies en bedrijfsregistratie. Hiervoor zijn vier MCP-servers beschikbaar (KvK, KOOP, RegelRecht, RVO) die als tools worden aangeboden aan een LLM.

Er zijn twee kandidaat-backends:

1. **VLAM** — het Rijksbrede taalmodel, gehost op UbiOps met een Mistral-model. Biedt een OpenAI-compatibele API. Valt onder overheidsinfrastructuur en -beleid.
2. **Claude** — Anthropic's taalmodel, benaderd via de Anthropic API. Beschikt over sterke tool-use-capaciteiten.

De vraag is of de assistent aan één backend gebonden moet zijn, of dat beide naast elkaar beschikbaar moeten zijn.

## Beslissing

**Beide backends worden ondersteund met dezelfde MCP-tools.** De gebruiker kan in de frontend via een schakelaar wisselen tussen VLAM en Claude. Beide modi doorlopen dezelfde agentic loop (tool-aanroepen, resultaatverwerking, follow-up) en hebben toegang tot dezelfde vier MCP-servers.

### Technische invulling

| Aspect          | VLAM                                                        | Claude                                    |
|-----------------|-------------------------------------------------------------|-------------------------------------------|
| SDK             | `openai` Python-pakket (OpenAI-compatibele API)             | `anthropic` Python-pakket                 |
| Base URL        | `VLAM_BASE_URL` (UbiOps endpoint)                           | Anthropic default                         |
| Model ID        | `VLAM_MODEL_ID` (bijv. `ubiops-deployment/bzk-dig-...`)    | `CLAUDE_MODEL` (bijv. `claude-sonnet-4-20250514`) |
| Systeemprompt   | Ingevoegd als `{"role": "system"}` bericht                  | Native `system`-parameter                 |
| Response-pad    | `response.choices[0].message.content`                       | `response.content[0].text`                |
| Tool-formaat    | OpenAI function calling                                     | Anthropic `tool_use`-blokken              |
| MCP-tools       | Alle vier servers                                           | Alle vier servers                         |

De `MCPToolRegistry` biedt twee methodes: `get_anthropic_tools()` en `get_openai_tools()`, die dezelfde MCP-tool-definities omzetten naar het juiste formaat per provider.

### Systeemprompt

De prompt is grotendeels gedeeld. Alleen de identiteit verschilt ("Je bent VLAM, ..." vs "Je bent Claude, ..."). De tool-beschrijvingen, taalniveau-instructies (B1) en bronverwijzingsregels zijn identiek. Dit volgt het patroon van [MinBZK/poc-machine-law](https://github.com/MinBZK/poc-machine-law), waar dezelfde Jinja2-template voor beide providers wordt gebruikt.

Als tijdens testen blijkt dat een model explicietere instructies nodig heeft voor tool-gebruik, kan de prompt per provider afwijken. Uitgangspunt is: gedeeld tenzij noodzakelijk.

### Gespreksgeschiedenis

Sessies worden per mode gescheiden (`{session_id}:vlam` / `{session_id}:claude`). Wisselen van backend wist de chatgeschiedenis, zodat er geen verwarring ontstaat door gemengde context.

### Configuratie

Alle waarden zijn instelbaar via environment variabelen:

```bash
# Claude
ANTHROPIC_API_KEY=sk-ant-...
CLAUDE_MODEL=claude-sonnet-4-20250514

# VLAM
VLAM_API_KEY=...
VLAM_BASE_URL=https://api.demo.vlam.ai/v2.1/projects/poc/openai-compatible/v1
VLAM_MODEL_ID=ubiops-deployment/bzk-dig-chat//chat-model
```

Als `VLAM_API_KEY` of `VLAM_BASE_URL` niet is ingesteld, wordt de VLAM-modus uitgeschakeld en krijgt de gebruiker een melding.

## Alternatieven overwogen

### A. Alleen VLAM

- (+) Past bij Rijksbreed beleid voor on-premise taalmodellen.
- (-) VLAM-testomgeving is nog niet altijd beschikbaar (zie MCP-07). Blokkeert ontwikkeling en demo's.
- (-) Geen vergelijkingsmateriaal voor kwaliteitsbeoordeling.

### B. Alleen Claude

- (+) Sterke tool-use-capaciteiten, goed gedocumenteerde API.
- (-) Niet Rijksbreed; afhankelijk van externe partij.
- (-) Geen validatie van het VLAM-profiel.

### C. Dual backend, maar slechts één met MCP-tools

- (+) Eenvoudigere implementatie voor de "kale" modus.
- (-) Geen eerlijke vergelijking mogelijk: verschil in antwoordkwaliteit wordt veroorzaakt door zowel model als tool-toegang.

## Consequenties

1. **Dependency op `openai`-pakket** — toegevoegd aan `requirements.txt` naast `anthropic`.
2. **Frontend-complexiteit** — de mode-schakelaar moet de chat wissen en de juiste welkomstboodschap tonen.
3. **Testscenario's** — het MCP-02 testscenario (Informatieplicht Energiebesparing) moet met beide backends doorlopen worden om kwaliteitsverschillen in kaart te brengen.
4. **Promptonderhoud** — bij wijzigingen aan de gedeelde prompt moet gevalideerd worden dat beide modellen correct blijven functioneren.
5. **Referentie-implementatie** — de opzet volgt het patroon van [MinBZK/poc-machine-law](https://github.com/MinBZK/poc-machine-law) (`vlam_service.py` / `claude_service.py` met gedeelde `BaseLLMService`-interface), wat hergebruik en kennisdeling vergemakkelijkt.
