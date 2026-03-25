const p={title:"Typografie/Paragraaf",tags:["autodocs"]},t={parameters:{docs:{description:{story:"Standaard alinea met lopende tekst, inclusief `<strong>` voor sterke nadruk en `<em>` voor klemtoon."}}},argTypes:{tekst:{control:"text"}},args:{tekst:"Dit is een standaard alinea met lopende tekst."},render:({tekst:e})=>`
<p>
    ${e}
    <strong>Tekst met sterke nadruk</strong>, <em>tekst met klemtoon</em> en
    <strong><em>tekst met sterke nadruk én klemtoon</em></strong>.
</p>
`},n={parameters:{docs:{description:{story:'Introductie-alinea met `class="intro"` om de inleiding visueel te onderscheiden van de rest van de tekst.'}}},argTypes:{tekst:{control:"text"}},args:{tekst:"Dit is een introductie alinea. Deze maakt het mogelijk om de introductie van de rest van de tekst te onderscheiden."},render:({tekst:e})=>`<p class="intro">${e}</p>`},s={parameters:{docs:{description:{story:"Kleine tekst via het `<small>` element."}}},argTypes:{tekst:{control:"text"}},args:{tekst:"Dit is kleine tekst."},render:({tekst:e})=>`<p><small>${e}</small></p>`};var r,a,o;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Standaard alinea met lopende tekst, inclusief \`<strong>\` voor sterke nadruk en \`<em>\` voor klemtoon."
      }
    }
  },
  argTypes: {
    tekst: {
      control: "text"
    }
  },
  args: {
    tekst: "Dit is een standaard alinea met lopende tekst."
  },
  render: ({
    tekst
  }) => \`
<p>
    \${tekst}
    <strong>Tekst met sterke nadruk</strong>, <em>tekst met klemtoon</em> en
    <strong><em>tekst met sterke nadruk én klemtoon</em></strong>.
</p>
\`
}`,...(o=(a=t.parameters)==null?void 0:a.docs)==null?void 0:o.source}}};var d,i,m;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Introductie-alinea met \`class=\\"intro\\"\` om de inleiding visueel te onderscheiden van de rest van de tekst."
      }
    }
  },
  argTypes: {
    tekst: {
      control: "text"
    }
  },
  args: {
    tekst: "Dit is een introductie alinea. Deze maakt het mogelijk om de introductie van de rest van de tekst te onderscheiden."
  },
  render: ({
    tekst
  }) => \`<p class="intro">\${tekst}</p>\`
}`,...(m=(i=n.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};var k,l,c;s.parameters={...s.parameters,docs:{...(k=s.parameters)==null?void 0:k.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Kleine tekst via het \`<small>\` element."
      }
    }
  },
  argTypes: {
    tekst: {
      control: "text"
    }
  },
  args: {
    tekst: "Dit is kleine tekst."
  },
  render: ({
    tekst
  }) => \`<p><small>\${tekst}</small></p>\`
}`,...(c=(l=s.parameters)==null?void 0:l.docs)==null?void 0:c.source}}};const g=["Standaard","Introductie","KleineTekst"];export{n as Introductie,s as KleineTekst,t as Standaard,g as __namedExportsOrder,p as default};
