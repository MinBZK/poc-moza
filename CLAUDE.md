# CLAUDE.md — MOZa projectrichtlijnen

Dit bestand wordt automatisch geladen bij elke Claude Code-sessie. Het bevat de kernregels uit de ontwerp-principes en schrijfwijzer zodat alle wijzigingen aan het prototype consistent zijn.

## Project

MijnOverheid Zakelijk (MOZa) — een HTML/CSS/JS prototype gebouwd met Eleventy en gedocumenteerd in Storybook. Geen frameworks, geen preprocessors. De code is het ontwerp.

- Prototype: `moza/` (zakelijk) en `mobu/` (burger)
- Storybook stories: `stories/`
- Styling: `style/style.css` (gebruik altijd toepassingstokens uit _toepassing.css, nooit opties rechtstreeks uit _rijkshuisstijl.css)
- Design tokens: `tokens/tokens.json` → Style Dictionary aangevuld met sd-transforms → CSS custom properties
- JavaScript: `assets/javascript/`
- Includes: `_includes/`
- Build output: `_site/` (niet handmatig bewerken)

## Ontwerp-principes (kernregels)

1. **Semantische HTML eerst** — gebruik de juiste elementen (`<button>`, `<nav>`, `<fieldset>`, `<h1>`–`<h6>`). ARIA alleen waar HTML niet volstaat.
2. **Toegankelijkheid altijd** — toetsenbordnavigatie, `:focus-visible`, `aria-current`, `aria-disabled` (niet `disabled`). Test met diverse invoer- (toetsenbord, spraak) en uitvoermethoden (screenreader, braille).
3. **CSS logical properties** — gebruik `inline-size`, `block-size`, `margin-block-start`, `padding-inline` etc. Nooit `width`, `height`, `margin-top`, `padding-left`.
4. **Design tokens** — gebruik altijd `--toepassing-*` variabelen, nooit `--rijkshuisstijl-*` of hardcoded waarden.
5. **Eenvoudigst mogelijke oplossing** — HTML en CSS waar het kan, JavaScript waar het moet. Platform boven framework.
6. **Spacing** — gebruik `> * + *` met margin voor content flow, `gap` met flex/grid voor component-layouts. Nooit beide tegelijk op dezelfde container.
7. **Feature flags** — gebruik `data-feature="Naam"` en `data-feature-type="pagina|functionaliteit"` om elementen togglebaar te maken. Features die standaard uit staan krijgen `data-feature-default="off"`.

## Schrijfwijzer (kernregels)

### Aanspreking en toon

- Spreek de gebruiker aan met **"u"** en **"uw"**, nooit "je" of "jij"
- Genderneutraal: gebruik "die" of "diegene" als verwijswoord, niet "hij", "zij" of "hij/zij"
- Formeel maar toegankelijk, B1-taalniveau
- Actief boven passief: "Bekijk uw gegevens" niet "Uw gegevens kunnen bekeken worden"

### Terminologie

- Bewaar (niet Opslaan, Favoriet)
- Niet relevant (niet Verbergen, Verwijderen)
- Deel (niet Verstuur, Doorsturen)
- Berichten / Berichtenbox (niet Post, E-mail, Inbox)
- Bedrijfsgegevens (niet Gegevens, Profiel)
- Lopende zaken (niet Taken, Dossiers)
- Actualiteiten (niet Nieuws, Updates, Feed)
- Opslaan (formulieren), Annuleren (formulieren afbreken)

### Notatie

- Datums: dag maandnaam jaar (12 februari 2018), volledige maandnaam
- Gedachtestreep (—) voor scheiding: "19 februari 2026 — De Stationsweg is afgesloten."
- Typografische aanhalingstekens in lopende tekst: "dubbel" en 'enkel', ook in samentrekkingen (MKB'er, ZZP'er, komma's)
- Rechte quotes alleen in code en HTML-attributen
- Kopteksten als zelfstandige naamwoorden, geen punt aan het einde

### Microcopy

- Knopteksten kort en werkwoord-gericht: "Opslaan", "Annuleren", "Inloggen"
- Lege staten: benoem wat er nog niet is én geef een suggestie wat te doen
- Foutmeldingen: constructief en handelingsgericht, benoem wat nodig is

## Technische conventies

- Nunjucks includes voor herhalende patronen (`_includes/`)
- `action-group.njk` voor de actiegroep (Bewaar, Deel, Relevant/Niet relevant)
- De `.visually-hidden` span in action-group wordt automatisch gevuld door JS op basis van de heading
- Reserve-topics: `<li hidden class="reserve-topic">` schuiven door bij het verbergen van items
- Animaties bij verbergen/herstellen: `.remove-item` (fade naar beneden) en `.restore-item` (fade naar boven)
- Accountwisselaar staat achter feature flag `data-feature-default="off"`

## Volledig referentie

- Ontwerp-principes: `ontwerp-principes.md`
- Schrijfwijzer: `stories/Schrijfwijzer.mdx`
- Storybook documentatie: `stories/OverDitPrototype.mdx`
- Ontwerppatronen: `stories/InteracterenOpInhoud.mdx`, `stories/ContextWisselen.mdx`
