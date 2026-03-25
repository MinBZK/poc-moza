const f={title:"Componenten/Card",tags:["autodocs"]},e={parameters:{docs:{description:{story:"Een card groepeert gerelateerde content met een visuele scheiding van de achtergrond. Geschikt voor secties met een heading, tekst en optioneel een actieknop."}}},argTypes:{titel:{control:"text"},inhoud:{control:"text"},toonKnop:{control:"boolean",name:"Toon actieknop"}},args:{titel:"Bedrijfsactiviteiten",inhoud:"Bekijk de SBI-codes en omschrijvingen van de activiteiten die bij uw onderneming geregistreerd staan.",toonKnop:!0},render:({titel:v,inhoud:b,toonKnop:k})=>`
<section class="card">
    <h2>${v}</h2>
    <p>${b}</p>
    ${k?'<a class="btn-cta" href="#">Ga naar Bedrijfsactiviteiten</a>':""}
</section>`},n={parameters:{docs:{description:{story:"Een card met meerdere secties, gescheiden door een horizontale lijn. Elke sectie heeft een eigen heading en content."}}},render:()=>`
<section class="card">
    <section>
        <h2>Berichten over uw buurt</h2>
        <p>Berichten die betrekking hebben op de omgeving van uw bedrijfsadres.</p>
        <a class="btn-cta" href="#">Naar Berichten over uw buurt</a>
    </section>
    <section>
        <h2>Subsidies en financiering</h2>
        <p>Subsidies en financiering waar u mogelijk voor in aanmerking komt.</p>
        <a class="btn-cta" href="#">Naar Subsidies en financiering</a>
    </section>
</section>`},t={parameters:{docs:{description:{story:"Een card met een data-overzicht in tabelvorm. Gebruikt de class data-overview voor label-waarde paren."}}},render:()=>`
<section class="card">
    <h2>Algemeen</h2>
    <p>Dit zijn de gegevens die bij de overheid bekend zijn over jouw organisatie.</p>
    <table class="data-overview">
        <caption>Bron: <a href="#">KVK</a> en <a href="#">Belastingdienst</a></caption>
        <tr>
            <th scope="row">Handelsnaam</th>
            <td>Bloom B.V.</td>
        </tr>
        <tr>
            <th scope="row">KVK-nummer</th>
            <td>12345678</td>
        </tr>
        <tr>
            <th scope="row">Rechtsvorm</th>
            <td>Besloten vennootschap</td>
        </tr>
    </table>
</section>`},a={parameters:{docs:{description:{story:"Een card met een lijst van content-links. Elke link is klikbaar over de volledige breedte via een onzichtbare card-link overlay. Ongelezen items worden visueel gemarkeerd."}}},render:()=>`
<section class="card">
    <h2>Berichten over uw buurt</h2>
    <p>Berichten die betrekking hebben op de omgeving van uw bedrijfsadres.</p>
    <ul class="list-content-links">
        <li>
            <a href="#" class="content-link status-unread">
                <h3>Wegafsluiting Stationsweg vanaf 10 maart</h3>
                <span class="card-link"></span>
            </a>
            <p>19 februari 2026 — De Stationsweg is afgesloten vanwege werkzaamheden aan het riool.</p>
        </li>
        <li>
            <a href="#" class="content-link">
                <h3>Aanpassing parkeerregels en laad-/loszones</h3>
                <span class="card-link"></span>
            </a>
            <p>19 februari 2026 — De gemeente past de parkeerregels aan in uw buurt.</p>
        </li>
    </ul>
    <a class="btn-cta" href="#">Meer Berichten over uw buurt</a>
</section>`};var r,s,i;e.parameters={...e.parameters,docs:{...(r=e.parameters)==null?void 0:r.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Een card groepeert gerelateerde content met een visuele scheiding van de achtergrond. Geschikt voor secties met een heading, tekst en optioneel een actieknop."
      }
    }
  },
  argTypes: {
    titel: {
      control: "text"
    },
    inhoud: {
      control: "text"
    },
    toonKnop: {
      control: "boolean",
      name: "Toon actieknop"
    }
  },
  args: {
    titel: "Bedrijfsactiviteiten",
    inhoud: "Bekijk de SBI-codes en omschrijvingen van de activiteiten die bij uw onderneming geregistreerd staan.",
    toonKnop: true
  },
  render: ({
    titel,
    inhoud,
    toonKnop
  }) => \`
<section class="card">
    <h2>\${titel}</h2>
    <p>\${inhoud}</p>
    \${toonKnop ? '<a class="btn-cta" href="#">Ga naar Bedrijfsactiviteiten</a>' : ""}
</section>\`
}`,...(i=(s=e.parameters)==null?void 0:s.docs)==null?void 0:i.source}}};var o,c,d;n.parameters={...n.parameters,docs:{...(o=n.parameters)==null?void 0:o.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Een card met meerdere secties, gescheiden door een horizontale lijn. Elke sectie heeft een eigen heading en content."
      }
    }
  },
  render: () => \`
<section class="card">
    <section>
        <h2>Berichten over uw buurt</h2>
        <p>Berichten die betrekking hebben op de omgeving van uw bedrijfsadres.</p>
        <a class="btn-cta" href="#">Naar Berichten over uw buurt</a>
    </section>
    <section>
        <h2>Subsidies en financiering</h2>
        <p>Subsidies en financiering waar u mogelijk voor in aanmerking komt.</p>
        <a class="btn-cta" href="#">Naar Subsidies en financiering</a>
    </section>
</section>\`
}`,...(d=(c=n.parameters)==null?void 0:c.docs)==null?void 0:d.source}}};var l,p,h;t.parameters={...t.parameters,docs:{...(l=t.parameters)==null?void 0:l.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Een card met een data-overzicht in tabelvorm. Gebruikt de class data-overview voor label-waarde paren."
      }
    }
  },
  render: () => \`
<section class="card">
    <h2>Algemeen</h2>
    <p>Dit zijn de gegevens die bij de overheid bekend zijn over jouw organisatie.</p>
    <table class="data-overview">
        <caption>Bron: <a href="#">KVK</a> en <a href="#">Belastingdienst</a></caption>
        <tr>
            <th scope="row">Handelsnaam</th>
            <td>Bloom B.V.</td>
        </tr>
        <tr>
            <th scope="row">KVK-nummer</th>
            <td>12345678</td>
        </tr>
        <tr>
            <th scope="row">Rechtsvorm</th>
            <td>Besloten vennootschap</td>
        </tr>
    </table>
</section>\`
}`,...(h=(p=t.parameters)==null?void 0:p.docs)==null?void 0:h.source}}};var u,g,m;a.parameters={...a.parameters,docs:{...(u=a.parameters)==null?void 0:u.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Een card met een lijst van content-links. Elke link is klikbaar over de volledige breedte via een onzichtbare card-link overlay. Ongelezen items worden visueel gemarkeerd."
      }
    }
  },
  render: () => \`
<section class="card">
    <h2>Berichten over uw buurt</h2>
    <p>Berichten die betrekking hebben op de omgeving van uw bedrijfsadres.</p>
    <ul class="list-content-links">
        <li>
            <a href="#" class="content-link status-unread">
                <h3>Wegafsluiting Stationsweg vanaf 10 maart</h3>
                <span class="card-link"></span>
            </a>
            <p>19 februari 2026 — De Stationsweg is afgesloten vanwege werkzaamheden aan het riool.</p>
        </li>
        <li>
            <a href="#" class="content-link">
                <h3>Aanpassing parkeerregels en laad-/loszones</h3>
                <span class="card-link"></span>
            </a>
            <p>19 februari 2026 — De gemeente past de parkeerregels aan in uw buurt.</p>
        </li>
    </ul>
    <a class="btn-cta" href="#">Meer Berichten over uw buurt</a>
</section>\`
}`,...(m=(g=a.parameters)==null?void 0:g.docs)==null?void 0:m.source}}};const w=["Standaard","MetSecties","MetTabel","MetContentLinks"];export{a as MetContentLinks,n as MetSecties,t as MetTabel,e as Standaard,w as __namedExportsOrder,f as default};
