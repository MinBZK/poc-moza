const A={title:"Componenten/Knop",tags:["autodocs"]},n={parameters:{docs:{description:{story:"De standaard primaire knop. Gebruik dit voor de belangrijkste actie op een pagina."}}},argTypes:{label:{control:"text"}},args:{label:"Standaard primaire knop"},render:({label:e})=>`
<button type="button">${e}</button>
`},t={parameters:{docs:{description:{story:"Secundaire knop. Gebruik dit voor minder prominente acties naast een primaire knop."}}},argTypes:{label:{control:"text"}},args:{label:"Secundaire knop"},render:({label:e})=>`
<button type="button" class="secondary">${e}</button>
`},r={parameters:{docs:{description:{story:'Reset knop. Gebruik `type="reset"` om formuliervelden terug te zetten naar hun beginwaarde.'}}},argTypes:{label:{control:"text"}},args:{label:"Reset knop"},render:({label:e})=>`
<button type="reset">${e}</button>
`},a={parameters:{docs:{description:{story:'Submit knop. Gebruik `type="submit"` om een formulier te verzenden.'}}},argTypes:{label:{control:"text"}},args:{label:"Submit knop"},render:({label:e})=>`
<button type="submit">${e}</button>
`},o={parameters:{docs:{description:{story:"Inactieve knop. Gebruikt `aria-disabled` in plaats van het `disabled` attribuut voor betere toegankelijkheid."}}},argTypes:{label:{control:"text"}},args:{label:"Inactieve knop"},render:({label:e})=>`
<button aria-disabled>${e}</button>
`},s={parameters:{docs:{description:{story:"Destructieve knop. Gebruik dit voor onomkeerbare acties zoals verwijderen."}}},argTypes:{label:{control:"text"}},args:{label:"Destructieve actie"},render:({label:e})=>`
<button class="negative">${e}</button>
`},i={parameters:{docs:{description:{story:"Knop met tekststijlen. Inline elementen zoals `<b>` en `<i>` zijn toegestaan binnen knoppen."}}},render:()=>`
<button type="button">Knop met <b>tekst</b> <i>stijlen</i></button>
`},p={parameters:{docs:{description:{story:"Knop met een icoon voor de tekst."}}},argTypes:{label:{control:"text"}},args:{label:"Knop met icoon voor tekst"},render:({label:e})=>`
<button type="button"><span>⚑</span> ${e}</button>
`},l={parameters:{docs:{description:{story:"Overzicht van alle knopvarianten naast elkaar ter vergelijking."}}},render:()=>`
<div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: flex-start;">
    <button type="button">Primaire knop</button>
    <button type="button" class="secondary">Secundaire knop</button>
    <button type="reset">Reset knop</button>
    <button type="submit">Submit knop</button>
    <button class="negative">Destructieve actie</button>
    <button aria-disabled>Inactieve knop</button>
</div>
`};var c,b,u;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "De standaard primaire knop. Gebruik dit voor de belangrijkste actie op een pagina."
      }
    }
  },
  argTypes: {
    label: {
      control: "text"
    }
  },
  args: {
    label: "Standaard primaire knop"
  },
  render: ({
    label
  }) => \`
<button type="button">\${label}</button>
\`
}`,...(u=(b=n.parameters)==null?void 0:b.docs)==null?void 0:u.source}}};var d,m,k;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Secundaire knop. Gebruik dit voor minder prominente acties naast een primaire knop."
      }
    }
  },
  argTypes: {
    label: {
      control: "text"
    }
  },
  args: {
    label: "Secundaire knop"
  },
  render: ({
    label
  }) => \`
<button type="button" class="secondary">\${label}</button>
\`
}`,...(k=(m=t.parameters)==null?void 0:m.docs)==null?void 0:k.source}}};var y,g,v;r.parameters={...r.parameters,docs:{...(y=r.parameters)==null?void 0:y.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Reset knop. Gebruik \`type=\\"reset\\"\` om formuliervelden terug te zetten naar hun beginwaarde."
      }
    }
  },
  argTypes: {
    label: {
      control: "text"
    }
  },
  args: {
    label: "Reset knop"
  },
  render: ({
    label
  }) => \`
<button type="reset">\${label}</button>
\`
}`,...(v=(g=r.parameters)==null?void 0:g.docs)==null?void 0:v.source}}};var S,x,j;a.parameters={...a.parameters,docs:{...(S=a.parameters)==null?void 0:S.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Submit knop. Gebruik \`type=\\"submit\\"\` om een formulier te verzenden."
      }
    }
  },
  argTypes: {
    label: {
      control: "text"
    }
  },
  args: {
    label: "Submit knop"
  },
  render: ({
    label
  }) => \`
<button type="submit">\${label}</button>
\`
}`,...(j=(x=a.parameters)==null?void 0:x.docs)==null?void 0:j.source}}};var T,f,$;o.parameters={...o.parameters,docs:{...(T=o.parameters)==null?void 0:T.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Inactieve knop. Gebruikt \`aria-disabled\` in plaats van het \`disabled\` attribuut voor betere toegankelijkheid."
      }
    }
  },
  argTypes: {
    label: {
      control: "text"
    }
  },
  args: {
    label: "Inactieve knop"
  },
  render: ({
    label
  }) => \`
<button aria-disabled>\${label}</button>
\`
}`,...($=(f=o.parameters)==null?void 0:f.docs)==null?void 0:$.source}}};var z,G,I;s.parameters={...s.parameters,docs:{...(z=s.parameters)==null?void 0:z.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Destructieve knop. Gebruik dit voor onomkeerbare acties zoals verwijderen."
      }
    }
  },
  argTypes: {
    label: {
      control: "text"
    }
  },
  args: {
    label: "Destructieve actie"
  },
  render: ({
    label
  }) => \`
<button class="negative">\${label}</button>
\`
}`,...(I=(G=s.parameters)==null?void 0:G.docs)==null?void 0:I.source}}};var D,K,h;i.parameters={...i.parameters,docs:{...(D=i.parameters)==null?void 0:D.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Knop met tekststijlen. Inline elementen zoals \`<b>\` en \`<i>\` zijn toegestaan binnen knoppen."
      }
    }
  },
  render: () => \`
<button type="button">Knop met <b>tekst</b> <i>stijlen</i></button>
\`
}`,...(h=(K=i.parameters)==null?void 0:K.docs)==null?void 0:h.source}}};var w,R,M;p.parameters={...p.parameters,docs:{...(w=p.parameters)==null?void 0:w.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Knop met een icoon voor de tekst."
      }
    }
  },
  argTypes: {
    label: {
      control: "text"
    }
  },
  args: {
    label: "Knop met icoon voor tekst"
  },
  render: ({
    label
  }) => \`
<button type="button"><span>⚑</span> \${label}</button>
\`
}`,...(M=(R=p.parameters)==null?void 0:R.docs)==null?void 0:M.source}}};var P,O,_;l.parameters={...l.parameters,docs:{...(P=l.parameters)==null?void 0:P.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Overzicht van alle knopvarianten naast elkaar ter vergelijking."
      }
    }
  },
  render: () => \`
<div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: flex-start;">
    <button type="button">Primaire knop</button>
    <button type="button" class="secondary">Secundaire knop</button>
    <button type="reset">Reset knop</button>
    <button type="submit">Submit knop</button>
    <button class="negative">Destructieve actie</button>
    <button aria-disabled>Inactieve knop</button>
</div>
\`
}`,...(_=(O=l.parameters)==null?void 0:O.docs)==null?void 0:_.source}}};const V=["Primair","Secundair","Reset","Submit","Inactief","Destructief","MetTekststijlen","MetIcoon","AlleVarianten"];export{l as AlleVarianten,s as Destructief,o as Inactief,p as MetIcoon,i as MetTekststijlen,n as Primair,r as Reset,t as Secundair,a as Submit,V as __namedExportsOrder,A as default};
