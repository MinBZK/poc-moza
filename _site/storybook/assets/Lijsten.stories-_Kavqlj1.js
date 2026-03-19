const T={title:"Componenten/Lijsten",argTypes:{type:{control:"select",options:["ul","ol","dl"]},aantalItems:{control:{type:"range",min:1,max:10,step:1}}}},e={args:{type:"ul",aantalItems:3},render:({type:r,aantalItems:d})=>{if(r==="dl")return`<dl>
		${Array.from({length:d},(s,l)=>`<dt>Term ${l+1}</dt><dd>Beschrijving van term ${l+1}.</dd>`).join(`
		`)}
	</dl>`;const y=Array.from({length:d},(h,s)=>`<li>Item ${s+1} in de lijst</li>`).join(`
		`);return`<${r}>
		${y}
	</${r}>`}},n=()=>`
    <ul>
        <li>Eerste item in een ongeordende lijst</li>
        <li>Tweede item in een ongeordende lijst</li>
        <li>Derde item in een ongeordende lijst</li>
    </ul>
`,t=()=>`
    <ol>
        <li>Eerste item in een geordende lijst</li>
        <li>Tweede item in een geordende lijst</li>
        <li>Derde item in een geordende lijst</li>
    </ol>
`,i=()=>`
    <dl>
        <dt>Definitieterm</dt>
        <dd>Dit is de beschrijving van de definitieterm.</dd>
        <dt>Tweede term</dt>
        <dd>Dit is de beschrijving van de tweede term.</dd>
    </dl>
`;var o,a,m;e.parameters={...e.parameters,docs:{...(o=e.parameters)==null?void 0:o.docs,source:{originalSource:`{
  args: {
    type: "ul",
    aantalItems: 3
  },
  render: ({
    type,
    aantalItems
  }) => {
    if (type === "dl") {
      const items = Array.from({
        length: aantalItems
      }, (_, i) => \`<dt>Term \${i + 1}</dt><dd>Beschrijving van term \${i + 1}.</dd>\`).join("\\n\\t\\t");
      return \`<dl>\\n\\t\\t\${items}\\n\\t</dl>\`;
    }
    const items = Array.from({
      length: aantalItems
    }, (_, i) => \`<li>Item \${i + 1} in de lijst</li>\`).join("\\n\\t\\t");
    return \`<\${type}>\\n\\t\\t\${items}\\n\\t</\${type}>\`;
  }
}`,...(m=(a=e.parameters)==null?void 0:a.docs)==null?void 0:m.source}}};var c,g,j;n.parameters={...n.parameters,docs:{...(c=n.parameters)==null?void 0:c.docs,source:{originalSource:`() => \`
    <ul>
        <li>Eerste item in een ongeordende lijst</li>
        <li>Tweede item in een ongeordende lijst</li>
        <li>Derde item in een ongeordende lijst</li>
    </ul>
\``,...(j=(g=n.parameters)==null?void 0:g.docs)==null?void 0:j.source}}};var p,u,$;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`() => \`
    <ol>
        <li>Eerste item in een geordende lijst</li>
        <li>Tweede item in een geordende lijst</li>
        <li>Derde item in een geordende lijst</li>
    </ol>
\``,...($=(u=t.parameters)==null?void 0:u.docs)==null?void 0:$.source}}};var f,v,D;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`() => \`
    <dl>
        <dt>Definitieterm</dt>
        <dd>Dit is de beschrijving van de definitieterm.</dd>
        <dt>Tweede term</dt>
        <dd>Dit is de beschrijving van de tweede term.</dd>
    </dl>
\``,...(D=(v=i.parameters)==null?void 0:v.docs)==null?void 0:D.source}}};const w=["Speeltuin","OngeordendeLijst","GeordendeLijst","Definitielijst"];export{i as Definitielijst,t as GeordendeLijst,n as OngeordendeLijst,e as Speeltuin,w as __namedExportsOrder,T as default};
