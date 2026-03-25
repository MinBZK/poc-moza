const L={title:"Componenten/Lijsten",tags:["autodocs"]},a={parameters:{docs:{description:{story:"Ongeordende lijst via `<ul>` voor opsommingen zonder volgorde."}}},argTypes:{aantalItems:{name:"Aantal items",control:{type:"range",min:1,max:6,step:1}},item1:{name:"Item 1",control:"text"},item2:{name:"Item 2",control:"text"},item3:{name:"Item 3",control:"text"},item4:{name:"Item 4",control:"text"},item5:{name:"Item 5",control:"text"},item6:{name:"Item 6",control:"text"}},args:{aantalItems:3,item1:"Eerste item in een ongeordende lijst",item2:"Tweede item in een ongeordende lijst",item3:"Derde item in een ongeordende lijst",item4:"Vierde item",item5:"Vijfde item",item6:"Zesde item"},render:e=>`<ul>
${Array.from({length:e.aantalItems},(s,t)=>`	<li>${e[`item${t+1}`]}</li>`).join(`
`)}
</ul>`},p={parameters:{docs:{description:{story:"Ongeordende lijst met geneste lijsten tot twee niveaus diep, inclusief een mix van lijsttypen."}}},argTypes:{item1:{name:"Item 1",control:"text"},item2:{name:"Item 2",control:"text"},item3:{name:"Item 3",control:"text"},genestItem1:{name:"Genest item 1",control:"text"},genestItem2:{name:"Genest item 2",control:"text"},genestItem3:{name:"Genest item 3",control:"text"},diepGenestItem1:{name:"Diep genest item 1",control:"text"},diepGenestItem2:{name:"Diep genest item 2",control:"text"},genestType:{name:"Genest type",control:"select",options:["ul","ol"]},diepGenestType:{name:"Diep genest type",control:"select",options:["ul","ol"]}},args:{item1:"Eerste item",item2:"Tweede item",item3:"Derde item",genestItem1:"Genest item 1",genestItem2:"Genest item 2",genestItem3:"Genest item 3",diepGenestItem1:"Diep genest item 1",diepGenestItem2:"Diep genest item 2",genestType:"ul",diepGenestType:"ol"},render:({item1:e,item2:m,item3:s,genestItem1:t,genestItem2:r,genestItem3:o,diepGenestItem1:l,diepGenestItem2:d,genestType:n,diepGenestType:i})=>`
<ul>
    <li>${e}
        <${n}>
            <li>${t}</li>
            <li>${r}
                <${i}>
                    <li>${l}</li>
                    <li>${d}</li>
                </${i}>
            </li>
            <li>${o}</li>
        </${n}>
    </li>
    <li>${m}</li>
    <li>${s}</li>
</ul>
`},c={parameters:{docs:{description:{story:"Geordende lijst via `<ol>` voor genummerde opsommingen."}}},argTypes:{aantalItems:{name:"Aantal items",control:{type:"range",min:1,max:6,step:1}},item1:{name:"Item 1",control:"text"},item2:{name:"Item 2",control:"text"},item3:{name:"Item 3",control:"text"},item4:{name:"Item 4",control:"text"},item5:{name:"Item 5",control:"text"},item6:{name:"Item 6",control:"text"}},args:{aantalItems:3,item1:"Eerste item in een geordende lijst",item2:"Tweede item in een geordende lijst",item3:"Derde item in een geordende lijst",item4:"Vierde item",item5:"Vijfde item",item6:"Zesde item"},render:e=>`<ol>
${Array.from({length:e.aantalItems},(s,t)=>`	<li>${e[`item${t+1}`]}</li>`).join(`
`)}
</ol>`},g={parameters:{docs:{description:{story:"Geordende lijst met geneste lijsten tot twee niveaus diep, inclusief een mix van lijsttypen."}}},argTypes:{item1:{name:"Item 1",control:"text"},item2:{name:"Item 2",control:"text"},item3:{name:"Item 3",control:"text"},genestItem1:{name:"Genest item 1",control:"text"},genestItem2:{name:"Genest item 2",control:"text"},genestItem3:{name:"Genest item 3",control:"text"},diepGenestItem1:{name:"Diep genest item 1",control:"text"},diepGenestItem2:{name:"Diep genest item 2",control:"text"},genestType:{name:"Genest type",control:"select",options:["ul","ol"]},diepGenestType:{name:"Diep genest type",control:"select",options:["ul","ol"]}},args:{item1:"Eerste item",item2:"Tweede item",item3:"Derde item",genestItem1:"Genest item 1",genestItem2:"Genest item 2",genestItem3:"Genest item 3",diepGenestItem1:"Diep genest item 1",diepGenestItem2:"Diep genest item 2",genestType:"ol",diepGenestType:"ul"},render:({item1:e,item2:m,item3:s,genestItem1:t,genestItem2:r,genestItem3:o,diepGenestItem1:l,diepGenestItem2:d,genestType:n,diepGenestType:i})=>`
<ol>
    <li>${e}
        <${n}>
            <li>${t}</li>
            <li>${r}
                <${i}>
                    <li>${l}</li>
                    <li>${d}</li>
                </${i}>
            </li>
            <li>${o}</li>
        </${n}>
    </li>
    <li>${m}</li>
    <li>${s}</li>
</ol>
`},I={parameters:{docs:{description:{story:"Definitielijst via `<dl>` met `<dt>` voor termen en `<dd>` voor beschrijvingen."}}},render:()=>`
<dl>
    <dt>Definitieterm</dt>
    <dd>Dit is de beschrijving van de definitieterm.</dd>
    <dt>Tweede term</dt>
    <dd>Dit is de beschrijving van de tweede term.</dd>
</dl>
`},G={parameters:{docs:{description:{story:"Definitielijst met geneste lijsten in de beschrijvingen, tot twee niveaus diep."}}},argTypes:{term1:{name:"Term 1",control:"text"},beschrijving1:{name:"Beschrijving 1",control:"text"},term2:{name:"Term 2",control:"text"},beschrijving2:{name:"Beschrijving 2",control:"text"},genestItem1:{name:"Genest item 1",control:"text"},genestItem2:{name:"Genest item 2",control:"text"},diepGenestItem1:{name:"Diep genest item 1",control:"text"},diepGenestItem2:{name:"Diep genest item 2",control:"text"},genestType:{name:"Genest type",control:"select",options:["ul","ol"]},diepGenestType:{name:"Diep genest type",control:"select",options:["ul","ol"]}},args:{term1:"Eerste term",beschrijving1:"Beschrijving met een geneste lijst:",term2:"Tweede term",beschrijving2:"Beschrijving met een geneste lijst:",genestItem1:"Genest item 1",genestItem2:"Genest item 2",diepGenestItem1:"Diep genest item 1",diepGenestItem2:"Diep genest item 2",genestType:"ul",diepGenestType:"ol"},render:({term1:e,beschrijving1:m,term2:s,beschrijving2:t,genestItem1:r,genestItem2:o,diepGenestItem1:l,diepGenestItem2:d,genestType:n,diepGenestType:i})=>`
<dl>
    <dt>${e}</dt>
    <dd>${m}
        <${n}>
            <li>${r}</li>
            <li>${o}
                <${i}>
                    <li>${l}</li>
                    <li>${d}</li>
                </${i}>
            </li>
        </${n}>
    </dd>
    <dt>${s}</dt>
    <dd>${t}
        <${n}>
            <li>${r}</li>
            <li>${o}</li>
        </${n}>
    </dd>
</dl>
`};var $,j,x;a.parameters={...a.parameters,docs:{...($=a.parameters)==null?void 0:$.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Ongeordende lijst via \`<ul>\` voor opsommingen zonder volgorde."
      }
    }
  },
  argTypes: {
    aantalItems: {
      name: "Aantal items",
      control: {
        type: "range",
        min: 1,
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
    aantalItems: 3,
    item1: "Eerste item in een ongeordende lijst",
    item2: "Tweede item in een ongeordende lijst",
    item3: "Derde item in een ongeordende lijst",
    item4: "Vierde item",
    item5: "Vijfde item",
    item6: "Zesde item"
  },
  render: args => {
    const items = Array.from({
      length: args.aantalItems
    }, (_, i) => \`\\t<li>\${args[\`item\${i + 1}\`]}</li>\`).join("\\n");
    return \`<ul>\\n\${items}\\n</ul>\`;
  }
}`,...(x=(j=a.parameters)==null?void 0:j.docs)==null?void 0:x.source}}};var y,u,T;p.parameters={...p.parameters,docs:{...(y=p.parameters)==null?void 0:y.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Ongeordende lijst met geneste lijsten tot twee niveaus diep, inclusief een mix van lijsttypen."
      }
    }
  },
  argTypes: {
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
    genestItem1: {
      name: "Genest item 1",
      control: "text"
    },
    genestItem2: {
      name: "Genest item 2",
      control: "text"
    },
    genestItem3: {
      name: "Genest item 3",
      control: "text"
    },
    diepGenestItem1: {
      name: "Diep genest item 1",
      control: "text"
    },
    diepGenestItem2: {
      name: "Diep genest item 2",
      control: "text"
    },
    genestType: {
      name: "Genest type",
      control: "select",
      options: ["ul", "ol"]
    },
    diepGenestType: {
      name: "Diep genest type",
      control: "select",
      options: ["ul", "ol"]
    }
  },
  args: {
    item1: "Eerste item",
    item2: "Tweede item",
    item3: "Derde item",
    genestItem1: "Genest item 1",
    genestItem2: "Genest item 2",
    genestItem3: "Genest item 3",
    diepGenestItem1: "Diep genest item 1",
    diepGenestItem2: "Diep genest item 2",
    genestType: "ul",
    diepGenestType: "ol"
  },
  render: ({
    item1,
    item2,
    item3,
    genestItem1,
    genestItem2,
    genestItem3,
    diepGenestItem1,
    diepGenestItem2,
    genestType,
    diepGenestType
  }) => \`
<ul>
    <li>\${item1}
        <\${genestType}>
            <li>\${genestItem1}</li>
            <li>\${genestItem2}
                <\${diepGenestType}>
                    <li>\${diepGenestItem1}</li>
                    <li>\${diepGenestItem2}</li>
                </\${diepGenestType}>
            </li>
            <li>\${genestItem3}</li>
        </\${genestType}>
    </li>
    <li>\${item2}</li>
    <li>\${item3}</li>
</ul>
\`
}`,...(T=(u=p.parameters)==null?void 0:u.docs)==null?void 0:T.source}}};var v,D,h;c.parameters={...c.parameters,docs:{...(v=c.parameters)==null?void 0:v.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Geordende lijst via \`<ol>\` voor genummerde opsommingen."
      }
    }
  },
  argTypes: {
    aantalItems: {
      name: "Aantal items",
      control: {
        type: "range",
        min: 1,
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
    aantalItems: 3,
    item1: "Eerste item in een geordende lijst",
    item2: "Tweede item in een geordende lijst",
    item3: "Derde item in een geordende lijst",
    item4: "Vierde item",
    item5: "Vijfde item",
    item6: "Zesde item"
  },
  render: args => {
    const items = Array.from({
      length: args.aantalItems
    }, (_, i) => \`\\t<li>\${args[\`item\${i + 1}\`]}</li>\`).join("\\n");
    return \`<ol>\\n\${items}\\n</ol>\`;
  }
}`,...(h=(D=c.parameters)==null?void 0:D.docs)==null?void 0:h.source}}};var f,b,w;g.parameters={...g.parameters,docs:{...(f=g.parameters)==null?void 0:f.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Geordende lijst met geneste lijsten tot twee niveaus diep, inclusief een mix van lijsttypen."
      }
    }
  },
  argTypes: {
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
    genestItem1: {
      name: "Genest item 1",
      control: "text"
    },
    genestItem2: {
      name: "Genest item 2",
      control: "text"
    },
    genestItem3: {
      name: "Genest item 3",
      control: "text"
    },
    diepGenestItem1: {
      name: "Diep genest item 1",
      control: "text"
    },
    diepGenestItem2: {
      name: "Diep genest item 2",
      control: "text"
    },
    genestType: {
      name: "Genest type",
      control: "select",
      options: ["ul", "ol"]
    },
    diepGenestType: {
      name: "Diep genest type",
      control: "select",
      options: ["ul", "ol"]
    }
  },
  args: {
    item1: "Eerste item",
    item2: "Tweede item",
    item3: "Derde item",
    genestItem1: "Genest item 1",
    genestItem2: "Genest item 2",
    genestItem3: "Genest item 3",
    diepGenestItem1: "Diep genest item 1",
    diepGenestItem2: "Diep genest item 2",
    genestType: "ol",
    diepGenestType: "ul"
  },
  render: ({
    item1,
    item2,
    item3,
    genestItem1,
    genestItem2,
    genestItem3,
    diepGenestItem1,
    diepGenestItem2,
    genestType,
    diepGenestType
  }) => \`
<ol>
    <li>\${item1}
        <\${genestType}>
            <li>\${genestItem1}</li>
            <li>\${genestItem2}
                <\${diepGenestType}>
                    <li>\${diepGenestItem1}</li>
                    <li>\${diepGenestItem2}</li>
                </\${diepGenestType}>
            </li>
            <li>\${genestItem3}</li>
        </\${genestType}>
    </li>
    <li>\${item2}</li>
    <li>\${item3}</li>
</ol>
\`
}`,...(w=(b=g.parameters)==null?void 0:b.docs)==null?void 0:w.source}}};var E,O,A;I.parameters={...I.parameters,docs:{...(E=I.parameters)==null?void 0:E.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Definitielijst via \`<dl>\` met \`<dt>\` voor termen en \`<dd>\` voor beschrijvingen."
      }
    }
  },
  render: () => \`
<dl>
    <dt>Definitieterm</dt>
    <dd>Dit is de beschrijving van de definitieterm.</dd>
    <dt>Tweede term</dt>
    <dd>Dit is de beschrijving van de tweede term.</dd>
</dl>
\`
}`,...(A=(O=I.parameters)==null?void 0:O.docs)==null?void 0:A.source}}};var B,V,_;G.parameters={...G.parameters,docs:{...(B=G.parameters)==null?void 0:B.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Definitielijst met geneste lijsten in de beschrijvingen, tot twee niveaus diep."
      }
    }
  },
  argTypes: {
    term1: {
      name: "Term 1",
      control: "text"
    },
    beschrijving1: {
      name: "Beschrijving 1",
      control: "text"
    },
    term2: {
      name: "Term 2",
      control: "text"
    },
    beschrijving2: {
      name: "Beschrijving 2",
      control: "text"
    },
    genestItem1: {
      name: "Genest item 1",
      control: "text"
    },
    genestItem2: {
      name: "Genest item 2",
      control: "text"
    },
    diepGenestItem1: {
      name: "Diep genest item 1",
      control: "text"
    },
    diepGenestItem2: {
      name: "Diep genest item 2",
      control: "text"
    },
    genestType: {
      name: "Genest type",
      control: "select",
      options: ["ul", "ol"]
    },
    diepGenestType: {
      name: "Diep genest type",
      control: "select",
      options: ["ul", "ol"]
    }
  },
  args: {
    term1: "Eerste term",
    beschrijving1: "Beschrijving met een geneste lijst:",
    term2: "Tweede term",
    beschrijving2: "Beschrijving met een geneste lijst:",
    genestItem1: "Genest item 1",
    genestItem2: "Genest item 2",
    diepGenestItem1: "Diep genest item 1",
    diepGenestItem2: "Diep genest item 2",
    genestType: "ul",
    diepGenestType: "ol"
  },
  render: ({
    term1,
    beschrijving1,
    term2,
    beschrijving2,
    genestItem1,
    genestItem2,
    diepGenestItem1,
    diepGenestItem2,
    genestType,
    diepGenestType
  }) => \`
<dl>
    <dt>\${term1}</dt>
    <dd>\${beschrijving1}
        <\${genestType}>
            <li>\${genestItem1}</li>
            <li>\${genestItem2}
                <\${diepGenestType}>
                    <li>\${diepGenestItem1}</li>
                    <li>\${diepGenestItem2}</li>
                </\${diepGenestType}>
            </li>
        </\${genestType}>
    </dd>
    <dt>\${term2}</dt>
    <dd>\${beschrijving2}
        <\${genestType}>
            <li>\${genestItem1}</li>
            <li>\${genestItem2}</li>
        </\${genestType}>
    </dd>
</dl>
\`
}`,...(_=(V=G.parameters)==null?void 0:V.docs)==null?void 0:_.source}}};const S=["OngeordendeLijst","GenestOngeordend","GeordendeLijst","GenestGeordend","Definitielijst","GenestDefinitie"];export{I as Definitielijst,G as GenestDefinitie,g as GenestGeordend,p as GenestOngeordend,c as GeordendeLijst,a as OngeordendeLijst,S as __namedExportsOrder,L as default};
