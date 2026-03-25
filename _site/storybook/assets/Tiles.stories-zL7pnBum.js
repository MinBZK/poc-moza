const l={title:"Componenten/Tiles",tags:["autodocs"]},e={parameters:{docs:{description:{story:"Tiles tonen cards in een 2-koloms grid dat op smalle schermen naar 1 kolom schakelt. De actieknop wordt automatisch naar de onderkant van elke card geduwd."}}},argTypes:{aantalTiles:{name:"Aantal tiles",control:{type:"range",min:2,max:6,step:1}}},args:{aantalTiles:4},render:({aantalTiles:s})=>`<div class="tiles">${[{titel:"Bedrijfsactiviteiten",tekst:"Bekijk de SBI-codes en omschrijvingen van de activiteiten die bij uw onderneming geregistreerd staan."},{titel:"Adresgegevens",tekst:"Uw vestigings- en postadres zoals geregistreerd bij de Kamer van Koophandel."},{titel:"Vestigingen",tekst:"Overzicht van alle vestigingen die gekoppeld zijn aan uw onderneming, inclusief neven­verstigingen."},{titel:"UBO-register",tekst:"Inzicht in de uiteindelijk belanghebbenden (UBO's) die voor uw organisatie zijn geregistreerd."},{titel:"Jaarrekeningen",tekst:"Bekijk de bij de KVK gedeponeerde jaarrekeningen en financiële overzichten van uw onderneming."},{titel:"Contactgeschiedenis",tekst:"Overzicht van alle momenten waarop een overheidsorganisatie contact met u heeft opgenomen."}].slice(0,s).map(({titel:n,tekst:r})=>`
        <section class="card">
            <h3>${n}</h3>
            <p>${r}</p>
            <a class="btn-cta" href="#">Ga naar ${n}</a>
        </section>`).join("")}
</div>`};var t,i,a;e.parameters={...e.parameters,docs:{...(t=e.parameters)==null?void 0:t.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Tiles tonen cards in een 2-koloms grid dat op smalle schermen naar 1 kolom schakelt. De actieknop wordt automatisch naar de onderkant van elke card geduwd."
      }
    }
  },
  argTypes: {
    aantalTiles: {
      name: "Aantal tiles",
      control: {
        type: "range",
        min: 2,
        max: 6,
        step: 1
      }
    }
  },
  args: {
    aantalTiles: 4
  },
  render: ({
    aantalTiles
  }) => {
    const items = [{
      titel: "Bedrijfsactiviteiten",
      tekst: "Bekijk de SBI-codes en omschrijvingen van de activiteiten die bij uw onderneming geregistreerd staan."
    }, {
      titel: "Adresgegevens",
      tekst: "Uw vestigings- en postadres zoals geregistreerd bij de Kamer van Koophandel."
    }, {
      titel: "Vestigingen",
      tekst: "Overzicht van alle vestigingen die gekoppeld zijn aan uw onderneming, inclusief neven\\u00adverstigingen."
    }, {
      titel: "UBO-register",
      tekst: "Inzicht in de uiteindelijk belanghebbenden (UBO's) die voor uw organisatie zijn geregistreerd."
    }, {
      titel: "Jaarrekeningen",
      tekst: "Bekijk de bij de KVK gedeponeerde jaarrekeningen en financi\\u00eble overzichten van uw onderneming."
    }, {
      titel: "Contactgeschiedenis",
      tekst: "Overzicht van alle momenten waarop een overheidsorganisatie contact met u heeft opgenomen."
    }];
    const tiles = items.slice(0, aantalTiles).map(({
      titel,
      tekst
    }) => \`
        <section class="card">
            <h3>\${titel}</h3>
            <p>\${tekst}</p>
            <a class="btn-cta" href="#">Ga naar \${titel}</a>
        </section>\`).join("");
    return \`<div class="tiles">\${tiles}\\n</div>\`;
  }
}`,...(a=(i=e.parameters)==null?void 0:i.docs)==null?void 0:a.source}}};const c=["Standaard"];export{e as Standaard,c as __namedExportsOrder,l as default};
