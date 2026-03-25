const d={title:"Componenten/Actiegroep",tags:["autodocs"]},e={parameters:{docs:{description:{story:"Een actiegroep groepeert gerelateerde acties (knoppen). Op mobiel worden ze verticaal gestapeld, op desktop naast elkaar getoond."}}},argTypes:{primair:{control:"text",name:"Primaire actie"},secundair:{control:"text",name:"Secundaire actie"}},args:{primair:"Opslaan",secundair:"Annuleren"},render:({primair:c,secundair:p})=>`
<div class="action-group">
    <button type="submit">${c}</button>
    <button class="secondary">${p}</button>
</div>`},n={parameters:{docs:{description:{story:"Een actiegroep met een primaire knop en een CTA-link."}}},render:()=>`
<div class="action-group">
    <button type="submit">Opslaan</button>
    <a class="btn-cta" href="#">Meer informatie</a>
</div>`};var r,a,t;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Een actiegroep groepeert gerelateerde acties (knoppen). Op mobiel worden ze verticaal gestapeld, op desktop naast elkaar getoond."
      }
    }
  },
  argTypes: {
    primair: {
      control: "text",
      name: "Primaire actie"
    },
    secundair: {
      control: "text",
      name: "Secundaire actie"
    }
  },
  args: {
    primair: "Opslaan",
    secundair: "Annuleren"
  },
  render: ({
    primair,
    secundair
  }) => \`
<div class="action-group">
    <button type="submit">\${primair}</button>
    <button class="secondary">\${secundair}</button>
</div>\`
}`,...(t=(a=e.parameters)==null?void 0:a.docs)==null?void 0:t.source}}};var o,s,i;n.parameters={...n.parameters,docs:{...(o=n.parameters)==null?void 0:o.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Een actiegroep met een primaire knop en een CTA-link."
      }
    }
  },
  render: () => \`
<div class="action-group">
    <button type="submit">Opslaan</button>
    <a class="btn-cta" href="#">Meer informatie</a>
</div>\`
}`,...(i=(s=n.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};const m=["Standaard","MetCTA"];export{n as MetCTA,e as Standaard,m as __namedExportsOrder,d as default};
