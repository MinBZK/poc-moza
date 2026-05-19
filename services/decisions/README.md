# Product Decision Records (PDRs)

Beslissingen rond de Digitale Assistent. Lees de PDRs in volgorde — elke nieuwe beslissing bouwt op de vorige voort.

## Geldige beslissingen

| # | Onderwerp | Status |
|---|---|---|
| [PDR-001](PDR-001-dual-llm-backend.md) | Dual LLM-backend (VLAM + Claude) met gedeelde MCP-tools | Geaccepteerd |
| [PDR-005](PDR-005-cli-vs-mcp-transport.md) | CLI vs MCP als transport voor tool-uitvoering | Geaccepteerd |
| [PDR-006](PDR-006-feasibility-conclusie.md) | Feasibility-conclusie MCP en CLI; uitbreiding overheidsstandaard | Geaccepteerd |

## Vervangen of ongeldig verklaarde beslissingen

Bewust bewaard voor audit-trail; niet meer van toepassing op de codebase.

| # | Onderwerp | Status | Toelichting |
|---|---|---|---|
| [PDR-002](PDR-002-vlam-timeout-fallback.md) | VLAM timeout en graceful fallback | **Ongeldig** sinds 15 april 2026 | VLAM tool-calling stabiliseerde; fallback-logica is verwijderd uit `vlam_host.py`. |
| [PDR-003](PDR-003-vlam-orchestrated-tool-use.md) | VLAM host-gestuurde tool-aanroepen | **Ongeldig** sinds 15 april 2026 | VLAM ondersteunt nu native tool-calling stabiel; orchestratie-modus geschrapt. |
| [PDR-004](PDR-004-cli-profiel-voor-overheidsstandaard.md) | CLI-profiel voor overheidsstandaard | **Vervangen** op 9 mei 2026 | Inhoud overgenomen en uitgebreid in [`docs/feasibility-mcp-cli-standaard-voorstel.md`](../../docs/feasibility-mcp-cli-standaard-voorstel.md). |

## Conventies

- **Bestandsnaam**: `PDR-NNN-korte-titel.md` (engelse-streepjes, lowercase). De titel beschrijft de inhoud, niet alleen het type.
- **Frontmatter**: tabel met Status, Datum, Beslisser(s), Gerelateerd. Bij vervanging of ongeldigheid: voeg een waarschuwingsblok bovenaan toe en zet de status op "Ongeldig" of "Vervangen".
- **Audit-trail**: ongeldig verklaarde of vervangen PDRs blijven staan. Verwijder ze niet — ze documenteren waarom we vandaag staan waar we staan.
- **Test-materiaal** hoort niet hier; testvragen voor handmatige verificatie staan in [`../test-vragen.md`](../test-vragen.md).

## Schrijftips voor een nieuwe PDR

- Begin met **Context** (waarom moest dit besloten worden), dan **Beslissing**, dan **Alternatieven overwogen**, dan **Consequenties**.
- Wees concreet in alternatieven. "We hebben dit overwogen, en hier is waarom we het niet kozen" is waardevoller dan een afgevinkte lijst.
- Verwijs naar code, prompts en validatiekader-dimensies waar van toepassing.
- Een PDR is geen tutorial. Houd het kort genoeg om in tien minuten te lezen; verwijs voor diepe technische details naar de code of een rapport in `docs/`.
