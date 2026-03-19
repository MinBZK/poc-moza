const p={title:"Componenten/Navigatie",tags:["autodocs"]},a={parameters:{docs:{description:{story:'Hoofdnavigatie met `aria-current="page"` om de actieve pagina aan te geven.'}}},render:()=>`
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
        <li><a href="#" aria-current="page">Home</a></li>
        <li><a href="#">Pagina 1</a></li>
        <li><a href="#">Pagina 2</a></li>
        <li><a href="#">Pagina 3</a></li>
        <li><a href="#">Pagina 4</a></li>
    </ul>
</nav>
`},i={parameters:{docs:{description:{story:"Breadcrumb-navigatie die de hiërarchische positie van de huidige pagina toont."}}},render:()=>`
<nav class="breadcrumb">
    <ol>
        <li><a href="#">Home</a></li>
        <li><a href="#">Pagina 1</a></li>
        <li aria-current="page">Huidige sub-pagina</li>
    </ol>
</nav>
`};var n,r,s;a.parameters={...a.parameters,docs:{...(n=a.parameters)==null?void 0:n.docs,source:{originalSource:`{
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
}`,...(s=(r=a.parameters)==null?void 0:r.docs)==null?void 0:s.source}}};var o,t,l;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
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
        <li><a href="#" aria-current="page">Home</a></li>
        <li><a href="#">Pagina 1</a></li>
        <li><a href="#">Pagina 2</a></li>
        <li><a href="#">Pagina 3</a></li>
        <li><a href="#">Pagina 4</a></li>
    </ul>
</nav>
\`
}`,...(l=(t=e.parameters)==null?void 0:t.docs)==null?void 0:l.source}}};var c,d,g;i.parameters={...i.parameters,docs:{...(c=i.parameters)==null?void 0:c.docs,source:{originalSource:`{
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
        <li><a href="#">Pagina 1</a></li>
        <li aria-current="page">Huidige sub-pagina</li>
    </ol>
</nav>
\`
}`,...(g=(d=i.parameters)==null?void 0:d.docs)==null?void 0:g.source}}};const u=["Hoofdnavigatie","SidebarNavigatie","Breadcrumb"];export{i as Breadcrumb,a as Hoofdnavigatie,e as SidebarNavigatie,u as __namedExportsOrder,p as default};
