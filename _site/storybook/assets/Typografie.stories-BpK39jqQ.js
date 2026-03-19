const w={title:"Typografie/Koppen",argTypes:{tekst:{control:"text"},niveau:{control:"select",options:["h1","h2","h3","h4","h5","h6"]}}},e={args:{tekst:"Voorbeeld koptekst",niveau:"h1"},render:({tekst:q,niveau:c})=>`<${c}>${q}</${c}>`},s=()=>`
    <h1>Koptekst niveau 1</h1>
    <h2>Koptekst niveau 2</h2>
    <h3>Koptekst niveau 3</h3>
    <h4>Koptekst niveau 4</h4>
    <h5>Koptekst niveau 5</h5>
    <h6>Koptekst niveau 6</h6>
`,t=()=>"<h1>Koptekst niveau 1</h1>",r=()=>"<h2>Koptekst niveau 2</h2>",o=()=>"<h3>Koptekst niveau 3</h3>",a=()=>"<h4>Koptekst niveau 4</h4>",n=()=>"<h5>Koptekst niveau 5</h5>",p=()=>"<h6>Koptekst niveau 6</h6>";var h,u,i;e.parameters={...e.parameters,docs:{...(h=e.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    tekst: "Voorbeeld koptekst",
    niveau: "h1"
  },
  render: ({
    tekst,
    niveau
  }) => \`<\${niveau}>\${tekst}</\${niveau}>\`
}`,...(i=(u=e.parameters)==null?void 0:u.docs)==null?void 0:i.source}}};var k,m,d;s.parameters={...s.parameters,docs:{...(k=s.parameters)==null?void 0:k.docs,source:{originalSource:`() => \`
    <h1>Koptekst niveau 1</h1>
    <h2>Koptekst niveau 2</h2>
    <h3>Koptekst niveau 3</h3>
    <h4>Koptekst niveau 4</h4>
    <h5>Koptekst niveau 5</h5>
    <h6>Koptekst niveau 6</h6>
\``,...(d=(m=s.parameters)==null?void 0:m.docs)==null?void 0:d.source}}};var v,K,l;t.parameters={...t.parameters,docs:{...(v=t.parameters)==null?void 0:v.docs,source:{originalSource:"() => `<h1>Koptekst niveau 1</h1>`",...(l=(K=t.parameters)==null?void 0:K.docs)==null?void 0:l.source}}};var g,H,S;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:"() => `<h2>Koptekst niveau 2</h2>`",...(S=(H=r.parameters)==null?void 0:H.docs)==null?void 0:S.source}}};var $,f,x;o.parameters={...o.parameters,docs:{...($=o.parameters)==null?void 0:$.docs,source:{originalSource:"() => `<h3>Koptekst niveau 3</h3>`",...(x=(f=o.parameters)==null?void 0:f.docs)==null?void 0:x.source}}};var y,T,_;a.parameters={...a.parameters,docs:{...(y=a.parameters)==null?void 0:y.docs,source:{originalSource:"() => `<h4>Koptekst niveau 4</h4>`",...(_=(T=a.parameters)==null?void 0:T.docs)==null?void 0:_.source}}};var b,A,V;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:"() => `<h5>Koptekst niveau 5</h5>`",...(V=(A=n.parameters)==null?void 0:A.docs)==null?void 0:V.source}}};var E,O,j;p.parameters={...p.parameters,docs:{...(E=p.parameters)==null?void 0:E.docs,source:{originalSource:"() => `<h6>Koptekst niveau 6</h6>`",...(j=(O=p.parameters)==null?void 0:O.docs)==null?void 0:j.source}}};const z=["Speeltuin","AlleKoppen","H1","H2","H3","H4","H5","H6"];export{s as AlleKoppen,t as H1,r as H2,o as H3,a as H4,n as H5,p as H6,e as Speeltuin,z as __namedExportsOrder,w as default};
