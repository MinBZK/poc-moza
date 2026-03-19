# Ontwerpprincipes MijnOverheid Zakelijk

## Context

MijnOverheid Zakelijk (MOZa) is een proof-of-concept prototype voor een digitaal portaal waar ondernemers hun overheidszaken op één plek kunnen inzien en beheren. Denk aan belastingen, bedrijfsgegevens, berichtenbox, lopende zaken, personeel en gegevensdeling. Het prototype dient als basis voor gebruikersonderzoek en als referentie voor de uiteindelijke realisatie.

## Ontwerpprincipes

### 1. Toegankelijkheid als fundament

Toegankelijkheid is geen toevoeging achteraf maar een ontwerpuitgangspunt. Elk component wordt vanaf het begin ontworpen en gebouwd met toegankelijkheid in gedachten.

- **Semantische HTML eerst** — het ontwerp maakt gebruik van de juiste HTML-elementen voor de juiste functie. Een knop is een `<button>`, navigatie een `<li>` binnen een `<nav>`, een kop een `<h1>`–`<h6>`.
- **ARIA waar nodig, niet als vervanging** — ARIA-attributen zoals `aria-current="page"`, `aria-disabled` en `aria-invalid` geven staten en relaties aan die niet met HTML alleen uitgedrukt kunnen worden. `aria-disabled` heeft bijvoorbeeld de voorkeur boven het `disabled`-attribuut, omdat het element hiermee bereikbaar blijft voor hulptechnologie.
- **Toetsenbordbediening** — alle interactieve elementen zijn bereikbaar en bedienbaar met het toetsenbord. Focusindicatoren worden getoond via `:focus-visible`, zodat ze zichtbaar zijn bij toetsenbordnavigatie maar niet bij muisinteractie.

### 2. Rijkshuisstijl als visuele basis

Het ontwerp volgt de Rijkshuisstijl: de visuele identiteit van de Rijksoverheid. Dit zorgt voor herkenbaarheid en vertrouwen.

- **Rijkslettertype** — alle tekst wordt weergegeven in het lettertype RijksSansVF.
- **Kleurenpalet** — alle kleuren komen uit het Rijkshuisstijl-palet en worden niet ad hoc gekozen. Het kleurcontrast voldoet aan de WCAG-richtlijnen.
- **Herkenbare patronen** — de componenten sluiten aan bij wat gebruikers verwachten van een overheidswebsite: duidelijke navigatie, voorspelbare interactie en een professionele uitstraling.

### 3. Design tokens als gedeelde taal

Design tokens vormen de brug tussen ontwerp en ontwikkeling. Ontwerp-waarden zoals kleuren, typografie en maatvoering zijn opgeslagen in een centraal JSON-bestand (`tokens.json`) dat zowel vanuit Figma (via Tokens Studio) als vanuit de code bewerkt kan worden.

- **Twee lagen** — de tokens zijn opgedeeld in *opties* (de beschikbare waarden uit de Rijkshuisstijl) en *toepassingen* (semantische verwijzingen die bepalen hoe de opties worden ingezet). In de code worden altijd toepassingsvariabelen gebruikt, nooit opties rechtstreeks.
- **Eén bron van waarheid** — alle ontwerp-waarden leven in `tokens.json`. Style Dictionary vertaalt deze naar CSS custom properties. De gegenereerde CSS-bestanden worden niet handmatig aangepast.
- **Tweerichtingsverkeer** — ontwerpers en ontwikkelaars werken op hetzelfde tokenbestand. Wijzigingen in Figma worden teruggeschreven naar Git en andersom.

### 4. Component-gedreven ontwerp

Het ontwerp is opgebouwd uit herbruikbare componenten die afzonderlijk ontwikkeld, getest en gedocumenteerd worden.

- **Storybook als componentenbibliotheek** — elk component heeft een story met varianten, beschrijvingen en configureerbare controls. Dit maakt het mogelijk om componenten te bekijken, te testen en te documenteren los van de pagina's waarin ze uiteindelijk worden gebruikt.
- **Van component naar pagina** — pagina's zijn samengesteld uit bestaande componenten. Dit zorgt voor consistentie en vermindert duplicatie.
- **Documentatie bij de code** — elke story bevat een beschrijving die uitlegt wanneer en hoe het component ingezet wordt. De componentenbibliotheek dient daarmee zowel als visuele referentie als gebruikershandleiding.

### 5. Prototypen als communicatiemiddel

Het prototype is geen afgewerkt product maar een communicatiemiddel. Het wordt ingezet om ontwerpbeslissingen te toetsen in gebruikersonderzoek en om gesprekken met stakeholders concreet te maken.

- **Echte HTML en CSS** — het prototype is gebouwd met dezelfde technologie als het uiteindelijke product. Dit geeft een realistischer beeld dan statische ontwerpen en maakt het mogelijk om interactie, toegankelijkheid en responsiviteit vroegtijdig te toetsen.
- **Iteratief proces** — het ontwerp wordt stapsgewijs verbeterd op basis van inzichten uit gebruikersonderzoek. Componenten en pagina's worden aangepast, niet vanaf nul opnieuw gemaakt.

## Technische ontwerpkeuzes

### Logical properties

De stylesheets maken gebruik van CSS logical properties (`inline-size`, `margin-block-start`, `padding-inline`) in plaats van physical properties (`width`, `margin-top`, `padding-left`). Dit maakt de CSS toekomstbestendig voor meertalige ondersteuning en verschillende schrijfrichtingen.

### CSS nesting en custom properties

De stylesheets maken gebruik van native CSS nesting voor component-staten en varianten, en CSS custom properties voor alle ontwerp-waarden. Er worden geen preprocessors zoals Sass gebruikt.

### Statische site-generatie

Eleventy wordt ingezet om herhalende elementen (header, footer, navigatie) als includes te beheren en pagina's te genereren. Dit houdt de HTML van individuele pagina's schoon en onderhoudbaar.
