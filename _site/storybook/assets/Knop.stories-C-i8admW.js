const L={title:"Componenten/Knop",argTypes:{label:{control:"text"},variant:{control:"select",options:["primary","secondary","negative"]},type:{control:"select",options:["button","submit","reset"]},inactief:{control:"boolean"}}},t={args:{label:"Knoptekst",variant:"primary",type:"button",inactief:!1},render:({label:B,variant:p,type:F,inactief:G})=>`<button type="${F}" class="${p==="primary"?"":p}"${G?" aria-disabled":""}>${B}</button>`},e=()=>'<button type="button">Standaard primaire knop</button>',o=()=>'<button type="button" class="secondary">Secundaire knop</button>',n=()=>'<button type="reset">Reset knop</button>',a=()=>'<button type="submit">Submit knop</button>',r=()=>"<button aria-disabled>Inactieve knop</button>",s=()=>'<button class="negative">Destructieve actie</button>',u=()=>'<button type="button">Knop met <b>tekst</b> <i>stijlen</i></button>',c=()=>'<button type="button"><span>⚑</span> Knop met icoon voor tekst</button>',i=()=>`
    <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: flex-start;">
        <button type="button">Primaire knop</button>
        <button type="button" class="secondary">Secundaire knop</button>
        <button type="reset">Reset knop</button>
        <button type="submit">Submit knop</button>
        <button class="negative">Destructieve actie</button>
        <button aria-disabled>Inactieve knop</button>
    </div>
`;var b,l,m;t.parameters={...t.parameters,docs:{...(b=t.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    label: "Knoptekst",
    variant: "primary",
    type: "button",
    inactief: false
  },
  render: ({
    label,
    variant,
    type,
    inactief
  }) => {
    const cls = variant === "primary" ? "" : variant;
    const attrs = inactief ? " aria-disabled" : "";
    return \`<button type="\${type}" class="\${cls}"\${attrs}>\${label}</button>\`;
  }
}`,...(m=(l=t.parameters)==null?void 0:l.docs)==null?void 0:m.source}}};var d,y,k;e.parameters={...e.parameters,docs:{...(d=e.parameters)==null?void 0:d.docs,source:{originalSource:'() => `<button type="button">Standaard primaire knop</button>`',...(k=(y=e.parameters)==null?void 0:y.docs)==null?void 0:k.source}}};var S,v,g;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:'() => `<button type="button" class="secondary">Secundaire knop</button>`',...(g=(v=o.parameters)==null?void 0:v.docs)==null?void 0:g.source}}};var f,x,I;n.parameters={...n.parameters,docs:{...(f=n.parameters)==null?void 0:f.docs,source:{originalSource:'() => `<button type="reset">Reset knop</button>`',...(I=(x=n.parameters)==null?void 0:x.docs)==null?void 0:I.source}}};var K,$,D;a.parameters={...a.parameters,docs:{...(K=a.parameters)==null?void 0:K.docs,source:{originalSource:'() => `<button type="submit">Submit knop</button>`',...(D=($=a.parameters)==null?void 0:$.docs)==null?void 0:D.source}}};var R,j,w;r.parameters={...r.parameters,docs:{...(R=r.parameters)==null?void 0:R.docs,source:{originalSource:"() => `<button aria-disabled>Inactieve knop</button>`",...(w=(j=r.parameters)==null?void 0:j.docs)==null?void 0:w.source}}};var M,P,T;s.parameters={...s.parameters,docs:{...(M=s.parameters)==null?void 0:M.docs,source:{originalSource:'() => `<button class="negative">Destructieve actie</button>`',...(T=(P=s.parameters)==null?void 0:P.docs)==null?void 0:T.source}}};var _,A,V;u.parameters={...u.parameters,docs:{...(_=u.parameters)==null?void 0:_.docs,source:{originalSource:'() => `<button type="button">Knop met <b>tekst</b> <i>stijlen</i></button>`',...(V=(A=u.parameters)==null?void 0:A.docs)==null?void 0:V.source}}};var C,E,O;c.parameters={...c.parameters,docs:{...(C=c.parameters)==null?void 0:C.docs,source:{originalSource:'() => `<button type="button"><span>⚑</span> Knop met icoon voor tekst</button>`',...(O=(E=c.parameters)==null?void 0:E.docs)==null?void 0:O.source}}};var h,q,z;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:`() => \`
    <div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: flex-start;">
        <button type="button">Primaire knop</button>
        <button type="button" class="secondary">Secundaire knop</button>
        <button type="reset">Reset knop</button>
        <button type="submit">Submit knop</button>
        <button class="negative">Destructieve actie</button>
        <button aria-disabled>Inactieve knop</button>
    </div>
\``,...(z=(q=i.parameters)==null?void 0:q.docs)==null?void 0:z.source}}};const N=["Speeltuin","Primair","Secundair","Reset","Submit","Inactief","Destructief","MetTekststijlen","MetIcoon","AlleVarianten"];export{i as AlleVarianten,s as Destructief,r as Inactief,c as MetIcoon,u as MetTekststijlen,e as Primair,n as Reset,o as Secundair,t as Speeltuin,a as Submit,N as __namedExportsOrder,L as default};
