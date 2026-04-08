import{u as t,j as e,M as s}from"./blocks-D-yzxuIo.js";import"./preload-helper-Dp1pzeXC.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-T7S4Dml0.js";function r(i){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...t(),...i.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Ontwerppatronen/Context wisselen"}),`
`,e.jsxs(n.h1,{id:"context-wisselen-account-switching",children:["Context wisselen (",e.jsx(n.em,{children:"account switching"}),")"]}),`
`,e.jsx(n.p,{children:"Een gebruiker van MijnOverheid opereert niet in één vaste rol. Dezelfde persoon kan als burger, ondernemer van meerdere bedrijven, gemachtigde van een familielid én professioneel dienstverlener voor weer andere organisaties ingelogd zijn. Het ontwerp moet dit ondersteunen, idealiter zonder dat de gebruiker steeds opnieuw moet inloggen."}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:"Let wel: De geschetste ontwerp-oplossingen zijn niet gestaafd met huidige technische, juridische en/of organisatorische mogelijkheden, beperkingen en uitdagingen. Het schetst een ideaalbeeld om naartoe te werken."})}),`
`,e.jsx(n.h2,{id:"contexten",children:"Contexten"}),`
`,e.jsx(n.p,{children:"Een gebruiker kan in meerdere contexten handelen. Elke context bepaalt welke gegevens, taken, berichten en actualiteiten zichtbaar zijn."}),`
`,e.jsx(n.h3,{id:"privé-burger",children:"Privé (burger)"}),`
`,e.jsx(n.p,{children:"De persoonlijke omgeving van de burger. Denk aan toeslagen, belastingaangiften, berichten van de gemeente en DigiD-zaken."}),`
`,e.jsxs(n.p,{children:["Binnen de privé-context kan een burger ",e.jsx(n.strong,{children:"gemachtigd"})," zijn om bijvoorbeeld onderstaande taken namens anderen uit te voeren:"]}),`
`,e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Gemachtigde voor"}),e.jsx("th",{children:"Relatie"}),e.jsx("th",{children:"Voorbeeld taken"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"Ouder(s)"}),e.jsx("td",{children:"Mantelzorger / wettelijk vertegenwoordiger"}),e.jsx("td",{children:"WMO-aanvragen, belastingaangifte, toeslagen beheren"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Kind(eren)"}),e.jsx("td",{children:"Ouderlijk gezag"}),e.jsx("td",{children:"Kinderbijslag, studiefinanciering, zorgverzekering"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Partner"}),e.jsx("td",{children:"Machtiging"}),e.jsx("td",{children:"Gezamenlijke belastingaangifte, toeslagen"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Buurvrouw / kennis"}),e.jsx("td",{children:"Vrijwillige machtiging"}),e.jsx("td",{children:"Digitale post ophalen, formulieren invullen"})]})]})]}),`
`,e.jsx(n.h3,{id:"zakelijke-gebruiker",children:"Zakelijke gebruiker"}),`
`,e.jsx(n.p,{children:"De zakelijke omgeving toont gegevens, verplichtingen en actualiteiten die specifiek zijn voor een zakelijke gebruiker. Een persoon kan eigenaar zijn van meerdere ondernemingen, zoals bijvoorbeeld:"}),`
`,e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Onderneming"}),e.jsx("th",{children:"Rol"}),e.jsx("th",{children:"Wat zichtbaar is"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"Eigen B.V."}),e.jsx("td",{children:"Eigenaar / bestuurder"}),e.jsx("td",{children:"Volledige toegang: gegevens, belastingen, personeel, berichten, subsidies"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Tweede onderneming"}),e.jsx("td",{children:"Eigenaar / vennoot"}),e.jsx("td",{children:"Volledige toegang, mogelijk andere branche en vestigingsadres → andere actualiteiten"})]})]})]}),`
`,e.jsx(n.h3,{id:"belangen-en-machtigingen-zakelijk",children:"Belangen en machtigingen (zakelijk)"}),`
`,e.jsx(n.p,{children:"Naast eigen ondernemingen kan een persoon een zakelijke relatie hebben met ondernemingen van anderen. De aard van de relatie (en/of instellingen rondom machtigingen) bepaalt welke gegevens en taken zichtbaar zijn:"}),`
`,e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Rol"}),e.jsx("th",{children:"Typisch bij"}),e.jsx("th",{children:"Voorbeeld taken"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"Vennoot (VOF)"}),e.jsx("td",{children:"Vennootschap onder firma"}),e.jsx("td",{children:"Gezamenlijke belastingaangifte, inzicht in bedrijfsgegevens, personeel"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Bestuurslid"}),e.jsx("td",{children:"Stichting, vereniging"}),e.jsx("td",{children:"KvK-gegevens beheren, jaarrekening deponeren, subsidies aanvragen"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Aandeelhouder"}),e.jsx("td",{children:"B.V., coöperatie"}),e.jsx("td",{children:"Inzicht in bedrijfsgegevens, mogelijk beperkt tot financiële overzichten"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Boekhouder / accountant"}),e.jsx("td",{children:"Extern gemachtigde"}),e.jsx("td",{children:"Belastingaangiften indienen, loonaangiften, BTW-aangifte — namens meerdere ondernemingen"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Gemachtigde medewerker"}),e.jsx("td",{children:"Machtiging"}),e.jsx("td",{children:"Specifieke taken uitvoeren namens de onderneming, afhankelijk van het machtigingsniveau"})]})]})]}),`
`,e.jsx(n.h2,{id:"ontwerppatroon-accountwisselaar",children:"Ontwerppatroon: accountwisselaar"}),`
`,e.jsx(n.p,{children:"De accountwisselaar is een dropdown in de header die alle contexten toont waarin de ingelogde persoon kan opereren, gegroepeerd op type:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`R.J. Vogel — Bloom B.V. ▾
├── Mijn ondernemingen
│   ├── Bloom B.V.                    Eigenaar    ✓
│   ├── Vogel & Partners Consultancy  Eigenaar
│   └── Kwartaal Vastgoed B.V.        Eigenaar
├── Belangen
│   ├── Stichting Groenrijk           Bestuurslid
│   └── Coöperatie ZuidWest U.A.      Aandeelhouder
└── Privé
    └── R.J. Vogel
`})}),`
`,e.jsx(n.h3,{id:"ontwerpkeuzes",children:"Ontwerpkeuzes"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Eén inlogmoment, meerdere contexten"})," — de gebruiker logt één keer in (met bijvoorbeeld DigiD, eHerkenning of eWallet) en kan daarna wisselen zonder opnieuw te authenticeren. De contexten worden opgehaald op basis van de identiteit (bijvoorbeeld BSN → KvK-koppelingen, machtigingen)."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Groepering op relatietype"}),' — "Mijn ondernemingen" (eigenaar/vennoot), "Belangen" (bestuurslid, aandeelhouder, gemachtigde) en "Privé" zijn visueel gescheiden groepen. Dit maakt het overzichtelijk bij veel contexten.']}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Rol zichtbaar per context"})," — naast de organisatienaam staat de rol (Eigenaar, Bestuurslid, Aandeelhouder, Boekhouder). Dit verduidelijkt de rechten en voorkomt verwarring bij organisaties waar de gebruiker meerdere rollen kan hebben."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Actieve context visueel gemarkeerd"})," — de huidige context heeft een visuele indicator (",e.jsx(n.code,{children:"aria-current"}),"), zodat de gebruiker altijd ziet namens wie er gehandeld wordt."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Paginatitel past mee"}),' — bij het wisselen van context past de titel in de header mee ("MijnOverheid Zakelijk" vs. "MijnOverheid").']}),`
`]}),`
`,e.jsx(n.h3,{id:"toegankelijkheid",children:"Toegankelijkheid"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["De wisselaar volgt het ",e.jsx(n.a,{href:"https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/",rel:"nofollow",children:"W3C Menu Button"})," patroon: ",e.jsx(n.code,{children:"aria-expanded"}),", ",e.jsx(n.code,{children:"aria-haspopup"}),", ",e.jsx(n.code,{children:'role="menu"'})," en ",e.jsx(n.code,{children:'role="menuitem"'}),"."]}),`
`,e.jsxs(n.li,{children:["Het menu sluit bij ",e.jsx("kbd",{children:"Escape"})," en bij klikken buiten het menu."]}),`
`,e.jsx(n.li,{children:"Groepslabels zijn visueel aanwezig maar niet interactief — ze structureren het menu zonder de toetsenbordnavigatie te verstoren."}),`
`]}),`
`,e.jsx(n.h3,{id:"privé-context-machtigingen",children:"Privé-context: machtigingen"}),`
`,e.jsx(n.p,{children:"Binnen de privé-context zou het wisselpatroon zich kunnen herhalen voor machtigingen:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{children:`R.J. Vogel ▾
├── Mijn gegevens
│   └── R.J. Vogel
├── Ik handel namens
│   ├── A.M. Vogel-de Groot          Mantelzorg
│   └── S.R. Vogel                   Ouderlijk gezag
`})}),`
`,e.jsx(n.p,{children:"Dit is hetzelfde interactiepatroon als de zakelijke wisselaar maar met andere groepslabels en rollen. De implementatie kan hetzelfde component hergebruiken."}),`
`,e.jsx(n.h2,{id:"visuele-identiteit-per-context",children:"Visuele identiteit per context"}),`
`,e.jsxs(n.p,{children:["Bij het wisselen tussen contexten moet de gebruiker onmiddellijk herkennen ",e.jsx(n.em,{children:"waar"})," die zich bevindt en ",e.jsx(n.em,{children:"namens wie"})," er gehandeld wordt. Dit vraagt om een eigen visuele identiteit per contexttype — maar binnen de kaders van één consistent ontwerpsysteem. Het onderscheid mag niet afhankelijk zijn van kleur alleen, omdat dat ontoegankelijk is voor gebruikers met een kleurenziensbeperking."]}),`
`,e.jsx(n.h3,{id:"uitgangspunten",children:"Uitgangspunten"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Consistentie boven variatie"})," — de interface blijft in alle contexten herkenbaar als MijnOverheid. Layout, typografie, componenten en interactiepatronen zijn identiek. Het onderscheid zit in signalen, niet in een heel ander ontwerp."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Niet alleen kleur"})," — kleur kan een ondersteunend signaal zijn, maar mag nooit het enige onderscheidende kenmerk zijn (",e.jsxs(n.a,{href:"https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html",rel:"nofollow",children:["WCAG 1.4.1: ",e.jsx(n.em,{children:"Use of Color"})]}),"). Elk visueel onderscheid moet ook zonder kleurwaarneming werken."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Beperkt aantal contexttypes"})," — het onderscheid hoeft niet per organisatie maar per ",e.jsx(n.em,{children:"type"})," context: privé (eigen en gemachtigd), zakelijk (eigen en gemachtigd/belang). Dat zijn maximaal vier visuele varianten."]}),`
`]}),`
`,e.jsx(n.h3,{id:"mogelijke-signalen",children:"Mogelijke signalen"}),`
`,e.jsx(n.p,{children:"Het visueel onderscheiden van contexten kan via een combinatie van onderstaande signalen. Elk signaal werkt onafhankelijk van kleurwaarneming."}),`
`,e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Signaal"}),e.jsx("th",{children:"Waar"}),e.jsx("th",{children:"Voorbeeld"}),e.jsx("th",{children:"Werkt zonder kleur?"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:"Tekstlabel in de header"}),e.jsx("td",{children:"Naast de paginatitel"}),e.jsx("td",{children:'"MijnOverheid" vs. "MijnOverheid Zakelijk" vs. "MijnOverheid Zakelijk — namens Stichting Groenrijk"'}),e.jsx("td",{children:"Ja"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Icoon bij de contextnaam"}),e.jsx("td",{children:"Accountwisselaar en header"}),e.jsx("td",{children:"Persoonsicoon (privé), bedrijfsicoon (zakelijk eigen), sleutel- of machtigingsicoon (gemachtigd)"}),e.jsx("td",{children:"Ja"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Contextbanner"}),e.jsx("td",{children:"Boven of onder de header"}),e.jsx("td",{children:'Een smalle balk met "U handelt namens: Stichting Groenrijk (bestuurslid)" — zichtbaar zolang de context niet de eigen persoon of eigen onderneming is'}),e.jsx("td",{children:"Ja (tekst + positie)"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Accentkleur header/rand"}),e.jsx("td",{children:"Bovenkant pagina of headerborder"}),e.jsx("td",{children:"Lintblauw (privé), hemelblauw (zakelijk), oranje (gemachtigd)"}),e.jsx("td",{children:"Nee — ondersteunend signaal, nooit het enige"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:"Beeldmerk-variant"}),e.jsx("td",{children:"Logo in de header"}),e.jsx("td",{children:"Rijksoverheid-beeldmerk (privé) vs. aangepast beeldmerk of toevoeging (zakelijk)"}),e.jsx("td",{children:"Ja"})]})]})]}),`
`,e.jsx(n.h3,{id:"aandachtspunten-voor-de-gemachtigde-context",children:"Aandachtspunten voor de gemachtigde context"}),`
`,e.jsx(n.p,{children:"Wanneer iemand handelt namens een ander persoon of een andere organisatie, is extra duidelijkheid nodig om fouten te voorkomen. Een verkeerde belastingaangifte indienen namens de verkeerde organisatie heeft reële consequenties."}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Permanente indicator"})," — de contextbanner (“U handelt namens…”) moet zichtbaar blijven zolang de gemachtigde context actief is, ook bij scrollen. Dit voorkomt dat de gebruiker vergeet namens wie er gehandeld wordt."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Bevestiging bij gevoelige acties"})," — bij het indienen van formulieren, wijzigen van gegevens of doen van aangiften kan een extra bevestigingsstap tonen namens wie de actie wordt uitgevoerd."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Visueel onderscheid t.o.v. eigen context"})," — de gemachtigde context moet duidelijk ",e.jsx(n.em,{children:"anders"})," aanvoelen dan de eigen context. Als het ontwerp te gelijk is, vergroot dat de kans op vergissingen."]}),`
`]}),`
`,e.jsx(n.h3,{id:"onderzoeksvragen",children:"Onderzoeksvragen"}),`
`,e.jsx(n.p,{children:"Dit onderwerp vraagt om gericht gebruikersonderzoek. Onderstaande vragen kunnen als basis dienen:"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Herkenning"})," — Herkennen gebruikers in welke context ze zich bevinden? Hoe snel? Welke signalen vallen op en welke worden gemist?"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Verwarring"})," — Ontstaat er verwarring bij het wisselen, met name bij snel achter elkaar schakelen tussen eigen en gemachtigde contexten?"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Voldoende onderscheid"})," — Is het onderscheid tussen “eigen zakelijk” en “gemachtigd zakelijk” sterk genoeg? Of worden die twee als hetzelfde ervaren?"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Kleur als ondersteuning"})," — Voegt een accentkleur (bijv. een gekleurde headerlijn) iets toe bovenop tekst en iconen, of is het overbodig?"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Contextbanner"})," — Wordt de banner “U handelt namens…” opgemerkt? Raakt deze na verloop van tijd onzichtbaar door bannerblindheid?"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Doelgroepverschillen"})," — Ervaren professionele gemachtigden (boekhouders die dagelijks wisselen) het anders dan incidentele gemachtigden (mantelzorger die af en toe iets regelt voor een ouder)?"]}),`
`]}),`
`,e.jsx(n.h3,{id:"referenties",children:"Referenties"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://www.w3.org/WAI/WCAG22/Understanding/use-of-color.html",rel:"nofollow",children:"WCAG 1.4.1 — Use of Color"})})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Kleur mag niet het enige visuele middel zijn om informatie over te brengen. Elk kleurverschil tussen contexten moet vergezeld gaan van een tekstueel of vormverschil."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://www.w3.org/WAI/WCAG22/Understanding/non-text-contrast.html",rel:"nofollow",children:"WCAG 1.4.11 — Non-text Contrast"})})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Visuele indicatoren zoals een gekleurde headerlijn moeten voldoende contrast hebben met de achtergrond (minimaal 3:1)."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://design-system.service.gov.uk/styles/colour/",rel:"nofollow",children:"GOV.UK — Using colour to convey context"})})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Het Britse design system gebruikt kleur als ",e.jsx(n.em,{children:"versterking"})," van betekenis, niet als drager. Elke kleur is gekoppeld aan een tekst of icoon dat dezelfde informatie overbrengt. Hetzelfde principe geldt hier."]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://www.nngroup.com/articles/indicating-focus/",rel:"nofollow",children:"NNGroup — Indicating Focus to Support Accessibility"})})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Visuele staten (waaronder contextstaten) moeten via meerdere kanalen gecommuniceerd worden: kleur, vorm, positie en tekst. Relevant voor hoe de actieve context wordt getoond in de header en de wisselaar."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://baymard.com/blog/mobile-banking-accounts",rel:"nofollow",children:"Banking and financial apps — Account context patterns"})})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Bankieren-apps lossen een vergelijkbaar probleem op: wisselen tussen persoonlijke en zakelijke rekeningen, gezamenlijke rekeningen en machtigingen. Patronen: kleuraccent per rekeningtype, persistente indicator welke rekening actief is, bevestiging bij transacties."}),`
`]}),`
`,e.jsx(n.h2,{id:"openstaande-vragen",children:"Openstaande vragen"}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Hoe worden machtigingen technisch opgehaald?"})," — DigiD Machtigen, eHerkenning en het Handelsregister zijn drie verschillende bronnen. De accountwisselaar moet deze samenvoegen tot één overzicht."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Wat gebeurt er bij veel contexten?"})," — een boekhouder met tientallen klanten heeft een ander overzicht nodig dan een ondernemer met twee B.V.'s. Mogelijk is een zoekfunctie of categorisering nodig bij meer dan ~8 contexten."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Welke gegevens wisselen mee?"})," — bij het wisselen van context veranderen bedrijfsgegevens, actualiteiten, berichten en lopende zaken. Persoonlijke voorkeuren (taal, notificatie-instellingen) blijven waarschijnlijk hetzelfde."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Hoe wordt misbruik voorkomen?"})," — als iemand gemachtigd is voor een ander, moeten deze acties gelogd worden. De gebruiker moet altijd zien namens wie er gehandeld wordt (prominente indicator)."]}),`
`]}),`
`,e.jsx(n.h2,{id:"bronnen",children:"Bronnen"}),`
`,e.jsx(n.h3,{id:"wisselen-tussen-contexten",children:"Wisselen tussen contexten"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/",rel:"nofollow",children:"W3C ARIA Authoring Practices — Menu Button"})})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Het toegankelijke patroon voor een dropdown-menu dat de basis vormt voor de accountwisselaar. Beschrijft de verwachte toetsenbordinteractie (",e.jsx(n.code,{children:"Enter"}),"/",e.jsx(n.code,{children:"Space"})," opent, ",e.jsx(n.code,{children:"Escape"})," sluit, pijltoetsen navigeren)."]}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://m3.material.io/",rel:"nofollow",children:"Material Design — Account switching"})})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Google’s richtlijnen voor het wisselen tussen accounts in apps. Het patroon: gebruikerspictogram in de header, klik opent een paneel met alle accounts, actief account is gemarkeerd."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://fluent2.microsoft.design/",rel:"nofollow",children:"Microsoft Fluent UI — Persona"})})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Microsoft’s patroon voor identiteitsweergave en rolwisseling. Relevant voor hoe naam, rol en organisatie visueel samengebracht worden in een compact formaat."}),`
`]}),`
`,e.jsx(n.h3,{id:"machtigingen-en-vertegenwoordiging",children:"Machtigingen en vertegenwoordiging"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://www.digid.nl/machtigen",rel:"nofollow",children:"DigiD Machtigen"})})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Het mechanisme waarmee een burger iemand anders machtigt om digitale overheidszaken te regelen. Relevant voor de privé-context: wie mag namens wie handelen."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://www.eherkenning.nl/",rel:"nofollow",children:"eHerkenning — Machtigingsregister"})})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Het zakelijke equivalent van DigiD Machtigen. Via eHerkenning-ketenmachtiging kan een boekhouder namens meerdere ondernemingen handelen. Dit is de bron voor de “Belangen”-groep in de wisselaar."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://www.kvk.nl/",rel:"nofollow",children:"Handelsregister (KvK)"})})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"De bron voor wie welke rol heeft bij welke onderneming: eigenaar, bestuurder, vennoot, gevolmachtigde. De accountwisselaar haalt hier de “Mijn ondernemingen” en “Belangen” uit."}),`
`]}),`
`,e.jsx(n.h3,{id:"overheidsspecifiek",children:"Overheidsspecifiek"}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://mijn.overheid.nl/",rel:"nofollow",children:"MijnOverheid"})})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Huidige situatie: burger en ondernemer zijn gescheiden ingangen, zonder inline wisselmechanisme. Het accountwisselaar-patroon kan dit eventueel vervangen door een geïntegreerde ervaring."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://design-system.service.gov.uk/components/header/",rel:"nofollow",children:"GOV.UK Design System — Header"})})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Het Britse equivalent toont de naam van de ingelogde gebruiker in de header. Geen accountwisseling, maar wel het patroon van identiteit bovenaan de pagina."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://nldesignsystem.nl/community/community-sprints/mijn-services-community/",rel:"nofollow",children:"NL Design System — Mijn Services Community"})})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Werkt actief aan patronen voor Mijn-omgevingen van de overheid. Rolwisseling en machtigingen zijn terugkerende thema's in deze community."}),`
`]}),`
`,e.jsx(n.p,{children:e.jsx(n.strong,{children:e.jsx(n.a,{href:"https://commonground.nl/",rel:"nofollow",children:"Common Ground — NLX"})})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Architectuurprincipe dat gegevens bij de bron blijven. Relevant voor hoe de accountwisselaar contexten ophaalt: niet alles kopiëren naar één plek, maar per context de juiste bronnen raadplegen."}),`
`]})]})}function c(i={}){const{wrapper:n}={...t(),...i.components};return n?e.jsx(n,{...i,children:e.jsx(r,{...i})}):r(i)}export{c as default};
