const x={title:"Componenten/Selectie",tags:["autodocs"]},e={parameters:{docs:{description:{story:"Checkboxes voor meervoudige selectie. Ondersteunt ook geneste opties en inactieve staat."}}},render:()=>`
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
        <input type="checkbox" id="sb-checkbox-3" aria-disabled />
        <label for="sb-checkbox-3">Checkbox optie 3</label>
    </li>
    <li>
        <input type="checkbox" id="sb-checkbox-4" aria-disabled checked />
        <label for="sb-checkbox-4">Checkbox optie 4</label>
    </li>
</ul>
`},o={parameters:{docs:{description:{story:"Radio buttons voor enkelvoudige selectie. Alle opties delen hetzelfde `name` attribuut."}}},render:()=>`
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
        <input type="radio" name="sb-radio" id="sb-radio-3" aria-disabled />
        <label for="sb-radio-3">Radio button optie 3</label>
    </li>
</ul>
`},t={parameters:{docs:{description:{story:"Keuzelijst (`<select>`) met gegroepeerde en individuele opties."}}},render:()=>`
<label for="sb-select">Keuzelijst</label>
<select id="sb-select">
    <optgroup label="Groep met opties">
        <option value="Optie 1">Optie 1</option>
        <option value="Optie 2">Optie 2</option>
        <option value="Optie 3" aria-disabled>Optie 3 (inactief)</option>
    </optgroup>
    <option value="Optie 4">Optie 4</option>
    <option value="Optie 5">Optie 5</option>
    <option value="Optie 6">Optie 6</option>
</select>
`},i={parameters:{docs:{description:{story:"Keuzelijst met `multiple` attribuut voor meervoudige selectie."}}},render:()=>`
<label for="sb-select-multiple">Keuzelijst met meervoudige selectie</label>
<select id="sb-select-multiple" multiple>
    <optgroup label="Groep met opties">
        <option value="Optie 1">Optie 1</option>
        <option value="Optie 2">Optie 2</option>
        <option value="Optie 3" aria-disabled>Optie 3 (inactief)</option>
    </optgroup>
    <option value="Optie 4">Optie 4</option>
    <option value="Optie 5">Optie 5</option>
    <option value="Optie 6">Optie 6</option>
</select>
`};var l,n,s;e.parameters={...e.parameters,docs:{...(l=e.parameters)==null?void 0:l.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Checkboxes voor meervoudige selectie. Ondersteunt ook geneste opties en inactieve staat."
      }
    }
  },
  render: () => \`
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
        <input type="checkbox" id="sb-checkbox-3" aria-disabled />
        <label for="sb-checkbox-3">Checkbox optie 3</label>
    </li>
    <li>
        <input type="checkbox" id="sb-checkbox-4" aria-disabled checked />
        <label for="sb-checkbox-4">Checkbox optie 4</label>
    </li>
</ul>
\`
}`,...(s=(n=e.parameters)==null?void 0:n.docs)==null?void 0:s.source}}};var p,a,c;o.parameters={...o.parameters,docs:{...(p=o.parameters)==null?void 0:p.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Radio buttons voor enkelvoudige selectie. Alle opties delen hetzelfde \`name\` attribuut."
      }
    }
  },
  render: () => \`
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
        <input type="radio" name="sb-radio" id="sb-radio-3" aria-disabled />
        <label for="sb-radio-3">Radio button optie 3</label>
    </li>
</ul>
\`
}`,...(c=(a=o.parameters)==null?void 0:a.docs)==null?void 0:c.source}}};var r,b,d;t.parameters={...t.parameters,docs:{...(r=t.parameters)==null?void 0:r.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Keuzelijst (\`<select>\`) met gegroepeerde en individuele opties."
      }
    }
  },
  render: () => \`
<label for="sb-select">Keuzelijst</label>
<select id="sb-select">
    <optgroup label="Groep met opties">
        <option value="Optie 1">Optie 1</option>
        <option value="Optie 2">Optie 2</option>
        <option value="Optie 3" aria-disabled>Optie 3 (inactief)</option>
    </optgroup>
    <option value="Optie 4">Optie 4</option>
    <option value="Optie 5">Optie 5</option>
    <option value="Optie 6">Optie 6</option>
</select>
\`
}`,...(d=(b=t.parameters)==null?void 0:b.docs)==null?void 0:d.source}}};var u,k,h;i.parameters={...i.parameters,docs:{...(u=i.parameters)==null?void 0:u.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Keuzelijst met \`multiple\` attribuut voor meervoudige selectie."
      }
    }
  },
  render: () => \`
<label for="sb-select-multiple">Keuzelijst met meervoudige selectie</label>
<select id="sb-select-multiple" multiple>
    <optgroup label="Groep met opties">
        <option value="Optie 1">Optie 1</option>
        <option value="Optie 2">Optie 2</option>
        <option value="Optie 3" aria-disabled>Optie 3 (inactief)</option>
    </optgroup>
    <option value="Optie 4">Optie 4</option>
    <option value="Optie 5">Optie 5</option>
    <option value="Optie 6">Optie 6</option>
</select>
\`
}`,...(h=(k=i.parameters)==null?void 0:k.docs)==null?void 0:h.source}}};const m=["Checkboxes","RadioButtons","Keuzelijst","KeuzelijstMeervoudig"];export{e as Checkboxes,t as Keuzelijst,i as KeuzelijstMeervoudig,o as RadioButtons,m as __namedExportsOrder,x as default};
