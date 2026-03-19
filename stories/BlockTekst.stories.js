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
	render: () => `
<blockquote>
	<p>
		Dit is een citaat. De beste manier om de toekomst te voorspellen is om
		deze zelf te creëren.
	</p>
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
	render: () => `
<pre>Dit is voorgeformatteerde tekst.
            Spaties en regelovergangen
            worden behouden.</pre>
`,
};

export const Codeblok = {
	parameters: {
		docs: {
			description: {
				story: "Codeblok via `<pre><code>` voor het tonen van broncode.",
			},
		},
	},
	render: () => `
<pre><code>// Dit is een codeblok
function groet(naam) {
    return \`Hallo, \${naam}!\`;
}</code></pre>
`,
};

export const Adres = {
	parameters: {
		docs: {
			description: {
				story: "Contactgegevens via het `<address>` element.",
			},
		},
	},
	render: () => `
<address>
	Contactgegevens<br />
	Voorbeeldstraat 1<br />
	1234 AB Den Haag
</address>
`,
};
