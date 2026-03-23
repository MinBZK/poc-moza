const N={title:"Componenten/Navigatie",tags:["autodocs"]},l={parameters:{docs:{description:{story:'Hoofdnavigatie met `aria-current="page"` om de actieve pagina aan te geven.'}}},argTypes:{aantalItems:{name:"Aantal items",control:{type:"range",min:2,max:6,step:1}},item1:{name:"Item 1",control:"text"},item2:{name:"Item 2",control:"text"},item3:{name:"Item 3",control:"text"},item4:{name:"Item 4",control:"text"},item5:{name:"Item 5",control:"text"},item6:{name:"Item 6",control:"text"}},args:{aantalItems:5,item1:"Home",item2:"Pagina 1",item3:"Pagina 2",item4:"Pagina 3",item5:"Pagina 4",item6:"Pagina 5"},render:({aantalItems:n,item1:t,item2:a,item3:i,item4:m,item5:r,item6:e})=>`
<nav class="main-nav">
    <ul>
${[t,a,i,m,r,e].slice(0,n).map((o,p)=>`	<li><a href="#"${p===0?' aria-current="page"':""}>${o}</a></li>`).join(`
`)}
    </ul>
</nav>
`},c={parameters:{docs:{description:{story:"Sidebar navigatie voor navigatie binnen een sectie."}}},argTypes:{aantalItems:{name:"Aantal items",control:{type:"range",min:2,max:6,step:1}},item1:{name:"Item 1",control:"text"},item2:{name:"Item 2",control:"text"},item3:{name:"Item 3",control:"text"},item4:{name:"Item 4",control:"text"},item5:{name:"Item 5",control:"text"},item6:{name:"Item 6",control:"text"}},args:{aantalItems:5,item1:"Home",item2:"Pagina 1",item3:"Pagina 2",item4:"Pagina 3",item5:"Pagina 4",item6:"Pagina 5"},render:({aantalItems:n,item1:t,item2:a,item3:i,item4:m,item5:r,item6:e})=>`
<nav class="side-nav">
    <ul>
${[t,a,i,m,r,e].slice(0,n).map((o,p)=>`	<li><a href="#"${p===0?' aria-current="page"':""}>${o}</a></li>`).join(`
`)}
    </ul>
</nav>
`},g={parameters:{docs:{description:{story:"Breadcrumb-navigatie die de hiërarchische positie van de huidige pagina toont."}}},argTypes:{aantalItems:{name:"Aantal items",control:{type:"range",min:2,max:5,step:1}},item1:{name:"Item 1",control:"text"},item2:{name:"Item 2",control:"text"},item3:{name:"Item 3",control:"text"},item4:{name:"Item 4",control:"text"},item5:{name:"Item 5",control:"text"}},args:{aantalItems:3,item1:"Home",item2:"Niveau 1",item3:"Niveau 2",item4:"Niveau 3",item5:"Niveau 4"},render:({aantalItems:n,item1:t,item2:a,item3:i,item4:m,item5:r})=>{const e=[t,a,i,m,r].slice(0,n);return`
<nav class="breadcrumb">
    <ol>
${e.map((s,o)=>o===e.length-1?`	<li aria-current="page">${s}</li>`:`	<li><a href="#">${s}</a></li>`).join(`
`)}
    </ol>
</nav>
`}};var d,I,v;l.parameters={...l.parameters,docs:{...(d=l.parameters)==null?void 0:d.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Hoofdnavigatie met \`aria-current=\\"page\\"\` om de actieve pagina aan te geven."
      }
    }
  },
  argTypes: {
    aantalItems: {
      name: "Aantal items",
      control: {
        type: "range",
        min: 2,
        max: 6,
        step: 1
      }
    },
    item1: {
      name: "Item 1",
      control: "text"
    },
    item2: {
      name: "Item 2",
      control: "text"
    },
    item3: {
      name: "Item 3",
      control: "text"
    },
    item4: {
      name: "Item 4",
      control: "text"
    },
    item5: {
      name: "Item 5",
      control: "text"
    },
    item6: {
      name: "Item 6",
      control: "text"
    }
  },
  args: {
    aantalItems: 5,
    item1: "Home",
    item2: "Pagina 1",
    item3: "Pagina 2",
    item4: "Pagina 3",
    item5: "Pagina 4",
    item6: "Pagina 5"
  },
  render: ({
    aantalItems,
    item1,
    item2,
    item3,
    item4,
    item5,
    item6
  }) => {
    const labels = [item1, item2, item3, item4, item5, item6].slice(0, aantalItems);
    const items = labels.map((label, i) => {
      const current = i === 0 ? ' aria-current="page"' : "";
      return \`\\t<li><a href="#"\${current}>\${label}</a></li>\`;
    }).join("\\n");
    return \`
<nav class="main-nav">
    <ul>
\${items}
    </ul>
</nav>
\`;
  }
}`,...(v=(I=l.parameters)==null?void 0:I.docs)==null?void 0:v.source}}};var x,b,P;c.parameters={...c.parameters,docs:{...(x=c.parameters)==null?void 0:x.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Sidebar navigatie voor navigatie binnen een sectie."
      }
    }
  },
  argTypes: {
    aantalItems: {
      name: "Aantal items",
      control: {
        type: "range",
        min: 2,
        max: 6,
        step: 1
      }
    },
    item1: {
      name: "Item 1",
      control: "text"
    },
    item2: {
      name: "Item 2",
      control: "text"
    },
    item3: {
      name: "Item 3",
      control: "text"
    },
    item4: {
      name: "Item 4",
      control: "text"
    },
    item5: {
      name: "Item 5",
      control: "text"
    },
    item6: {
      name: "Item 6",
      control: "text"
    }
  },
  args: {
    aantalItems: 5,
    item1: "Home",
    item2: "Pagina 1",
    item3: "Pagina 2",
    item4: "Pagina 3",
    item5: "Pagina 4",
    item6: "Pagina 5"
  },
  render: ({
    aantalItems,
    item1,
    item2,
    item3,
    item4,
    item5,
    item6
  }) => {
    const labels = [item1, item2, item3, item4, item5, item6].slice(0, aantalItems);
    const items = labels.map((label, i) => {
      const current = i === 0 ? ' aria-current="page"' : "";
      return \`\\t<li><a href="#"\${current}>\${label}</a></li>\`;
    }).join("\\n");
    return \`
<nav class="side-nav">
    <ul>
\${items}
    </ul>
</nav>
\`;
  }
}`,...(P=(b=c.parameters)==null?void 0:b.docs)==null?void 0:P.source}}};var y,$,h;g.parameters={...g.parameters,docs:{...(y=g.parameters)==null?void 0:y.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Breadcrumb-navigatie die de hiërarchische positie van de huidige pagina toont."
      }
    }
  },
  argTypes: {
    aantalItems: {
      name: "Aantal items",
      control: {
        type: "range",
        min: 2,
        max: 5,
        step: 1
      }
    },
    item1: {
      name: "Item 1",
      control: "text"
    },
    item2: {
      name: "Item 2",
      control: "text"
    },
    item3: {
      name: "Item 3",
      control: "text"
    },
    item4: {
      name: "Item 4",
      control: "text"
    },
    item5: {
      name: "Item 5",
      control: "text"
    }
  },
  args: {
    aantalItems: 3,
    item1: "Home",
    item2: "Niveau 1",
    item3: "Niveau 2",
    item4: "Niveau 3",
    item5: "Niveau 4"
  },
  render: ({
    aantalItems,
    item1,
    item2,
    item3,
    item4,
    item5
  }) => {
    const labels = [item1, item2, item3, item4, item5].slice(0, aantalItems);
    const items = labels.map((label, i) => {
      if (i === labels.length - 1) return \`\\t<li aria-current="page">\${label}</li>\`;
      return \`\\t<li><a href="#">\${label}</a></li>\`;
    }).join("\\n");
    return \`
<nav class="breadcrumb">
    <ol>
\${items}
    </ol>
</nav>
\`;
  }
}`,...(h=($=g.parameters)==null?void 0:$.docs)==null?void 0:h.source}}};const H=["Hoofdnavigatie","SidebarNavigatie","Breadcrumb"];export{g as Breadcrumb,l as Hoofdnavigatie,c as SidebarNavigatie,H as __namedExportsOrder,N as default};
