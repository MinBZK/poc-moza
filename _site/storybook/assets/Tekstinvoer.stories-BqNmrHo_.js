const K={title:"Componenten/Tekstinvoer",argTypes:{label:{control:"text"},helptekst:{control:"text"},placeholder:{control:"text"},type:{control:"select",options:["text","email","password","tel","url","number","search"]},ongeldig:{control:"boolean"},inactief:{control:"boolean"},isTextarea:{control:"boolean"}}},e={args:{label:"Labeltekst",helptekst:"Optionele ondersteunende help tekst.",placeholder:"",type:"text",ongeldig:!1,inactief:!1,isTextarea:!1},render:({label:d,helptekst:s,placeholder:p,type:B,ongeldig:D,inactief:G,isTextarea:J})=>{const c=D?" aria-invalid":"",b=G?" aria-disabled readonly":"",u=p?` placeholder="${p}"`:"",h=s?`<p class="form-field-helper-text" id="sb-input--helper-text">${s}</p>`:"";return J?`
                <label for="sb-textarea">${d}</label>
                ${h}
                <textarea id="sb-textarea"${c}${b}${u}></textarea>
            `:`
            <label for="sb-input">${d}</label>
            ${h}
            <input
                type="${B}"
                id="sb-input"
                aria-describedby="sb-input--helper-text"
                ${u}${c}${b}
            />
        `}},t=()=>`
    <label for="input-text">Standaard tekstinvoerveld</label>
    <p class="form-field-helper-text" id="input-text--helper-text">
        Optionele ondersteunende help tekst indien nodig, bijvoorbeeld een hint
        over het verwachte formaat van invoer.
    </p>
    <input
        type="text"
        id="input-text"
        aria-describedby="input-text--helper-text"
    />
`,a=()=>`
    <label for="input-email">E-mailadres</label>
    <p class="form-field-helper-text" id="emailadress--helper-text">
        Optionele ondersteunende help tekst indien nodig, bijvoorbeeld een hint
        over het verwachte formaat van invoer.
    </p>
    <input
        type="email"
        id="input-email"
        aria-describedby="emailadress--helper-text"
        placeholder="voorbeeld@rijksoverheid.nl"
    />
`,r=()=>`
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
`,n=()=>`
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
`,i=()=>`
    <div>
        <label class="input-search" for="input-search">Zoekveld</label>
        <input type="search" id="input-search" /><button type="submit">Zoeken</button>
    </div>
`,l=()=>`
    <label for="textarea">Textarea</label>
    <textarea name="" id="textarea"></textarea>
`,o=()=>`
    <label for="textarea-disabled">Inactieve textarea</label>
    <textarea name="" id="textarea-disabled" aria-disabled readonly></textarea>
`;var v,x,m;e.parameters={...e.parameters,docs:{...(v=e.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    label: "Labeltekst",
    helptekst: "Optionele ondersteunende help tekst.",
    placeholder: "",
    type: "text",
    ongeldig: false,
    inactief: false,
    isTextarea: false
  },
  render: ({
    label,
    helptekst,
    placeholder,
    type,
    ongeldig,
    inactief,
    isTextarea
  }) => {
    const invalidAttr = ongeldig ? " aria-invalid" : "";
    const disabledAttr = inactief ? " aria-disabled readonly" : "";
    const placeholderAttr = placeholder ? \` placeholder="\${placeholder}"\` : "";
    const helptekstHtml = helptekst ? \`<p class="form-field-helper-text" id="sb-input--helper-text">\${helptekst}</p>\` : "";
    if (isTextarea) {
      return \`
                <label for="sb-textarea">\${label}</label>
                \${helptekstHtml}
                <textarea id="sb-textarea"\${invalidAttr}\${disabledAttr}\${placeholderAttr}></textarea>
            \`;
    }
    return \`
            <label for="sb-input">\${label}</label>
            \${helptekstHtml}
            <input
                type="\${type}"
                id="sb-input"
                aria-describedby="sb-input--helper-text"
                \${placeholderAttr}\${invalidAttr}\${disabledAttr}
            />
        \`;
  }
}`,...(m=(x=e.parameters)==null?void 0:x.docs)==null?void 0:m.source}}};var f,y,k;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`() => \`
    <label for="input-text">Standaard tekstinvoerveld</label>
    <p class="form-field-helper-text" id="input-text--helper-text">
        Optionele ondersteunende help tekst indien nodig, bijvoorbeeld een hint
        over het verwachte formaat van invoer.
    </p>
    <input
        type="text"
        id="input-text"
        aria-describedby="input-text--helper-text"
    />
\``,...(k=(y=t.parameters)==null?void 0:y.docs)==null?void 0:k.source}}};var g,$,S;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:`() => \`
    <label for="input-email">E-mailadres</label>
    <p class="form-field-helper-text" id="emailadress--helper-text">
        Optionele ondersteunende help tekst indien nodig, bijvoorbeeld een hint
        over het verwachte formaat van invoer.
    </p>
    <input
        type="email"
        id="input-email"
        aria-describedby="emailadress--helper-text"
        placeholder="voorbeeld@rijksoverheid.nl"
    />
\``,...(S=($=a.parameters)==null?void 0:$.docs)==null?void 0:S.source}}};var T,j,A;r.parameters={...r.parameters,docs:{...(T=r.parameters)==null?void 0:T.docs,source:{originalSource:`() => \`
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
\``,...(A=(j=r.parameters)==null?void 0:j.docs)==null?void 0:A.source}}};var O,I,w;n.parameters={...n.parameters,docs:{...(O=n.parameters)==null?void 0:O.docs,source:{originalSource:`() => \`
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
\``,...(w=(I=n.parameters)==null?void 0:I.docs)==null?void 0:w.source}}};var Z,E,F;i.parameters={...i.parameters,docs:{...(Z=i.parameters)==null?void 0:Z.docs,source:{originalSource:`() => \`
    <div>
        <label class="input-search" for="input-search">Zoekveld</label>
        <input type="search" id="input-search" /><button type="submit">Zoeken</button>
    </div>
\``,...(F=(E=i.parameters)==null?void 0:E.docs)==null?void 0:F.source}}};var H,_,L;l.parameters={...l.parameters,docs:{...(H=l.parameters)==null?void 0:H.docs,source:{originalSource:`() => \`
    <label for="textarea">Textarea</label>
    <textarea name="" id="textarea"></textarea>
\``,...(L=(_=l.parameters)==null?void 0:_.docs)==null?void 0:L.source}}};var C,q,z;o.parameters={...o.parameters,docs:{...(C=o.parameters)==null?void 0:C.docs,source:{originalSource:`() => \`
    <label for="textarea-disabled">Inactieve textarea</label>
    <textarea name="" id="textarea-disabled" aria-disabled readonly></textarea>
\``,...(z=(q=o.parameters)==null?void 0:q.docs)==null?void 0:z.source}}};const M=["Speeltuin","Standaard","Email","FoutieveInvoer","Inactief","Zoekveld","Textarea","TextareaInactief"];export{a as Email,r as FoutieveInvoer,n as Inactief,e as Speeltuin,t as Standaard,l as Textarea,o as TextareaInactief,i as Zoekveld,M as __namedExportsOrder,K as default};
