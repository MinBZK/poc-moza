const g={title:"Componenten/Navigatie",tags:["autodocs"]},a={parameters:{docs:{description:{story:'Hoofdnavigatie met `aria-current="page"` om de actieve pagina aan te geven.'}}},render:()=>`
<nav class="main-nav">
    <ul>
        <li><a href="#" aria-current="page">Home</a></li>
        <li><a href="#">Pagina 1</a></li>
        <li><a href="#">Pagina 2</a></li>
        <li><a href="#">Pagina 3</a></li>
        <li><a href="#">Pagina 4</a></li>
    </ul>
</nav>
`},e={parameters:{docs:{description:{story:"Sidebar navigatie voor navigatie binnen een sectie."}}},render:()=>`
<nav class="side-nav">
    <ul>
        <li><a href="#" aria-current="page">Sectie 1</a></li>
        <li><a href="#">Sectie 2</a></li>
        <li><a href="#">Sectie 3</a></li>
        <li><a href="#">Sectie 4</a></li>
        <li><a href="#">Sectie 5</a></li>
    </ul>
</nav>
`},i={parameters:{docs:{description:{story:"Breadcrumb-navigatie die de hiërarchische positie van de huidige pagina toont."}}},render:()=>`
<nav class="breadcrumb">
    <ol>
        <li><a href="#">Home</a></li>
        <li><a href="#">Componenten</a></li>
        <li aria-current="page">Breadcrumb</li>
    </ol>
</nav>
`};var r,n,t;a.parameters={...a.parameters,docs:{...(r=a.parameters)==null?void 0:r.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Hoofdnavigatie met \`aria-current=\\"page\\"\` om de actieve pagina aan te geven."
      }
    }
  },
  render: () => \`
<nav class="main-nav">
    <ul>
        <li><a href="#" aria-current="page">Home</a></li>
        <li><a href="#">Pagina 1</a></li>
        <li><a href="#">Pagina 2</a></li>
        <li><a href="#">Pagina 3</a></li>
        <li><a href="#">Pagina 4</a></li>
    </ul>
</nav>
\`
}`,...(t=(n=a.parameters)==null?void 0:n.docs)==null?void 0:t.source}}};var o,s,c;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Sidebar navigatie voor navigatie binnen een sectie."
      }
    }
  },
  render: () => \`
<nav class="side-nav">
    <ul>
        <li><a href="#" aria-current="page">Sectie 1</a></li>
        <li><a href="#">Sectie 2</a></li>
        <li><a href="#">Sectie 3</a></li>
        <li><a href="#">Sectie 4</a></li>
        <li><a href="#">Sectie 5</a></li>
    </ul>
</nav>
\`
}`,...(c=(s=e.parameters)==null?void 0:s.docs)==null?void 0:c.source}}};var l,d,p;i.parameters={...i.parameters,docs:{...(l=i.parameters)==null?void 0:l.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Breadcrumb-navigatie die de hiërarchische positie van de huidige pagina toont."
      }
    }
  },
  render: () => \`
<nav class="breadcrumb">
    <ol>
        <li><a href="#">Home</a></li>
        <li><a href="#">Componenten</a></li>
        <li aria-current="page">Breadcrumb</li>
    </ol>
</nav>
\`
}`,...(p=(d=i.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};const m=["Hoofdnavigatie","SidebarNavigatie","Breadcrumb"];export{i as Breadcrumb,a as Hoofdnavigatie,e as SidebarNavigatie,m as __namedExportsOrder,g as default};
