const S={title:"Typografie/Block-level tekst",argTypes:{tekst:{control:"text"},type:{control:"select",options:["blockquote","pre","code","address"]}}},r={args:{tekst:"Dit is een voorbeeld van block-level tekst.",type:"blockquote"},render:({tekst:e,type:a})=>a==="blockquote"?`<blockquote><p>${e}</p></blockquote>`:a==="code"?`<pre><code>${e}</code></pre>`:a==="address"?`<address>${e}</address>`:`<pre>${e}</pre>`},o=()=>`
    <blockquote>
        <p>
            Dit is een citaat. De beste manier om de toekomst te voorspellen is om
            deze zelf te creëren.
        </p>
    </blockquote>
`,t=()=>`
<pre>Dit is voorgeformatteerde tekst.
            Spaties en regelovergangen
            worden behouden.</pre>
`,s=()=>`
<pre><code>// Dit is een codeblok
function groet(naam) {
    return \`Hallo, \${naam}!\`;
}</code></pre>
`,n=()=>`
    <address>
        Contactgegevens<br />
        Voorbeeldstraat 1<br />
        1234 AB Den Haag
    </address>
`;var c,d,p;r.parameters={...r.parameters,docs:{...(c=r.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    tekst: "Dit is een voorbeeld van block-level tekst.",
    type: "blockquote"
  },
  render: ({
    tekst,
    type
  }) => {
    if (type === "blockquote") return \`<blockquote><p>\${tekst}</p></blockquote>\`;
    if (type === "code") return \`<pre><code>\${tekst}</code></pre>\`;
    if (type === "address") return \`<address>\${tekst}</address>\`;
    return \`<pre>\${tekst}</pre>\`;
  }
}`,...(p=(d=r.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};var l,i,u;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:`() => \`
    <blockquote>
        <p>
            Dit is een citaat. De beste manier om de toekomst te voorspellen is om
            deze zelf te creëren.
        </p>
    </blockquote>
\``,...(u=(i=o.parameters)==null?void 0:i.docs)==null?void 0:u.source}}};var m,k,b;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`() => \`
<pre>Dit is voorgeformatteerde tekst.
            Spaties en regelovergangen
            worden behouden.</pre>
\``,...(b=(k=t.parameters)==null?void 0:k.docs)==null?void 0:b.source}}};var g,f,v;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:"() => `\n<pre><code>// Dit is een codeblok\nfunction groet(naam) {\n    return \\`Hallo, \\${naam}!\\`;\n}</code></pre>\n`",...(v=(f=s.parameters)==null?void 0:f.docs)==null?void 0:v.source}}};var q,D,$;n.parameters={...n.parameters,docs:{...(q=n.parameters)==null?void 0:q.docs,source:{originalSource:`() => \`
    <address>
        Contactgegevens<br />
        Voorbeeldstraat 1<br />
        1234 AB Den Haag
    </address>
\``,...($=(D=n.parameters)==null?void 0:D.docs)==null?void 0:$.source}}};const y=["Speeltuin","Citaat","VoorgeformatteerdeTekst","Codeblok","Adres"];export{n as Adres,o as Citaat,s as Codeblok,r as Speeltuin,t as VoorgeformatteerdeTekst,y as __namedExportsOrder,S as default};
