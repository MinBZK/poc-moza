const q={title:"Typografie/Koppen",tags:["autodocs"]},t={parameters:{docs:{description:{story:"Overzicht van alle zes kopniveaus naast elkaar ter vergelijking."}}},argTypes:{h1:{name:"H1",control:"text"},h2:{name:"H2",control:"text"},h3:{name:"H3",control:"text"},h4:{name:"H4",control:"text"},h5:{name:"H5",control:"text"},h6:{name:"H6",control:"text"}},args:{h1:"Koptekst niveau 1",h2:"Koptekst niveau 2",h3:"Koptekst niveau 3",h4:"Koptekst niveau 4",h5:"Koptekst niveau 5",h6:"Koptekst niveau 6"},render:({h1:e,h2:O,h3:_,h4:j,h5:A,h6:E})=>`
<h1>${e}</h1>
<h2>${O}</h2>
<h3>${_}</h3>
<h4>${j}</h4>
<h5>${A}</h5>
<h6>${E}</h6>
`},n={parameters:{docs:{description:{story:"Koptekst niveau 1. Gebruik voor de hoofdtitel van een pagina."}}},argTypes:{tekst:{control:"text"}},args:{tekst:"Koptekst niveau 1"},render:({tekst:e})=>`<h1>${e}</h1>`},s={parameters:{docs:{description:{story:"Koptekst niveau 2. Gebruik voor hoofdsecties binnen een pagina."}}},argTypes:{tekst:{control:"text"}},args:{tekst:"Koptekst niveau 2"},render:({tekst:e})=>`<h2>${e}</h2>`},r={parameters:{docs:{description:{story:"Koptekst niveau 3. Gebruik voor subsecties."}}},argTypes:{tekst:{control:"text"}},args:{tekst:"Koptekst niveau 3"},render:({tekst:e})=>`<h3>${e}</h3>`},o={parameters:{docs:{description:{story:"Koptekst niveau 4."}}},argTypes:{tekst:{control:"text"}},args:{tekst:"Koptekst niveau 4"},render:({tekst:e})=>`<h4>${e}</h4>`},a={parameters:{docs:{description:{story:"Koptekst niveau 5."}}},argTypes:{tekst:{control:"text"}},args:{tekst:"Koptekst niveau 5"},render:({tekst:e})=>`<h5>${e}</h5>`},p={parameters:{docs:{description:{story:"Koptekst niveau 6."}}},argTypes:{tekst:{control:"text"}},args:{tekst:"Koptekst niveau 6"},render:({tekst:e})=>`<h6>${e}</h6>`};var c,i,h;t.parameters={...t.parameters,docs:{...(c=t.parameters)==null?void 0:c.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Overzicht van alle zes kopniveaus naast elkaar ter vergelijking."
      }
    }
  },
  argTypes: {
    h1: {
      name: "H1",
      control: "text"
    },
    h2: {
      name: "H2",
      control: "text"
    },
    h3: {
      name: "H3",
      control: "text"
    },
    h4: {
      name: "H4",
      control: "text"
    },
    h5: {
      name: "H5",
      control: "text"
    },
    h6: {
      name: "H6",
      control: "text"
    }
  },
  args: {
    h1: "Koptekst niveau 1",
    h2: "Koptekst niveau 2",
    h3: "Koptekst niveau 3",
    h4: "Koptekst niveau 4",
    h5: "Koptekst niveau 5",
    h6: "Koptekst niveau 6"
  },
  render: ({
    h1,
    h2,
    h3,
    h4,
    h5,
    h6
  }) => \`
<h1>\${h1}</h1>
<h2>\${h2}</h2>
<h3>\${h3}</h3>
<h4>\${h4}</h4>
<h5>\${h5}</h5>
<h6>\${h6}</h6>
\`
}`,...(h=(i=t.parameters)==null?void 0:i.docs)==null?void 0:h.source}}};var k,d,u;n.parameters={...n.parameters,docs:{...(k=n.parameters)==null?void 0:k.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Koptekst niveau 1. Gebruik voor de hoofdtitel van een pagina."
      }
    }
  },
  argTypes: {
    tekst: {
      control: "text"
    }
  },
  args: {
    tekst: "Koptekst niveau 1"
  },
  render: ({
    tekst
  }) => \`<h1>\${tekst}</h1>\`
}`,...(u=(d=n.parameters)==null?void 0:d.docs)==null?void 0:u.source}}};var m,v,l;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Koptekst niveau 2. Gebruik voor hoofdsecties binnen een pagina."
      }
    }
  },
  argTypes: {
    tekst: {
      control: "text"
    }
  },
  args: {
    tekst: "Koptekst niveau 2"
  },
  render: ({
    tekst
  }) => \`<h2>\${tekst}</h2>\`
}`,...(l=(v=s.parameters)==null?void 0:v.docs)==null?void 0:l.source}}};var g,K,y;r.parameters={...r.parameters,docs:{...(g=r.parameters)==null?void 0:g.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Koptekst niveau 3. Gebruik voor subsecties."
      }
    }
  },
  argTypes: {
    tekst: {
      control: "text"
    }
  },
  args: {
    tekst: "Koptekst niveau 3"
  },
  render: ({
    tekst
  }) => \`<h3>\${tekst}</h3>\`
}`,...(y=(K=r.parameters)==null?void 0:K.docs)==null?void 0:y.source}}};var x,H,$;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Koptekst niveau 4."
      }
    }
  },
  argTypes: {
    tekst: {
      control: "text"
    }
  },
  args: {
    tekst: "Koptekst niveau 4"
  },
  render: ({
    tekst
  }) => \`<h4>\${tekst}</h4>\`
}`,...($=(H=o.parameters)==null?void 0:H.docs)==null?void 0:$.source}}};var T,b,f;a.parameters={...a.parameters,docs:{...(T=a.parameters)==null?void 0:T.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Koptekst niveau 5."
      }
    }
  },
  argTypes: {
    tekst: {
      control: "text"
    }
  },
  args: {
    tekst: "Koptekst niveau 5"
  },
  render: ({
    tekst
  }) => \`<h5>\${tekst}</h5>\`
}`,...(f=(b=a.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};var S,G,z;p.parameters={...p.parameters,docs:{...(S=p.parameters)==null?void 0:S.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Koptekst niveau 6."
      }
    }
  },
  argTypes: {
    tekst: {
      control: "text"
    }
  },
  args: {
    tekst: "Koptekst niveau 6"
  },
  render: ({
    tekst
  }) => \`<h6>\${tekst}</h6>\`
}`,...(z=(G=p.parameters)==null?void 0:G.docs)==null?void 0:z.source}}};const w=["AlleKoppen","H1","H2","H3","H4","H5","H6"];export{t as AlleKoppen,n as H1,s as H2,r as H3,o as H4,a as H5,p as H6,w as __namedExportsOrder,q as default};
