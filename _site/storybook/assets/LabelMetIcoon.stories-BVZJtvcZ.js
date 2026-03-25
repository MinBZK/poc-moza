const t={},l=["berichtenbox","bewerken","chevron","financieen","foutmelding","gegevens","gegevensdeling","gezondheid","home","informatie","instellingen","link-extern","link-intern","lopende-zaken","menu","minus","nieuws","personeel","persoon","plus","sluiten","succes","uitloggen","vervoer","vink","waarschuwing"];async function d(e){if(!t[e]){const o=await fetch(`/assets/icons/icon-${e}.svg`);t[e]=await o.text()}return t[e]}const g={title:"Componenten/Label met icoon",tags:["autodocs"]},n={parameters:{docs:{description:{story:"Een niet-klikbaar label met een icoon, bijvoorbeeld voor het tonen van een gebruikersnaam. Gebruik een icoon niet zonder begeleidend tekstlabel, tenzij het pictogram in het icoon universeel begrepen wordt — zoals een vergrootglas voor zoeken of een kruisje voor sluiten."}}},argTypes:{label:{control:"text"},icoon:{control:"select",options:l}},args:{label:"R.J. Vogel",icoon:"persoon"},render:({label:e,icoon:o})=>{const r=document.createElement("div");return d(o).then(c=>{r.innerHTML=`
<span class="icon-label">
    ${c}
    ${e}
</span>`}),r}};var s,i,a;n.parameters={...n.parameters,docs:{...(s=n.parameters)==null?void 0:s.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Een niet-klikbaar label met een icoon, bijvoorbeeld voor het tonen van een gebruikersnaam. Gebruik een icoon niet zonder begeleidend tekstlabel, tenzij het pictogram in het icoon universeel begrepen wordt — zoals een vergrootglas voor zoeken of een kruisje voor sluiten."
      }
    }
  },
  argTypes: {
    label: {
      control: "text"
    },
    icoon: {
      control: "select",
      options: iconNames
    }
  },
  args: {
    label: "R.J. Vogel",
    icoon: "persoon"
  },
  render: ({
    label,
    icoon
  }) => {
    const container = document.createElement("div");
    loadIcon(icoon).then(svg => {
      container.innerHTML = \`
<span class="icon-label">
    \${svg}
    \${label}
</span>\`;
    });
    return container;
  }
}`,...(a=(i=n.parameters)==null?void 0:i.docs)==null?void 0:a.source}}};const b=["Standaard"];export{n as Standaard,b as __namedExportsOrder,g as default};
