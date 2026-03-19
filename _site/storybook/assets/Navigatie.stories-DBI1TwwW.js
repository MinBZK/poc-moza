const I={title:"Componenten/Navigatie",argTypes:{aantalItems:{control:{type:"range",min:2,max:8,step:1}},actievePagina:{control:{type:"number",min:1,max:8}},type:{control:"select",options:["hoofdnavigatie","subnavigatie","breadcrumb"]}}},i={args:{type:"hoofdnavigatie",aantalItems:5,actievePagina:1},render:({type:a,aantalItems:l,actievePagina:H})=>{const c=a==="breadcrumb"?["Home","Categorie","Subcategorie","Pagina","Subpagina","Detail","Item","Huidig"]:a==="hoofdnavigatie"?["Home","Pagina 1","Pagina 2","Pagina 3","Pagina 4","Pagina 5","Pagina 6","Pagina 7"]:["Sectie 1","Sectie 2","Sectie 3","Sectie 4","Sectie 5","Sectie 6","Sectie 7","Sectie 8"];if(a==="breadcrumb")return`<nav class="breadcrumb"><ol>
			${c.slice(0,l).map((e,o)=>o===l-1?`<li aria-current="page">${e}</li>`:`<li><a href="#">${e}</a></li>`).join(`
			`)}
		</ol></nav>`;const y=a==="hoofdnavigatie"?"main-nav":"side-nav",C=c.slice(0,l).map((s,e)=>`<li><a href="#"${e+1===H?' aria-current="page"':""}>${s}</a></li>`).join(`
			`);return`<nav class="${y}"><ul>
			${C}
		</ul></nav>`}},n=()=>`
    <nav class="main-nav">
        <ul>
            <li><a href="#" aria-current="page">Home</a></li>
            <li><a href="#">Pagina 1</a></li>
            <li><a href="#">Pagina 2</a></li>
            <li><a href="#">Pagina 3</a></li>
            <li><a href="#">Pagina 4</a></li>
        </ul>
    </nav>
`,t=()=>`
    <nav class="side-nav">
        <ul>
            <li><a href="#" aria-current="page">Sectie 1</a></li>
            <li><a href="#">Sectie 2</a></li>
            <li><a href="#">Sectie 3</a></li>
            <li><a href="#">Sectie 4</a></li>
            <li><a href="#">Sectie 5</a></li>
        </ul>
    </nav>
`,r=()=>`
    <nav class="breadcrumb">
        <ol>
            <li><a href="#">Home</a></li>
            <li><a href="#">Componenten</a></li>
            <li aria-current="page">Breadcrumb</li>
        </ol>
    </nav>
`;var u,g,m;i.parameters={...i.parameters,docs:{...(u=i.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    type: "hoofdnavigatie",
    aantalItems: 5,
    actievePagina: 1
  },
  render: ({
    type,
    aantalItems,
    actievePagina
  }) => {
    const labels = type === "breadcrumb" ? ["Home", "Categorie", "Subcategorie", "Pagina", "Subpagina", "Detail", "Item", "Huidig"] : type === "hoofdnavigatie" ? ["Home", "Pagina 1", "Pagina 2", "Pagina 3", "Pagina 4", "Pagina 5", "Pagina 6", "Pagina 7"] : ["Sectie 1", "Sectie 2", "Sectie 3", "Sectie 4", "Sectie 5", "Sectie 6", "Sectie 7", "Sectie 8"];
    if (type === "breadcrumb") {
      const items = labels.slice(0, aantalItems).map((label, i) => {
        if (i === aantalItems - 1) return \`<li aria-current="page">\${label}</li>\`;
        return \`<li><a href="#">\${label}</a></li>\`;
      }).join("\\n\\t\\t\\t");
      return \`<nav class="breadcrumb"><ol>\\n\\t\\t\\t\${items}\\n\\t\\t</ol></nav>\`;
    }
    const navClass = type === "hoofdnavigatie" ? "main-nav" : "side-nav";
    const items = labels.slice(0, aantalItems).map((label, i) => {
      const current = i + 1 === actievePagina ? ' aria-current="page"' : "";
      return \`<li><a href="#"\${current}>\${label}</a></li>\`;
    }).join("\\n\\t\\t\\t");
    return \`<nav class="\${navClass}"><ul>\\n\\t\\t\\t\${items}\\n\\t\\t</ul></nav>\`;
  }
}`,...(m=(g=i.parameters)==null?void 0:g.docs)==null?void 0:m.source}}};var v,p,d;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`() => \`
    <nav class="main-nav">
        <ul>
            <li><a href="#" aria-current="page">Home</a></li>
            <li><a href="#">Pagina 1</a></li>
            <li><a href="#">Pagina 2</a></li>
            <li><a href="#">Pagina 3</a></li>
            <li><a href="#">Pagina 4</a></li>
        </ul>
    </nav>
\``,...(d=(p=n.parameters)==null?void 0:p.docs)==null?void 0:d.source}}};var f,b,S;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`() => \`
    <nav class="side-nav">
        <ul>
            <li><a href="#" aria-current="page">Sectie 1</a></li>
            <li><a href="#">Sectie 2</a></li>
            <li><a href="#">Sectie 3</a></li>
            <li><a href="#">Sectie 4</a></li>
            <li><a href="#">Sectie 5</a></li>
        </ul>
    </nav>
\``,...(S=(b=t.parameters)==null?void 0:b.docs)==null?void 0:S.source}}};var h,P,$;r.parameters={...r.parameters,docs:{...(h=r.parameters)==null?void 0:h.docs,source:{originalSource:`() => \`
    <nav class="breadcrumb">
        <ol>
            <li><a href="#">Home</a></li>
            <li><a href="#">Componenten</a></li>
            <li aria-current="page">Breadcrumb</li>
        </ol>
    </nav>
\``,...($=(P=r.parameters)==null?void 0:P.docs)==null?void 0:$.source}}};const j=["Speeltuin","Hoofdnavigatie","Subnavigatie","Breadcrumb"];export{r as Breadcrumb,n as Hoofdnavigatie,i as Speeltuin,t as Subnavigatie,j as __namedExportsOrder,I as default};
