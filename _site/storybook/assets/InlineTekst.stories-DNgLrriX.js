const E={title:"Typografie/Inline tekst",tags:["autodocs"]},e={parameters:{docs:{description:{story:"Gemarkeerde tekst via het `<mark>` element."}}},render:()=>"<p><mark>Dit is gemarkeerde tekst.</mark></p>"},r={parameters:{docs:{description:{story:"Doorgestreepte tekst via het `<del>` element, voor verwijderde of niet meer geldige inhoud."}}},render:()=>"<p><del>Dit is doorgestreepte tekst.</del></p>"},s={parameters:{docs:{description:{story:"Ingevoegde tekst via het `<ins>` element, voor toegevoegde inhoud."}}},render:()=>"<p><ins>Dit is ingevoegde tekst.</ins></p>"},n={parameters:{docs:{description:{story:"`<sub>` en `<sup>` voor subscript en superscript, bijvoorbeeld in wiskundige formules."}}},render:()=>`
<p>
    <sub>subscript</sub> en <sup>superscript</sup> voor bijvoorbeeld een
    wiskundige formule als x<sup>2</sup><sub>n</sub> + y<sup>2</sup><sub>n</sub> = r<sup>2</sup>
</p>
`},o={parameters:{docs:{description:{story:"Inline code via het `<code>` element binnen lopende tekst."}}},render:()=>"<p>Dit is <code>inline code</code> in een zin.</p>"},t={parameters:{docs:{description:{story:"Afkorting via het `<abbr>` element met een `title` attribuut voor de volledige term."}}},render:()=>'<p>Dit is een <abbr title="afkorting">afk.</abbr> in een zin.</p>'},a={parameters:{docs:{description:{story:"Toetsenbordinvoer via het `<kbd>` element."}}},render:()=>"<p><kbd>Ctrl</kbd> + <kbd>S</kbd> om op te slaan.</p>"},i={parameters:{docs:{description:{story:"Voorbeelduitvoer van een programma via het `<samp>` element."}}},render:()=>"<p>Het resultaat is <samp>voorbeelduitvoer</samp>.</p>"},d={parameters:{docs:{description:{story:"Wiskundige of programmeervariabele via het `<var>` element."}}},render:()=>"<p>De variabele <var>x</var> staat voor een onbekende waarde.</p>"};var p,c,m;e.parameters={...e.parameters,docs:{...(p=e.parameters)==null?void 0:p.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Gemarkeerde tekst via het \`<mark>\` element."
      }
    }
  },
  render: () => \`<p><mark>Dit is gemarkeerde tekst.</mark></p>\`
}`,...(m=(c=e.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var u,l,b;r.parameters={...r.parameters,docs:{...(u=r.parameters)==null?void 0:u.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Doorgestreepte tekst via het \`<del>\` element, voor verwijderde of niet meer geldige inhoud."
      }
    }
  },
  render: () => \`<p><del>Dit is doorgestreepte tekst.</del></p>\`
}`,...(b=(l=r.parameters)==null?void 0:l.docs)==null?void 0:b.source}}};var v,g,k;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Ingevoegde tekst via het \`<ins>\` element, voor toegevoegde inhoud."
      }
    }
  },
  render: () => \`<p><ins>Dit is ingevoegde tekst.</ins></p>\`
}`,...(k=(g=s.parameters)==null?void 0:g.docs)==null?void 0:k.source}}};var y,h,f;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "\`<sub>\` en \`<sup>\` voor subscript en superscript, bijvoorbeeld in wiskundige formules."
      }
    }
  },
  render: () => \`
<p>
    <sub>subscript</sub> en <sup>superscript</sup> voor bijvoorbeeld een
    wiskundige formule als x<sup>2</sup><sub>n</sub> + y<sup>2</sup><sub>n</sub> = r<sup>2</sup>
</p>
\`
}`,...(f=(h=n.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};var D,S,I;o.parameters={...o.parameters,docs:{...(D=o.parameters)==null?void 0:D.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Inline code via het \`<code>\` element binnen lopende tekst."
      }
    }
  },
  render: () => \`<p>Dit is <code>inline code</code> in een zin.</p>\`
}`,...(I=(S=o.parameters)==null?void 0:S.docs)==null?void 0:I.source}}};var w,j,x;t.parameters={...t.parameters,docs:{...(w=t.parameters)==null?void 0:w.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Afkorting via het \`<abbr>\` element met een \`title\` attribuut voor de volledige term."
      }
    }
  },
  render: () => \`<p>Dit is een <abbr title="afkorting">afk.</abbr> in een zin.</p>\`
}`,...(x=(j=t.parameters)==null?void 0:j.docs)==null?void 0:x.source}}};var T,V,z;a.parameters={...a.parameters,docs:{...(T=a.parameters)==null?void 0:T.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Toetsenbordinvoer via het \`<kbd>\` element."
      }
    }
  },
  render: () => \`<p><kbd>Ctrl</kbd> + <kbd>S</kbd> om op te slaan.</p>\`
}`,...(z=(V=a.parameters)==null?void 0:V.docs)==null?void 0:z.source}}};var A,C,G;i.parameters={...i.parameters,docs:{...(A=i.parameters)==null?void 0:A.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Voorbeelduitvoer van een programma via het \`<samp>\` element."
      }
    }
  },
  render: () => \`<p>Het resultaat is <samp>voorbeelduitvoer</samp>.</p>\`
}`,...(G=(C=i.parameters)==null?void 0:C.docs)==null?void 0:G.source}}};var _,H,W;d.parameters={...d.parameters,docs:{...(_=d.parameters)==null?void 0:_.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Wiskundige of programmeervariabele via het \`<var>\` element."
      }
    }
  },
  render: () => \`<p>De variabele <var>x</var> staat voor een onbekende waarde.</p>\`
}`,...(W=(H=d.parameters)==null?void 0:H.docs)==null?void 0:W.source}}};const O=["Gemarkeerd","Doorgestreept","Ingevoegd","SubscriptSuperscript","InlineCode","Afkorting","Toetsenbord","Voorbeelduitvoer","Variabele"];export{t as Afkorting,r as Doorgestreept,e as Gemarkeerd,s as Ingevoegd,o as InlineCode,n as SubscriptSuperscript,a as Toetsenbord,d as Variabele,i as Voorbeelduitvoer,O as __namedExportsOrder,E as default};
