import{u as i,j as e,M as a}from"./blocks-D-yzxuIo.js";import"./preload-helper-Dp1pzeXC.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-T7S4Dml0.js";function r(t){const n={a:"a",code:"code",em:"em",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...i(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(a,{title:"Introductie/Over dit prototype"}),`
`,e.jsx(n.h1,{id:"over-dit-prototype",children:"Over dit prototype"}),`
`,e.jsxs(n.p,{children:["Dit prototype van MijnOverheid Zakelijk (MOZa) is gebouwd als statische site met ",e.jsx(n.a,{href:"https://www.11ty.dev/",rel:"nofollow",children:"Eleventy"})," en gedocumenteerd in Storybook. Het doel is om interactiepatronen en visueel ontwerp te verkennen, zonder een backend."]}),`
`,e.jsx(n.h2,{id:"hoe-staten-worden-onthouden",children:"Hoe staten worden onthouden"}),`
`,e.jsxs(n.p,{children:["Omdat er geen server of database is, worden gebruikersacties opgeslagen in de ",e.jsx(n.strong,{children:"localStorage"})," van de browser. Dit betekent dat interacties alleen lokaal bestaan en per browser/apparaat verschillen."]}),`
`,e.jsx(n.h3,{id:"opgeslagen-staten",children:"Opgeslagen staten"}),`
`,e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Actie"}),e.jsx("th",{children:"localStorage-sleutel"}),e.jsx("th",{children:"Waarde"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsx("td",{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Bewaar"})," (checkbox)"]})}),e.jsx("td",{children:e.jsx("code",{children:"favorite:Titel van item"})}),e.jsx("td",{children:"JSON met titel, URL en beschrijving"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Niet relevant voor mij"})," (verbergen)"]})}),e.jsx("td",{children:e.jsx("code",{children:"hidden:Titel van item"})}),e.jsx("td",{children:"JSON met titel, URL en beschrijving"})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsxs(n.p,{children:[e.jsx("strong",{children:"Relevant / Niet relevant"})," (toggle)"]})}),e.jsx("td",{children:e.jsx("code",{children:"relevant:Titel van item"})}),e.jsx("td",{children:e.jsxs(n.p,{children:["JSON met titel, URL, beschrijving en waarde (",e.jsx("code",{children:'"relevant"'})," of ",e.jsx("code",{children:'"irrelevant"'}),")"]})})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Notificatie sluiten"})}),e.jsx("td",{children:e.jsx("code",{children:"dismissed:element-id"})}),e.jsx("td",{children:e.jsx("code",{children:'"true"'})})]})]})]}),`
`,e.jsx(n.h3,{id:"hoe-het-werkt",children:"Hoe het werkt"}),`
`,e.jsxs(n.p,{children:["Alle interactielogica staat in ",e.jsx(n.strong,{children:"content-interactions.js"}),", dat op elke pagina wordt geladen via de base-template. Het script:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsx(n.li,{children:"Herstelt opgeslagen staten bij het laden van de pagina (checkboxes, radio buttons, verborgen items, gesloten notificaties)"}),`
`,e.jsx(n.li,{children:"Slaat wijzigingen direct op bij interactie"}),`
`,e.jsxs(n.li,{children:["Gebruikt event delegation (",e.jsx(n.code,{children:"document.addEventListener"}),") zodat het ook werkt met dynamisch gegenereerde elementen"]}),`
`]}),`
`,e.jsx(n.h3,{id:"semantiek-van-de-relevantie-keuze",children:"Semantiek van de relevantie-keuze"}),`
`,e.jsxs(n.p,{children:["De ",e.jsx(n.strong,{children:"Relevant"})," en ",e.jsx(n.strong,{children:"Niet relevant"})," opties zijn geïmplementeerd als een radio button group binnen een ",e.jsx(n.code,{children:"<fieldset>"}),":"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<fieldset class="relevance-group">
	<legend class="visually-hidden">Is dit relevant voor u?</legend>
	<label class="relevance-option relevance-yes">
		<input type="radio" name="relevance-0" value="relevant" />
		<span class="relevance-icon"></span>
		<span>Relevant</span>
	</label>
	<label class="relevance-option relevance-no">
		<input type="radio" name="relevance-0" value="irrelevant" />
		<span class="relevance-icon"></span>
		<span>Niet relevant</span>
	</label>
</fieldset>
`})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["De ",e.jsx(n.code,{children:"<fieldset>"})," met ",e.jsx(n.code,{children:"<legend>"})," geeft screenreaders context: “Is dit relevant voor u?”"]}),`
`,e.jsx(n.li,{children:"Radio buttons zijn natively wederzijds exclusief — de browser handhaaft dit zonder JavaScript"}),`
`,e.jsx(n.li,{children:"Toetsenbordnavigatie werkt automatisch via pijltoetsen binnen de groep"}),`
`,e.jsx(n.li,{children:"De radio inputs zijn visueel verborgen; de labels zijn gestyled als knoppen met iconen"}),`
`,e.jsx(n.li,{children:"Bij “Niet relevant” wordt het item verborgen en schuift een reserve-topic door"}),`
`,e.jsxs(n.li,{children:["Unieke ",e.jsx(n.code,{children:"name"}),"-attributen worden per groep toegewezen door JavaScript, zodat elke radio group onafhankelijk werkt"]}),`
`]}),`
`,e.jsx(n.h3,{id:"de-pagina-bewaard",children:"De pagina Bewaard"}),`
`,e.jsxs(n.p,{children:["De pagina ",e.jsx(n.strong,{children:"Bewaard"})," leest alle ",e.jsx(n.code,{children:"favorite:"})," en ",e.jsx(n.code,{children:"hidden:"})," sleutels uit localStorage en rendert deze als volledige, klikbare cards — inclusief titel, URL en beschrijving. Acties op deze pagina (verwijderen, toch relevant markeren) werken ook via localStorage en corrigeren het profiel."]}),`
`,e.jsx(n.h2,{id:"feature-flags",children:"Feature flags"}),`
`,e.jsx(n.p,{children:"Het prototype bevat een ingebouwd feature-flag systeem waarmee pagina's en functionaliteit in- of uitgeschakeld kunnen worden — zonder aparte versies te hoeven bouwen."}),`
`,e.jsx(n.h3,{id:"hoe-te-gebruiken",children:"Hoe te gebruiken"}),`
`,e.jsxs(n.p,{children:["Klik op de ",e.jsx(n.strong,{children:"Flags"}),"-knop rechtsonder in het prototype. Er opent een paneel met twee groepen:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Pagina's"})," — navigatie-items zoals Berichtenbox, Belastingen en Zakelijk vervoer. Uitschakelen verbergt zowel het navigatie-item als de bijbehorende content op de homepage."]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.strong,{children:"Functionaliteit"})," — interactiemogelijkheden zoals ",e.jsx(n.em,{children:"Delen"})," en ",e.jsx(n.em,{children:"Relevantie"}),". Uitschakelen verbergt de betreffende knoppen in alle actiegroepen."]}),`
`]}),`
`,e.jsx(n.p,{children:"Feature flags worden opgeslagen in localStorage en blijven staan na herladen. Standaard staan alle features aan."}),`
`,e.jsx(n.h3,{id:"hoe-toe-te-voegen",children:"Hoe toe te voegen"}),`
`,e.jsxs(n.p,{children:["Voeg ",e.jsx(n.code,{children:"data-feature"})," en ",e.jsx(n.code,{children:"data-feature-type"})," attributen toe aan een HTML-element:"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`{/* Pagina-sectie verbergen */}
<div data-feature="Belastingen" data-feature-type="pagina">...</div>

{/* Functionaliteit verbergen */}
<button data-feature="Delen" data-feature-type="functionaliteit">Deel</button>
`})}),`
`,e.jsx(n.p,{children:"Het element verschijnt automatisch in het Flags-paneel en kan door de gebruiker aan- en uitgezet worden."}),`
`,e.jsxs(n.p,{children:["Voor navigatie-items in de sidebar wordt de feature flag ingesteld via het ",e.jsx(n.code,{children:"feature"})," veld in de data-bestanden (",e.jsx(n.code,{children:"moza.json"})," en de subdirectory JSON-bestanden):"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-json",children:`{
	"label": "Belastingen",
	"url": "/moza/belastingen/",
	"feature": "Belastingen"
}
`})}),`
`,e.jsxs(n.p,{children:["De template voegt automatisch ",e.jsx(n.code,{children:"data-feature"})," en ",e.jsx(n.code,{children:'data-feature-type="pagina"'})," toe aan het ",e.jsx(n.code,{children:"<li>"})," element."]}),`
`,e.jsx(n.h3,{id:"opgeslagen-sleutels",children:"Opgeslagen sleutels"}),`
`,e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Sleutel"}),e.jsx("th",{children:"Waarde als uitgeschakeld"})]})}),e.jsx("tbody",{children:e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("code",{children:"feature:Naam"})}),e.jsx("td",{children:e.jsx("code",{children:'"false"'})})]})})]}),`
`,e.jsx(n.p,{children:"Wanneer een feature is ingeschakeld (standaard), bestaat er geen sleutel in localStorage."}),`
`,e.jsx(n.h2,{id:"localstorage-legen",children:"localStorage legen"}),`
`,e.jsxs(n.p,{children:["Het Flags-paneel bevat een ",e.jsx(n.strong,{children:"localStorage wissen"}),"-knop die alle opgeslagen state in één keer reset en de pagina herlaadt."]}),`
`,e.jsx(n.p,{children:"Handmatig kan het ook via de browserconsole (F12 of Cmd+Option+I):"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`localStorage.clear();
`})}),`
`,e.jsx(n.p,{children:"Herlaad daarna de pagina. Alle bewaarde items, verborgen topics, relevantie-keuzes en gesloten notificaties worden gereset."}),`
`,e.jsx(n.p,{children:"Om alleen een specifieke categorie te wissen:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`// Alleen bewaarde items wissen
Object.keys(localStorage)
	.filter((k) => k.startsWith("favorite:"))
	.forEach((k) => localStorage.removeItem(k));

// Alleen verborgen items wissen
Object.keys(localStorage)
	.filter((k) => k.startsWith("hidden:"))
	.forEach((k) => localStorage.removeItem(k));

// Alleen relevantie-keuzes wissen
Object.keys(localStorage)
	.filter((k) => k.startsWith("relevant:"))
	.forEach((k) => localStorage.removeItem(k));

// Alleen gesloten notificaties wissen
Object.keys(localStorage)
	.filter((k) => k.startsWith("dismissed:"))
	.forEach((k) => localStorage.removeItem(k));
`})})]})}function c(t={}){const{wrapper:n}={...i(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(r,{...t})}):r(t)}export{c as default};
