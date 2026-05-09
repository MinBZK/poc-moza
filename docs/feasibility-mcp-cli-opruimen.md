# Bijlage E — Kandidaten voor opruimen

| Veld | Waarde |
|---|---|
| Status | Voorstel — wacht op review |
| Datum | 9 mei 2026 |
| Hoort bij | [feasibility-mcp-cli.md](feasibility-mcp-cli.md) |

> **Werkwijze**: niets is verwijderd. Per item staat de motivatie, het risico en de aanbevolen actie. Beoordeel elk item afzonderlijk. Pas na akkoord wordt het in een tweede commit verwijderd.

## Categorieën

1. **Dood** — Aantoonbaar nergens gebruikt; verwijdering heeft geen effect.
2. **Verouderd** — Beschrijft een eerdere staat van de code; misleidend voor nieuwkomers.
3. **Misleidend** — Bestand staat niet op de plek of onder de naam die de inhoud suggereert.
4. **Hygiëne** — Niet schadelijk, maar hoort niet in versiebeheer (logs, caches).

---

## 1. `mcp/README.md` (en de hele `mcp/`-map)

**Categorie**: Verouderd
**Pad**: `mcp/README.md` (de map bevat alleen dit bestand)
**Bevestigd**: alleen één bestand; `git ls-files mcp` toont `mcp/README.md` en niets anders.

**Motivatie**: deze README beschrijft de architectuur in oude paden (`mcp/host/`, `mcp/servers/`) die sinds commit `7e9d16c` niet meer bestaan. De huidige paden staan in `services/`. Wie de repo voor het eerst opent, ziet bovenaan een `mcp/`-map staan náást `services/` en gaat aannemen dat ze elk iets eigens doen.

**Risico bij verwijderen**: laag. Inhoud is gedupliceerd en uitgebreid in `services/README.md`.

**Voorstel**: verwijder de hele `mcp/`-map.

---

## 2. `debug-storybook.log`

**Categorie**: Hygiëne
**Pad**: `debug-storybook.log` (2,3 KB)
**Tracked**: ja.

**Motivatie**: een ad-hoc debug-log van een Storybook-build. Wijzigt niet, voegt geen waarde toe in versiebeheer.

**Voorstel**: verwijder het bestand én voeg `*.log` toe aan `.gitignore`.

---

## 3. `skills-internet/` (lege map)

**Categorie**: Dood
**Pad**: `skills-internet/`

**Motivatie**: lege map die als bestand wordt getoond door git (`git ls-files` retourneert hem). Geen referentie elders. Mogelijk bedoeld als plek voor de internet.nl-skills, maar die zijn nu via het `internet:`-skill-prefix beschikbaar in Claude Code zelf.

**Risico bij verwijderen**: laag.

**Voorstel**: verwijder de map.

---

## 4. `skills-lock.json` plus `.agents/skills/caveman/`

**Categorie**: Verouderd
**Paden**: `skills-lock.json` en `.agents/skills/caveman/SKILL.md` (beide getrackt)

**Motivatie**: `skills-lock.json` is een lockfile die bij de getrackte skill `caveman` hoort. Die skill is een "ultra-gecomprimeerde communicatie-modus" zonder verband met het MOZa-project (geen verwijzingen in CLAUDE.md, README, of code). Lijkt een experiment dat is blijven hangen.

**Risico bij verwijderen**: laag. Mocht iemand erop willen leunen, dan herstellen we het uit git-history.

**Voorstel**: verwijder beide samen — anders blijft één weeskind achter. Eén commit voor "skills-lock + caveman skill".

---

## 5. PDR-004 hernoemen

**Categorie**: Misleidend
**Pad**: `services/decisions/PDR-004-structuur.md`

**Motivatie**: het bestand heet `structuur.md` maar de inhoud is een prompt voor het uitbreiden van de overheidsstandaard met een CLI-profiel — dus eigenlijk een richting voor `moza-mcp-standaard-poc`. Wie zoekt naar "wat zegt de structuur-PDR?" vindt iets totaal anders.

**Bovendien**: PDR-005 ("CLI vs MCP als transport") wordt door de inleiding van PDR-004 als bron gebruikt (cijfers in de tabel komen daarvandaan), terwijl PDR-004 ouder is dan PDR-005. De lees-volgorde klopt niet.

**Voorstel**:
- Hernoem naar `PDR-004-cli-profiel-voor-overheidsstandaard.md` zodat de inhoud uit de naam blijkt.
- Of: vervang door een korte verwijzing naar [bijlage F](feasibility-mcp-cli-standaard-voorstel.md), die dezelfde inhoud bevat in een actuelere versie.

Optie 2 is schoner; optie 1 behoudt audit-trail.

---

## 6. PDR-002 en PDR-003 ("Ongeldig verklaard")

**Categorie**: Niet opruimen — bewust laten staan, wel signaleren
**Paden**: `services/decisions/PDR-002-vlam-timeout-fallback.md`, `services/decisions/PDR-003-vlam-orchestrated-tool-use.md`

**Motivatie**: beide PDRs zijn als "Ongeldig" gemarkeerd; de oplossingen die ze beschrijven zijn uit de codebase verwijderd. Volgens de PDR-conventie blijven ze staan voor audit-trail. Dat is goed.

**Wat verwart**: de twee files staan tussen de geldige PDRs zonder visueel onderscheid in een directory-listing. Iemand die `services/decisions/` opent ziet vijf bestanden zonder te weten dat twee niet meer van toepassing zijn.

**Voorstel**:
- Optie A: voeg een `services/decisions/README.md` toe met een index van geldige vs. historische PDRs.
- Optie B: prefix bestandsnamen met `[ONGELDIG]` (`PDR-002-[ONGELDIG]-vlam-timeout-fallback.md`) — visueel sterk maar minder mooi.
- Geen verandering: de top van het document zegt al "Ongeldig"; lezers die het document openen, weten genoeg.

Wij stellen Optie A voor.

---

## 7. `services/decisions/testvragen.md` herplaatsen

**Categorie**: Misleidend
**Pad**: `services/decisions/testvragen.md`

**Motivatie**: testvragen zijn handig, maar geen *decision*. Hoort niet in `decisions/`.

**Voorstel**: verplaats naar `services/host/test_scenarios_handmatig.md` of `services/test-vragen.md`.

---

## 8. `services/.ruff_cache/`

**Categorie**: Hygiëne
**Pad**: `services/.ruff_cache/`
**Tracked**: nee, maar bestaat lokaal.

**Motivatie**: gegenereerde cache-map van `ruff`. Niet getrackt, maar staat los in de repo.

**Voorstel**: voeg `.ruff_cache/` toe aan `.gitignore` om bestendig op te ruimen. Geen actie op de bestaande directory nodig.

---

## 9. `_test_build/` als top-level directory

**Categorie**: Hygiëne
**Pad**: `_test_build/`
**Tracked**: nee (in `.gitignore`).

**Motivatie**: gitignored, dus geen probleem voor versiebeheer. Wel verwarrend visueel naast `_site/` en `_includes/`. Geen actie nodig in deze ronde.

**Voorstel**: geen verwijdering. Eventueel een korte alinea in README dat `_site/` en `_test_build/` build-output zijn.

---

## 10. `services/host/_site/`

**Categorie**: Hygiëne
**Pad**: `services/host/_site/`
**Tracked**: nee.

**Motivatie**: bestaat lokaal omdat de FastAPI-host de Eleventy-build serveert vanaf datzelfde pad. Het is niet duidelijk waarom er ook een `prompts/` ín `_site/` zit — dit lijkt een runtime-side-effect (bijvoorbeeld de host die een directory aanmaakt). Niet gevaarlijk, niet schadelijk, alleen verrassend.

**Voorstel**: geen actie. Documenteer in `services/host/README.md` (zie aanvullend voorstel hieronder) wanneer en hoe dit ontstaat.

---

## 11. `services/host/README.md` ontbreekt

**Categorie**: Niet opruimen — toevoeging
**Pad**: `services/host/README.md` (niet aanwezig)

**Motivatie**: alle aandacht gaat naar `services/README.md`. Maar de host heeft een eigen subdirectory met prompt-blokken, mcp_client, cli_executor en drie testbestanden. Een korte README in `services/host/` helpt nieuwe ontwikkelaars de structuur te herkennen.

**Voorstel**: voeg een dunne README toe (~30 regels) die per bestand één zin geeft. Geen onderdeel van deze opruim-PR per se, maar een kleinigheid die overweging waard is.

---

## Samenvatting in volgorde van impact

| # | Item | Impact | Aanbevolen |
|---|---|---|---|
| 1 | `mcp/`-map | hoog (verwarrend voor nieuwkomers) | verwijderen |
| 5 | PDR-004 hernoemen of vervangen | middel | vervangen door verwijzing (optie 2) |
| 7 | `testvragen.md` verplaatsen | laag-middel | verplaatsen |
| 6 | README in `services/decisions/` | laag-middel | toevoegen (Optie A) |
| 11 | README in `services/host/` | laag | toevoegen |
| 4 | `skills-lock.json` | laag | verwijderen |
| 3 | `skills-internet/` | laag | verwijderen |
| 2 | `debug-storybook.log` + `.gitignore` | laag | verwijderen + ignore |
| 8 | `.ruff_cache` toevoegen aan ignore | laag | toevoegen aan ignore |

## Voorgestelde commit-strategie

Eén commit per categorie houdt de PR-review hanteerbaar:

1. `❌ verwijder verouderde mcp/-map` — alleen item 1.
2. `🔁 hernoem/vervang PDR-004 + voeg services/decisions/README.md toe` — items 5, 6, 7.
3. `🧼 hygiëne: skills-lock, skills-internet, debug-storybook.log, .gitignore` — items 2, 3, 4, 8.
4. `➕ services/host/README.md` — item 11.

Items 9, 10 zonder actie.
