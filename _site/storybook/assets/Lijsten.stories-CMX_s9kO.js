const z={title:"Componenten/Lijsten",tags:["autodocs"]},p={parameters:{docs:{description:{story:"Ongeordende lijst via `<ul>` voor opsommingen zonder volgorde."}}},render:()=>`
<ul>
    <li>Eerste item in een ongeordende lijst</li>
    <li>Tweede item in een ongeordende lijst</li>
    <li>Derde item in een ongeordende lijst</li>
</ul>
`},c={parameters:{docs:{description:{story:"Ongeordende lijst met geneste lijsten tot twee niveaus diep, inclusief een mix van lijsttypen."}}},argTypes:{item1:{control:"text"},item2:{control:"text"},item3:{control:"text"},genestItem1:{control:"text"},genestItem2:{control:"text"},genestItem3:{control:"text"},diepGenestItem1:{control:"text"},diepGenestItem2:{control:"text"},genestType:{control:"select",options:["ul","ol"]},diepGenestType:{control:"select",options:["ul","ol"]}},args:{item1:"Eerste item",item2:"Tweede item",item3:"Derde item",genestItem1:"Genest item 1",genestItem2:"Genest item 2",genestItem3:"Genest item 3",diepGenestItem1:"Diep genest item 1",diepGenestItem2:"Diep genest item 2",genestType:"ul",diepGenestType:"ol"},render:({item1:s,item2:o,item3:r,genestItem1:l,genestItem2:n,genestItem3:i,diepGenestItem1:d,diepGenestItem2:m,genestType:e,diepGenestType:t})=>`
<ul>
    <li>${s}
        <${e}>
            <li>${l}</li>
            <li>${n}
                <${t}>
                    <li>${d}</li>
                    <li>${m}</li>
                </${t}>
            </li>
            <li>${i}</li>
        </${e}>
    </li>
    <li>${o}</li>
    <li>${r}</li>
</ul>
`},g={parameters:{docs:{description:{story:"Geordende lijst via `<ol>` voor genummerde opsommingen."}}},render:()=>`
<ol>
    <li>Eerste item in een geordende lijst</li>
    <li>Tweede item in een geordende lijst</li>
    <li>Derde item in een geordende lijst</li>
</ol>
`},a={parameters:{docs:{description:{story:"Geordende lijst met geneste lijsten tot twee niveaus diep, inclusief een mix van lijsttypen."}}},argTypes:{item1:{control:"text"},item2:{control:"text"},item3:{control:"text"},genestItem1:{control:"text"},genestItem2:{control:"text"},genestItem3:{control:"text"},diepGenestItem1:{control:"text"},diepGenestItem2:{control:"text"},genestType:{control:"select",options:["ul","ol"]},diepGenestType:{control:"select",options:["ul","ol"]}},args:{item1:"Eerste item",item2:"Tweede item",item3:"Derde item",genestItem1:"Genest item 1",genestItem2:"Genest item 2",genestItem3:"Genest item 3",diepGenestItem1:"Diep genest item 1",diepGenestItem2:"Diep genest item 2",genestType:"ol",diepGenestType:"ul"},render:({item1:s,item2:o,item3:r,genestItem1:l,genestItem2:n,genestItem3:i,diepGenestItem1:d,diepGenestItem2:m,genestType:e,diepGenestType:t})=>`
<ol>
    <li>${s}
        <${e}>
            <li>${l}</li>
            <li>${n}
                <${t}>
                    <li>${d}</li>
                    <li>${m}</li>
                </${t}>
            </li>
            <li>${i}</li>
        </${e}>
    </li>
    <li>${o}</li>
    <li>${r}</li>
</ol>
`},G={parameters:{docs:{description:{story:"Definitielijst via `<dl>` met `<dt>` voor termen en `<dd>` voor beschrijvingen."}}},render:()=>`
<dl>
    <dt>Definitieterm</dt>
    <dd>Dit is de beschrijving van de definitieterm.</dd>
    <dt>Tweede term</dt>
    <dd>Dit is de beschrijving van de tweede term.</dd>
</dl>
`},I={parameters:{docs:{description:{story:"Definitielijst met geneste lijsten in de beschrijvingen, tot twee niveaus diep."}}},argTypes:{term1:{control:"text"},beschrijving1:{control:"text"},term2:{control:"text"},beschrijving2:{control:"text"},genestItem1:{control:"text"},genestItem2:{control:"text"},diepGenestItem1:{control:"text"},diepGenestItem2:{control:"text"},genestType:{control:"select",options:["ul","ol"]},diepGenestType:{control:"select",options:["ul","ol"]}},args:{term1:"Eerste term",beschrijving1:"Beschrijving met een geneste lijst:",term2:"Tweede term",beschrijving2:"Beschrijving met een geneste lijst:",genestItem1:"Genest item 1",genestItem2:"Genest item 2",diepGenestItem1:"Diep genest item 1",diepGenestItem2:"Diep genest item 2",genestType:"ul",diepGenestType:"ol"},render:({term1:s,beschrijving1:o,term2:r,beschrijving2:l,genestItem1:n,genestItem2:i,diepGenestItem1:d,diepGenestItem2:m,genestType:e,diepGenestType:t})=>`
<dl>
    <dt>${s}</dt>
    <dd>${o}
        <${e}>
            <li>${n}</li>
            <li>${i}
                <${t}>
                    <li>${d}</li>
                    <li>${m}</li>
                </${t}>
            </li>
        </${e}>
    </dd>
    <dt>${r}</dt>
    <dd>${l}
        <${e}>
            <li>${n}</li>
            <li>${i}</li>
        </${e}>
    </dd>
</dl>
`};var $,j,u;p.parameters={...p.parameters,docs:{...($=p.parameters)==null?void 0:$.docs,source:{originalSource:`{
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
}`,...(u=(j=p.parameters)==null?void 0:j.docs)==null?void 0:u.source}}};var y,v,x;c.parameters={...c.parameters,docs:{...(y=c.parameters)==null?void 0:y.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Ongeordende lijst met geneste lijsten tot twee niveaus diep, inclusief een mix van lijsttypen."
      }
    }
  },
  argTypes: {
    item1: {
      control: "text"
    },
    item2: {
      control: "text"
    },
    item3: {
      control: "text"
    },
    genestItem1: {
      control: "text"
    },
    genestItem2: {
      control: "text"
    },
    genestItem3: {
      control: "text"
    },
    diepGenestItem1: {
      control: "text"
    },
    diepGenestItem2: {
      control: "text"
    },
    genestType: {
      control: "select",
      options: ["ul", "ol"]
    },
    diepGenestType: {
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
}`,...(x=(v=c.parameters)==null?void 0:v.docs)==null?void 0:x.source}}};var T,D,h;g.parameters={...g.parameters,docs:{...(T=g.parameters)==null?void 0:T.docs,source:{originalSource:`{
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
}`,...(h=(D=g.parameters)==null?void 0:D.docs)==null?void 0:h.source}}};var b,w,f;a.parameters={...a.parameters,docs:{...(b=a.parameters)==null?void 0:b.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Geordende lijst met geneste lijsten tot twee niveaus diep, inclusief een mix van lijsttypen."
      }
    }
  },
  argTypes: {
    item1: {
      control: "text"
    },
    item2: {
      control: "text"
    },
    item3: {
      control: "text"
    },
    genestItem1: {
      control: "text"
    },
    genestItem2: {
      control: "text"
    },
    genestItem3: {
      control: "text"
    },
    diepGenestItem1: {
      control: "text"
    },
    diepGenestItem2: {
      control: "text"
    },
    genestType: {
      control: "select",
      options: ["ul", "ol"]
    },
    diepGenestType: {
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
}`,...(f=(w=a.parameters)==null?void 0:w.docs)==null?void 0:f.source}}};var E,O,L;G.parameters={...G.parameters,docs:{...(E=G.parameters)==null?void 0:E.docs,source:{originalSource:`{
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
}`,...(L=(O=G.parameters)==null?void 0:O.docs)==null?void 0:L.source}}};var S,B,_;I.parameters={...I.parameters,docs:{...(S=I.parameters)==null?void 0:S.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Definitielijst met geneste lijsten in de beschrijvingen, tot twee niveaus diep."
      }
    }
  },
  argTypes: {
    term1: {
      control: "text"
    },
    beschrijving1: {
      control: "text"
    },
    term2: {
      control: "text"
    },
    beschrijving2: {
      control: "text"
    },
    genestItem1: {
      control: "text"
    },
    genestItem2: {
      control: "text"
    },
    diepGenestItem1: {
      control: "text"
    },
    diepGenestItem2: {
      control: "text"
    },
    genestType: {
      control: "select",
      options: ["ul", "ol"]
    },
    diepGenestType: {
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
}`,...(_=(B=I.parameters)==null?void 0:B.docs)==null?void 0:_.source}}};const C=["OngeordendeLijst","GenestOngeordend","GeordendeLijst","GenestGeordend","Definitielijst","GenestDefinitie"];export{G as Definitielijst,I as GenestDefinitie,a as GenestGeordend,c as GenestOngeordend,g as GeordendeLijst,p as OngeordendeLijst,C as __namedExportsOrder,z as default};
