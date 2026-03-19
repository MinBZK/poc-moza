const S={title:"Typografie/Paragraaf",argTypes:{tekst:{control:"text"},variant:{control:"select",options:["standaard","intro","small"]}}},e={args:{tekst:"Dit is een voorbeeld alinea met lopende tekst.",variant:"standaard"},render:({tekst:r,variant:a})=>{const h=a==="intro"?' class="intro"':"";return a==="small"?`<p><small>${r}</small></p>`:`<p${h}>${r}</p>`}},t=()=>`
    <p>
        Dit is een standaard alinea met lopende tekst en
        <strong>tekst met sterke nadruk</strong>, <em>tekst met klemtoon</em> en
        <strong><em>tekst met sterke nadruk én klemtoon</em></strong>.
        Deze gebruiken hiervoor de semantische HTML elementen
        <code>&lt;strong&gt;</code> en <code>&lt;em&gt;</code>.
    </p>
`,n=()=>`
    <p class="intro">
        Dit is een introductie alinea. Deze maakt het mogelijk om de introductie
        van de rest van de tekst te onderscheiden.
    </p>
`,s=()=>"<p><small>Dit is kleine tekst.</small></p>";var o,i,l;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    tekst: "Dit is een voorbeeld alinea met lopende tekst.",
    variant: "standaard"
  },
  render: ({
    tekst,
    variant
  }) => {
    const cls = variant === "intro" ? ' class="intro"' : "";
    if (variant === "small") return \`<p><small>\${tekst}</small></p>\`;
    return \`<p\${cls}>\${tekst}</p>\`;
  }
}`,...(l=(i=e.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};var d,m,c;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`() => \`
    <p>
        Dit is een standaard alinea met lopende tekst en
        <strong>tekst met sterke nadruk</strong>, <em>tekst met klemtoon</em> en
        <strong><em>tekst met sterke nadruk én klemtoon</em></strong>.
        Deze gebruiken hiervoor de semantische HTML elementen
        <code>&lt;strong&gt;</code> en <code>&lt;em&gt;</code>.
    </p>
\``,...(c=(m=t.parameters)==null?void 0:m.docs)==null?void 0:c.source}}};var p,k,u;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`() => \`
    <p class="intro">
        Dit is een introductie alinea. Deze maakt het mogelijk om de introductie
        van de rest van de tekst te onderscheiden.
    </p>
\``,...(u=(k=n.parameters)==null?void 0:k.docs)==null?void 0:u.source}}};var g,v,D;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:"() => `<p><small>Dit is kleine tekst.</small></p>`",...(D=(v=s.parameters)==null?void 0:v.docs)==null?void 0:D.source}}};const f=["Speeltuin","Standaard","Introductie","KleineTekst"];export{n as Introductie,s as KleineTekst,e as Speeltuin,t as Standaard,f as __namedExportsOrder,S as default};
