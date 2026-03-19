const g={title:"Componenten/Lijsten",tags:["autodocs"]},e={parameters:{docs:{description:{story:"Ongeordende lijst via `<ul>` voor opsommingen zonder volgorde."}}},render:()=>`
<ul>
    <li>Eerste item in een ongeordende lijst</li>
    <li>Tweede item in een ongeordende lijst</li>
    <li>Derde item in een ongeordende lijst</li>
</ul>
`},n={parameters:{docs:{description:{story:"Geordende lijst via `<ol>` voor genummerde opsommingen."}}},render:()=>`
<ol>
    <li>Eerste item in een geordende lijst</li>
    <li>Tweede item in een geordende lijst</li>
    <li>Derde item in een geordende lijst</li>
</ol>
`},i={parameters:{docs:{description:{story:"Definitielijst via `<dl>` met `<dt>` voor termen en `<dd>` voor beschrijvingen."}}},render:()=>`
<dl>
    <dt>Definitieterm</dt>
    <dd>Dit is de beschrijving van de definitieterm.</dd>
    <dt>Tweede term</dt>
    <dd>Dit is de beschrijving van de tweede term.</dd>
</dl>
`};var d,r,t;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Ongeordende lijst via \`<ul>\` voor opsommingen zonder volgorde."
      }
    }
  },
  render: () => \`
<ul>
    <li>Eerste item in een ongeordende lijst</li>
    <li>Tweede item in een ongeordende lijst</li>
    <li>Derde item in een ongeordende lijst</li>
</ul>
\`
}`,...(t=(r=e.parameters)==null?void 0:r.docs)==null?void 0:t.source}}};var o,s,l;n.parameters={...n.parameters,docs:{...(o=n.parameters)==null?void 0:o.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Geordende lijst via \`<ol>\` voor genummerde opsommingen."
      }
    }
  },
  render: () => \`
<ol>
    <li>Eerste item in een geordende lijst</li>
    <li>Tweede item in een geordende lijst</li>
    <li>Derde item in een geordende lijst</li>
</ol>
\`
}`,...(l=(s=n.parameters)==null?void 0:s.docs)==null?void 0:l.source}}};var m,a,c;i.parameters={...i.parameters,docs:{...(m=i.parameters)==null?void 0:m.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Definitielijst via \`<dl>\` met \`<dt>\` voor termen en \`<dd>\` voor beschrijvingen."
      }
    }
  },
  render: () => \`
<dl>
    <dt>Definitieterm</dt>
    <dd>Dit is de beschrijving van de definitieterm.</dd>
    <dt>Tweede term</dt>
    <dd>Dit is de beschrijving van de tweede term.</dd>
</dl>
\`
}`,...(c=(a=i.parameters)==null?void 0:a.docs)==null?void 0:c.source}}};const j=["OngeordendeLijst","GeordendeLijst","Definitielijst"];export{i as Definitielijst,n as GeordendeLijst,e as OngeordendeLijst,j as __namedExportsOrder,g as default};
