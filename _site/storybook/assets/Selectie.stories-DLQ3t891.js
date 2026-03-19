const R={title:"Componenten/Selectie",argTypes:{type:{control:"select",options:["checkbox","radio"]},aantalOpties:{control:{type:"range",min:3,max:7,step:1}}}},t={args:{type:"checkbox",aantalOpties:3},render:({type:e,aantalOpties:g})=>{const $=e==="radio"?` name="sb-${e}"`:"";return`<ul class="selection">
		${Array.from({length:g},(j,o)=>`<li>
            <input type="${e}"${$} id="sb-${e}-${o}"${o===0?" checked":""} />
            <label for="sb-${e}-${o}">${e==="checkbox"?"Checkbox":"Radio button"} optie ${o+1}</label>
        </li>`).join(`
		`)}
	</ul>`}},i=()=>`
    <ul class="selection">
        <li>
            <input type="checkbox" id="sb-checkbox-1" checked />
            <label for="sb-checkbox-1">Checkbox optie 1</label>
        </li>
        <li>
            <input type="checkbox" id="sb-checkbox-2" />
            <label for="sb-checkbox-2">Checkbox optie 2</label>
            <ul class="selection">
                <li>
                    <input type="checkbox" id="sb-checkbox-nested-1" />
                    <label for="sb-checkbox-nested-1">Geneste checkbox optie 1</label>
                </li>
                <li>
                    <input type="checkbox" id="sb-checkbox-nested-2" />
                    <label for="sb-checkbox-nested-2">Geneste checkbox optie 2</label>
                </li>
                <li>
                    <input type="checkbox" id="sb-checkbox-nested-3" />
                    <label for="sb-checkbox-nested-3">Geneste checkbox optie 3</label>
                </li>
            </ul>
        </li>
        <li>
            <input type="checkbox" id="sb-checkbox-3" disabled />
            <label for="sb-checkbox-3">Checkbox optie 3</label>
        </li>
    </ul>
`,l=()=>`
    <ul class="selection">
        <li>
            <input type="radio" name="sb-radio" id="sb-radio-1" checked />
            <label for="sb-radio-1">Radio button optie 1</label>
        </li>
        <li>
            <input type="radio" name="sb-radio" id="sb-radio-2" />
            <label for="sb-radio-2">Radio button optie 2</label>
        </li>
        <li>
            <input type="radio" name="sb-radio" id="sb-radio-3" disabled />
            <label for="sb-radio-3">Radio button optie 3</label>
        </li>
    </ul>
`,n=()=>`
    <label for="sb-select">Keuzelijst</label>
    <select id="sb-select">
        <optgroup label="Groep met opties">
            <option value="Optie 1">Optie 1</option>
            <option value="Optie 2">Optie 2</option>
            <option value="Optie 3" disabled>Optie 3 (inactief)</option>
        </optgroup>
        <option value="Optie 4">Optie 4</option>
        <option value="Optie 5">Optie 5</option>
        <option value="Optie 6">Optie 6</option>
    </select>
`,p=()=>`
    <label for="sb-select-multiple">Keuzelijst met meervoudige selectie</label>
    <select id="sb-select-multiple" multiple>
        <optgroup label="Groep met opties">
            <option value="Optie 1">Optie 1</option>
            <option value="Optie 2">Optie 2</option>
            <option value="Optie 3" disabled>Optie 3 (inactief)</option>
        </optgroup>
        <option value="Optie 4">Optie 4</option>
        <option value="Optie 5">Optie 5</option>
        <option value="Optie 6">Optie 6</option>
    </select>
`;var s,a,c;t.parameters={...t.parameters,docs:{...(s=t.parameters)==null?void 0:s.docs,source:{originalSource:`{
  args: {
    type: "checkbox",
    aantalOpties: 3
  },
  render: ({
    type,
    aantalOpties
  }) => {
    const name = type === "radio" ? \` name="sb-\${type}"\` : "";
    const items = Array.from({
      length: aantalOpties
    }, (_, i) => {
      const checked = i === 0 ? " checked" : "";
      return \`<li>
            <input type="\${type}"\${name} id="sb-\${type}-\${i}"\${checked} />
            <label for="sb-\${type}-\${i}">\${type === "checkbox" ? "Checkbox" : "Radio button"} optie \${i + 1}</label>
        </li>\`;
    }).join("\\n\\t\\t");
    return \`<ul class="selection">\\n\\t\\t\${items}\\n\\t</ul>\`;
  }
}`,...(c=(a=t.parameters)==null?void 0:a.docs)==null?void 0:c.source}}};var b,r,d;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`() => \`
    <ul class="selection">
        <li>
            <input type="checkbox" id="sb-checkbox-1" checked />
            <label for="sb-checkbox-1">Checkbox optie 1</label>
        </li>
        <li>
            <input type="checkbox" id="sb-checkbox-2" />
            <label for="sb-checkbox-2">Checkbox optie 2</label>
            <ul class="selection">
                <li>
                    <input type="checkbox" id="sb-checkbox-nested-1" />
                    <label for="sb-checkbox-nested-1">Geneste checkbox optie 1</label>
                </li>
                <li>
                    <input type="checkbox" id="sb-checkbox-nested-2" />
                    <label for="sb-checkbox-nested-2">Geneste checkbox optie 2</label>
                </li>
                <li>
                    <input type="checkbox" id="sb-checkbox-nested-3" />
                    <label for="sb-checkbox-nested-3">Geneste checkbox optie 3</label>
                </li>
            </ul>
        </li>
        <li>
            <input type="checkbox" id="sb-checkbox-3" disabled />
            <label for="sb-checkbox-3">Checkbox optie 3</label>
        </li>
    </ul>
\``,...(d=(r=i.parameters)==null?void 0:r.docs)==null?void 0:d.source}}};var u,h,k;l.parameters={...l.parameters,docs:{...(u=l.parameters)==null?void 0:u.docs,source:{originalSource:`() => \`
    <ul class="selection">
        <li>
            <input type="radio" name="sb-radio" id="sb-radio-1" checked />
            <label for="sb-radio-1">Radio button optie 1</label>
        </li>
        <li>
            <input type="radio" name="sb-radio" id="sb-radio-2" />
            <label for="sb-radio-2">Radio button optie 2</label>
        </li>
        <li>
            <input type="radio" name="sb-radio" id="sb-radio-3" disabled />
            <label for="sb-radio-3">Radio button optie 3</label>
        </li>
    </ul>
\``,...(k=(h=l.parameters)==null?void 0:h.docs)==null?void 0:k.source}}};var x,m,O;n.parameters={...n.parameters,docs:{...(x=n.parameters)==null?void 0:x.docs,source:{originalSource:`() => \`
    <label for="sb-select">Keuzelijst</label>
    <select id="sb-select">
        <optgroup label="Groep met opties">
            <option value="Optie 1">Optie 1</option>
            <option value="Optie 2">Optie 2</option>
            <option value="Optie 3" disabled>Optie 3 (inactief)</option>
        </optgroup>
        <option value="Optie 4">Optie 4</option>
        <option value="Optie 5">Optie 5</option>
        <option value="Optie 6">Optie 6</option>
    </select>
\``,...(O=(m=n.parameters)==null?void 0:m.docs)==null?void 0:O.source}}};var f,y,v;p.parameters={...p.parameters,docs:{...(f=p.parameters)==null?void 0:f.docs,source:{originalSource:`() => \`
    <label for="sb-select-multiple">Keuzelijst met meervoudige selectie</label>
    <select id="sb-select-multiple" multiple>
        <optgroup label="Groep met opties">
            <option value="Optie 1">Optie 1</option>
            <option value="Optie 2">Optie 2</option>
            <option value="Optie 3" disabled>Optie 3 (inactief)</option>
        </optgroup>
        <option value="Optie 4">Optie 4</option>
        <option value="Optie 5">Optie 5</option>
        <option value="Optie 6">Optie 6</option>
    </select>
\``,...(v=(y=p.parameters)==null?void 0:y.docs)==null?void 0:v.source}}};const S=["Speeltuin","Checkboxes","RadioButtons","Keuzelijst","KeuzelijstMeervoudig"];export{i as Checkboxes,n as Keuzelijst,p as KeuzelijstMeervoudig,l as RadioButtons,t as Speeltuin,S as __namedExportsOrder,R as default};
