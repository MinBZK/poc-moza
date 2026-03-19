const z={title:"Componenten/Lijsten",tags:["autodocs"]},p={parameters:{docs:{description:{story:"Ongeordende lijst via `<ul>` voor opsommingen zonder volgorde."}}},render:()=>`
<ul>
    <li>Eerste item in een ongeordende lijst</li>
    <li>Tweede item in een ongeordende lijst</li>
    <li>Derde item in een ongeordende lijst</li>
</ul>
`},g={parameters:{docs:{description:{story:"Ongeordende lijst met geneste lijsten tot twee niveaus diep, inclusief een mix van lijsttypen."}}},argTypes:{item1:{name:"Item 1",control:"text"},item2:{name:"Item 2",control:"text"},item3:{name:"Item 3",control:"text"},genestItem1:{name:"Genest item 1",control:"text"},genestItem2:{name:"Genest item 2",control:"text"},genestItem3:{name:"Genest item 3",control:"text"},diepGenestItem1:{name:"Diep genest item 1",control:"text"},diepGenestItem2:{name:"Diep genest item 2",control:"text"},genestType:{name:"Genest type",control:"select",options:["ul","ol"]},diepGenestType:{name:"Diep genest type",control:"select",options:["ul","ol"]}},args:{item1:"Eerste item",item2:"Tweede item",item3:"Derde item",genestItem1:"Genest item 1",genestItem2:"Genest item 2",genestItem3:"Genest item 3",diepGenestItem1:"Diep genest item 1",diepGenestItem2:"Diep genest item 2",genestType:"ul",diepGenestType:"ol"},render:({item1:s,item2:m,item3:r,genestItem1:o,genestItem2:t,genestItem3:i,diepGenestItem1:l,diepGenestItem2:d,genestType:e,diepGenestType:n})=>`
<ul>
    <li>${s}
        <${e}>
            <li>${o}</li>
            <li>${t}
                <${n}>
                    <li>${l}</li>
                    <li>${d}</li>
                </${n}>
            </li>
            <li>${i}</li>
        </${e}>
    </li>
    <li>${m}</li>
    <li>${r}</li>
</ul>
`},a={parameters:{docs:{description:{story:"Geordende lijst via `<ol>` voor genummerde opsommingen."}}},render:()=>`
<ol>
    <li>Eerste item in een geordende lijst</li>
    <li>Tweede item in een geordende lijst</li>
    <li>Derde item in een geordende lijst</li>
</ol>
`},c={parameters:{docs:{description:{story:"Geordende lijst met geneste lijsten tot twee niveaus diep, inclusief een mix van lijsttypen."}}},argTypes:{item1:{name:"Item 1",control:"text"},item2:{name:"Item 2",control:"text"},item3:{name:"Item 3",control:"text"},genestItem1:{name:"Genest item 1",control:"text"},genestItem2:{name:"Genest item 2",control:"text"},genestItem3:{name:"Genest item 3",control:"text"},diepGenestItem1:{name:"Diep genest item 1",control:"text"},diepGenestItem2:{name:"Diep genest item 2",control:"text"},genestType:{name:"Genest type",control:"select",options:["ul","ol"]},diepGenestType:{name:"Diep genest type",control:"select",options:["ul","ol"]}},args:{item1:"Eerste item",item2:"Tweede item",item3:"Derde item",genestItem1:"Genest item 1",genestItem2:"Genest item 2",genestItem3:"Genest item 3",diepGenestItem1:"Diep genest item 1",diepGenestItem2:"Diep genest item 2",genestType:"ol",diepGenestType:"ul"},render:({item1:s,item2:m,item3:r,genestItem1:o,genestItem2:t,genestItem3:i,diepGenestItem1:l,diepGenestItem2:d,genestType:e,diepGenestType:n})=>`
<ol>
    <li>${s}
        <${e}>
            <li>${o}</li>
            <li>${t}
                <${n}>
                    <li>${l}</li>
                    <li>${d}</li>
                </${n}>
            </li>
            <li>${i}</li>
        </${e}>
    </li>
    <li>${m}</li>
    <li>${r}</li>
</ol>
`},G={parameters:{docs:{description:{story:"Definitielijst via `<dl>` met `<dt>` voor termen en `<dd>` voor beschrijvingen."}}},render:()=>`
<dl>
    <dt>Definitieterm</dt>
    <dd>Dit is de beschrijving van de definitieterm.</dd>
    <dt>Tweede term</dt>
    <dd>Dit is de beschrijving van de tweede term.</dd>
</dl>
`},I={parameters:{docs:{description:{story:"Definitielijst met geneste lijsten in de beschrijvingen, tot twee niveaus diep."}}},argTypes:{term1:{name:"Term 1",control:"text"},beschrijving1:{name:"Beschrijving 1",control:"text"},term2:{name:"Term 2",control:"text"},beschrijving2:{name:"Beschrijving 2",control:"text"},genestItem1:{name:"Genest item 1",control:"text"},genestItem2:{name:"Genest item 2",control:"text"},diepGenestItem1:{name:"Diep genest item 1",control:"text"},diepGenestItem2:{name:"Diep genest item 2",control:"text"},genestType:{name:"Genest type",control:"select",options:["ul","ol"]},diepGenestType:{name:"Diep genest type",control:"select",options:["ul","ol"]}},args:{term1:"Eerste term",beschrijving1:"Beschrijving met een geneste lijst:",term2:"Tweede term",beschrijving2:"Beschrijving met een geneste lijst:",genestItem1:"Genest item 1",genestItem2:"Genest item 2",diepGenestItem1:"Diep genest item 1",diepGenestItem2:"Diep genest item 2",genestType:"ul",diepGenestType:"ol"},render:({term1:s,beschrijving1:m,term2:r,beschrijving2:o,genestItem1:t,genestItem2:i,diepGenestItem1:l,diepGenestItem2:d,genestType:e,diepGenestType:n})=>`
<dl>
    <dt>${s}</dt>
    <dd>${m}
        <${e}>
            <li>${t}</li>
            <li>${i}
                <${n}>
                    <li>${l}</li>
                    <li>${d}</li>
                </${n}>
            </li>
        </${e}>
    </dd>
    <dt>${r}</dt>
    <dd>${o}
        <${e}>
            <li>${t}</li>
            <li>${i}</li>
        </${e}>
    </dd>
</dl>
`};var $,j,y;p.parameters={...p.parameters,docs:{...($=p.parameters)==null?void 0:$.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Ongeordende lijst via \`<ul>\` voor opsommingen zonder volgorde."
      }
    }
  },
  render: () => \`
<ul>
    <li>Eerste item in een ongeordende lijst</li>
    <li>Tweede item in een ongeordende lijst</li>
    <li>Derde item in een ongeordende lijst</li>
</ul>
\`
}`,...(y=(j=p.parameters)==null?void 0:j.docs)==null?void 0:y.source}}};var u,v,T;g.parameters={...g.parameters,docs:{...(u=g.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(T=(v=g.parameters)==null?void 0:v.docs)==null?void 0:T.source}}};var x,D,h;a.parameters={...a.parameters,docs:{...(x=a.parameters)==null?void 0:x.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Geordende lijst via \`<ol>\` voor genummerde opsommingen."
      }
    }
  },
  render: () => \`
<ol>
    <li>Eerste item in een geordende lijst</li>
    <li>Tweede item in een geordende lijst</li>
    <li>Derde item in een geordende lijst</li>
</ol>
\`
}`,...(h=(D=a.parameters)==null?void 0:D.docs)==null?void 0:h.source}}};var b,w,f;c.parameters={...c.parameters,docs:{...(b=c.parameters)==null?void 0:b.docs,source:{originalSource:`{
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
}`,...(f=(w=c.parameters)==null?void 0:w.docs)==null?void 0:f.source}}};var E,O,B;G.parameters={...G.parameters,docs:{...(E=G.parameters)==null?void 0:E.docs,source:{originalSource:`{
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
}`,...(B=(O=G.parameters)==null?void 0:O.docs)==null?void 0:B.source}}};var L,S,_;I.parameters={...I.parameters,docs:{...(L=I.parameters)==null?void 0:L.docs,source:{originalSource:`{
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
}`,...(_=(S=I.parameters)==null?void 0:S.docs)==null?void 0:_.source}}};const C=["OngeordendeLijst","GenestOngeordend","GeordendeLijst","GenestGeordend","Definitielijst","GenestDefinitie"];export{G as Definitielijst,I as GenestDefinitie,c as GenestGeordend,g as GenestOngeordend,a as GeordendeLijst,p as OngeordendeLijst,C as __namedExportsOrder,z as default};
