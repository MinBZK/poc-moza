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
	render: () => `
<p>
	Dit is een standaard alinea met lopende tekst en
	<strong>tekst met sterke nadruk</strong>, <em>tekst met klemtoon</em> en
	<strong><em>tekst met sterke nadruk én klemtoon</em></strong>.
	Deze gebruiken hiervoor de semantische HTML elementen
	<code>&lt;strong&gt;</code> en <code>&lt;em&gt;</code>.
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
	render: () => `
<p class="intro">
	Dit is een introductie alinea. Deze maakt het mogelijk om de introductie
	van de rest van de tekst te onderscheiden.
</p>
`,
};

export const KleineTekst = {
	parameters: {
		docs: {
			description: {
				story: "Kleine tekst via het `<small>` element.",
			},
		},
	},
	render: () => `<p><small>Dit is kleine tekst.</small></p>`,
};
