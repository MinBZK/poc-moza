const u={},A=["berichtenbox","bewerken","chevron","financieen","foutmelding","gegevens","gegevensdeling","gezondheid","home","informatie","instellingen","link-extern","link-intern","lopende-zaken","menu","minus","nieuws","personeel","persoon","plus","sluiten","succes","uitloggen","vervoer","vink","waarschuwing"];async function L(e){if(!u[e]){const p=await fetch(`/assets/icons/icon-${e}.svg`);u[e]=await p.text()}return u[e]}const N={title:"Componenten/Knop",tags:["autodocs"]},n={parameters:{docs:{description:{story:"De standaard primaire knop. Gebruik dit voor de belangrijkste actie op een pagina."}}},argTypes:{label:{control:"text"}},args:{label:"Standaard primaire knop"},render:({label:e})=>`
<button type="button">${e}</button>
`},t={parameters:{docs:{description:{story:"Secundaire knop. Gebruik dit voor minder prominente acties naast een primaire knop."}}},argTypes:{label:{control:"text"}},args:{label:"Secundaire knop"},render:({label:e})=>`
<button type="button" class="secondary">${e}</button>
`},r={parameters:{docs:{description:{story:'Reset knop. Gebruik `type="reset"` om formuliervelden terug te zetten naar hun beginwaarde.'}}},argTypes:{label:{control:"text"}},args:{label:"Reset knop"},render:({label:e})=>`
<button type="reset">${e}</button>
`},o={parameters:{docs:{description:{story:'Submit knop. Gebruik `type="submit"` om een formulier te verzenden.'}}},argTypes:{label:{control:"text"}},args:{label:"Submit knop"},render:({label:e})=>`
<button type="submit">${e}</button>
`},a={parameters:{docs:{description:{story:"Inactieve knop. Gebruikt `aria-disabled` in plaats van het `disabled` attribuut voor betere toegankelijkheid."}}},argTypes:{label:{control:"text"}},args:{label:"Inactieve knop"},render:({label:e})=>`
<button aria-disabled>${e}</button>
`},s={parameters:{docs:{description:{story:"Destructieve knop. Gebruik dit voor onomkeerbare acties zoals verwijderen."}}},argTypes:{label:{control:"text"}},args:{label:"Destructieve actie"},render:({label:e})=>`
<button class="negative">${e}</button>
`},i={parameters:{docs:{description:{story:"Knop met tekststijlen. Inline elementen zoals `<b>` en `<i>` zijn toegestaan binnen knoppen."}}},render:()=>`
<button type="button">Knop met <b>tekst</b> <i>stijlen</i></button>
`},c={parameters:{docs:{description:{story:"Knop met een SVG-icoon voor de tekst. Het icoon kleurt mee via currentColor."}}},argTypes:{label:{control:"text"},icoon:{control:"select",options:A}},args:{label:"Knop met icoon",icoon:"plus"},render:({label:e,icoon:p})=>{const b=document.createElement("div");return L(p).then(_=>{b.innerHTML=`<button type="button"><span>${_}</span> ${e}</button>`}),b}},l={parameters:{docs:{description:{story:"Overzicht van alle knopvarianten naast elkaar ter vergelijking."}}},render:()=>`
<div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: flex-start;">
    <button type="button">Primaire knop</button>
    <button type="button" class="secondary">Secundaire knop</button>
    <button type="reset">Reset knop</button>
    <button type="submit">Submit knop</button>
    <button class="negative">Destructieve actie</button>
    <button aria-disabled>Inactieve knop</button>
</div>
`};var d,m,k;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
}`,...(k=(m=n.parameters)==null?void 0:m.docs)==null?void 0:k.source}}};var g,y,v;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
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
}`,...(v=(y=t.parameters)==null?void 0:y.docs)==null?void 0:v.source}}};var S,x,f;r.parameters={...r.parameters,docs:{...(S=r.parameters)==null?void 0:S.docs,source:{originalSource:`{
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
}`,...(f=(x=r.parameters)==null?void 0:x.docs)==null?void 0:f.source}}};var T,$,h;o.parameters={...o.parameters,docs:{...(T=o.parameters)==null?void 0:T.docs,source:{originalSource:`{
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
}`,...(h=($=o.parameters)==null?void 0:$.docs)==null?void 0:h.source}}};var j,w,z;a.parameters={...a.parameters,docs:{...(j=a.parameters)==null?void 0:j.docs,source:{originalSource:`{
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
}`,...(z=(w=a.parameters)==null?void 0:w.docs)==null?void 0:z.source}}};var G,I,D;s.parameters={...s.parameters,docs:{...(G=s.parameters)==null?void 0:G.docs,source:{originalSource:`{
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
}`,...(D=(I=s.parameters)==null?void 0:I.docs)==null?void 0:D.source}}};var K,R,M;i.parameters={...i.parameters,docs:{...(K=i.parameters)==null?void 0:K.docs,source:{originalSource:`{
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
}`,...(M=(R=i.parameters)==null?void 0:R.docs)==null?void 0:M.source}}};var H,P,V;c.parameters={...c.parameters,docs:{...(H=c.parameters)==null?void 0:H.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Knop met een SVG-icoon voor de tekst. Het icoon kleurt mee via currentColor."
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
    label: "Knop met icoon",
    icoon: "plus"
  },
  render: ({
    label,
    icoon
  }) => {
    const container = document.createElement("div");
    loadIcon(icoon).then(svg => {
      container.innerHTML = \`<button type="button"><span>\${svg}</span> \${label}</button>\`;
    });
    return container;
  }
}`,...(V=(P=c.parameters)==null?void 0:P.docs)==null?void 0:V.source}}};var C,E,O;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`{
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
}`,...(O=(E=l.parameters)==null?void 0:E.docs)==null?void 0:O.source}}};const q=["Primair","Secundair","Reset","Submit","Inactief","Destructief","MetTekststijlen","MetIcoon","AlleVarianten"];export{l as AlleVarianten,s as Destructief,a as Inactief,c as MetIcoon,i as MetTekststijlen,n as Primair,r as Reset,t as Secundair,o as Submit,q as __namedExportsOrder,N as default};
