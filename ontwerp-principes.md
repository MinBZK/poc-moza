# Ontwerpprincipes MijnOverheid Zakelijk

## Context

Dit document beschrijft de ontwerpprincipes en technische keuzes die ten grondslag liggen aan het prototype van MijnOverheid Zakelijk. Het prototype wordt ingezet voor gebruikersonderzoek en dient als referentie voor de uiteindelijke realisatie.

### Ontwerpen in code

Het ontwerpproces vindt niet plaats in grafische design tooling zoals Figma of Sketch, maar direct in front-end code: HTML, CSS en waar nodig JavaScript. Design tooling voegt een vertaalstap toe tussen ontwerp en eindresultaat — een vertaalstap die tijd kost, informatie verliest en afwijkingen introduceert. Door direct in het daadwerkelijke medium te werken vervalt die vertaling. Wat ontworpen wordt, is direct wat de gebruiker te zien krijgt.

Dit biedt een aantal concrete voordelen:

- **Direct resultaat** — een wijziging in de code is onmiddellijk zichtbaar in de browser. Er is geen export, overdracht of herinterpretatie nodig.
- **Echte interactie** — hover-staten, toetsenbordnavigatie, focusgedrag en animaties zijn direct te ervaren en te testen. In statische ontwerpen blijven deze onzichtbaar.
- **Toegankelijkheid vanaf het begin** — semantische HTML, ARIA-attributen en toetsenbordbediening zijn onderdeel van het ontwerpproces, niet iets dat er later aan toegevoegd wordt.
- **Eén bron van waarheid** — de code is het ontwerp. Er ontstaat geen discrepantie tussen wat in een ontwerptool staat en wat daadwerkelijk gebouwd is.
- **Lagere drempel voor wijzigingen** — aanpassingen naar aanleiding van gebruikersonderzoek of feedback worden direct in de code doorgevoerd, zonder tussenliggende stappen of afhankelijkheden van specifieke tooling.

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

### 5. De eenvoudigst mogelijke oplossing

Elk ontwerpvraagstuk wordt beantwoord met de eenvoudigst mogelijke technische oplossing die het probleem daadwerkelijk oplost. Complexiteit wordt pas toegevoegd wanneer eenvoud aantoonbaar tekortschiet.

- **HTML en CSS waar het kan, JavaScript waar het moet** — standaard browsergedrag en semantische HTML lossen verrassend veel interactieproblemen op zonder aanvullende code. JavaScript wordt alleen toegevoegd wanneer de gewenste functionaliteit niet met HTML en CSS te realiseren is.
- **Platform boven framework** — het ontwerp leunt op wat de browser al biedt: native formuliervalidatie, `<details>`/`<summary>` voor in- en uitklapbare secties, CSS voor responsiviteit. Frameworks en bibliotheken worden alleen ingezet als het platform aantoonbaar niet volstaat.
- **Minder is beter te onderhouden** — elke extra laag technologie is een extra laag die begrepen, onderhouden en getest moet worden. Door de oplossing zo dicht mogelijk bij de basis te houden, blijft het prototype toegankelijk voor een breed team en is het eenvoudiger over te dragen naar de uiteindelijke realisatie.

### 6. Prototypen als communicatiemiddel

Het prototype is geen afgewerkt product maar een communicatiemiddel. Het wordt ingezet om ontwerpbeslissingen te toetsen in gebruikersonderzoek en om gesprekken met stakeholders concreet te maken.

- **Echte HTML en CSS** — het prototype is gebouwd met dezelfde technologie als het uiteindelijke product. Dit geeft een realistischer beeld dan statische ontwerpen en maakt het mogelijk om interactie, toegankelijkheid en responsiviteit vroegtijdig te toetsen.
- **Iteratief proces** — het ontwerp wordt stapsgewijs verbeterd op basis van inzichten uit gebruikersonderzoek. Componenten en pagina's worden aangepast, niet vanaf nul opnieuw gemaakt.

### 7. Iteratief ontwerpen tussen vandaag en morgen

Het ontwerpproces beweegt zich continu tussen twee perspectieven: wat we nu kunnen bouwen en valideren, en waar we uiteindelijk naartoe willen. De stip op de horizon geeft richting, ook als die op dit moment technisch, juridisch of organisatorisch nog niet bereikbaar is.

- **Ontwerpen op aannames, valideren met gebruikers** — niet elk ontwerpbesluit kan vooraf onderbouwd worden met onderzoek. Waar directe inzichten ontbreken, formuleren we expliciete aannames die we zo snel mogelijk met gebruikers toetsen. Onderzoek en ontwerp wisselen elkaar voortdurend af.
- **De stip op de horizon als kompas** — sommige oplossingen zijn nu nog niet realiseerbaar: wetgeving staat het niet toe, systemen zijn er nog niet klaar voor, of de organisatie moet eerst anders ingericht worden. Toch ontwerpen we alvast voor die toekomst, zodat we daar klaar voor zijn wanneer de randvoorwaarden veranderen.
- **Kleine stappen in de goede richting** — elk increment levert iets op dat getest en gebruikt kan worden, maar brengt het ontwerp ook dichter bij het grotere doel. We kiezen bewust voor oplossingen die zowel op korte termijn waarde leveren als op lange termijn passen in het toekomstbeeld.

## Technische ontwerpkeuzes

De stylesheets maken gebruik van moderne CSS-functionaliteit die breed ondersteund wordt door de huidige generatie browsers. Dit maakt preprocessors en polyfills overbodig en houdt de technische stack zo dicht mogelijk bij het webplatform.

### Logical properties

De stylesheets maken gebruik van CSS logical properties (`inline-size`, `margin-block-start`, `padding-inline`) in plaats van physical properties (`width`, `margin-top`, `padding-left`). Dit maakt de CSS toekomstbestendig voor meertalige ondersteuning en verschillende schrijfrichtingen.

### CSS nesting en custom properties

De stylesheets maken gebruik van native CSS nesting voor component-staten en varianten, en CSS custom properties voor alle ontwerp-waarden. Er worden geen preprocessors zoals Sass gebruikt.

### Statische site-generatie

[Eleventy](https://www.11ty.dev/) wordt ingezet om herhalende elementen (header, footer, navigatie) als includes te beheren en pagina's te genereren. Dit houdt de HTML van individuele pagina's schoon en onderhoudbaar.
