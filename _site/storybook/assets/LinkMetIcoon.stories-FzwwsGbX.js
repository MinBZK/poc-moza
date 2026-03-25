const t={},l=["berichtenbox","bewerken","chevron","financieen","foutmelding","gegevens","gegevensdeling","gezondheid","home","informatie","instellingen","link-extern","link-intern","lopende-zaken","menu","minus","nieuws","personeel","persoon","plus","sluiten","succes","uitloggen","vervoer","vink","waarschuwing"];async function d(n){if(!t[n]){const o=await fetch(`/assets/icons/icon-${n}.svg`);t[n]=await o.text()}return t[n]}const g={title:"Componenten/Link met icoon",tags:["autodocs"]},e={parameters:{docs:{description:{story:"Een link met een SVG-icoon ervoor. Het icoon kleurt mee met de tekst via currentColor."}}},argTypes:{label:{control:"text"},icoon:{control:"select",options:l}},args:{label:"Contactgegevens wijzigen",icoon:"bewerken"},render:({label:n,icoon:o})=>{const r=document.createElement("div");return d(o).then(a=>{r.innerHTML=`
<a class="icon-link" href="#">
    ${a}
    ${n}
</a>`}),r}};var s,i,c;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Een link met een SVG-icoon ervoor. Het icoon kleurt mee met de tekst via currentColor."
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
    label: "Contactgegevens wijzigen",
    icoon: "bewerken"
  },
  render: ({
    label,
    icoon
  }) => {
    const container = document.createElement("div");
    loadIcon(icoon).then(svg => {
      container.innerHTML = \`
<a class="icon-link" href="#">
    \${svg}
    \${label}
</a>\`;
    });
    return container;
  }
}`,...(c=(i=e.parameters)==null?void 0:i.docs)==null?void 0:c.source}}};const u=["Standaard"];export{e as Standaard,u as __namedExportsOrder,g as default};
