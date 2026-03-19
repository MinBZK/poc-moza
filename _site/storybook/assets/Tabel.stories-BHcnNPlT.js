const $={title:"Componenten/Tabel",argTypes:{kolommen:{control:{type:"range",min:2,max:6,step:1}},rijen:{control:{type:"range",min:1,max:10,step:1}},bijschrift:{control:"text"}}},t={args:{kolommen:5,rijen:5,bijschrift:"Voorbeeld tabel met bijschrift"},render:({kolommen:r,rijen:m,bijschrift:o})=>{const h=Array.from({length:r},(p,n)=>`<th>Kolom ${n+1}</th>`).join(""),j=Array.from({length:m},(p,n)=>`<tr>${Array.from({length:r},(f,y)=>`<td>Rij ${n+1}, cel ${y+1}</td>`).join("")}</tr>`).join(`
			`),b=o?`
		<caption>${o}</caption>`:"";return`
            <table>
                <thead><tr>${h}</tr></thead>
                <tbody>${j}</tbody>${b}
            </table>
        `}},e=()=>`
    <table>
        <thead>
            <tr>
                <th>Kolom 1</th>
                <th>Kolom 2</th>
                <th>Kolom 3</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Rij 1, cel 1</td>
                <td>Rij 1, cel 2</td>
                <td>Rij 1, cel 3</td>
            </tr>
            <tr>
                <td>Rij 2, cel 1</td>
                <td>Rij 2, cel 2</td>
                <td>Rij 2, cel 3</td>
            </tr>
            <tr>
                <td>Rij 3, cel 1</td>
                <td>Rij 3, cel 2</td>
                <td>Rij 3, cel 3</td>
            </tr>
        </tbody>
        <caption>Voorbeeld tabel met bijschrift</caption>
    </table>
`;var d,l,a;t.parameters={...t.parameters,docs:{...(d=t.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    kolommen: 5,
    rijen: 5,
    bijschrift: "Voorbeeld tabel met bijschrift"
  },
  render: ({
    kolommen,
    rijen,
    bijschrift
  }) => {
    const headers = Array.from({
      length: kolommen
    }, (_, i) => \`<th>Kolom \${i + 1}</th>\`).join("");
    const body = Array.from({
      length: rijen
    }, (_, r) => {
      const cells = Array.from({
        length: kolommen
      }, (_, c) => \`<td>Rij \${r + 1}, cel \${c + 1}</td>\`).join("");
      return \`<tr>\${cells}</tr>\`;
    }).join("\\n\\t\\t\\t");
    const captionHtml = bijschrift ? \`\\n\\t\\t<caption>\${bijschrift}</caption>\` : "";
    return \`
            <table>
                <thead><tr>\${headers}</tr></thead>
                <tbody>\${body}</tbody>\${captionHtml}
            </table>
        \`;
  }
}`,...(a=(l=t.parameters)==null?void 0:l.docs)==null?void 0:a.source}}};var c,i,s;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`() => \`
    <table>
        <thead>
            <tr>
                <th>Kolom 1</th>
                <th>Kolom 2</th>
                <th>Kolom 3</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>Rij 1, cel 1</td>
                <td>Rij 1, cel 2</td>
                <td>Rij 1, cel 3</td>
            </tr>
            <tr>
                <td>Rij 2, cel 1</td>
                <td>Rij 2, cel 2</td>
                <td>Rij 2, cel 3</td>
            </tr>
            <tr>
                <td>Rij 3, cel 1</td>
                <td>Rij 3, cel 2</td>
                <td>Rij 3, cel 3</td>
            </tr>
        </tbody>
        <caption>Voorbeeld tabel met bijschrift</caption>
    </table>
\``,...(s=(i=e.parameters)==null?void 0:i.docs)==null?void 0:s.source}}};const g=["Speeltuin","Standaard"];export{t as Speeltuin,e as Standaard,g as __namedExportsOrder,$ as default};
