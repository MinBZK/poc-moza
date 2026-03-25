const g={title:"Componenten/Footer",tags:["autodocs"]},n={parameters:{docs:{description:{story:"De footer bevat navigatiegroepen met links naar informatie, service en partners. Op mobiel worden de groepen verticaal gestapeld, op desktop naast elkaar getoond."}}},argTypes:{aantalGroepen:{name:"Aantal groepen",control:{type:"range",min:1,max:4,step:1}},titel1:{name:"Groep 1 titel",control:"text"},links1:{name:"Groep 1 links (kommagescheiden)",control:"text"},titel2:{name:"Groep 2 titel",control:"text"},links2:{name:"Groep 2 links (kommagescheiden)",control:"text"},titel3:{name:"Groep 3 titel",control:"text"},links3:{name:"Groep 3 links (kommagescheiden)",control:"text"},titel4:{name:"Groep 4 titel",control:"text"},links4:{name:"Groep 4 links (kommagescheiden)",control:"text"}},args:{aantalGroepen:4,titel1:"Over deze site",links1:"Wat is MijnOverheid Zakelijk, Toegankelijkheid, Sitemap, English",titel2:"Gegevensverwerking",links2:"Veiligheid, Privacyverklaring, Wet- en regelgeving",titel3:"Service",links3:"Mededelingen, Herken oplichting, Veelgestelde vragen, Contact, Klachtafhandeling",titel4:"Partners",links4:"Aangesloten organisaties, Overheid.nl, Rijksoverheid.nl, Meldpunt Fouten in Overheidsregistraties"},render:e=>`<footer>
	<div class="footer-links">
${[{titel:e.titel1,links:e.links1},{titel:e.titel2,links:e.links2},{titel:e.titel3,links:e.links3},{titel:e.titel4,links:e.links4}].slice(0,e.aantalGroepen).map(({titel:r,links:a})=>{const o=a.split(",").map(s=>`			<li><a href="#">${s.trim()}</a></li>`).join(`
`);return`		<nav>
			<h4>${r}</h4>
			<ul>
${o}
			</ul>
		</nav>`}).join(`
`)}
	</div>
</footer>`};var t,i,l;n.parameters={...n.parameters,docs:{...(t=n.parameters)==null?void 0:t.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "De footer bevat navigatiegroepen met links naar informatie, service en partners. Op mobiel worden de groepen verticaal gestapeld, op desktop naast elkaar getoond."
      }
    }
  },
  argTypes: {
    aantalGroepen: {
      name: "Aantal groepen",
      control: {
        type: "range",
        min: 1,
        max: 4,
        step: 1
      }
    },
    titel1: {
      name: "Groep 1 titel",
      control: "text"
    },
    links1: {
      name: "Groep 1 links (kommagescheiden)",
      control: "text"
    },
    titel2: {
      name: "Groep 2 titel",
      control: "text"
    },
    links2: {
      name: "Groep 2 links (kommagescheiden)",
      control: "text"
    },
    titel3: {
      name: "Groep 3 titel",
      control: "text"
    },
    links3: {
      name: "Groep 3 links (kommagescheiden)",
      control: "text"
    },
    titel4: {
      name: "Groep 4 titel",
      control: "text"
    },
    links4: {
      name: "Groep 4 links (kommagescheiden)",
      control: "text"
    }
  },
  args: {
    aantalGroepen: 4,
    titel1: "Over deze site",
    links1: "Wat is MijnOverheid Zakelijk, Toegankelijkheid, Sitemap, English",
    titel2: "Gegevensverwerking",
    links2: "Veiligheid, Privacyverklaring, Wet- en regelgeving",
    titel3: "Service",
    links3: "Mededelingen, Herken oplichting, Veelgestelde vragen, Contact, Klachtafhandeling",
    titel4: "Partners",
    links4: "Aangesloten organisaties, Overheid.nl, Rijksoverheid.nl, Meldpunt Fouten in Overheidsregistraties"
  },
  render: args => {
    const groepen = [{
      titel: args.titel1,
      links: args.links1
    }, {
      titel: args.titel2,
      links: args.links2
    }, {
      titel: args.titel3,
      links: args.links3
    }, {
      titel: args.titel4,
      links: args.links4
    }];
    const navs = groepen.slice(0, args.aantalGroepen).map(({
      titel,
      links
    }) => {
      const items = links.split(",").map(link => \`\\t\\t\\t<li><a href="#">\${link.trim()}</a></li>\`).join("\\n");
      return \`\\t\\t<nav>\\n\\t\\t\\t<h4>\${titel}</h4>\\n\\t\\t\\t<ul>\\n\${items}\\n\\t\\t\\t</ul>\\n\\t\\t</nav>\`;
    }).join("\\n");
    return \`<footer>\\n\\t<div class="footer-links">\\n\${navs}\\n\\t</div>\\n</footer>\`;
  }
}`,...(l=(i=n.parameters)==null?void 0:i.docs)==null?void 0:l.source}}};const c=["Standaard"];export{n as Standaard,c as __namedExportsOrder,g as default};
