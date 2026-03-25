const x={title:"Design tokens/Kleurenpalet",parameters:{docs:{source:!1}}};function e(o,t,s){const r=s?`<div style="font-size: 0.75rem; color: #696969; margin-block-start: 0.25rem;">${s}</div>`:"";return`<div class="swatch-card" style="border-radius: 8px; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); inline-size: 10rem;">
        <div style="block-size: 5rem; background: var(${o});"></div>
        <div style="padding: 0.5rem 0.75rem;">
            <div style="font-size: 0.875rem;">${t}</div>
            <code class="swatch-value" data-var="${o}" style="font-size: 0.75rem; color: #696969; cursor: pointer; word-break: break-all;" title="Klik om te kopieren"></code>
            ${r}
        </div>
    </div>`}function v(o){const t=o.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)/);return t?"#"+[t[1],t[2],t[3]].map(s=>parseInt(s).toString(16).padStart(2,"0")).join(""):o}function w(o){requestAnimationFrame(()=>{const t=o.querySelectorAll(".swatch-value"),s=getComputedStyle(document.documentElement);t.forEach(r=>{const a=s.getPropertyValue(r.dataset.var).trim();r.textContent=v(a)||a})})}function j(o){requestAnimationFrame(()=>{const t=o.querySelectorAll(".swatch-value"),s=[...document.styleSheets].flatMap(a=>{try{return[...a.cssRules]}catch{return[]}}).filter(a=>a.selectorText===":root"),r={};s.forEach(a=>{for(const i of a.style)r[i]=a.style.getPropertyValue(i).trim()}),t.forEach(a=>{const i=r[a.dataset.var]||"";a.textContent=i,a.addEventListener("click",()=>{navigator.clipboard.writeText(a.dataset.var).then(()=>{const p=a.textContent;a.textContent="Gekopieerd!",a.style.color="var(--toepassing-color-feedback-success-text)",setTimeout(()=>{a.textContent=p,a.style.color=""},1200)})})})})}function n(o,t){return`<div style="margin-block-end: 2.5rem;">
        <h3 style="margin-block-end: 0.75rem; font-size: 1.25rem;">${o}</h3>
        <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
            ${t}
        </div>
    </div>`}const c={parameters:{docs:{description:{story:"Het kleurenpalet uit de Rijkshuisstijl. Deze kleuren zijn de beschikbare opties; in het prototype worden ze niet direct gebruikt maar via toepassings-tokens (zie Toepassing)."}}},render:()=>{const o=[{naam:"Lintblauw",prefix:"lintblauw",stappen:["50","100","200","300","400","500","600"]},{naam:"Hemelblauw",prefix:"hemelblauw",stappen:["50","100","200","300","400","500","600"]},{naam:"Donkerblauw",prefix:"donkerblauw",stappen:["50","100","200","300","400","500"]},{naam:"Lichtblauw",prefix:"lichtblauw",stappen:["50","100","200","300","400","500"]},{naam:"Groen",prefix:"groen",stappen:["50","100","200","300","400","500","600"]},{naam:"Donkergroen",prefix:"donkergroen",stappen:["50","100","200","300","400","500"]},{naam:"Mintgroen",prefix:"mintgroen",stappen:["50","100","200","300","400","500"]},{naam:"Mosgroen",prefix:"mosgroen",stappen:["50","100","200","300","400","500"]},{naam:"Geel",prefix:"geel",stappen:["50","100","200","300","400","500"]},{naam:"Donkergeel",prefix:"donkergeel",stappen:["50","100","200","300","400","500"]},{naam:"Oranje",prefix:"oranje",stappen:["50","100","200","300","400","500","600"]},{naam:"Rood",prefix:"rood",stappen:["50","100","200","300","400","500","600"]},{naam:"Robijnrood",prefix:"robijnrood",stappen:["50","100","200","300","400","500"]},{naam:"Roze",prefix:"roze",stappen:["50","100","200","300","400","500"]},{naam:"Violet",prefix:"violet",stappen:["50","100","200","300","400","500"]},{naam:"Paars",prefix:"paars",stappen:["50","100","200","300","400","500"]},{naam:"Bruin",prefix:"bruin",stappen:["50","100","200","300","400","500"]},{naam:"Donkerbruin",prefix:"donkerbruin",stappen:["50","100","200","300","400","500"]},{naam:"Grijs",prefix:"grijs",stappen:["100","200","300","400","500","600","700"]},{naam:"Cool gray",prefix:"cool-gray",stappen:["50","100","200","300","400","500","600","700","800","900"]}],t=n("Neutraal",[e("--rijkshuisstijl-color-neutraal-wit","Wit"),e("--rijkshuisstijl-color-neutraal-gebroken-zwart","Gebroken zwart"),e("--rijkshuisstijl-color-neutraal-zwart","Zwart")].join("")),s=o.map(({naam:a,prefix:i,stappen:p})=>{const h=p.map(d=>e(`--rijkshuisstijl-color-${i}-${d}`,`${a} ${d}`)).join("");return n(a,h)}).join(""),r=document.createElement("div");return r.innerHTML=t+s,w(r),r}},l={parameters:{docs:{description:{story:"De toepassings-kleuren: hoe Rijkshuisstijl-kleuren worden ingezet voor specifieke doeleinden zoals achtergronden, tekst, interactieve elementen en feedback."}}},render:()=>{const o=[n("Achtergrond",[e("--toepassing-color-background-canvas","Canvas","Onderste laag, pagina- of app-achtergrond"),e("--toepassing-color-background-default","Default","Primaire oppervlak (kaarten, panelen, contentgebieden)"),e("--toepassing-color-background-subtle","Subtle","Gedempt oppervlak, voor secundaire panelen of verdiepte gebieden"),e("--toepassing-color-background-raised","Raised","Verhoogde oppervlakken zoals kaarten, popovers en dropdowns"),e("--toepassing-color-background-inverse","Inverse","Donker oppervlak voor contrastrijke secties zoals footers")].join("")),n("Tekst",[e("--toepassing-color-text-default","Default","Primaire brood- en koptekst"),e("--toepassing-color-text-subtle-1","Subtle 1","Secundaire tekst: beschrijvingen, hulptekst, bijschriften"),e("--toepassing-color-text-subtle-2","Subtle 2","Tertiaire tekst: placeholders, metadata"),e("--toepassing-color-text-disabled","Disabled","Niet-beschikbare tekst"),e("--toepassing-color-text-inverse","Inverse","Tekst op inverse of emphasis-oppervlakken")].join("")),n("Rand",[e("--toepassing-color-border-default","Default","Standaardranden voor invoervelden, kaarten en scheidingslijnen"),e("--toepassing-color-border-strong","Strong","Randen met hoge nadruk; bijv. invoervelden of visuele groepering"),e("--toepassing-color-border-subtle","Subtle","Zachtere scheiding, bijv. tussen lijstitems of tabelrijen"),e("--toepassing-color-border-inverse","Inverse","Randen op inverse en donkere oppervlakken")].join("")),n("Interactief: default",[e("--toepassing-color-interactive-default-background","Background","Ruststaat van klikbaar/tikbaar element"),e("--toepassing-color-interactive-default-border","Border","Ruststaat van klikbaar/tikbaar element"),e("--toepassing-color-interactive-default-text","Text","Ruststaat van klikbaar/tikbaar element"),e("--toepassing-color-interactive-default-surface","Surface")].join("")),n("Interactief: hover",[e("--toepassing-color-interactive-hover-background","Background","Staat bij aanwijzen met de muis"),e("--toepassing-color-interactive-hover-border","Border","Staat bij aanwijzen met de muis"),e("--toepassing-color-interactive-hover-text","Text","Staat bij aanwijzen met de muis")].join("")),n("Interactief: selected",[e("--toepassing-color-interactive-selected-background","Background","Ingeschakeld, aangevinkt, actief element"),e("--toepassing-color-interactive-selected-border","Border","Ingeschakeld, aangevinkt, actief element"),e("--toepassing-color-interactive-selected-text","Text","Ingeschakeld, aangevinkt, actief element")].join("")),n("Interactief: focus",[e("--toepassing-color-interactive-focus-background","Background","Bij toetsenbord-, spraak-, en switchfocus"),e("--toepassing-color-interactive-focus-outline","Outline","Bij toetsenbord-, spraak-, en switchfocus")].join("")),n("Interactief: alternate (sidebar, toggles)",[e("--toepassing-color-interactive-alternate-default-background","Default","Ruststaat van klikbaar/tikbaar element"),e("--toepassing-color-interactive-alternate-hover-background","Hover","Staat bij aanwijzen met de muis"),e("--toepassing-color-interactive-alternate-active-background","Active","Staat terwijl element ingedrukt is"),e("--toepassing-color-interactive-alternate-selected-background","Selected","Ingeschakeld, aangevinkt, actief element")].join("")),n("Feedback: info",[e("--toepassing-color-feedback-info-subtle","Subtle"),e("--toepassing-color-feedback-info-default","Default"),e("--toepassing-color-feedback-info-emphasis","Emphasis"),e("--toepassing-color-feedback-info-border","Border"),e("--toepassing-color-feedback-info-text","Text")].join("")),n("Feedback: succes",[e("--toepassing-color-feedback-success-subtle","Subtle"),e("--toepassing-color-feedback-success-default","Default"),e("--toepassing-color-feedback-success-emphasis","Emphasis"),e("--toepassing-color-feedback-success-border","Border"),e("--toepassing-color-feedback-success-text","Text")].join("")),n("Feedback: waarschuwing",[e("--toepassing-color-feedback-warning-subtle","Subtle"),e("--toepassing-color-feedback-warning-default","Default"),e("--toepassing-color-feedback-warning-emphasis","Emphasis"),e("--toepassing-color-feedback-warning-border","Border"),e("--toepassing-color-feedback-warning-text","Text")].join("")),n("Feedback: fout",[e("--toepassing-color-feedback-error-subtle","Subtle"),e("--toepassing-color-feedback-error-default","Default"),e("--toepassing-color-feedback-error-emphasis","Emphasis"),e("--toepassing-color-feedback-error-border","Border"),e("--toepassing-color-feedback-error-text","Text")].join("")),n("Feedback: neutraal",[e("--toepassing-color-feedback-neutral-subtle","Subtle"),e("--toepassing-color-feedback-neutral-default","Default"),e("--toepassing-color-feedback-neutral-emphasis","Emphasis"),e("--toepassing-color-feedback-neutral-border","Border")].join("")),n("Componenten",[e("--toepassing-color-component-badge-background","Badge achtergrond"),e("--toepassing-color-component-badge-text","Badge tekst"),e("--toepassing-color-component-footer-background","Footer achtergrond"),e("--toepassing-color-logo-background","Logo achtergrond")].join(""))],t=document.createElement("div");return t.innerHTML='<p style="font-size: 0.875rem; color: #696969; margin-block-end: 1rem;">Klik op de CSS variabele om deze te kopiëren.</p>'+o.join(""),j(t),t}};var u,g,k;c.parameters={...c.parameters,docs:{...(u=c.parameters)==null?void 0:u.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Het kleurenpalet uit de Rijkshuisstijl. Deze kleuren zijn de beschikbare opties; in het prototype worden ze niet direct gebruikt maar via toepassings-tokens (zie Toepassing)."
      }
    }
  },
  render: () => {
    const paletten = [{
      naam: "Lintblauw",
      prefix: "lintblauw",
      stappen: ["50", "100", "200", "300", "400", "500", "600"]
    }, {
      naam: "Hemelblauw",
      prefix: "hemelblauw",
      stappen: ["50", "100", "200", "300", "400", "500", "600"]
    }, {
      naam: "Donkerblauw",
      prefix: "donkerblauw",
      stappen: ["50", "100", "200", "300", "400", "500"]
    }, {
      naam: "Lichtblauw",
      prefix: "lichtblauw",
      stappen: ["50", "100", "200", "300", "400", "500"]
    }, {
      naam: "Groen",
      prefix: "groen",
      stappen: ["50", "100", "200", "300", "400", "500", "600"]
    }, {
      naam: "Donkergroen",
      prefix: "donkergroen",
      stappen: ["50", "100", "200", "300", "400", "500"]
    }, {
      naam: "Mintgroen",
      prefix: "mintgroen",
      stappen: ["50", "100", "200", "300", "400", "500"]
    }, {
      naam: "Mosgroen",
      prefix: "mosgroen",
      stappen: ["50", "100", "200", "300", "400", "500"]
    }, {
      naam: "Geel",
      prefix: "geel",
      stappen: ["50", "100", "200", "300", "400", "500"]
    }, {
      naam: "Donkergeel",
      prefix: "donkergeel",
      stappen: ["50", "100", "200", "300", "400", "500"]
    }, {
      naam: "Oranje",
      prefix: "oranje",
      stappen: ["50", "100", "200", "300", "400", "500", "600"]
    }, {
      naam: "Rood",
      prefix: "rood",
      stappen: ["50", "100", "200", "300", "400", "500", "600"]
    }, {
      naam: "Robijnrood",
      prefix: "robijnrood",
      stappen: ["50", "100", "200", "300", "400", "500"]
    }, {
      naam: "Roze",
      prefix: "roze",
      stappen: ["50", "100", "200", "300", "400", "500"]
    }, {
      naam: "Violet",
      prefix: "violet",
      stappen: ["50", "100", "200", "300", "400", "500"]
    }, {
      naam: "Paars",
      prefix: "paars",
      stappen: ["50", "100", "200", "300", "400", "500"]
    }, {
      naam: "Bruin",
      prefix: "bruin",
      stappen: ["50", "100", "200", "300", "400", "500"]
    }, {
      naam: "Donkerbruin",
      prefix: "donkerbruin",
      stappen: ["50", "100", "200", "300", "400", "500"]
    }, {
      naam: "Grijs",
      prefix: "grijs",
      stappen: ["100", "200", "300", "400", "500", "600", "700"]
    }, {
      naam: "Cool gray",
      prefix: "cool-gray",
      stappen: ["50", "100", "200", "300", "400", "500", "600", "700", "800", "900"]
    }];
    const neutraal = colorGroup("Neutraal", [swatch("--rijkshuisstijl-color-neutraal-wit", "Wit"), swatch("--rijkshuisstijl-color-neutraal-gebroken-zwart", "Gebroken zwart"), swatch("--rijkshuisstijl-color-neutraal-zwart", "Zwart")].join(""));
    const groups = paletten.map(({
      naam,
      prefix,
      stappen
    }) => {
      const swatches = stappen.map(stap => swatch(\`--rijkshuisstijl-color-\${prefix}-\${stap}\`, \`\${naam} \${stap}\`)).join("");
      return colorGroup(naam, swatches);
    }).join("");
    const container = document.createElement("div");
    container.innerHTML = neutraal + groups;
    resolveHexValues(container);
    return container;
  }
}`,...(k=(g=c.parameters)==null?void 0:g.docs)==null?void 0:k.source}}};var b,f,m;l.parameters={...l.parameters,docs:{...(b=l.parameters)==null?void 0:b.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "De toepassings-kleuren: hoe Rijkshuisstijl-kleuren worden ingezet voor specifieke doeleinden zoals achtergronden, tekst, interactieve elementen en feedback."
      }
    }
  },
  render: () => {
    const sections = [colorGroup("Achtergrond", [swatch("--toepassing-color-background-canvas", "Canvas", "Onderste laag, pagina- of app-achtergrond"), swatch("--toepassing-color-background-default", "Default", "Primaire oppervlak (kaarten, panelen, contentgebieden)"), swatch("--toepassing-color-background-subtle", "Subtle", "Gedempt oppervlak, voor secundaire panelen of verdiepte gebieden"), swatch("--toepassing-color-background-raised", "Raised", "Verhoogde oppervlakken zoals kaarten, popovers en dropdowns"), swatch("--toepassing-color-background-inverse", "Inverse", "Donker oppervlak voor contrastrijke secties zoals footers")].join("")), colorGroup("Tekst", [swatch("--toepassing-color-text-default", "Default", "Primaire brood- en koptekst"), swatch("--toepassing-color-text-subtle-1", "Subtle 1", "Secundaire tekst: beschrijvingen, hulptekst, bijschriften"), swatch("--toepassing-color-text-subtle-2", "Subtle 2", "Tertiaire tekst: placeholders, metadata"), swatch("--toepassing-color-text-disabled", "Disabled", "Niet-beschikbare tekst"), swatch("--toepassing-color-text-inverse", "Inverse", "Tekst op inverse of emphasis-oppervlakken")].join("")), colorGroup("Rand", [swatch("--toepassing-color-border-default", "Default", "Standaardranden voor invoervelden, kaarten en scheidingslijnen"), swatch("--toepassing-color-border-strong", "Strong", "Randen met hoge nadruk; bijv. invoervelden of visuele groepering"), swatch("--toepassing-color-border-subtle", "Subtle", "Zachtere scheiding, bijv. tussen lijstitems of tabelrijen"), swatch("--toepassing-color-border-inverse", "Inverse", "Randen op inverse en donkere oppervlakken")].join("")), colorGroup("Interactief: default", [swatch("--toepassing-color-interactive-default-background", "Background", "Ruststaat van klikbaar/tikbaar element"), swatch("--toepassing-color-interactive-default-border", "Border", "Ruststaat van klikbaar/tikbaar element"), swatch("--toepassing-color-interactive-default-text", "Text", "Ruststaat van klikbaar/tikbaar element"), swatch("--toepassing-color-interactive-default-surface", "Surface")].join("")), colorGroup("Interactief: hover", [swatch("--toepassing-color-interactive-hover-background", "Background", "Staat bij aanwijzen met de muis"), swatch("--toepassing-color-interactive-hover-border", "Border", "Staat bij aanwijzen met de muis"), swatch("--toepassing-color-interactive-hover-text", "Text", "Staat bij aanwijzen met de muis")].join("")), colorGroup("Interactief: selected", [swatch("--toepassing-color-interactive-selected-background", "Background", "Ingeschakeld, aangevinkt, actief element"), swatch("--toepassing-color-interactive-selected-border", "Border", "Ingeschakeld, aangevinkt, actief element"), swatch("--toepassing-color-interactive-selected-text", "Text", "Ingeschakeld, aangevinkt, actief element")].join("")), colorGroup("Interactief: focus", [swatch("--toepassing-color-interactive-focus-background", "Background", "Bij toetsenbord-, spraak-, en switchfocus"), swatch("--toepassing-color-interactive-focus-outline", "Outline", "Bij toetsenbord-, spraak-, en switchfocus")].join("")), colorGroup("Interactief: alternate (sidebar, toggles)", [swatch("--toepassing-color-interactive-alternate-default-background", "Default", "Ruststaat van klikbaar/tikbaar element"), swatch("--toepassing-color-interactive-alternate-hover-background", "Hover", "Staat bij aanwijzen met de muis"), swatch("--toepassing-color-interactive-alternate-active-background", "Active", "Staat terwijl element ingedrukt is"), swatch("--toepassing-color-interactive-alternate-selected-background", "Selected", "Ingeschakeld, aangevinkt, actief element")].join("")), colorGroup("Feedback: info", [swatch("--toepassing-color-feedback-info-subtle", "Subtle"), swatch("--toepassing-color-feedback-info-default", "Default"), swatch("--toepassing-color-feedback-info-emphasis", "Emphasis"), swatch("--toepassing-color-feedback-info-border", "Border"), swatch("--toepassing-color-feedback-info-text", "Text")].join("")), colorGroup("Feedback: succes", [swatch("--toepassing-color-feedback-success-subtle", "Subtle"), swatch("--toepassing-color-feedback-success-default", "Default"), swatch("--toepassing-color-feedback-success-emphasis", "Emphasis"), swatch("--toepassing-color-feedback-success-border", "Border"), swatch("--toepassing-color-feedback-success-text", "Text")].join("")), colorGroup("Feedback: waarschuwing", [swatch("--toepassing-color-feedback-warning-subtle", "Subtle"), swatch("--toepassing-color-feedback-warning-default", "Default"), swatch("--toepassing-color-feedback-warning-emphasis", "Emphasis"), swatch("--toepassing-color-feedback-warning-border", "Border"), swatch("--toepassing-color-feedback-warning-text", "Text")].join("")), colorGroup("Feedback: fout", [swatch("--toepassing-color-feedback-error-subtle", "Subtle"), swatch("--toepassing-color-feedback-error-default", "Default"), swatch("--toepassing-color-feedback-error-emphasis", "Emphasis"), swatch("--toepassing-color-feedback-error-border", "Border"), swatch("--toepassing-color-feedback-error-text", "Text")].join("")), colorGroup("Feedback: neutraal", [swatch("--toepassing-color-feedback-neutral-subtle", "Subtle"), swatch("--toepassing-color-feedback-neutral-default", "Default"), swatch("--toepassing-color-feedback-neutral-emphasis", "Emphasis"), swatch("--toepassing-color-feedback-neutral-border", "Border")].join("")), colorGroup("Componenten", [swatch("--toepassing-color-component-badge-background", "Badge achtergrond"), swatch("--toepassing-color-component-badge-text", "Badge tekst"), swatch("--toepassing-color-component-footer-background", "Footer achtergrond"), swatch("--toepassing-color-logo-background", "Logo achtergrond")].join(""))];
    const container = document.createElement("div");
    container.innerHTML = \`<p style="font-size: 0.875rem; color: #696969; margin-block-end: 1rem;">Klik op de CSS variabele om deze te kopiëren.</p>\` + sections.join("");
    resolveReferences(container);
    return container;
  }
}`,...(m=(f=l.parameters)==null?void 0:f.docs)==null?void 0:m.source}}};const S=["Rijkshuisstijl","Toepassing"];export{c as Rijkshuisstijl,l as Toepassing,S as __namedExportsOrder,x as default};
