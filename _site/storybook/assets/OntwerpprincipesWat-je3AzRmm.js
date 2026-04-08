import{u as r,j as e,M as o}from"./blocks-CU519ART.js";import"./preload-helper-Dp1pzeXC.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-DLl1_a5I.js";function t(i){const n={code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",h4:"h4",li:"li",p:"p",strong:"strong",ul:"ul",...r(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(o,{title:"Introductie/Ontwerpprincipes: Wat — Visie en principes"}),`
`,e.jsx(n.h1,{id:"wat--visie-principes-en-uitgangspunten",children:"Wat — Visie, principes en uitgangspunten"}),`
`,e.jsx(n.h3,{id:"ontwerp-met-de-eindgebruiker-centraal",children:"Ontwerp met de eindgebruiker centraal"}),`
`,e.jsx(n.p,{children:"Goed ontwerp begint bij luisteren. Daarom betrekken wij eindgebruikers vanaf het allereerste moment bij ons ontwerpproces. We starten met het in kaart brengen van hun dagelijkse praktijk: waar lopen zij tegenaan, wat kost onnodig tijd of frustratie, en waar liggen juist kansen? Door zowel pijnpunten als wensen expliciet te inventariseren, creëren we een scherp en gedeeld beeld van wat er echt toe doet."}),`
`,e.jsx(n.h4,{id:"van-idee-tot-initiatief",children:"Van idee tot initiatief"}),`
`,e.jsx(n.p,{children:"Het ministerie van Binnenlandse Zaken en Koninkrijksrelaties heeft in 2024 MKB'ers en ZZP'ers uitgenodigd om samen over oplossingen na te denken. Zij kwamen met het voorstel voor een centrale Mijn-omgeving, iets dat in de basis lijkt op MijnOverheid. Daar hebben ze zelf ontwerpen voor bedacht. Met die plannen werken we nu verder."}),`
`,e.jsx(n.h4,{id:"van-inzicht-naar-eindproduct",children:"Van inzicht naar eindproduct"}),`
`,e.jsx(n.p,{children:"In interactieve sessies, interviews en gebruikerstests leggen we onze inzichten en ideeën voor aan de eindgebruikers. Zo toetsen we aannames en krijgen we waardevolle feedback op functionaliteit, gebruiksgemak en flows. Deze inzichten vormen de basis voor onze ontwerprichtingen."}),`
`,e.jsx(n.p,{children:"Voor gebruikerstests maken we vaak gebruik van interactieve prototypes. We gebruiken ze als hulpmiddel om samen te verkennen, keuzes te onderbouwen en verbeteringen door te voeren. De feedback die we ophalen verwerken we direct in het ontwerp, waarna we opnieuw testen en itereren."}),`
`,e.jsx(n.p,{children:"Door deze continue cyclus van onderzoeken, ontwerpen, testen en verfijnen zorgen we ervoor dat wat we bouwen aansluit op de behoeften en verwachtingen van eindgebruikers. Waar directe inzichten nog ontbreken, werken we op basis van expliciete aannames. Deze aannames maken we zo snel mogelijk toetsbaar door ze te vertalen naar concrete ontwerpen die we voorleggen aan gebruikers."}),`
`,e.jsx(n.h3,{id:"ontwerpen-in-code",children:"Ontwerpen in code"}),`
`,e.jsx(n.p,{children:"Het ontwerpproces vindt niet plaats in grafische design tooling zoals Figma of Sketch, maar direct in front-end code: HTML, CSS en waar nodig JavaScript. Design tooling voegt een vertaalstap toe tussen ontwerp en eindresultaat — een vertaalstap die tijd kost, informatie verliest en afwijkingen introduceert. Door direct in het daadwerkelijke medium te werken vervalt die vertaling. Wat ontworpen wordt, is direct wat de gebruiker te zien krijgt."}),`
`,e.jsx(n.p,{children:"Dit biedt een aantal concrete voordelen:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Direct resultaat"})," — een wijziging in de code is onmiddellijk zichtbaar in de browser. Er is geen export, overdracht of herinterpretatie nodig."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Echte interactie"})," — hover-staten, toetsenbordnavigatie, focusgedrag en animaties zijn direct te ervaren en te testen. In statische ontwerpen blijven deze onzichtbaar."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Toegankelijkheid vanaf het begin"})," — semantische HTML, ARIA-attributen en toetsenbordbediening zijn onderdeel van het ontwerpproces, niet iets dat er later aan toegevoegd wordt."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Eén bron van waarheid"})," — de code is het ontwerp. Er ontstaat geen discrepantie tussen wat in een ontwerptool staat en wat daadwerkelijk gebouwd is."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Lagere drempel voor wijzigingen"})," — aanpassingen naar aanleiding van gebruikersonderzoek of feedback worden direct in de code doorgevoerd, zonder tussenliggende stappen of afhankelijkheden van specifieke tooling."]}),`
`]}),`
`,e.jsx(n.h2,{id:"ontwerpprincipes",children:"Ontwerpprincipes"}),`
`,e.jsx(n.h3,{id:"1-toegankelijkheid-als-fundament",children:"1. Toegankelijkheid als fundament"}),`
`,e.jsx(n.p,{children:"Toegankelijkheid is geen toevoeging achteraf maar een ontwerpuitgangspunt. Elk component wordt vanaf het begin ontworpen en gebouwd met toegankelijkheid in gedachten."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Semantische HTML eerst"})," — het ontwerp maakt gebruik van de juiste HTML-elementen voor de juiste functie. Een knop is een ",e.jsx(n.code,{children:"<button>"}),", navigatie een ",e.jsx(n.code,{children:"<li>"})," binnen een ",e.jsx(n.code,{children:"<nav>"}),", een kop een ",e.jsx(n.code,{children:"<h1>"}),"–",e.jsx(n.code,{children:"<h6>"}),"."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"ARIA waar nodig, niet als vervanging"})," — ARIA-attributen zoals ",e.jsx(n.code,{children:'aria-current="page"'}),", ",e.jsx(n.code,{children:"aria-disabled"})," en ",e.jsx(n.code,{children:"aria-invalid"})," geven staten en relaties aan die niet met HTML alleen uitgedrukt kunnen worden. ",e.jsx(n.code,{children:"aria-disabled"})," heeft bijvoorbeeld de voorkeur boven het ",e.jsx(n.code,{children:"disabled"}),"-attribuut, omdat het element hiermee bereikbaar blijft voor hulptechnologie."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Toetsenbordbediening"})," — alle interactieve elementen zijn bereikbaar en bedienbaar met het toetsenbord. Focusindicatoren worden getoond via ",e.jsx(n.code,{children:":focus-visible"}),", zodat ze zichtbaar zijn bij toetsenbordnavigatie maar niet bij muisinteractie."]}),`
`]}),`
`,e.jsx(n.h3,{id:"2-rijkshuisstijl-als-visuele-basis",children:"2. Rijkshuisstijl als visuele basis"}),`
`,e.jsx(n.p,{children:"Het ontwerp volgt de Rijkshuisstijl: de visuele identiteit van de Rijksoverheid. Dit zorgt voor herkenbaarheid en vertrouwen."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Rijkslettertype"})," — alle tekst wordt weergegeven in het lettertype RijksSansVF."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Kleurenpalet"})," — alle kleuren komen uit het Rijkshuisstijl-palet en worden niet ad hoc gekozen. Het kleurcontrast voldoet aan de WCAG-richtlijnen."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Herkenbare patronen"})," — de componenten sluiten aan bij wat gebruikers verwachten van een overheidswebsite: duidelijke navigatie, voorspelbare interactie en een professionele uitstraling."]}),`
`]}),`
`,e.jsx(n.h3,{id:"3-design-tokens-als-gedeelde-taal",children:"3. Design tokens als gedeelde taal"}),`
`,e.jsxs(n.p,{children:["Design tokens vormen de brug tussen ontwerp en ontwikkeling. Ontwerp-waarden zoals kleuren, typografie en maatvoering zijn opgeslagen in een centraal JSON-bestand (",e.jsx(n.code,{children:"tokens.json"}),") dat zowel vanuit Figma (via Tokens Studio) als vanuit de code bewerkt kan worden."]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Twee lagen"})," — de tokens zijn opgedeeld in ",e.jsx(n.em,{children:"opties"})," (de beschikbare waarden uit de Rijkshuisstijl) en ",e.jsx(n.em,{children:"toepassingen"})," (semantische verwijzingen die bepalen hoe de opties worden ingezet). In de code worden altijd toepassingsvariabelen gebruikt, nooit opties rechtstreeks."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Eén bron van waarheid"})," — alle ontwerp-waarden leven in ",e.jsx(n.code,{children:"tokens.json"}),". Style Dictionary vertaalt deze naar CSS custom properties. De gegenereerde CSS-bestanden worden niet handmatig aangepast."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Tweerichtingsverkeer"})," — ontwerpers en ontwikkelaars werken op hetzelfde tokenbestand. Wijzigingen in Figma worden teruggeschreven naar Git en andersom."]}),`
`]}),`
`,e.jsx(n.h3,{id:"4-component-gedreven-ontwerp",children:"4. Component-gedreven ontwerp"}),`
`,e.jsx(n.p,{children:"Het ontwerp is opgebouwd uit herbruikbare componenten die afzonderlijk ontwikkeld, getest en gedocumenteerd worden."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Storybook als componentenbibliotheek"})," — elk component heeft een story met varianten, beschrijvingen en configureerbare controls. Dit maakt het mogelijk om componenten te bekijken, te testen en te documenteren los van de pagina's waarin ze uiteindelijk worden gebruikt."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Van component naar pagina"})," — pagina's zijn samengesteld uit bestaande componenten. Dit zorgt voor consistentie en vermindert duplicatie."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Documentatie bij de code"})," — elke story bevat een beschrijving die uitlegt wanneer en hoe het component ingezet wordt. De componentenbibliotheek dient daarmee zowel als visuele referentie als gebruikershandleiding."]}),`
`]}),`
`,e.jsx(n.h3,{id:"5-de-eenvoudigst-mogelijke-oplossing",children:"5. De eenvoudigst mogelijke oplossing"}),`
`,e.jsx(n.p,{children:"Elk ontwerpvraagstuk wordt beantwoord met de eenvoudigst mogelijke technische oplossing die het probleem daadwerkelijk oplost. Complexiteit wordt pas toegevoegd wanneer eenvoud aantoonbaar tekortschiet."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"HTML en CSS waar het kan, JavaScript waar het moet"})," — standaard browsergedrag en semantische HTML lossen verrassend veel interactieproblemen op zonder aanvullende code. JavaScript wordt alleen toegevoegd wanneer de gewenste functionaliteit niet met HTML en CSS te realiseren is."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Platform boven framework"})," — het ontwerp leunt op wat de browser al biedt: native formuliervalidatie, ",e.jsx(n.code,{children:"<details>"}),"/",e.jsx(n.code,{children:"<summary>"})," voor in- en uitklapbare secties, CSS voor responsiviteit. Frameworks en bibliotheken worden alleen ingezet als het platform aantoonbaar niet volstaat."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Minder is beter te onderhouden"})," — elke extra laag technologie is een extra laag die begrepen, onderhouden en getest moet worden. Door de oplossing zo dicht mogelijk bij de basis te houden, blijft het prototype toegankelijk voor een breed team en is het eenvoudiger over te dragen naar de uiteindelijke realisatie."]}),`
`]}),`
`,e.jsx(n.h3,{id:"6-prototypen-als-communicatiemiddel",children:"6. Prototypen als communicatiemiddel"}),`
`,e.jsx(n.p,{children:"Het prototype is geen afgewerkt product maar een communicatiemiddel. Het wordt ingezet om ontwerpbeslissingen te toetsen in gebruikersonderzoek en om gesprekken met stakeholders concreet te maken."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Echte HTML en CSS"})," — het prototype is gebouwd met dezelfde technologie als het uiteindelijke product. Dit geeft een realistischer beeld dan statische ontwerpen en maakt het mogelijk om interactie, toegankelijkheid en responsiviteit vroegtijdig te toetsen."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Iteratief proces"})," — het ontwerp wordt stapsgewijs verbeterd op basis van inzichten uit gebruikersonderzoek. Componenten en pagina's worden aangepast, niet vanaf nul opnieuw gemaakt."]}),`
`]}),`
`,e.jsx(n.h3,{id:"7-iteratief-ontwerpen-tussen-vandaag-en-morgen",children:"7. Iteratief ontwerpen tussen vandaag en morgen"}),`
`,e.jsx(n.p,{children:"Het ontwerpproces beweegt zich continu tussen twee perspectieven: wat we nu kunnen bouwen en valideren, en waar we uiteindelijk naartoe willen. De stip op de horizon geeft richting, ook als die op dit moment technisch, juridisch of organisatorisch nog niet bereikbaar is."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Ontwerpen op aannames, valideren met gebruikers"})," — niet elk ontwerpbesluit kan vooraf onderbouwd worden met onderzoek. Waar directe inzichten ontbreken, formuleren we expliciete aannames die we zo snel mogelijk met gebruikers toetsen. Onderzoek en ontwerp wisselen elkaar voortdurend af."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"De stip op de horizon als kompas"})," — sommige oplossingen zijn nu nog niet realiseerbaar: wetgeving staat het niet toe, systemen zijn er nog niet klaar voor, of de organisatie moet eerst anders ingericht worden. Toch ontwerpen we alvast voor die toekomst, zodat we daar klaar voor zijn wanneer de randvoorwaarden veranderen."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Kleine stappen in de goede richting"})," — elk increment levert iets op dat getest en gebruikt kan worden, maar brengt het ontwerp ook dichter bij het grotere doel. We kiezen bewust voor oplossingen die zowel op korte termijn waarde leveren als op lange termijn passen in het toekomstbeeld."]}),`
`]})]})}function c(i={}){const{wrapper:n}={...r(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(t,{...i})}):t(i)}export{c as default};
