import{u as i,j as e,M as s}from"./blocks-DMi4hFOE.js";import"./preload-helper-Dp1pzeXC.js";import"./_commonjsHelpers-CqkleIqs.js";import"./iframe-CDSlQzb5.js";function r(t){const n={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...i(),...t.components};return e.jsxs(e.Fragment,{children:[e.jsx(s,{title:"Introductie/Over dit prototype"}),`
`,e.jsx(n.h1,{id:"over-dit-prototype",children:"Over dit prototype"}),`
`,e.jsxs(n.p,{children:["Dit prototype van MijnOverheid Zakelijk (MOZA) is gebouwd als statische site met ",e.jsx(n.a,{href:"https://www.11ty.dev/",rel:"nofollow",children:"Eleventy"})," en gedocumenteerd in Storybook. Het doel is om interactiepatronen en visueel ontwerp te verkennen, zonder een backend."]}),`
`,e.jsx(n.h2,{id:"hoe-staten-worden-onthouden",children:"Hoe staten worden onthouden"}),`
`,e.jsxs(n.p,{children:["Omdat er geen server of database is, worden gebruikersacties opgeslagen in de ",e.jsx(n.strong,{children:"localStorage"})," van de browser. Dit betekent dat interacties alleen lokaal bestaan en per browser/apparaat verschillen."]}),`
`,e.jsx(n.h3,{id:"opgeslagen-staten",children:"Opgeslagen staten"}),`
`,e.jsxs("table",{children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"Actie"}),e.jsx("th",{children:"localStorage-sleutel"}),e.jsx("th",{children:"Waarde"})]})}),e.jsxs("tbody",{children:[e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("strong",{children:"Bewaar"})," (checkbox)"]}),e.jsx("td",{children:e.jsx("code",{children:"favorite:Titel van item"})}),e.jsx("td",{children:"JSON met titel, URL en beschrijving"})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("strong",{children:"Niet relevant voor mij"})," (verbergen)"]}),e.jsx("td",{children:e.jsx("code",{children:"hidden:Titel van item"})}),e.jsx("td",{children:"JSON met titel, URL en beschrijving"})]}),e.jsxs("tr",{children:[e.jsxs("td",{children:[e.jsx("strong",{children:"Relevant / Niet relevant"})," (toggle)"]}),e.jsx("td",{children:e.jsx("code",{children:"relevant:Titel van item"})}),e.jsxs("td",{children:["JSON met titel, URL, beschrijving en waarde (",e.jsx("code",{children:'"relevant"'})," of ",e.jsx("code",{children:'"irrelevant"'}),")"]})]}),e.jsxs("tr",{children:[e.jsx("td",{children:e.jsx("strong",{children:"Notificatie sluiten"})}),e.jsx("td",{children:e.jsx("code",{children:"dismissed:element-id"})}),e.jsx("td",{children:e.jsx("code",{children:'"true"'})})]})]})]}),`
`,e.jsx(n.h3,{id:"hoe-het-werkt",children:"Hoe het werkt"}),`
`,e.jsxs(n.p,{children:["Alle interactielogica staat in ",e.jsx(n.strong,{children:"content-interactions.js"}),", dat op elke pagina wordt geladen via de base-template. Het script:"]}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:["Herstelt opgeslagen staten bij het laden van de pagina (checkboxes, ",e.jsx(n.code,{children:"aria-pressed"}),", verborgen items, gesloten notificaties)"]}),`
`,e.jsx(n.li,{children:"Slaat wijzigingen direct op bij interactie"}),`
`,e.jsxs(n.li,{children:["Gebruikt event delegation (",e.jsx(n.code,{children:"document.addEventListener"}),") zodat het ook werkt met dynamisch gegenereerde elementen"]}),`
`]}),`
`,e.jsx(n.h3,{id:"semantiek-van-de-toggle-buttons",children:"Semantiek van de toggle-buttons"}),`
`,e.jsxs(n.p,{children:["De ",e.jsx(n.strong,{children:"Relevant"})," en ",e.jsx(n.strong,{children:"Niet relevant"})," knoppen zijn geïmplementeerd als ",e.jsx(n.code,{children:"<button>"})," elementen met ",e.jsx(n.code,{children:"aria-pressed"}),":"]}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-html",children:`<button class="link-button mark-relevant" aria-pressed="false">Relevant</button>
<button class="link-button mark-irrelevant" aria-pressed="false">Niet relevant</button>
`})}),`
`,e.jsxs(n.ul,{children:[`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:'aria-pressed="false"'})," — niet ingedrukt (standaard, neutraal)"]}),`
`,e.jsxs(n.li,{children:[e.jsx(n.code,{children:'aria-pressed="true"'})," — ingedrukt (actief)"]}),`
`,e.jsx(n.li,{children:"De twee knoppen zijn wederzijds exclusief: het indrukken van de ene zet de andere uit"}),`
`,e.jsx(n.li,{children:'Screenreaders communiceren de staat als "ingedrukt" of "niet ingedrukt"'}),`
`]}),`
`,e.jsx(n.p,{children:"Dit is semantisch correcter dan een checkbox (die binair is) omdat er drie toestanden zijn: neutraal, relevant, en niet relevant."}),`
`,e.jsx(n.h3,{id:"de-pagina-bewaard",children:"De pagina Bewaard"}),`
`,e.jsxs(n.p,{children:["De pagina ",e.jsx(n.strong,{children:"Bewaard"})," leest alle ",e.jsx(n.code,{children:"favorite:"})," en ",e.jsx(n.code,{children:"hidden:"})," sleutels uit localStorage en rendert deze als volledige, klikbare cards — inclusief titel, URL en beschrijving. Acties op deze pagina (verwijderen, toch relevant markeren) werken ook via localStorage en corrigeren het profiel."]}),`
`,e.jsx(n.h2,{id:"localstorage-legen",children:"localStorage legen"}),`
`,e.jsx(n.p,{children:"Tijdens het testen kan het handig zijn om alle opgeslagen staten te resetten. Open de browserconsole (F12 of Cmd+Option+I) en voer uit:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`localStorage.clear()
`})}),`
`,e.jsx(n.p,{children:"Herlaad daarna de pagina. Alle bewaarde items, verborgen topics, relevantie-keuzes en gesloten notificaties worden gereset."}),`
`,e.jsx(n.p,{children:"Om alleen een specifieke categorie te wissen:"}),`
`,e.jsx(n.pre,{children:e.jsx(n.code,{className:"language-js",children:`// Alleen bewaarde items wissen
Object.keys(localStorage).filter(k => k.startsWith("favorite:")).forEach(k => localStorage.removeItem(k))

// Alleen verborgen items wissen
Object.keys(localStorage).filter(k => k.startsWith("hidden:")).forEach(k => localStorage.removeItem(k))

// Alleen relevantie-keuzes wissen
Object.keys(localStorage).filter(k => k.startsWith("relevant:")).forEach(k => localStorage.removeItem(k))

// Alleen gesloten notificaties wissen
Object.keys(localStorage).filter(k => k.startsWith("dismissed:")).forEach(k => localStorage.removeItem(k))
`})})]})}function c(t={}){const{wrapper:n}={...i(),...t.components};return n?e.jsx(n,{...t,children:e.jsx(r,{...t})}):r(t)}export{c as default};
