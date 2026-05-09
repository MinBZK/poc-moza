# Bijlage F — Voorstel uitbreiding MCP-standaard met CLI-profiel

| Veld | Waarde |
|---|---|
| Status | Concept-voorstel — wacht op review standaardisatie-groep |
| Datum | 9 mei 2026 |
| Doel-repository | `moza-mcp-standaard-poc` |
| Hoort bij | [feasibility-mcp-cli.md](feasibility-mcp-cli.md), [PDR-006](../services/decisions/PDR-006-feasibility-conclusie.md) |

> Dit document bevat concrete tekstvoorstellen voor de MCP-standaard ([`moza-mcp-standaard-poc/docs/standaard.md`](https://github.com/MinBZK/moza-mcp-standaard-poc/blob/main/docs/standaard.md)) en het validatie-pakket. PDR-004 in `services/decisions/` was een eerdere prompt voor dit werk; dit document is de definitievere versie, met de vondsten uit het feasibility-onderzoek meegenomen.

## Wat verandert er in de standaard

Drie soorten wijzigingen:

1. **Capabiliteit "field-level filtering"** in laag 1 (host-agnostisch). Geldt voor MCP én CLI.
2. **Servereisen aanvullen** met dataminimalisatie en input-schemavalidatie (laatste was impliciet, nu expliciet).
3. **Nieuw deploymentprofiel §8.3 — CLI**, naast het VLAM- en Cloud-profiel.

Daarnaast: drie tekortkomingen die wij in het feasibility-onderzoek hebben gezien en die de standaard nu nog niet adresseert.

---

## §4 — MCP Capabilities (toevoeging)

### §4.4 Field-level filtering (optioneel, aanbevolen)

Servers MOGEN een `fields`-parameter ondersteunen op tool- en resource-aanroepen waarmee de client specificeert welke velden in de response worden teruggegeven. Zonder `fields`-parameter retourneert de server de volledige structuur. Met `fields` retourneert de server alleen de gevraagde velden, plus verplichte provenance-metadata (§4.1, §7).

**Doel**: dataminimalisatie (validatiekader: PV.1, PV.2) en tokenefficiëntie. Onderzoek (MCPVerse 2025; AgentProp-Bench 2026) wijst uit dat agent-runs zonder filtering tot ~147k tokens per taak oplopen, waardoor enkel de zwaarste modellen ze nog kunnen verwerken — dat is in strijd met §2.2 (Least privilege) toegepast op datacirculatie.

**Voorbeeld** (MCP-tool):

```jsonc
// Client → Server
{
  "method": "tools/call",
  "params": {
    "name": "mijn_bedrijf",
    "arguments": {},
    "fields": ["naam", "kvkNummer"]
  }
}

// Server → Client
{
  "data": { "naam": "Test BV Donald", "kvkNummer": "68750110" },
  "provenance": { "source": "...", "timestamp": "...", "version": "..." }
}
```

**Verplichting**: indien een server `fields` ondersteunt, MOET dit werken op alle tools en resources die structured data retourneren. Inconsistente ondersteuning is een afkeuring.

---

## §7 — Servereisen (uitbreiding)

Twee rijen toevoegen aan de bestaande tabel:

| Categorie | Eis |
|---|---|
| **Dataminimalisatie (capability)** | Servers ZOUDEN MOETEN `fields`-parameter ondersteunen op alle data-retournerende tools en resources, conform §4.4. Servers die dit niet ondersteunen, documenteren expliciet waarom (kosten, complexiteit van de bron). |
| **Schemavalidatie** | Servers MOETEN inputs valideren tegen het gepubliceerde `inputSchema` voordat de tool wordt uitgevoerd. Bij ongeldige input wordt een gestructureerde foutmelding geretourneerd zonder dat de tool wordt aangeroepen. |

De andere bestaande rijen blijven ongewijzigd.

---

## §8.3 — CLI-profiel (NIEUW)

Dit profiel geldt wanneer de host MCP-functionaliteit ontsluit via shell-subprocessen (CLI-tools) in plaats van persistent draaiende MCP-servers. Het profiel is bedoeld voor omgevingen met shell-toegang waarin een permanente serverlaag niet nodig of niet wenselijk is — bijvoorbeeld bij lokale agents, scripted batch-runs of organisaties met beperkte server-infrastructuur.

| Aspect | Aanvullende eis |
|---|---|
| **Transport** | Subprocess via stdin/stdout/stderr. Geen permanent server-proces. Iedere aanroep start en stopt opnieuw. |
| **Discovery** | `<cli-naam> --help --json` MOET een JSON-document retourneren met de tool-catalogus in MCP-compatibel formaat (naam, beschrijving, `inputSchema`, `ToolAnnotations`). Dit is de CLI-equivalent van `tools/list`. Aanvullend mag een `<cli-naam> <resource> --help --json` worden ondersteund voor sub-commando's. |
| **Provenance** | Bij `--provenance`-flag MOET de response `data`/`provenance`-wrapper bevatten conform §4.1. Default (zonder flag): rauwe data zonder provenance, voor menselijk gebruik. Voor agentic gebruik wordt `--provenance` aangeraden. |
| **Audit logging** | MOET loggen naar `stderr` (default) of een configureerbaar bestand (env: `*_AUDIT_LOG`). Formaat conform §7 logging-eisen, één regel per aanroep, JSON. |
| **Foutafhandeling** | Gestandaardiseerde exit codes:<br>0 = succes<br>1 = ongeldige input (schemafout, ontbrekende parameters)<br>2 = bron-fout (upstream API-fout)<br>3 = bron niet beschikbaar (timeout, connection refused)<br>4 = autorisatie/consent ontbreekt<br>5 = onverwachte fout<br>Een gestructureerd JSON-error-object op stderr met `error` (machine-leesbare code) en `message` (mens-leesbaar). |
| **Mutatie-bescherming** | Muterende commando's (semantisch equivalent aan `ToolAnnotations.readOnlyHint=False`) MOETEN `--dry-run` ondersteunen (preview zonder uitvoeren) en MOETEN expliciet `--confirm` vereisen voor uitvoering. Zonder `--confirm` exit 1 met een melding over de bevestigingsplicht. |
| **Dataminimalisatie** | `--fields <v1,v2,...>` voor field-level filtering (§4.4). Optioneel `--select <jq-expressie>` voor complexere selecties. |
| **Output-formaat** | `--output raw\|pretty\|table` voor verschillende consumers (agent → `raw`, mens → `pretty`/`table`). |
| **Authenticatie** | Credentials worden meegegeven via omgevingsvariabelen of een config-bestand, **NIET** als CLI-argument (anders staan ze zichtbaar in de procestabel). |
| **Discovery-stabiliteit** | De JSON-output van `--help --json` is een stabiel contract: wijzigingen volgen semantic versioning; breaking changes vereisen een major-bump van de CLI-versie en migratie-aankondiging. |

### §8.3.1 Aanroep-conventie

```
<cli-naam> [globale opties] <resource> <actie> [resource-id] [actie-opties]
```

- **Globale opties**: `--fields`, `--select`, `--output`, `--provenance`, `--dry-run`, `--confirm`, `--help`.
- **Resource**: zelfstandig naamwoord (bijvoorbeeld `basisprofiel`, `regeling`, `rapportage`).
- **Actie**: werkwoord (bijvoorbeeld `get`, `zoek`, `indienen`).

Voorbeeld: `kvk-cli basisprofiel get --provenance --fields naam,kvkNummer --output raw`.

### §8.3.2 `--help --json` formaat

```jsonc
{
  "name": "kvk-cli",
  "version": "0.1.0",
  "description": "CLI voor de KvK API.",
  "tools": [
    {
      "name": "basisprofiel.get",
      "description": "Haal basisprofiel op voor de ingelogde gebruiker.",
      "inputSchema": {
        "type": "object",
        "properties": {
          "kvk_nummer": { "type": "string", "description": "8-cijferig KvK-nummer (default: sessie-gebonden)" }
        },
        "required": []
      },
      "annotations": {
        "readOnlyHint": true,
        "destructiveHint": false,
        "openWorldHint": false
      },
      "supports": {
        "fields": true,
        "select": true,
        "provenance": true,
        "dryRun": true
      }
    }
  ]
}
```

`supports` is nieuw t.o.v. MCP en geeft aan welke optionele capabilities deze tool heeft.

### §8.3.3 Cross-server-equivalentie

Een CLI-implementatie van een tool die ook als MCP-tool bestaat MOET dezelfde semantiek hebben (zelfde input-schema, zelfde response-velden) zodat hosts beide transporten kunnen aanroepen zonder verschillende prompts of post-processing.

---

## Wat de standaard nog niet adresseert

Tijdens het feasibility-onderzoek zagen wij drie gaten in de huidige standaard die los van het CLI-profiel staan. Wij stellen voor deze in een aparte iteratie te adresseren.

### Gap 1: Tool poisoning weerbaarheid

Recent onderzoek (Huang e.a. 2026; arXiv:2603.22489) toont dat tool poisoning — kwaadaardige instructies in tool-beschrijvingen — de meest kritieke aanvalsvector is op MCP-systemen. Onze standaard zegt hier nu niets over.

**Voorstel** (§7 of §3.2 — server-eisen):

> **Tool-metadata integriteit**: tool- en resource-beschrijvingen MOETEN statisch zijn (geen runtime-substitutie van strings die door externe bronnen worden geleverd). De host MOET de tool-definitie hashen bij eerste registratie en bij elke nieuwe sessie verifiëren dat de hash overeenkomt; afwijking is een afkeuring tot opnieuw consent is verkregen.

### Gap 2: Idempotentie-key voor muterende tools

§4.2 zegt "ZOUDEN MOETEN een `idempotencyKey` opnemen". Dat is zwakker dan nodig en niet getoetst.

**Voorstel** (§4.2): bij muterende tools (`readOnlyHint=False`) wordt een `idempotencyKey`-veld in `inputSchema` verplicht (`MOETEN`) tenzij de server expliciet documenteert waarom de actie van zichzelf idempotent is (bijvoorbeeld een `PUT` met deterministisch sleutelpaar).

### Gap 3: Transparantie naar de gebruiker (AI Act Art. 50)

De standaard noemt UI.1, UI.2 voor consent, maar niet de transparantie-melding ("U interacteert met een AI-systeem") die de AI Act voorschrijft.

**Voorstel** (§3.1, host-verantwoordelijkheden):

> **Transparantie-melding**: de host MOET de gebruiker bij sessiestart duidelijk maken dat met een AI-systeem wordt geïnteracteerd, conform AI Act Art. 50, en informeren over welke MCP-servers actief zijn. Deze melding is afdwingbaar voor zowel het VLAM- als Cloud- als CLI-profiel.

---

## Validatie-pakket: nieuwe checks

Aan `mcp_standaard.checks` toe te voegen:

### MCP-checks (extra)

| ID | Check | Standaard-sectie |
|---|---|---|
| `MCP-FIELDS` | Tool/resource ondersteunt `fields`-parameter en retourneert alleen de gevraagde velden | §4.4 |
| `MCP-SCHEMA-VALID` | Server weigert input die niet aan inputSchema voldoet, met een gestructureerde fout | §7 (Schemavalidatie) |
| `MCP-IDEMPOTENT` | Muterende tool retourneert hetzelfde resultaat bij dubbele aanroep met dezelfde `idempotencyKey` | §4.2 |
| `MCP-PROV-FUNC` | Resource-call retourneert valide provenance-metadata (huidige check werkt niet end-to-end door API-mismatch — fix nodig) | §4.1, §7 |
| `MCP-METADATA-HASH` | Tool-metadata blijft hetzelfde tussen twee `tools/list`-aanroepen in dezelfde sessie | nieuwe gap-1-eis |

### CLI-checks (nieuw)

| ID | Check | Standaard-sectie |
|---|---|---|
| `CLI-DISC` | `--help --json` retourneert geldig discovery-document | §8.3.2 |
| `CLI-FIELDS` | `--fields` werkt en retourneert alleen de gevraagde velden | §8.3 |
| `CLI-PROV` | `--provenance` voegt provenance-object toe conform §4.1 | §8.3 |
| `CLI-AUDIT` | Audit-log naar stderr conform formaat | §7 (Logging) |
| `CLI-EXIT` | Exit-codes conform tabel §8.3 | §8.3 |
| `CLI-DRY` | Muterende commando's ondersteunen `--dry-run` en weigeren zonder `--confirm` | §8.3 |
| `CLI-AUTH` | Credentials niet zichtbaar in `ps` (process listing) | §8.3 |
| `CLI-SCHEMA` | Ongeldige input wordt geweigerd met exit 1 + JSON op stderr | §8.3, §7 |

### Validator-bug die we onderweg vonden

Bij KvK-validatie met `--test-uri` rapporteert de validator een ERROR (niet FAIL) wanneer de server een `TextResourceContents` retourneert in plaats van `ReadResourceContents`. Dit is een type-mismatch tussen de KvK-server en `mcp` 1.26.0 — de server is fout, maar de validator presenteert het als infrastructureel probleem zonder duidelijke conclusie. Twee verbeteringen:

1. **Strenger zijn** — een upstream-fout in een bekende provenance-flow mag in de check-output niet als `[ERR]` worden weggemoffeld, maar moet als `[FAIL]` met een actiegerichte hint verschijnen.
2. **Self-test** — voeg een minimale referentie-server toe in `tests/fixtures/` waartegen alle checks groen moeten zijn. Zo detecteer je zelf gebreken in de checks.

### Skill-updates

`mcp-standaard`, `mcp-server-bouwen` en `mcp-validatie` zijn al beschikbaar. Wij stellen voor:

- **`mcp-standaard`** — voeg CLI-profiel toe in het overzicht; vermeld AI Act-relatie en validatiekader-koppeling.
- **`cli-server-bouwen`** (nieuw) — gids voor het bouwen van een conforme CLI-tool, analoog aan `mcp-server-bouwen/SKILL.md`.
- **`mcp-validatie`** — beschrijf alle nieuwe checks; werk voorbeelden bij; documenteer hoe te valideren tegen een server met eigen dependencies (`uv run --with ...`).

---

## ADR voor `moza-mcp-standaard-poc/docs/adr/`

Voorgestelde nieuwe ADR-003: *CLI als deploymentprofiel*.

```markdown
# ADR-003: CLI als deploymentprofiel

| Veld | Waarde |
|---|---|
| Status | Voorgesteld |
| Datum | 2026-05-09 |
| Beslisser(s) | Standaardisatie-groep |
| Gerelateerd | ADR-001, ADR-002, [poc-moza/PDR-006](https://github.com/.../PDR-006-feasibility-conclusie.md) |

## Context

De huidige standaard kent twee deploymentprofielen: VLAM (on-premise) en Cloud (managed AI-platform). Het feasibility-onderzoek in poc-moza toonde dat een CLI-implementatie van dezelfde overheidsbronnen functioneel gelijkwaardig is en in praktische omgevingen (lokale agents, scripted batch, organisaties zonder Python/MCP-runtime) lichter inzetbaar is.

Token-meting bevestigt dat een CLI met `--fields naam,kvkNummer` een 97% kleinere response retourneert dan de volledige API-response. Onderzoek (MCPVerse 2025, AgentProp-Bench 2026) wijst uit dat field-filtering geen luxe is maar voorwaarde voor betrouwbare agentic operatie.

## Beslissing

Voeg een derde profiel `§8.3 CLI` toe aan de standaard. De host-agnostische eisen in laag 1 (provenance, audit, schemavalidatie) blijven onveranderd. Het CLI-profiel beschrijft hoe diezelfde eisen via shell-subprocessen worden afgedwongen.

## Gevolgen

- Standaard wordt transport-agnostisch.
- Bestaande MCP-servers veranderen niet.
- Validatiepakket breidt uit met CLI-checks.
- Compliance-instrument blijft één: `mcp-standaard validate ...`, met sub-modi voor MCP en CLI.

## Alternatieven overwogen

- **Aparte standaard voor CLI**: introduceert fragmentatie; gedeelde eisen (§7) zouden in twee documenten moeten staan met onderhoudsoverhead.
- **CLI alleen als interne implementatie, niet in de standaard**: organisaties kunnen dan toch CLI's bouwen, maar zonder eenduidige eisen ontstaan hetzelfde probleem dat MCP nu oplost — fragmentatie.
```

---

## Voorgesteld stappenplan voor de standaardisatie-groep

1. **Week 1** — bespreek dit voorstel; verzamel commentaar van Geonovum, Logius, BZK.
2. **Week 2-3** — verwerk feedback; pull request op `moza-mcp-standaard-poc` met §4.4, §7-aanvulling, §8.3 en ADR-003.
3. **Week 4** — implementeer de nieuwe checks in `mcp_standaard.checks`; voeg referentie-server toe in `tests/fixtures/`.
4. **Week 5** — release `mcp-standaard` v0.3 met de uitbreidingen; update de drie skills.
5. **Week 6** — valideer poc-moza opnieuw tegen de nieuwe versie; sluit feasibility-traject af met een definitieve PDR-007.

## Open vragen voor de groep

1. Is `--fields` als optionele capability sterk genoeg, of moet het verplicht worden voor alle data-retournerende tools/resources?
2. Hoe gaat het CLI-profiel om met streaming responses (relevant voor lange wetteksten of grote subsidielijsten)? MCP heeft hier een progress-mechanisme; CLI heeft `stdout` per regel — wij stellen voor dit later te formaliseren.
3. Moet de host de `--help --json`-output cachen en hashen (gap-1 idee, toegepast op CLI)? Dit voorkomt dat een gemanipuleerde CLI tussen twee runs van inhoud verandert.
4. Hoe verhoudt zich dit profiel tot Digikoppeling/FSC? Een CLI-tool die FSC gebruikt voor de upstream call is denkbaar; documenteren we dat in §6 (Relatie met bestaande overheidsbouwstenen).
