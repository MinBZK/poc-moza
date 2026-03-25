const v={title:"Design tokens/Ruimtelijk systeem",tags:["autodocs"],parameters:{docs:{source:!1}}};function e(a,d,r){return`<div style="display: flex; align-items: center; gap: 0.75rem; padding: 0.375rem 0;">
        <div style="block-size: 1.5rem; background: var(--toepassing-color-interactive-default-background); opacity: 0.7; flex-shrink: 0; border-radius: 2px; inline-size: var(${a});"></div>
        <div style="font-size: 0.875rem; white-space: nowrap;">
            ${d}
            <code style="font-size: 0.75rem; color: #696969; margin-inline-start: 0.5rem;" class="space-value" data-var="${a}"></code>
            
        </div>
    </div>`}function u(a){requestAnimationFrame(()=>{const d=a.querySelectorAll(".space-value"),r=getComputedStyle(document.documentElement);d.forEach(o=>{o.textContent=r.getPropertyValue(o.dataset.var).trim()})})}const s={parameters:{docs:{description:{story:"Layout-tokens voor spacing tussen elementen. Worden toegepast via <code>> * + *</code> met margin (content flow) of <code>gap</code> met flex/grid (component-layouts)."}}},render:()=>{const a=document.createElement("div");return a.innerHTML=`
            <h3 style="margin-block-end: 0.75rem;">Layout spacing</h3>
            ${e("--toepassing-space-layout-3xs","3xs")}
            ${e("--toepassing-space-layout-2xs","2xs")}
            ${e("--toepassing-space-layout-xs","xs")}
            ${e("--toepassing-space-layout-sm","sm")}
            ${e("--toepassing-space-layout-md","md")}
            ${e("--toepassing-space-layout-lg","lg")}
        `,u(a),a}},n={parameters:{docs:{description:{story:"Padding-tokens voor interne ruimte binnen elementen, zoals knoppen, cards en invoervelden."}}},render:()=>{const a=document.createElement("div");return a.innerHTML=`
            <h3 style="margin-block-end: 0.75rem;">Padding</h3>
            ${e("--toepassing-space-padding-2xs","2xs")}
            ${e("--toepassing-space-padding-xs","xs")}
            ${e("--toepassing-space-padding-sm","sm")}
            ${e("--toepassing-space-padding-md","md")}
            ${e("--toepassing-space-padding-lg","lg")}
            ${e("--toepassing-space-padding-xl","xl")}
            ${e("--toepassing-space-padding-2xl","2xl")}

            <h3 style="margin-block-start: 1.5rem; margin-block-end: 0.75rem;">Voorbeeld</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
                <div style="background: var(--toepassing-color-background-subtle); border: 1px dashed var(--toepassing-color-border-subtle); padding: var(--toepassing-space-padding-xs);">
                    <div style="background: var(--toepassing-color-background-default); padding: 0.5rem;">padding-xs</div>
                </div>
                <div style="background: var(--toepassing-color-background-subtle); border: 1px dashed var(--toepassing-color-border-subtle); padding: var(--toepassing-space-padding-sm);">
                    <div style="background: var(--toepassing-color-background-default); padding: 0.5rem;">padding-sm</div>
                </div>
                <div style="background: var(--toepassing-color-background-subtle); border: 1px dashed var(--toepassing-color-border-subtle); padding: var(--toepassing-space-padding-md);">
                    <div style="background: var(--toepassing-color-background-default); padding: 0.5rem;">padding-md</div>
                </div>
                <div style="background: var(--toepassing-color-background-subtle); border: 1px dashed var(--toepassing-color-border-subtle); padding: var(--toepassing-space-padding-lg);">
                    <div style="background: var(--toepassing-color-background-default); padding: 0.5rem;">padding-lg</div>
                </div>
                <div style="background: var(--toepassing-color-background-subtle); border: 1px dashed var(--toepassing-color-border-subtle); padding: var(--toepassing-space-padding-xl);">
                    <div style="background: var(--toepassing-color-background-default); padding: 0.5rem;">padding-xl</div>
                </div>
            </div>
        `,u(a),a}};var t,i,c;s.parameters={...s.parameters,docs:{...(t=s.parameters)==null?void 0:t.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Layout-tokens voor spacing tussen elementen. Worden toegepast via <code>> * + *</code> met margin (content flow) of <code>gap</code> met flex/grid (component-layouts)."
      }
    }
  },
  render: () => {
    const container = document.createElement("div");
    container.innerHTML = \`
            <h3 style="margin-block-end: 0.75rem;">Layout spacing</h3>
            \${spaceSwatch("--toepassing-space-layout-3xs", "3xs")}
            \${spaceSwatch("--toepassing-space-layout-2xs", "2xs")}
            \${spaceSwatch("--toepassing-space-layout-xs", "xs")}
            \${spaceSwatch("--toepassing-space-layout-sm", "sm")}
            \${spaceSwatch("--toepassing-space-layout-md", "md")}
            \${spaceSwatch("--toepassing-space-layout-lg", "lg")}
        \`;
    resolveValues(container);
    return container;
  }
}`,...(c=(i=s.parameters)==null?void 0:i.docs)==null?void 0:c.source}}};var p,g,l;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Padding-tokens voor interne ruimte binnen elementen, zoals knoppen, cards en invoervelden."
      }
    }
  },
  render: () => {
    const container = document.createElement("div");
    container.innerHTML = \`
            <h3 style="margin-block-end: 0.75rem;">Padding</h3>
            \${spaceSwatch("--toepassing-space-padding-2xs", "2xs")}
            \${spaceSwatch("--toepassing-space-padding-xs", "xs")}
            \${spaceSwatch("--toepassing-space-padding-sm", "sm")}
            \${spaceSwatch("--toepassing-space-padding-md", "md")}
            \${spaceSwatch("--toepassing-space-padding-lg", "lg")}
            \${spaceSwatch("--toepassing-space-padding-xl", "xl")}
            \${spaceSwatch("--toepassing-space-padding-2xl", "2xl")}

            <h3 style="margin-block-start: 1.5rem; margin-block-end: 0.75rem;">Voorbeeld</h3>
            <div style="display: flex; flex-wrap: wrap; gap: 1rem;">
                <div style="background: var(--toepassing-color-background-subtle); border: 1px dashed var(--toepassing-color-border-subtle); padding: var(--toepassing-space-padding-xs);">
                    <div style="background: var(--toepassing-color-background-default); padding: 0.5rem;">padding-xs</div>
                </div>
                <div style="background: var(--toepassing-color-background-subtle); border: 1px dashed var(--toepassing-color-border-subtle); padding: var(--toepassing-space-padding-sm);">
                    <div style="background: var(--toepassing-color-background-default); padding: 0.5rem;">padding-sm</div>
                </div>
                <div style="background: var(--toepassing-color-background-subtle); border: 1px dashed var(--toepassing-color-border-subtle); padding: var(--toepassing-space-padding-md);">
                    <div style="background: var(--toepassing-color-background-default); padding: 0.5rem;">padding-md</div>
                </div>
                <div style="background: var(--toepassing-color-background-subtle); border: 1px dashed var(--toepassing-color-border-subtle); padding: var(--toepassing-space-padding-lg);">
                    <div style="background: var(--toepassing-color-background-default); padding: 0.5rem;">padding-lg</div>
                </div>
                <div style="background: var(--toepassing-color-background-subtle); border: 1px dashed var(--toepassing-color-border-subtle); padding: var(--toepassing-space-padding-xl);">
                    <div style="background: var(--toepassing-color-background-default); padding: 0.5rem;">padding-xl</div>
                </div>
            </div>
        \`;
    resolveValues(container);
    return container;
  }
}`,...(l=(g=n.parameters)==null?void 0:g.docs)==null?void 0:l.source}}};const m=["Layout","Padding"];export{s as Layout,n as Padding,m as __namedExportsOrder,v as default};
