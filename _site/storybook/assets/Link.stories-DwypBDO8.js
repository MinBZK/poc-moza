const c={title:"Componenten/Link",tags:["autodocs"]},e={parameters:{docs:{description:{story:"Een hyperlink binnen een lopende zin. Dit is de meest voorkomende manier om links te gebruiken."}}},argTypes:{tekst:{control:"text"},href:{control:"text"}},args:{tekst:"hyperlink",href:"#"},render:({tekst:r,href:t})=>`<p>Dit is een <a href="${t}">${r}</a> in een zin.</p>`},n={parameters:{docs:{description:{story:"Een alleenstaande hyperlink, zonder omringende tekst."}}},argTypes:{tekst:{control:"text"},href:{control:"text"}},args:{tekst:"Hyperlink",href:"#"},render:({tekst:r,href:t})=>`<a href="${t}">${r}</a>`};var s,o,a;e.parameters={...e.parameters,docs:{...(s=e.parameters)==null?void 0:s.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Een hyperlink binnen een lopende zin. Dit is de meest voorkomende manier om links te gebruiken."
      }
    }
  },
  argTypes: {
    tekst: {
      control: "text"
    },
    href: {
      control: "text"
    }
  },
  args: {
    tekst: "hyperlink",
    href: "#"
  },
  render: ({
    tekst,
    href
  }) => \`<p>Dit is een <a href="\${href}">\${tekst}</a> in een zin.</p>\`
}`,...(a=(o=e.parameters)==null?void 0:o.docs)==null?void 0:a.source}}};var i,d,p;n.parameters={...n.parameters,docs:{...(i=n.parameters)==null?void 0:i.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Een alleenstaande hyperlink, zonder omringende tekst."
      }
    }
  },
  argTypes: {
    tekst: {
      control: "text"
    },
    href: {
      control: "text"
    }
  },
  args: {
    tekst: "Hyperlink",
    href: "#"
  },
  render: ({
    tekst,
    href
  }) => \`<a href="\${href}">\${tekst}</a>\`
}`,...(p=(d=n.parameters)==null?void 0:d.docs)==null?void 0:p.source}}};const l=["Standaard","Alleenstaand"];export{n as Alleenstaand,e as Standaard,l as __namedExportsOrder,c as default};
