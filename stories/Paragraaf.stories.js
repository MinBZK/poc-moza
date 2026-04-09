export default {
	title: "Typografie/Paragraaf",
	tags: ["autodocs"],
};

export const Standaard = {
	parameters: {
		docs: {
			description: {
				story: "Standaard alinea met lopende tekst, inclusief `<strong>` voor sterke nadruk en `<em>` voor klemtoon.",
			},
		},
	},
	argTypes: {
		tekst: { control: "text", name: "Tekst" },
	},
	args: {
		tekst: "Dit is een standaard alinea met lopende tekst.",
	},
	render: ({ tekst }) => `
<p>
	${tekst}
	<strong>Tekst met sterke nadruk</strong>, <em>tekst met klemtoon</em> en
	<strong><em>tekst met sterke nadruk én klemtoon</em></strong>.
</p>
`,
};

export const Introductie = {
	parameters: {
		docs: {
			description: {
				story: "Introductie-alinea met `class=\"intro\"` om de inleiding visueel te onderscheiden van de rest van de tekst.",
			},
		},
	},
	argTypes: {
		tekst: { control: "text", name: "Tekst" },
	},
	args: {
		tekst: "Dit is een introductie alinea. Deze maakt het mogelijk om de introductie van de rest van de tekst te onderscheiden.",
	},
	render: ({ tekst }) => `<p class="intro">${tekst}</p>`,
};

export const KleineTekst = {
	parameters: {
		docs: {
			description: {
				story: "Kleine tekst via het `<small>` element.",
			},
		},
	},
	argTypes: {
		tekst: { control: "text", name: "Tekst" },
	},
	args: {
		tekst: "Dit is kleine tekst.",
	},
	render: ({ tekst }) => `<p><small>${tekst}</small></p>`,
};
