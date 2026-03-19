const k={title:"Typografie/Paragraaf",tags:["autodocs"]},e={parameters:{docs:{description:{story:"Standaard alinea met lopende tekst, inclusief `<strong>` voor sterke nadruk en `<em>` voor klemtoon."}}},render:()=>`
<p>
    Dit is een standaard alinea met lopende tekst en
    <strong>tekst met sterke nadruk</strong>, <em>tekst met klemtoon</em> en
    <strong><em>tekst met sterke nadruk én klemtoon</em></strong>.
    Deze gebruiken hiervoor de semantische HTML elementen
    <code>&lt;strong&gt;</code> en <code>&lt;em&gt;</code>.
</p>
`},t={parameters:{docs:{description:{story:'Introductie-alinea met `class="intro"` om de inleiding visueel te onderscheiden van de rest van de tekst.'}}},render:()=>`
<p class="intro">
    Dit is een introductie alinea. Deze maakt het mogelijk om de introductie
    van de rest van de tekst te onderscheiden.
</p>
`},n={parameters:{docs:{description:{story:"Kleine tekst via het `<small>` element."}}},render:()=>"<p><small>Dit is kleine tekst.</small></p>"};var r,s,o;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Standaard alinea met lopende tekst, inclusief \`<strong>\` voor sterke nadruk en \`<em>\` voor klemtoon."
      }
    }
  },
  render: () => \`
<p>
    Dit is een standaard alinea met lopende tekst en
    <strong>tekst met sterke nadruk</strong>, <em>tekst met klemtoon</em> en
    <strong><em>tekst met sterke nadruk én klemtoon</em></strong>.
    Deze gebruiken hiervoor de semantische HTML elementen
    <code>&lt;strong&gt;</code> en <code>&lt;em&gt;</code>.
</p>
\`
}`,...(o=(s=e.parameters)==null?void 0:s.docs)==null?void 0:o.source}}};var a,d,i;t.parameters={...t.parameters,docs:{...(a=t.parameters)==null?void 0:a.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Introductie-alinea met \`class=\\"intro\\"\` om de inleiding visueel te onderscheiden van de rest van de tekst."
      }
    }
  },
  render: () => \`
<p class="intro">
    Dit is een introductie alinea. Deze maakt het mogelijk om de introductie
    van de rest van de tekst te onderscheiden.
</p>
\`
}`,...(i=(d=t.parameters)==null?void 0:d.docs)==null?void 0:i.source}}};var m,c,l;n.parameters={...n.parameters,docs:{...(m=n.parameters)==null?void 0:m.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Kleine tekst via het \`<small>\` element."
      }
    }
  },
  render: () => \`<p><small>Dit is kleine tekst.</small></p>\`
}`,...(l=(c=n.parameters)==null?void 0:c.docs)==null?void 0:l.source}}};const p=["Standaard","Introductie","KleineTekst"];export{t as Introductie,n as KleineTekst,e as Standaard,p as __namedExportsOrder,k as default};
