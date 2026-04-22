# Feedback MCP-standaard vanuit poc-moza

| Veld | Waarde |
|---|---|
| Datum | 2026-04-22 |
| Auteur | Projectteam poc-moza |
| Getoetst tegen | Standaard v0.2, Technische Specificaties v0.5 |
| Getoetst met | 4 MCP-servers (KvK, KOOP, RegelRecht, RVO) + `mcp-standaard validate` |

## 1. Samenvatting

Vier MCP-servers gebouwd en gevalideerd tegen v0.2. Het grootste deel van wat we wilden meegeven is inmiddels in v0.2 beantwoord — zie §2 voor wat we bevestigen. De feitelijke feedback beperkt zich tot een paar kleine aanscherpingen (§3) en een handvol openstaande punten voor een volgende iteratie (§4), waaronder de positie van CLI als transport en een compliance-laag op provenance en audit.

### Validatieresultaten

Gedraaid op 2026-04-22 met `mcp-standaard validate` vanuit `moza-mcp-standaard-poc`.

| Server | Checks | Pass | Fail | Skip | Error |
|---|---|---|---|---|---|
| KvK | 9 | 7 | 0 | 1 | 1 |
| KOOP | 9 | 7 | 0 | 1 | 1 |
| RegelRecht | 7 | 5 | 0 | 2 | 0 |
| RVO | 13 | 11 | 0 | 2 | 0 |

Geen FAIL. De twee ERR's bij KvK en KOOP komen uit een eigen server-bug (`TextResourceContents` retourneren waar de SDK `ReadResourceContents` verwacht), niet uit de standaard of de validator. Fix zit aan onze kant.

## 2. Wat v0.2 al goed doet — bevestigd vanuit de poc

Onze implementatie bevestigt dat de volgende keuzes werkbaar zijn en dwingt ze aan waar de standaard dat vraagt:

- **Provenance binnen de MCP-contentpayload** (tech-spec §3.2). Alle vier onze servers wrappen `data` + `provenance` in het `text`-veld; de canonical naam `provenance` past. De opmerking in tech-spec §3.2 dat dit patroon uit poc-moza is overgenomen klopt met onze code.
- **ToolAnnotations verplicht, drie hints** (tech-spec §7.2, standaard §4.2). Alle tools in onze poc zetten `readOnlyHint`, `destructiveHint`, `openWorldHint` expliciet. De validator herkent muterende tools correct via `readOnlyHint=False`.
- **Split server-log / host-log** (tech-spec §6.1). Dat `correlationId` en `sessionId` geen server-concepten zijn maakt de logging implementeerbaar. De poc-servers loggen op dit moment 3–4 van de 7 server-velden — dat is een gap aan onze kant, niet in de standaard.
- **Stdio als valide transport naast HTTP/SSE** (standaard §2.2, tech-spec §2.1). Al onze servers draaien stdio; dat we niet op HTTP/2+TLS1.3 hoeven is cruciaal voor ontwikkeltempo.
- **Consent niveau 1 als host-verantwoordelijkheid zolang het protocol niveau 2 niet ondersteunt** (tech-spec §4.2). Dat is precies hoe onze host het doet.
- **Overgangspad PKIoverheid-signing** (tech-spec §5.4). Ongesigneerd in poc, test-certificaat in acceptatie, PKIoverheid in productie — praktisch en haalbaar.
- **Guardrails-split server (schema) vs host (inhoud)** (tech-spec §5.3). Onze servers doen schemavalidatie, de host vangt scope/toon op in de systeemprompt.
- **Risicofasering in §9.2**. De drie-fasen-opzet (informerend → beperkte mutaties → hoog risico) dekt onze roadmap (KvK/KOOP → RegelRecht → RVO `indienen`) een-op-een.

## 3. Kleine aanscherpingen voor de volgende minor

### 3.1 Voorbeeldcode voor `@server.read_resource()`

De Python MCP SDK heeft twee types die makkelijk verward worden: `TextResourceContents` (wire-type) en `ReadResourceContents` (handler-return-type uit `mcp.server.lowlevel.helper_types`). Onze KvK- en KOOP-servers retourneerden het eerste en faalden daarop; meerdere publieke MCP-voorbeelden doen hetzelfde. De standaard heeft nu geen normatief codevoorbeeld voor server-handlers. Eén klein snippet in tech-spec §3.2 zou dit afvangen:

```python
from mcp.server.lowlevel.helper_types import ReadResourceContents

@server.read_resource()
async def read_resource(uri: str) -> list[ReadResourceContents]:
    return [ReadResourceContents(content=_wrap_provenance(data), mime_type="application/json")]
```

### 3.2 `idempotencyKey` van ZOU MOETEN naar MOET

Zowel standaard §4.2 als tech-spec §7.2 hanteren ZOU MOETEN voor `idempotencyKey` bij muterende tools. In praktijk is het bij overheidsmutaties (subsidie indienen, registerwijziging) niet optioneel — dubbele aanvraag is een incident, geen ruis. Aanscherpen naar MOET voor tools met `readOnlyHint=False`.

## 4. Openstaande punten voor een volgende iteratie

### 4.1 CLI als complementair transport

De standaard dekt nu alleen MCP. Naast MCP hebben we in de poc een CLI-spoor (Bash-tools die dezelfde API's ontsluiten, zie PDR-005). Het is geen vervanger, het is een ander scenario:

- **CLI** werkt als de agent één tool tegelijk aanroept in een voorspelbare volgorde — lineaire flows, vaste filters. Token-efficientie komt er gratis bij.
- **MCP** wint zodra de agent dynamisch uit 15+ tools kiest. Tool-discovery, persistent connections en parallelle calls zijn zonder extra plumbing mogelijk.
- Het token-verschil dat vaak wordt aangehaald (CLI is "97% goedkoper") krimpt fors met strikte schemas (`additionalProperties: false`, minimale `required`) en gerichte tool-subsets per taak. Dat is eerder een argument voor schemadiscipline dan voor CLI.

Voorstel: erken in de standaard (of in een zusterdocument) CLI als profiel met dezelfde eisen aan provenance, audit-logging en dataminimalisatie, en beschrijf scope-criteria (aantal tools, dynamisch vs. vast, lokaal vs. remote) in plaats van een winnaarskeuze.

### 4.2 Compliance-haakjes op provenance en audit

De standaard is sterk op techniek, dun op waar AVG en AI-Act direct aanhaken. Concreet ontbreekt:

- **`purpose` en `legalBasis` als verplichte provenance-velden.** Nu is provenance `source`/`timestamp`/`version`. Voor AVG-audit (art. 5(1)(b), doelbinding) en handhaving is `purpose` (bv. "informatieplicht-toets") en `legalBasis` (bv. "art. 5.15d Bal") essentieel. Dit past binnen het bestaande provenance-object in tech-spec §3.2.
- **User-facing disclosure.** Provenance is nu server-facing (host kan er mee, gebruiker ziet het niet per se). AI-Act vraagt transparantie: de gebruiker moet begrijpen welke bronnen een AI-assistent heeft geraadpleegd. Minimaal een `userVisibleDisclosure`-veld of een eis aan de host om dit te tonen.
- **Rolmodel verwerkingsverantwoordelijke/verwerker.** Onduidelijk wie welke rol heeft in de keten overheidsorgaan → host → MCP-server → LLM-provider. Tech-spec §8.2 raakt dit voor het cloud-profiel (verwerkerovereenkomst, geen training) maar niet voor laag 1. Een kort rolmodel in laag 1 voorkomt dat iedere implementeerder dit opnieuw uitvindt.
- **Model-identificatie en prompt-hash in audit.** Voor AI-Act-reproduceerbaarheid bij muterende acties is het relevant welk model en welke systeemprompt een beslissing hebben getriggerd. Nu staat dit niet in tech-spec §6.1. Kandidaat-velden: `modelId`, `modelVersion`, `systemPromptHash` in de host-log.
- **SAR-linking.** Bij een AVG-verzoek moet herleidbaar zijn welke MCP-aanroepen zijn gedaan namens een betrokkene. `sessionId` koppelt sessies, maar er is geen stabiele `subjectId` in audit. Kandidaat: pseudoniem-veld in server- én host-log.

### 4.3 Authenticatie "out of scope" opnieuw bekijken

Standaard §1.4 stelt authenticatie expliciet buiten scope; §6 benoemt wel dat de host een token van eHerkenning/DigiD doorgeeft aan de MCP-server. Onze KvK-server heeft daar nu een hardcoded KvK-nummer omdat er geen gestandaardiseerd pad is om een eHerkenning-sessie via MCP door te zetten naar de server.

Voorstel: authenticatie blijft grotendeels buiten scope, maar de standaard beschrijft minimaal **hoe** een host-token naar de server gaat — via tool-argument, `initialize`-context of een consent-token-achtige constructie. Zonder deze haak blijft elke implementeerder ad-hoc-oplossingen bouwen. Kandidaten voor koppeling: OAuth 2.0 NL GOV / OIDC NL GOV profielen.

## Bijlage: getoetste servers

| Server | Type | Tools | Resources | Provenance | ToolAnnotations | Server-log |
|---|---|---|---|---|---|---|
| KvK | Resource + Tool | `mijn_bedrijf` | Basisprofiel (template) | Ja | 3/3 hints | 4/7 velden |
| KOOP | Resource + Tool | `zoek_regelgeving` | Regeling (template) | Ja | 3/3 hints | 4/7 velden |
| RegelRecht | Tool | `check` | — | Ja | 3/3 hints | 4/7 velden |
| RVO | Tool | `zoek_regeling`, `indienen` | — | Ja | 3/3 hints | 3/7 velden |

Validator-commando:

```
mcp-standaard validate --server-name <naam> [--test-uri <uri>] -- uv run --with mcp [--with httpx --with lxml] path/to/server.py
```
