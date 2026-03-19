# Feedback MCP-standaard vanuit poc-moza implementatie

| Veld         | Waarde                          |
|--------------|---------------------------------|
| Datum        | 2026-03-19                      |
| Auteur       | Projectteam poc-moza            |
| Gebaseerd op | Standaard v0.2, Technische Specificaties v0.5 |
| Getoetst met | 4 MCP-servers (KvK, KOOP, RegelRecht, RVO) + geautomatiseerde validator |

## 1. Samenvatting

De poc-moza implementatie bevat vier MCP-servers die elk een overheidsdienst ontsluiten. Alle vier zijn getoetst tegen de MCP-standaard, zowel met de geautomatiseerde validator uit moza-mcp-standaard-poc als handmatig. De standaard is goed toepasbaar als richtlijn, maar bevat op meerdere punten frictie met het werkelijke MCP-protocol en de beschikbare SDK's. Dit document beschrijft die frictie en doet suggesties voor aanscherping.

### Validatorresultaten

Gevalideerd met `mcp-standaard validate` (Python API) vanuit moza-mcp-standaard-poc.

| Server      | Checks | Passed | Failed | Skipped | Errors | Opmerkingen |
|-------------|--------|--------|--------|---------|--------|-------------|
| KvK         | 9      | 7      | 0      | 1       | 1      | 1 skip (geen statische resources), 1 error (validator bug) |
| KOOP        | 9      | 7      | 0      | 1       | 1      | 1 skip (geen statische resources), 1 error (validator bug) |
| RegelRecht  | 7      | 5      | 0      | 2       | 0      | 2 skips (geen resources, provenance n.v.t.) |
| RVO         | 13     | 11     | 0      | 2       | 0      | 2 skips (geen resources, provenance n.v.t.) |

**Geen enkele FAIL.** Alle errors zijn veroorzaakt door bugs in de validator, niet door non-conformiteit van de servers. Zie sectie 7.

### Gedetailleerde resultaten per server

**KvK** (resource + tool server)
```
[SKIP] META-R-NONE    Resources present (geen statische resources, alleen templates)
[PASS] META-RT-DESC   Resource template description: Basisprofiel
[PASS] META-T-DESC    Tool description: mijn_bedrijf
[PASS] META-T-SCHEMA  Tool input schema: mijn_bedrijf
[PASS] ANNOT-READONLY readOnlyHint set: mijn_bedrijf (True)
[PASS] ANNOT-DESTRUCTIVE destructiveHint set: mijn_bedrijf (False)
[PASS] ANNOT-OPENWORLD openWorldHint set: mijn_bedrijf (False)
[PASS] PROV-STRUCT    Resources published (1 template, 0 resources)
[ERR ] PROV-CALL-ERR  Resource call: kvk://bedrijf/12345678
       -> 'TextResourceContents' object has no attribute 'content' (validator bug)
```

**KOOP** (resource + tool server)
```
[SKIP] META-R-NONE    Resources present (geen statische resources, alleen templates)
[PASS] META-RT-DESC   Resource template description: Wet of regeling
[PASS] META-T-DESC    Tool description: zoek_regelgeving
[PASS] META-T-SCHEMA  Tool input schema: zoek_regelgeving
[PASS] ANNOT-READONLY readOnlyHint set: zoek_regelgeving (True)
[PASS] ANNOT-DESTRUCTIVE destructiveHint set: zoek_regelgeving (False)
[PASS] ANNOT-OPENWORLD openWorldHint set: zoek_regelgeving (True)
[PASS] PROV-STRUCT    Resources published (1 template, 0 resources)
[ERR ] PROV-CALL-ERR  Resource call: koop://wet/energiebesparing
       -> 'TextResourceContents' object has no attribute 'content' (validator bug)
```

**RegelRecht** (tool-only server)
```
[SKIP] META-R-NONE    Resources present (geen resources)
[PASS] META-T-DESC    Tool description: check
[PASS] META-T-SCHEMA  Tool input schema: check
[PASS] ANNOT-READONLY readOnlyHint set: check (True)
[PASS] ANNOT-DESTRUCTIVE destructiveHint set: check (False)
[PASS] ANNOT-OPENWORLD openWorldHint set: check (True)
[SKIP] PROV-SKIP      Provenance metadata (geen resources om te toetsen)
```

**RVO** (tool-only server, met muterende tool)
```
[SKIP] META-R-NONE    Resources present (geen resources)
[PASS] META-T-DESC    Tool description: zoek_regeling
[PASS] META-T-SCHEMA  Tool input schema: zoek_regeling
[PASS] META-T-DESC    Tool description: indienen
[PASS] META-T-SCHEMA  Tool input schema: indienen
[PASS] ANNOT-READONLY readOnlyHint set: zoek_regeling (True)
[PASS] ANNOT-DESTRUCTIVE destructiveHint set: zoek_regeling (False)
[PASS] ANNOT-OPENWORLD openWorldHint set: zoek_regeling (False)
[PASS] ANNOT-READONLY readOnlyHint set: indienen (False)
[PASS] ANNOT-DESTRUCTIVE destructiveHint set: indienen (False)
[PASS] ANNOT-OPENWORLD openWorldHint set: indienen (False)
[PASS] ANNOT-MUTATING Mutating tool correctly marked: indienen
[SKIP] PROV-SKIP      Provenance metadata (geen resources om te toetsen)
```

Opmerking: de validator herkent `indienen` correct als muterende tool op basis van `readOnlyHint=False`. De mapping `mutating` -> `ToolAnnotations` werkt in de praktijk (zie sectie 3).

---

## 2. Responsestructuur (technische specificaties &sect;3.2)

### Probleem

De standaard schrijft een responsestructuur voor met `correlationId`, `timestamp`, `source` en `data` als top-level velden. Het MCP-protocol definieert echter een eigen responsestructuur: `TextContent` (voor tools) en `TextResourceContents` (voor resources). De server heeft geen vrijheid om de envelop te bepalen — die wordt door het protocol opgelegd.

### Wat wij deden

Herkomstmetadata (bron, tijdstip, versie) is opgenomen *binnen* de `text`-payload van `TextContent`/`TextResourceContents` als geneste JSON:

```json
{
  "data": { ... },
  "provenance": {
    "source": "KvK Handelsregister (mock)",
    "timestamp": "2026-03-19T10:04:22Z",
    "version": "0.1.0"
  }
}
```

### Suggestie

Erken in de standaard dat de responsestructuur uit &sect;3.2 een *logisch* formaat beschrijft dat binnen de MCP-contentpayload wordt opgenomen, niet als vervanging van de MCP-envelop. Overweeg het veld `provenance` als standaardnaam te definieren, aangezien alle vier servers in de poc onafhankelijk dezelfde structuur kozen.

---

## 3. `mutating` boolean vs MCP `ToolAnnotations`

### Probleem

De standaard (&sect;7.2) schrijft een `mutating: true/false` veld voor op elke tool. Het MCP-protocol kent dit veld niet. In plaats daarvan biedt MCP `ToolAnnotations` met drie hints:

| MCP ToolAnnotation | Standaard-equivalent |
|---|---|
| `readOnlyHint` | inverse van `mutating` |
| `destructiveHint` | niet beschreven in standaard |
| `openWorldHint` | niet beschreven in standaard |

### Wat wij deden

Alle tools hebben `ToolAnnotations` met expliciete waarden voor alle drie hints. Muterende tools (bijv. `indienen` in RVO) hebben `readOnlyHint=False, destructiveHint=False`. Read-only tools hebben `readOnlyHint=True`.

### Suggestie

1. Vervang `mutating` door een mapping naar MCP `ToolAnnotations`. Definieer: een tool is muterend wanneer `readOnlyHint` afwezig is of `false`.
2. Neem `destructiveHint` op in de standaard — het onderscheid tussen een adreswijziging (muterend, niet destructief) en het verwijderen van een registratie (muterend en destructief) is relevant voor de bevestigingsflow.
3. Maak `ToolAnnotations` verplicht op elke tool, niet optioneel zoals in het MCP-protocol.

---

## 4. Herkomstmetadata ook voor Tools

### Probleem

De standaard (&sect;4.1, &sect;7) schrijft herkomstmetadata voor bij Resource-responses. Over Tool-responses wordt niets gezegd, terwijl tools evengoed data retourneren die de host aan de gebruiker toont.

### Wat wij deden

Alle vier servers retourneren herkomstmetadata bij zowel resources als tools. De `zoek_regeling` tool (RVO) retourneert zoekresultaten met bron en tijdstip. De `check` tool (RegelRecht) retourneert een juridische beoordeling met verwijzing naar de wettelijke grondslag.

### Suggestie

Breid de herkomsteis uit naar alle responses die data bevatten, ongeacht of het een Resource of Tool betreft. De huidige formulering "Elke Resource-response bevat metadata over bron, tijdstip en versie" zou moeten worden: "Elke response die data bevat..."

---

## 5. Logging: 10 verplichte velden vs. realiteit

### Probleem

De technische specificaties (&sect;6.1) schrijven 10 verplichte logvelden voor per aanroep, waaronder `correlationId`, `sessionId`, `mutating`, en `durationMs`. In de MCP stdio-transport zijn `correlationId` en `sessionId` niet beschikbaar — ze bestaan niet als concept in het protocol. De server ontvangt een tool-naam en argumenten, geen sessie-informatie.

### Wat wij deden

Alle servers loggen `timestamp`, `tool` (naam) en `input` (argumenten). Dat zijn 2-3 van de 10 verplichte velden. De ontbrekende velden (`correlationId`, `sessionId`, `serverName`, `mutating`, `outcome`, `errorCode`, `durationMs`) zijn ofwel niet beschikbaar via het protocol, ofwel niet zinvol als hardcoded waarde.

### Suggestie

1. Maak onderscheid tussen velden die de *server* logt en velden die de *host* logt. De host kent de sessie, de correlatie-ID en de totale doorlooptijd. De server kent de tool, de input en het resultaat.
2. Definieer een minimaal logformaat voor servers dat haalbaar is zonder protocol-uitbreidingen:
   - `timestamp`, `tool/resource`, `input` (geminimaliseerd), `outcome`, `durationMs`
3. Definieer een aanvullend logformaat voor hosts dat de sessie-context toevoegt.

---

## 6. Consent-token en authenticatie

### Probleem

De standaard beschrijft een consent-token mechanisme (&sect;4.2) met een gesigneerd JWT dat per aanroep wordt gevalideerd. Het MCP-protocol en de Python MCP SDK bieden geen mechanisme om custom headers of tokens door te geven aan de server. Bij stdio-transport is er geen HTTP-laag, dus `X-MCP-Session-ID` en `X-MCP-Consent-Token` headers bestaan niet.

### Wat wij deden

Consent is niet geimplementeerd op serverniveau. De host toont welke bronnen actief zijn (UI-statusbalk) en de gebruiker kan de assistent kiezen. Er is geen per-server consent-flow.

### Suggestie

1. Erken dat consent-doorgifte een open probleem is in het huidige MCP-protocol, met name bij stdio-transport.
2. Onderzoek of consent als onderdeel van de `initialize`-handshake of als extra argument bij `tools/call` kan worden meegestuurd. Dit vereist een MCP-protocoluitbreiding of conventie.
3. Overweeg consent als host-verantwoordelijkheid te positioneren (de host bepaalt of een server wordt aangeroepen, op basis van gebruikerstoestemming), in plaats van als server-validatieeis. De server hoeft dan niet zelf te valideren.

---

## 7. Bugs in de validator

Tijdens het testen zijn twee bugs in de geautomatiseerde validator ontdekt:

### 7.1 `.content` vs `.text` op `TextResourceContents`

De provenance-check in `checks/provenance.py` leest `result.contents[0].content`, maar de MCP SDK's `TextResourceContents` heeft het attribuut `.text`. Dit veroorzaakt een `AttributeError` bij elke resource-check.

### 7.2 `list_resources` op tool-only servers (opgelost)

In een eerdere versie van de validator werd `list_resources` aangeroepen op servers die alleen Tools aanbieden (RegelRecht, RVO), wat resulteerde in "Method not found" errors. Dit is inmiddels opgelost: de validator skipt nu correct met `META-R-NONE` en `PROV-SKIP` wanneer een server geen resources aanbiedt.

---

## 8. Transportlaag: stdio vs HTTP/SSE

### Probleem

De technische specificaties (&sect;2.1) schrijven HTTP/2 + TLS 1.3 + SSE voor. De standaard zelf (&sect;2.2) stelt "transportneutraal". In de praktijk is stdio het standaard-transportmechanisme voor lokale MCP-servers en het enige dat door de Python MCP SDK out-of-the-box wordt ondersteund zonder extra configuratie.

### Wat wij deden

Alle vier servers gebruiken stdio-transport. De host start elke server als subprocess en communiceert via stdin/stdout.

### Suggestie

1. Maak expliciet dat de HTTP-eisen uit de technische specificaties gelden voor het *productie*-deploymentprofiel, niet voor ontwikkeling en lokale inzet.
2. Definieer een minimale set eisen voor stdio-transport (bijv. geen TLS vereist, maar wel schemavalidatie en logging).
3. Overweeg of de endpointstructuur (&sect;2.2: `/mcp/v1/initialize`, etc.) een aanbeveling is voor HTTP-transport of een harde eis. Bij stdio-transport bestaan deze endpoints niet — het zijn JSON-RPC methoden.

---

## 9. Gesigneerd manifest (&sect;5.4)

### Probleem

De standaard vereist een gesigneerd manifest bij initialisatie, ondertekend door PKIoverheid. Dit is een zinvolle beveiligingsmaatregel maar onrealistisch voor een poc-fase en mogelijk ook voor vroege productie-inzet.

### Suggestie

1. Maak het gesigneerde manifest een eis in het VLAM-profiel (&sect;8.1), niet in de basisstandaard (laag 1).
2. Definieer een overgangspad: in de poc-fase volstaat een ongesigneerd manifest; in productie is signing verplicht.

---

## 10. Guardrails (&sect;5)

### Probleem

De standaard schrijft input- en outputguardrails voor op serverniveau. In de praktijk zijn guardrails effectiever op hostniveau, omdat de host de volledige conversatiecontext heeft. Een server ziet alleen een geïsoleerde tool-aanroep met gestructureerde JSON-input — daar is weinig ruimte voor prompt injection of scope-overschrijding.

### Wat wij deden

Servers valideren input tegen hun JSON-schema (`additionalProperties: false`, required fields). De host bevat guardrails in de systeemprompt (instructies over toon, scope, bronverwijzing).

### Suggestie

1. Maak onderscheid tussen *schemavalidatie* (server-verantwoordelijkheid, altijd verplicht) en *inhoudelijke guardrails* (host-verantwoordelijkheid, afhankelijk van use case).
2. De eis "outputguardrails op serverniveau" is moeilijk te implementeren zonder dat de server zelf een LLM aanroept. Verduidelijk wat hiermee wordt bedoeld voor servers die enkel gestructureerde data retourneren.

---

## 11. Idempotentie (&sect;7)

### Probleem

De standaard stelt "muterende tools zijn idempotent waar technisch mogelijk". Dit is een goede richtlijn maar moeilijk af te dwingen bij de achterliggende systemen. Veel overheidssystemen accepteren geen dubbele indieningen.

### Wat wij deden

De mock-implementatie van `indienen` (RVO) genereert een deterministische referentienummer op basis van regeling-ID en KvK-nummer. Bij een echte API zou idempotentie een idempotency-key in het request vereisen.

### Suggestie

Beschrijf een concreet idempotentie-patroon, bijv. het meesturen van een `idempotencyKey` als verplicht veld bij muterende tools. Dit geeft server-implementers houvast.

---

## 12. Overige observaties

### 12.1 Resources vs Tools: wanneer wat?

De standaard beschrijft Resources als read-only en Tools als read+mutate. In de praktijk is de grens niet altijd helder. De KvK-server biedt bedrijfsgegevens als Resource (logisch), maar de RegelRecht-server biedt een regelingcheck als Tool (ook logisch, want er wordt logica uitgevoerd). Beide zijn read-only. Het onderscheid "data ophalen" vs "logica uitvoeren" is bruikbaar maar zou explicieter mogen.

### 12.2 Foutafhandeling bij onbeschikbaarheid

De standaard beschrijft een foutpatroon (&sect;5.3) maar niet hoe de host moet omgaan met een server die helemaal niet start (bijv. crash bij initialisatie). In de poc hebben wij een `health`-endpoint op de host die de status van elke server toont. Dit patroon zou in de standaard kunnen worden opgenomen.

### 12.3 Cross-server orchestratie door de host

De standaard (&sect;5.4, &sect;7.1) stelt terecht dat de host alle cross-server interacties orkestreert. In de praktijk (PDR-003) bleek dat sommige LLM-platformen (VLAM/UbiOps) niet betrouwbaar tool-calling ondersteunen, waardoor de host een eigen orchestratielaag moet bouwen. De standaard zou kunnen erkennen dat de host niet altijd een LLM met native tool-calling is, en dat orchestratie ook via tekst-gebaseerde interactie kan verlopen.

---

## 13. Vervolgacties poc-moza

Punten die tijdens de implementatie zijn geidentificeerd maar buiten de huidige poc-scope vallen.

| # | Onderwerp | Toelichting | Prioriteit |
|---|-----------|-------------|------------|
| 1 | Deterministisch terugkoppelen van lopende zaken | Na een muterende actie (bijv. RVO `indienen`) wordt het referentienummer en de status "lopende zaak" nu meegegeven in de tool-response. Het LLM vertelt dit hopelijk door, maar dat is niet gegarandeerd. In productie moet dit deterministisch zijn: de host toont een vaste bevestigingskaart (referentienummer, status, link naar 'Lopende zaken') ongeacht wat het LLM genereert. | Hoog |
| 2 | Afhandeltermijnen uit regelgeving | De verwachte afhandeltermijn bij een indiening staat in wetgeving (Awb of specifieke regeling). Dit zou via RegelRecht opgehaald kunnen worden in plaats van hardcoded. | Middel |
| 3 | Provenance-check voor tool-responses in validator | De validator toetst herkomstmetadata alleen bij resources. Alle vier poc-servers retourneren ook provenance bij tools, maar dit wordt niet gevalideerd. | Middel |
| 4 | Consent-flow implementeren | Per-server toestemming vragen aan de gebruiker voordat een bron wordt geraadpleegd. Vereist protocol-uitbreiding of host-side oplossing. | Hoog |
| 5 | Logging uitbreiden naar standaardformaat | Servers loggen nu 2-3 van 10 verplichte velden. Na verduidelijking van server- vs host-logvelden (zie sectie 5) uitbreiden. | Laag |
| 6 | Systeemprompt-instructie voor lopende zaken | Als tussenoplossing voor punt 1: instructie in systeemprompt opnemen dat het LLM altijd referentienummer en "lopende zaak"-status vermeldt na een indiening. | Middel |

---

## Bijlage: getoetste servers

| Server | Type | Tools | Resources | Herkomst | ToolAnnotations | Audit log |
|--------|------|-------|-----------|----------|-----------------|-----------|
| KvK | Resources + Tools | `mijn_bedrijf` | Basisprofiel (template) | Ja | Ja (3/3 hints) | Ja (2/10 velden) |
| KOOP | Resources + Tools | `zoek_regelgeving` | Wet of regeling (template) | Ja | Ja (3/3 hints) | Ja (2/10 velden) |
| RegelRecht | Tools | `check` | - | Ja | Ja (3/3 hints) | Ja (2/10 velden) |
| RVO | Tools | `zoek_regeling`, `indienen` | - | Ja | Ja (3/3 hints) | Ja (2/10 velden) |
