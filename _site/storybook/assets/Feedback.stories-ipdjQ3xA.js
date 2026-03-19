const y=`<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 24 24">
    <path class="feedback-icon-color-background" d="M22.04 3.78c-.16-.95-.88-1.67-1.83-1.83-2.73-.45-7.3-.45-8.21-.45-.91 0-5.48 0-8.22.46-.94.15-1.67.88-1.82 1.82C1.5 6.52 1.5 11.09 1.5 12s0 5.48.46 8.22c.16.95.88 1.67 1.83 1.83 2.74.46 7.3.46 8.22.46.91 0 5.48 0 8.22-.46.95-.16 1.67-.88 1.83-1.83.46-2.74.46-7.3.46-8.22-.02-2.74-.02-5.48-.48-8.22z"/>
    <path class="feedback-icon-color-foreground" d="M10.71 6.93c0-.34.11-.63.33-.88.22-.25.54-.38.95-.38.41 0 .72.12.94.36.22.24.33.54.33.9 0 .32-.11.61-.33.86s-.54.37-.94.37c-.41 0-.72-.12-.95-.35-.22-.24-.33-.53-.33-.88zm2.4 2.39v8.96H10.9V9.41l2.21-.09z"/>
</svg>`,$=`<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 24 24">
    <path fill="feedback-icon-color-background" d="M22.04 3.78c-.16-.95-.88-1.67-1.83-1.83-2.73-.45-7.3-.45-8.21-.45-.91 0-5.48 0-8.22.46-.95.15-1.67.87-1.82 1.82C1.5 6.52 1.5 11.09 1.5 12s0 5.48.46 8.22c.16.95.88 1.67 1.83 1.83 2.74.46 7.3.46 8.22.46.91 0 5.48 0 8.22-.46.95-.16 1.67-.88 1.83-1.83.46-2.74.46-7.3.46-8.22-.02-2.74-.02-5.48-.48-8.22z"/>
    <path class="feedback-icon-color-foreground" d="M16.5 7.35a.755.755 0 0 0-1.01.1l-4.4 4.95-2.65-2.3a.743.743 0 0 0-.97 0c-.28.24-.35.65-.16.97l3.2 5.38c.14.23.38.37.64.37s.51-.14.64-.36l4.89-8.09c.21-.35.13-.78-.18-1.02z"/>
</svg>`,z=`<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 24 24">
    <path d="M23.38 19.64 13.67 2.47c-.73-1.3-2.6-1.3-3.34 0L.62 19.64c-.72 1.28.2 2.86 1.67 2.86h19.43c1.46 0 2.38-1.58 1.66-2.86z"/>
    <path fill="none" class="feedback-icon-color-foreground" d="M10.54 17.45c0-.44.12-.82.36-1.12.24-.31.6-.46 1.09-.46.48 0 .85.14 1.1.4.25.27.38.66.38 1.18 0 .43-.12.8-.36 1.09-.24.29-.6.44-1.09.44-.48 0-.85-.13-1.1-.39-.25-.25-.38-.63-.38-1.14zm.31-10.27 2.48-.2-.22 5.51v2.63l-2.27.05V7.18z"/>
</svg>`,B=`<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 24 24">
    <circle cx="12" cy="12" r="10.5" fill="feedback-icon-color-background"/>
    <path class="feedback-icon-color-foreground" d="M15.12 7.71 12 10.48 8.88 7.71a.858.858 0 0 0-1.15.02c-.3.32-.31.81-.02 1.14L10.48 12l-2.77 3.12c-.29.33-.29.83.02 1.14.32.3.81.31 1.14.02L12 13.52l3.12 2.77c.33.29.83.28 1.14-.02.3-.32.31-.81.02-1.14L13.52 12l2.77-3.12c.29-.33.29-.83-.02-1.14a.848.848 0 0 0-1.15-.03M12 12.01l-.01-.01.01-.01.01-.01.01.01.01.01-.03.01z"/>
</svg>`,L={title:"Componenten/Feedback",tags:["autodocs"]},e={parameters:{docs:{description:{story:"Neutrale feedback zonder icoon. Geschikt voor algemene meldingen zonder specifieke urgentie."}}},render:()=>`
<div class="feedback">
    <div>
        <p>Neutrale feedback</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam asperiores odio nulla et?</p>
    </div>
    <button class="btn-close link-button">
        <i>Sluit notificatie</i>
    </button>
</div>
`},i={parameters:{docs:{description:{story:"Informatieve feedback. Gebruik dit voor het tonen van aanvullende of verduidelijkende informatie."}}},render:()=>`
<div class="feedback feedback-info">
    ${y}
    <div>
        <p>Informatie</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt sint mollitia culpa distinctio omnis quasi aperiam dolorem.</p>
    </div>
    <button class="btn-close link-button">
        <i>Sluit notificatie</i>
    </button>
</div>
`},n={parameters:{docs:{description:{story:"Succesfeedback. Gebruik dit om te bevestigen dat een gebruikersactie of een actie vanuit het systeem geslaagd is."}}},render:()=>`
<div class="feedback feedback-succes">
    ${$}
    <div>
        <p>Succes</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium nulla doloribus in explicabo minus amet deleniti excepturi.</p>
    </div>
    <button class="btn-close link-button">
        <i>Sluit notificatie</i>
    </button>
</div>
`},t={parameters:{docs:{description:{story:"Waarschuwingsfeedback. Gebruik dit om de gebruiker te attenderen op een mogelijke aandachtspunt."}}},render:()=>`
<div class="feedback feedback-warning">
    ${z}
    <div>
        <p>Waarschuwing</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, incidunt perspiciatis adipisci iusto veniam magnam.</p>
    </div>
    <button class="btn-close link-button">
        <i>Sluit notificatie</i>
    </button>
</div>
`},s={parameters:{docs:{description:{story:"Foutmelding. Gebruik dit bij validatiefouten of mislukte acties. Heeft geen sluit-knop omdat de fout door de gebruiker opgelost moet worden om verder te kunnen."}}},render:()=>`
<div class="feedback feedback-error">
    ${B}
    <div>
        <p>Foutmelding</p>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus iste tempore dignissimos fuga.</p>
    </div>
</div>
`},a={parameters:{docs:{description:{story:"Overzicht van alle feedbackvarianten naast elkaar ter vergelijking."}}},render:()=>`
<div style="display: flex; flex-direction: column; gap: 1rem;">
    <div class="feedback">
        <div>
            <p>Neutrale feedback</p>
            <p>Bericht tekst.</p>
        </div>
        <button class="btn-close link-button">
            <i>Sluit notificatie</i>
        </button>
    </div>
    <div class="feedback feedback-info">
        ${y}
        <div>
            <p>Informatie</p>
            <p>Bericht tekst.</p>
        </div>
        <button class="btn-close link-button">
            <i>Sluit notificatie</i>
        </button>
    </div>
    <div class="feedback feedback-succes">
        ${$}
        <div>
            <p>Succes</p>
            <p>Bericht tekst.</p>
        </div>
        <button class="btn-close link-button">
            <i>Sluit notificatie</i>
        </button>
    </div>
    <div class="feedback feedback-warning">
        ${z}
        <div>
            <p>Waarschuwing</p>
            <p>Bericht tekst.</p>
        </div>
        <button class="btn-close link-button">
            <i>Sluit notificatie</i>
        </button>
    </div>
    <div class="feedback feedback-error">
        ${B}
        <div>
            <p>Foutmelding</p>
            <p>Bericht tekst.</p>
        </div>
    </div>
</div>
`};var c,o,r;e.parameters={...e.parameters,docs:{...(c=e.parameters)==null?void 0:c.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Neutrale feedback zonder icoon. Geschikt voor algemene meldingen zonder specifieke urgentie."
      }
    }
  },
  render: () => \`
<div class="feedback">
    <div>
        <p>Neutrale feedback</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam asperiores odio nulla et?</p>
    </div>
    <button class="btn-close link-button">
        <i>Sluit notificatie</i>
    </button>
</div>
\`
}`,...(r=(o=e.parameters)==null?void 0:o.docs)==null?void 0:r.source}}};var d,l,u;i.parameters={...i.parameters,docs:{...(d=i.parameters)==null?void 0:d.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Informatieve feedback. Gebruik dit voor het tonen van aanvullende of verduidelijkende informatie."
      }
    }
  },
  render: () => \`
<div class="feedback feedback-info">
    \${feedbackIconInfo}
    <div>
        <p>Informatie</p>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deserunt sint mollitia culpa distinctio omnis quasi aperiam dolorem.</p>
    </div>
    <button class="btn-close link-button">
        <i>Sluit notificatie</i>
    </button>
</div>
\`
}`,...(u=(l=i.parameters)==null?void 0:l.docs)==null?void 0:u.source}}};var p,b,m;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Succesfeedback. Gebruik dit om te bevestigen dat een gebruikersactie of een actie vanuit het systeem geslaagd is."
      }
    }
  },
  render: () => \`
<div class="feedback feedback-succes">
    \${feedbackIconSucces}
    <div>
        <p>Succes</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium nulla doloribus in explicabo minus amet deleniti excepturi.</p>
    </div>
    <button class="btn-close link-button">
        <i>Sluit notificatie</i>
    </button>
</div>
\`
}`,...(m=(b=n.parameters)==null?void 0:b.docs)==null?void 0:m.source}}};var v,k,f;t.parameters={...t.parameters,docs:{...(v=t.parameters)==null?void 0:v.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Waarschuwingsfeedback. Gebruik dit om de gebruiker te attenderen op een mogelijke aandachtspunt."
      }
    }
  },
  render: () => \`
<div class="feedback feedback-warning">
    \${feedbackIconWaarschuwing}
    <div>
        <p>Waarschuwing</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptate, incidunt perspiciatis adipisci iusto veniam magnam.</p>
    </div>
    <button class="btn-close link-button">
        <i>Sluit notificatie</i>
    </button>
</div>
\`
}`,...(f=(k=t.parameters)==null?void 0:k.docs)==null?void 0:f.source}}};var g,h,w;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Foutmelding. Gebruik dit bij validatiefouten of mislukte acties. Heeft geen sluit-knop omdat de fout door de gebruiker opgelost moet worden om verder te kunnen."
      }
    }
  },
  render: () => \`
<div class="feedback feedback-error">
    \${feedbackIconFout}
    <div>
        <p>Foutmelding</p>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Necessitatibus iste tempore dignissimos fuga.</p>
    </div>
</div>
\`
}`,...(w=(h=s.parameters)==null?void 0:h.docs)==null?void 0:w.source}}};var S,x,I;a.parameters={...a.parameters,docs:{...(S=a.parameters)==null?void 0:S.docs,source:{originalSource:`{
  parameters: {
    docs: {
      description: {
        story: "Overzicht van alle feedbackvarianten naast elkaar ter vergelijking."
      }
    }
  },
  render: () => \`
<div style="display: flex; flex-direction: column; gap: 1rem;">
    <div class="feedback">
        <div>
            <p>Neutrale feedback</p>
            <p>Bericht tekst.</p>
        </div>
        <button class="btn-close link-button">
            <i>Sluit notificatie</i>
        </button>
    </div>
    <div class="feedback feedback-info">
        \${feedbackIconInfo}
        <div>
            <p>Informatie</p>
            <p>Bericht tekst.</p>
        </div>
        <button class="btn-close link-button">
            <i>Sluit notificatie</i>
        </button>
    </div>
    <div class="feedback feedback-succes">
        \${feedbackIconSucces}
        <div>
            <p>Succes</p>
            <p>Bericht tekst.</p>
        </div>
        <button class="btn-close link-button">
            <i>Sluit notificatie</i>
        </button>
    </div>
    <div class="feedback feedback-warning">
        \${feedbackIconWaarschuwing}
        <div>
            <p>Waarschuwing</p>
            <p>Bericht tekst.</p>
        </div>
        <button class="btn-close link-button">
            <i>Sluit notificatie</i>
        </button>
    </div>
    <div class="feedback feedback-error">
        \${feedbackIconFout}
        <div>
            <p>Foutmelding</p>
            <p>Bericht tekst.</p>
        </div>
    </div>
</div>
\`
}`,...(I=(x=a.parameters)==null?void 0:x.docs)==null?void 0:I.source}}};const F=["Neutraal","Informatie","Succes","Waarschuwing","Foutmelding","AlleVarianten"];export{a as AlleVarianten,s as Foutmelding,i as Informatie,e as Neutraal,n as Succes,t as Waarschuwing,F as __namedExportsOrder,L as default};
