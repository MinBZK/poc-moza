const x={title:"Componenten/Accordeon",tags:["autodocs"]},a={parameters:{docs:{description:{story:"Een enkel inklapbaar paneel. Gebruikt het `<details>` element."}}},argTypes:{titel:{control:"text"},inhoud:{control:"text"}},args:{titel:"Titel",inhoud:"Inhoud"},render:({titel:n,inhoud:e})=>`
<div class="accordion">
    <details>
        <summary>${n}</summary>
        <p>${e}</p>
    </details>
</div>
`},p=["Eerste","Tweede","Derde","Vierde","Vijfde"],m={titel:{table:{disable:!0}},inhoud:{table:{disable:!0}},...Object.fromEntries(p.flatMap((n,e)=>[[`titel${e+1}`,{control:"text",name:`Paneel ${e+1} titel`}],[`inhoud${e+1}`,{control:"text",name:`Paneel ${e+1} inhoud`}]]))},u=Object.fromEntries(p.flatMap((n,e)=>[[`titel${e+1}`,`${n} paneel`],[`inhoud${e+1}`,`Inhoud van het ${n.toLowerCase()} paneel.`]])),t={name:"Accordeon",parameters:{docs:{description:{story:"Een accordeon met meerdere panelen. Met de optie **Exclusief** bepaal je of slechts één paneel tegelijk open kan zijn (via het `name` attribuut op `<details>`) of dat alle panelen onafhankelijk werken."}}},argTypes:{aantal:{control:{type:"number",min:2,max:5},name:"Aantal panelen"},exclusief:{control:"inline-radio",options:["Ja","Nee"],name:"Exclusief",description:"Slechts één paneel tegelijk open (via het `name` attribuut)"},...m},args:{aantal:5,exclusief:"Ja",...u},render:n=>{const e=n.exclusief==="Ja"?' name="accordion"':"";return`
<div class="accordion">${Array.from({length:n.aantal},(f,r)=>`
    <details${e}>
        <summary>${n[`titel${r+1}`]}</summary>
        <p>${n[`inhoud${r+1}`]}</p>
    </details>`).join("")}
</div>`}};var o,s,i;a.parameters={...a.parameters,docs:{...(o=a.parameters)==null?void 0:o.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Een enkel inklapbaar paneel. Gebruikt het \`<details>\` element."
      }
    }
  },
  argTypes: {
    titel: {
      control: "text"
    },
    inhoud: {
      control: "text"
    }
  },
  args: {
    titel: "Titel",
    inhoud: "Inhoud"
  },
  render: ({
    titel,
    inhoud
  }) => {
    return \`
<div class="accordion">
    <details>
        <summary>\${titel}</summary>
        <p>\${inhoud}</p>
    </details>
</div>
\`;
  }
}`,...(i=(s=a.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};var l,c,d;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  name: "Accordeon",
  parameters: {
    docs: {
      description: {
        story: "Een accordeon met meerdere panelen. Met de optie **Exclusief** bepaal je of slechts één paneel tegelijk open kan zijn (via het \`name\` attribuut op \`<details>\`) of dat alle panelen onafhankelijk werken."
      }
    }
  },
  argTypes: {
    aantal: {
      control: {
        type: "number",
        min: 2,
        max: 5
      },
      name: "Aantal panelen"
    },
    exclusief: {
      control: "inline-radio",
      options: ["Ja", "Nee"],
      name: "Exclusief",
      description: "Slechts één paneel tegelijk open (via het \`name\` attribuut)"
    },
    ...accordeonArgTypes
  },
  args: {
    aantal: 5,
    exclusief: "Ja",
    ...accordeonArgs
  },
  render: args => {
    const nameAttr = args.exclusief === "Ja" ? ' name="accordion"' : "";
    const panelen = Array.from({
      length: args.aantal
    }, (_, i) => \`
    <details\${nameAttr}>
        <summary>\${args[\`titel\${i + 1}\`]}</summary>
        <p>\${args[\`inhoud\${i + 1}\`]}</p>
    </details>\`).join("");
    return \`
<div class="accordion">\${panelen}
</div>\`;
  }
}`,...(d=(c=t.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};const $=["Paneel","Accordeon"];export{t as Accordeon,a as Paneel,$ as __namedExportsOrder,x as default};
