const E={title:"Componenten/Tekstinvoer",tags:["autodocs"]},e={parameters:{docs:{description:{story:"Standaard tekstinvoerveld met label en optionele helptekst."}}},argTypes:{label:{control:"text"},helptekst:{control:"text"}},args:{label:"Standaard tekstinvoerveld",helptekst:"Optionele ondersteunende help tekst indien nodig, bijvoorbeeld een hint over het verwachte formaat van invoer."},render:({label:l,helptekst:d})=>`
<label for="input-text">${l}</label>
<p class="form-field-helper-text" id="input-text--helper-text">
    ${d}
</p>
<input
    type="text"
    id="input-text"
    aria-describedby="input-text--helper-text"
/>
`},n={parameters:{docs:{description:{story:'E-mailinvoerveld met `type="email"` en een placeholder als voorbeeld.'}}},argTypes:{label:{control:"text"},placeholder:{control:"text"}},args:{label:"E-mailadres",placeholder:"voorbeeld@rijksoverheid.nl"},render:({label:l,placeholder:d})=>`
<label for="input-email">${l}</label>
<p class="form-field-helper-text" id="emailadress--helper-text">
    Optionele ondersteunende help tekst indien nodig, bijvoorbeeld een hint
    over het verwachte formaat van invoer.
</p>
<input
    type="email"
    id="input-email"
    aria-describedby="emailadress--helper-text"
    placeholder="${d}"
/>
`},t={parameters:{docs:{description:{story:"Invoerveld met `aria-invalid` om aan te geven dat de waarde ongeldig is."}}},render:()=>`
<label for="input-invalid">Foutieve invoer</label>
<p class="form-field-helper-text" id="input-invalid--helper-text">
    Optionele ondersteunende help tekst indien nodig, bijvoorbeeld een hint
    over het verwachte formaat van invoer.
</p>
<input
    type="text"
    id="input-invalid"
    aria-describedby="input-invalid--helper-text"
    placeholder="voorbeeld@rijksoverheid.nl"
    aria-invalid
/>
`},r={parameters:{docs:{description:{story:"Inactief invoerveld met `aria-disabled` en `readonly` voor betere toegankelijkheid."}}},render:()=>`
<label for="input-disabled">Inactieve invoer</label>
<p class="form-field-helper-text" id="input-disabled--helper-text">
    Optionele ondersteunende help tekst indien nodig, bijvoorbeeld een hint
    over het verwachte formaat van invoer.
</p>
<input
    type="text"
    id="input-disabled"
    aria-describedby="input-disabled--helper-text"
    aria-disabled
    readonly
/>
`},a={parameters:{docs:{description:{story:'Zoekveld met `type="search"` en een bijbehorende zoekknop.'}}},render:()=>`
<div>
    <label class="input-search" for="input-search">Zoekveld</label>
    <input type="search" id="input-search" /><button type="submit">Zoeken</button>
</div>
`},i={parameters:{docs:{description:{story:"Textarea voor het invoeren van langere teksten."}}},render:()=>`
<label for="textarea">Textarea</label>
<textarea name="" id="textarea"></textarea>
`},o={parameters:{docs:{description:{story:"Inactieve textarea met `aria-disabled` en `readonly`."}}},render:()=>`
<label for="textarea-disabled">Inactieve textarea</label>
<textarea name="" id="textarea-disabled" aria-disabled readonly></textarea>
`};var s,p,c;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Standaard tekstinvoerveld met label en optionele helptekst."
      }
    }
  },
  argTypes: {
    label: {
      control: "text"
    },
    helptekst: {
      control: "text"
    }
  },
  args: {
    label: "Standaard tekstinvoerveld",
    helptekst: "Optionele ondersteunende help tekst indien nodig, bijvoorbeeld een hint over het verwachte formaat van invoer."
  },
  render: ({
    label,
    helptekst
  }) => \`
<label for="input-text">\${label}</label>
<p class="form-field-helper-text" id="input-text--helper-text">
    \${helptekst}
</p>
<input
    type="text"
    id="input-text"
    aria-describedby="input-text--helper-text"
/>
\`
}`,...(c=(p=e.parameters)==null?void 0:p.docs)==null?void 0:c.source}}};var v,b,m;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "E-mailinvoerveld met \`type=\\"email\\"\` en een placeholder als voorbeeld."
      }
    }
  },
  argTypes: {
    label: {
      control: "text"
    },
    placeholder: {
      control: "text"
    }
  },
  args: {
    label: "E-mailadres",
    placeholder: "voorbeeld@rijksoverheid.nl"
  },
  render: ({
    label,
    placeholder
  }) => \`
<label for="input-email">\${label}</label>
<p class="form-field-helper-text" id="emailadress--helper-text">
    Optionele ondersteunende help tekst indien nodig, bijvoorbeeld een hint
    over het verwachte formaat van invoer.
</p>
<input
    type="email"
    id="input-email"
    aria-describedby="emailadress--helper-text"
    placeholder="\${placeholder}"
/>
\`
}`,...(m=(b=n.parameters)==null?void 0:b.docs)==null?void 0:m.source}}};var h,u,x;t.parameters={...t.parameters,docs:{...(h=t.parameters)==null?void 0:h.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Invoerveld met \`aria-invalid\` om aan te geven dat de waarde ongeldig is."
      }
    }
  },
  render: () => \`
<label for="input-invalid">Foutieve invoer</label>
<p class="form-field-helper-text" id="input-invalid--helper-text">
    Optionele ondersteunende help tekst indien nodig, bijvoorbeeld een hint
    over het verwachte formaat van invoer.
</p>
<input
    type="text"
    id="input-invalid"
    aria-describedby="input-invalid--helper-text"
    placeholder="voorbeeld@rijksoverheid.nl"
    aria-invalid
/>
\`
}`,...(x=(u=t.parameters)==null?void 0:u.docs)==null?void 0:x.source}}};var y,f,k;r.parameters={...r.parameters,docs:{...(y=r.parameters)==null?void 0:y.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Inactief invoerveld met \`aria-disabled\` en \`readonly\` voor betere toegankelijkheid."
      }
    }
  },
  render: () => \`
<label for="input-disabled">Inactieve invoer</label>
<p class="form-field-helper-text" id="input-disabled--helper-text">
    Optionele ondersteunende help tekst indien nodig, bijvoorbeeld een hint
    over het verwachte formaat van invoer.
</p>
<input
    type="text"
    id="input-disabled"
    aria-describedby="input-disabled--helper-text"
    aria-disabled
    readonly
/>
\`
}`,...(k=(f=r.parameters)==null?void 0:f.docs)==null?void 0:k.source}}};var g,j,I;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Zoekveld met \`type=\\"search\\"\` en een bijbehorende zoekknop."
      }
    }
  },
  render: () => \`
<div>
    <label class="input-search" for="input-search">Zoekveld</label>
    <input type="search" id="input-search" /><button type="submit">Zoeken</button>
</div>
\`
}`,...(I=(j=a.parameters)==null?void 0:j.docs)==null?void 0:I.source}}};var T,S,w;i.parameters={...i.parameters,docs:{...(T=i.parameters)==null?void 0:T.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Textarea voor het invoeren van langere teksten."
      }
    }
  },
  render: () => \`
<label for="textarea">Textarea</label>
<textarea name="" id="textarea"></textarea>
\`
}`,...(w=(S=i.parameters)==null?void 0:S.docs)==null?void 0:w.source}}};var O,Z,$;o.parameters={...o.parameters,docs:{...(O=o.parameters)==null?void 0:O.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Inactieve textarea met \`aria-disabled\` en \`readonly\`."
      }
    }
  },
  render: () => \`
<label for="textarea-disabled">Inactieve textarea</label>
<textarea name="" id="textarea-disabled" aria-disabled readonly></textarea>
\`
}`,...($=(Z=o.parameters)==null?void 0:Z.docs)==null?void 0:$.source}}};const F=["Standaard","Email","FoutieveInvoer","Inactief","Zoekveld","Textarea","TextareaInactief"];export{n as Email,t as FoutieveInvoer,r as Inactief,e as Standaard,i as Textarea,o as TextareaInactief,a as Zoekveld,F as __namedExportsOrder,E as default};
