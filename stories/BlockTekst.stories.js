export default {
	title: "Typografie/Block-level tekst",
	tags: ["autodocs"],
};

export const Citaat = {
	parameters: {
		docs: {
			description: {
				story: "Citaat via het `<blockquote>` element.",
			},
		},
	},
	argTypes: { tekst: { control: "text", name: "Tekst" } },
	args: { tekst: "Dit is een citaat. De beste manier om de toekomst te voorspellen is om deze zelf te creëren." },
	render: ({ tekst }) => `
<blockquote>
	<p>${tekst}</p>
</blockquote>
`,
};

export const VoorgeformatteerdeTekst = {
	parameters: {
		docs: {
			description: {
				story: "Voorgeformatteerde tekst via `<pre>`. Spaties en regelovergangen worden behouden.",
			},
		},
	},
	argTypes: { tekst: { control: "text", name: "Tekst" } },
	args: { tekst: "Dit is voorgeformatteerde tekst.\n            Spaties en regelovergangen\n            worden behouden." },
	render: ({ tekst }) => `<pre>${tekst}</pre>`,
};

export const Codeblok = {
	parameters: {
		docs: {
			description: {
				story: "Codeblok via `<pre><code>` voor het tonen van broncode.",
			},
		},
	},
	argTypes: { tekst: { control: "text", name: "Tekst" } },
	args: { tekst: "// Dit is een codeblok\nfunction groet(naam) {\n    return `Hallo, ${naam}!`;\n}" },
	render: ({ tekst }) => `<pre><code>${tekst}</code></pre>`,
};

export const Adres = {
	parameters: {
		docs: {
			description: {
				story: "Contactgegevens via het `<address>` element.",
			},
		},
	},
	argTypes: {
		regel1: { control: "text", name: "Regel 1" },
		regel2: { control: "text", name: "Regel 2" },
		regel3: { control: "text", name: "Regel 3" },
	},
	args: {
		regel1: "Contactgegevens",
		regel2: "Voorbeeldstraat 1",
		regel3: "1234 AB Den Haag",
	},
	render: ({ regel1, regel2, regel3 }) => `
<address>
	${regel1}<br />
	${regel2}<br />
	${regel3}
</address>
`,
};
