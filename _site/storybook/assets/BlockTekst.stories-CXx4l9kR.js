const x={title:"Typografie/Block-level tekst",tags:["autodocs"]},r={parameters:{docs:{description:{story:"Citaat via het `<blockquote>` element."}}},argTypes:{tekst:{control:"text"}},args:{tekst:"Dit is een citaat. De beste manier om de toekomst te voorspellen is om deze zelf te creëren."},render:({tekst:e})=>`
<blockquote>
    <p>${e}</p>
</blockquote>
`},t={parameters:{docs:{description:{story:"Voorgeformatteerde tekst via `<pre>`. Spaties en regelovergangen worden behouden."}}},argTypes:{tekst:{control:"text"}},args:{tekst:`Dit is voorgeformatteerde tekst.
            Spaties en regelovergangen
            worden behouden.`},render:({tekst:e})=>`<pre>${e}</pre>`},n={parameters:{docs:{description:{story:"Codeblok via `<pre><code>` voor het tonen van broncode."}}},argTypes:{tekst:{control:"text"}},args:{tekst:"// Dit is een codeblok\nfunction groet(naam) {\n    return `Hallo, ${naam}!`;\n}"},render:({tekst:e})=>`<pre><code>${e}</code></pre>`},o={parameters:{docs:{description:{story:"Contactgegevens via het `<address>` element."}}},argTypes:{regel1:{control:"text",name:"Regel 1"},regel2:{control:"text",name:"Regel 2"},regel3:{control:"text",name:"Regel 3"}},args:{regel1:"Contactgegevens",regel2:"Voorbeeldstraat 1",regel3:"1234 AB Den Haag"},render:({regel1:e,regel2:v,regel3:y})=>`
<address>
    ${e}<br />
    ${v}<br />
    ${y}
</address>
`};var s,a,d;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Citaat via het \`<blockquote>\` element."
      }
    }
  },
  argTypes: {
    tekst: {
      control: "text"
    }
  },
  args: {
    tekst: "Dit is een citaat. De beste manier om de toekomst te voorspellen is om deze zelf te creëren."
  },
  render: ({
    tekst
  }) => \`
<blockquote>
    <p>\${tekst}</p>
</blockquote>
\`
}`,...(d=(a=r.parameters)==null?void 0:a.docs)==null?void 0:d.source}}};var c,l,g;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Voorgeformatteerde tekst via \`<pre>\`. Spaties en regelovergangen worden behouden."
      }
    }
  },
  argTypes: {
    tekst: {
      control: "text"
    }
  },
  args: {
    tekst: "Dit is voorgeformatteerde tekst.\\n            Spaties en regelovergangen\\n            worden behouden."
  },
  render: ({
    tekst
  }) => \`<pre>\${tekst}</pre>\`
}`,...(g=(l=t.parameters)==null?void 0:l.docs)==null?void 0:g.source}}};var p,i,m;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Codeblok via \`<pre><code>\` voor het tonen van broncode."
      }
    }
  },
  argTypes: {
    tekst: {
      control: "text"
    }
  },
  args: {
    tekst: "// Dit is een codeblok\\nfunction groet(naam) {\\n    return \`Hallo, \${naam}!\`;\\n}"
  },
  render: ({
    tekst
  }) => \`<pre><code>\${tekst}</code></pre>\`
}`,...(m=(i=n.parameters)==null?void 0:i.docs)==null?void 0:m.source}}};var k,u,b;o.parameters={...o.parameters,docs:{...(k=o.parameters)==null?void 0:k.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Contactgegevens via het \`<address>\` element."
      }
    }
  },
  argTypes: {
    regel1: {
      control: "text",
      name: "Regel 1"
    },
    regel2: {
      control: "text",
      name: "Regel 2"
    },
    regel3: {
      control: "text",
      name: "Regel 3"
    }
  },
  args: {
    regel1: "Contactgegevens",
    regel2: "Voorbeeldstraat 1",
    regel3: "1234 AB Den Haag"
  },
  render: ({
    regel1,
    regel2,
    regel3
  }) => \`
<address>
    \${regel1}<br />
    \${regel2}<br />
    \${regel3}
</address>
\`
}`,...(b=(u=o.parameters)==null?void 0:u.docs)==null?void 0:b.source}}};const $=["Citaat","VoorgeformatteerdeTekst","Codeblok","Adres"];export{o as Adres,r as Citaat,n as Codeblok,t as VoorgeformatteerdeTekst,$ as __namedExportsOrder,x as default};
