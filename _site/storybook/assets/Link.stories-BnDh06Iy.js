const f={title:"Componenten/Link",argTypes:{tekst:{control:"text"},href:{control:"text"},inZin:{control:"boolean"}}},e={args:{tekst:"Hyperlink",href:"#",inZin:!0},render:({tekst:u,href:m,inZin:h})=>{const t=`<a href="${m}">${u}</a>`;return h?`<p>Dit is een ${t} in een zin.</p>`:t}},n=()=>'<p>Dit is een <a href="#">hyperlink</a> in een zin.</p>',r=()=>'<a href="#">Hyperlink</a>';var a,s,i;e.parameters={...e.parameters,docs:{...(a=e.parameters)==null?void 0:a.docs,source:{originalSource:`{
  args: {
    tekst: "Hyperlink",
    href: "#",
    inZin: true
  },
  render: ({
    tekst,
    href,
    inZin
  }) => {
    const link = \`<a href="\${href}">\${tekst}</a>\`;
    return inZin ? \`<p>Dit is een \${link} in een zin.</p>\` : link;
  }
}`,...(i=(s=e.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};var o,p,c;n.parameters={...n.parameters,docs:{...(o=n.parameters)==null?void 0:o.docs,source:{originalSource:'() => `<p>Dit is een <a href="#">hyperlink</a> in een zin.</p>`',...(c=(p=n.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};var l,d,k;r.parameters={...r.parameters,docs:{...(l=r.parameters)==null?void 0:l.docs,source:{originalSource:'() => `<a href="#">Hyperlink</a>`',...(k=(d=r.parameters)==null?void 0:d.docs)==null?void 0:k.source}}};const y=["Speeltuin","Standaard","Alleenstaand"];export{r as Alleenstaand,e as Speeltuin,n as Standaard,y as __namedExportsOrder,f as default};
