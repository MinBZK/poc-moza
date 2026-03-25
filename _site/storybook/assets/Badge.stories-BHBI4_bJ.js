const m={title:"Componenten/Badge",tags:["autodocs"]},e={parameters:{docs:{description:{story:"Een badge toont een korte waarde zoals een teller of status-label. Wordt bijvoorbeeld gebruikt in navigatie-items en naast headings."}}},argTypes:{waarde:{control:"text"}},args:{waarde:"3"},render:({waarde:r})=>`<span class="badge">${r}</span>`},n={parameters:{docs:{description:{story:"Een badge naast een heading, bijvoorbeeld om een datum of teller te tonen."}}},argTypes:{titel:{control:"text"},badge:{control:"text"}},args:{titel:"Binnenkort beschikbaar",badge:"najaar 2026"},render:({titel:r,badge:b})=>`<h2>${r} <span class="badge">${b}</span></h2>`},a={parameters:{docs:{description:{story:"Een badge in een navigatie-item, bijvoorbeeld om het aantal ongelezen berichten te tonen."}}},render:()=>`
<nav class="side-nav">
    <ul>
        <li>
            <a href="#">
                Berichtenbox
                <span class="badge">3</span>
            </a>
        </li>
        <li>
            <a href="#" aria-current="page">
                Lopende zaken
                <span class="badge">1</span>
            </a>
        </li>
    </ul>
</nav>`};var t,s,o;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Een badge toont een korte waarde zoals een teller of status-label. Wordt bijvoorbeeld gebruikt in navigatie-items en naast headings."
      }
    }
  },
  argTypes: {
    waarde: {
      control: "text"
    }
  },
  args: {
    waarde: "3"
  },
  render: ({
    waarde
  }) => \`<span class="badge">\${waarde}</span>\`
}`,...(o=(s=e.parameters)==null?void 0:s.docs)==null?void 0:o.source}}};var d,i,l;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Een badge naast een heading, bijvoorbeeld om een datum of teller te tonen."
      }
    }
  },
  argTypes: {
    titel: {
      control: "text"
    },
    badge: {
      control: "text"
    }
  },
  args: {
    titel: "Binnenkort beschikbaar",
    badge: "najaar 2026"
  },
  render: ({
    titel,
    badge
  }) => \`<h2>\${titel} <span class="badge">\${badge}</span></h2>\`
}`,...(l=(i=n.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};var c,g,p;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Een badge in een navigatie-item, bijvoorbeeld om het aantal ongelezen berichten te tonen."
      }
    }
  },
  render: () => \`
<nav class="side-nav">
    <ul>
        <li>
            <a href="#">
                Berichtenbox
                <span class="badge">3</span>
            </a>
        </li>
        <li>
            <a href="#" aria-current="page">
                Lopende zaken
                <span class="badge">1</span>
            </a>
        </li>
    </ul>
</nav>\`
}`,...(p=(g=a.parameters)==null?void 0:g.docs)==null?void 0:p.source}}};const u=["Standaard","InHeading","InNavigatie"];export{n as InHeading,a as InNavigatie,e as Standaard,u as __namedExportsOrder,m as default};
