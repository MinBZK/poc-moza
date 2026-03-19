const v={title:"Typografie/Block-level tekst",tags:["autodocs"]},e={parameters:{docs:{description:{story:"Citaat via het `<blockquote>` element."}}},render:()=>`
<blockquote>
    <p>
        Dit is een citaat. De beste manier om de toekomst te voorspellen is om
        deze zelf te creëren.
    </p>
</blockquote>
`},r={parameters:{docs:{description:{story:"Voorgeformatteerde tekst via `<pre>`. Spaties en regelovergangen worden behouden."}}},render:()=>`
<pre>Dit is voorgeformatteerde tekst.
            Spaties en regelovergangen
            worden behouden.</pre>
`},o={parameters:{docs:{description:{story:"Codeblok via `<pre><code>` voor het tonen van broncode."}}},render:()=>`
<pre><code>// Dit is een codeblok
function groet(naam) {
    return \`Hallo, \${naam}!\`;
}</code></pre>
`},n={parameters:{docs:{description:{story:"Contactgegevens via het `<address>` element."}}},render:()=>`
<address>
    Contactgegevens<br />
    Voorbeeldstraat 1<br />
    1234 AB Den Haag
</address>
`};var t,s,a;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Citaat via het \`<blockquote>\` element."
      }
    }
  },
  render: () => \`
<blockquote>
    <p>
        Dit is een citaat. De beste manier om de toekomst te voorspellen is om
        deze zelf te creëren.
    </p>
</blockquote>
\`
}`,...(a=(s=e.parameters)==null?void 0:s.docs)==null?void 0:a.source}}};var d,c,i;r.parameters={...r.parameters,docs:{...(d=r.parameters)==null?void 0:d.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Voorgeformatteerde tekst via \`<pre>\`. Spaties en regelovergangen worden behouden."
      }
    }
  },
  render: () => \`
<pre>Dit is voorgeformatteerde tekst.
            Spaties en regelovergangen
            worden behouden.</pre>
\`
}`,...(i=(c=r.parameters)==null?void 0:c.docs)==null?void 0:i.source}}};var p,m,l;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Codeblok via \`<pre><code>\` voor het tonen van broncode."
      }
    }
  },
  render: () => \`
<pre><code>// Dit is een codeblok
function groet(naam) {
    return \\\`Hallo, \\\${naam}!\\\`;
}</code></pre>
\`
}`,...(l=(m=o.parameters)==null?void 0:m.docs)==null?void 0:l.source}}};var g,u,b;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Contactgegevens via het \`<address>\` element."
      }
    }
  },
  render: () => \`
<address>
    Contactgegevens<br />
    Voorbeeldstraat 1<br />
    1234 AB Den Haag
</address>
\`
}`,...(b=(u=n.parameters)==null?void 0:u.docs)==null?void 0:b.source}}};const k=["Citaat","VoorgeformatteerdeTekst","Codeblok","Adres"];export{n as Adres,e as Citaat,o as Codeblok,r as VoorgeformatteerdeTekst,k as __namedExportsOrder,v as default};
