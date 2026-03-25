const E={title:"Typografie/Inline tekst",tags:["autodocs"]},t={parameters:{docs:{description:{story:"Gemarkeerde tekst via het `<mark>` element."}}},argTypes:{tekst:{control:"text"}},args:{tekst:"Dit is gemarkeerde tekst."},render:({tekst:e})=>`<p><mark>${e}</mark></p>`},r={parameters:{docs:{description:{story:"Doorgestreepte tekst via het `<del>` element, voor verwijderde of niet meer geldige inhoud."}}},argTypes:{tekst:{control:"text"}},args:{tekst:"Dit is doorgestreepte tekst."},render:({tekst:e})=>`<p><del>${e}</del></p>`},n={parameters:{docs:{description:{story:"Ingevoegde tekst via het `<ins>` element, voor toegevoegde inhoud."}}},argTypes:{tekst:{control:"text"}},args:{tekst:"Dit is ingevoegde tekst."},render:({tekst:e})=>`<p><ins>${e}</ins></p>`},s={parameters:{docs:{description:{story:"`<sub>` en `<sup>` voor subscript en superscript, bijvoorbeeld in wiskundige formules."}}},argTypes:{tekst:{control:"text"}},args:{tekst:"x² + y² = r²"},render:({tekst:e})=>`<p>${e}</p>`},o={parameters:{docs:{description:{story:"Inline code via het `<code>` element binnen lopende tekst."}}},argTypes:{tekst:{control:"text"}},args:{tekst:"inline code"},render:({tekst:e})=>`<p>Dit is <code>${e}</code> in een zin.</p>`},a={parameters:{docs:{description:{story:"Afkorting via het `<abbr>` element met een `title` attribuut voor de volledige term."}}},argTypes:{afkorting:{control:"text",name:"Afkorting"},volledig:{control:"text",name:"Volledige term"}},args:{afkorting:"afk.",volledig:"afkorting"},render:({afkorting:e,volledig:c})=>`<p>Dit is een <abbr title="${c}">${e}</abbr> in een zin.</p>`},i={parameters:{docs:{description:{story:"Toetsenbordinvoer via het `<kbd>` element."}}},argTypes:{toets1:{control:"text",name:"Toets 1"},toets2:{control:"text",name:"Toets 2"}},args:{toets1:"Ctrl",toets2:"S"},render:({toets1:e,toets2:c})=>`<p><kbd>${e}</kbd> + <kbd>${c}</kbd> om op te slaan.</p>`},d={parameters:{docs:{description:{story:"Voorbeelduitvoer van een programma via het `<samp>` element."}}},argTypes:{tekst:{control:"text"}},args:{tekst:"voorbeelduitvoer"},render:({tekst:e})=>`<p>Het resultaat is <samp>${e}</samp>.</p>`},p={parameters:{docs:{description:{story:"Wiskundige of programmeervariabele via het `<var>` element."}}},argTypes:{tekst:{control:"text"}},args:{tekst:"x"},render:({tekst:e})=>`<p>De variabele <var>${e}</var> staat voor een onbekende waarde.</p>`};var m,l,g;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Gemarkeerde tekst via het \`<mark>\` element."
      }
    }
  },
  argTypes: {
    tekst: {
      control: "text"
    }
  },
  args: {
    tekst: "Dit is gemarkeerde tekst."
  },
  render: ({
    tekst
  }) => \`<p><mark>\${tekst}</mark></p>\`
}`,...(g=(l=t.parameters)==null?void 0:l.docs)==null?void 0:g.source}}};var k,v,u;r.parameters={...r.parameters,docs:{...(k=r.parameters)==null?void 0:k.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Doorgestreepte tekst via het \`<del>\` element, voor verwijderde of niet meer geldige inhoud."
      }
    }
  },
  argTypes: {
    tekst: {
      control: "text"
    }
  },
  args: {
    tekst: "Dit is doorgestreepte tekst."
  },
  render: ({
    tekst
  }) => \`<p><del>\${tekst}</del></p>\`
}`,...(u=(v=r.parameters)==null?void 0:v.docs)==null?void 0:u.source}}};var b,y,x;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Ingevoegde tekst via het \`<ins>\` element, voor toegevoegde inhoud."
      }
    }
  },
  argTypes: {
    tekst: {
      control: "text"
    }
  },
  args: {
    tekst: "Dit is ingevoegde tekst."
  },
  render: ({
    tekst
  }) => \`<p><ins>\${tekst}</ins></p>\`
}`,...(x=(y=n.parameters)==null?void 0:y.docs)==null?void 0:x.source}}};var T,f,$;s.parameters={...s.parameters,docs:{...(T=s.parameters)==null?void 0:T.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "\`<sub>\` en \`<sup>\` voor subscript en superscript, bijvoorbeeld in wiskundige formules."
      }
    }
  },
  argTypes: {
    tekst: {
      control: "text"
    }
  },
  args: {
    tekst: "x² + y² = r²"
  },
  render: ({
    tekst
  }) => \`<p>\${tekst}</p>\`
}`,...($=(f=s.parameters)==null?void 0:f.docs)==null?void 0:$.source}}};var h,D,S;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Inline code via het \`<code>\` element binnen lopende tekst."
      }
    }
  },
  argTypes: {
    tekst: {
      control: "text"
    }
  },
  args: {
    tekst: "inline code"
  },
  render: ({
    tekst
  }) => \`<p>Dit is <code>\${tekst}</code> in een zin.</p>\`
}`,...(S=(D=o.parameters)==null?void 0:D.docs)==null?void 0:S.source}}};var I,V,w;a.parameters={...a.parameters,docs:{...(I=a.parameters)==null?void 0:I.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Afkorting via het \`<abbr>\` element met een \`title\` attribuut voor de volledige term."
      }
    }
  },
  argTypes: {
    afkorting: {
      control: "text",
      name: "Afkorting"
    },
    volledig: {
      control: "text",
      name: "Volledige term"
    }
  },
  args: {
    afkorting: "afk.",
    volledig: "afkorting"
  },
  render: ({
    afkorting,
    volledig
  }) => \`<p>Dit is een <abbr title="\${volledig}">\${afkorting}</abbr> in een zin.</p>\`
}`,...(w=(V=a.parameters)==null?void 0:V.docs)==null?void 0:w.source}}};var A,j,z;i.parameters={...i.parameters,docs:{...(A=i.parameters)==null?void 0:A.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Toetsenbordinvoer via het \`<kbd>\` element."
      }
    }
  },
  argTypes: {
    toets1: {
      control: "text",
      name: "Toets 1"
    },
    toets2: {
      control: "text",
      name: "Toets 2"
    }
  },
  args: {
    toets1: "Ctrl",
    toets2: "S"
  },
  render: ({
    toets1,
    toets2
  }) => \`<p><kbd>\${toets1}</kbd> + <kbd>\${toets2}</kbd> om op te slaan.</p>\`
}`,...(z=(j=i.parameters)==null?void 0:j.docs)==null?void 0:z.source}}};var C,G,B;d.parameters={...d.parameters,docs:{...(C=d.parameters)==null?void 0:C.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Voorbeelduitvoer van een programma via het \`<samp>\` element."
      }
    }
  },
  argTypes: {
    tekst: {
      control: "text"
    }
  },
  args: {
    tekst: "voorbeelduitvoer"
  },
  render: ({
    tekst
  }) => \`<p>Het resultaat is <samp>\${tekst}</samp>.</p>\`
}`,...(B=(G=d.parameters)==null?void 0:G.docs)==null?void 0:B.source}}};var _,H,W;p.parameters={...p.parameters,docs:{...(_=p.parameters)==null?void 0:_.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Wiskundige of programmeervariabele via het \`<var>\` element."
      }
    }
  },
  argTypes: {
    tekst: {
      control: "text"
    }
  },
  args: {
    tekst: "x"
  },
  render: ({
    tekst
  }) => \`<p>De variabele <var>\${tekst}</var> staat voor een onbekende waarde.</p>\`
}`,...(W=(H=p.parameters)==null?void 0:H.docs)==null?void 0:W.source}}};const O=["Gemarkeerd","Doorgestreept","Ingevoegd","SubscriptSuperscript","InlineCode","Afkorting","Toetsenbord","Voorbeelduitvoer","Variabele"];export{a as Afkorting,r as Doorgestreept,t as Gemarkeerd,n as Ingevoegd,o as InlineCode,s as SubscriptSuperscript,i as Toetsenbord,p as Variabele,d as Voorbeelduitvoer,O as __namedExportsOrder,E as default};
