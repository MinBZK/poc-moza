export default {
	title: "Typografie/Inline tekst",
	tags: ["autodocs"],
};

export const Gemarkeerd = {
	parameters: {
		docs: {
			description: {
				story: "Gemarkeerde tekst via het `<mark>` element.",
			},
		},
	},
	render: () => `<p><mark>Dit is gemarkeerde tekst.</mark></p>`,
};

export const Doorgestreept = {
	parameters: {
		docs: {
			description: {
				story: "Doorgestreepte tekst via het `<del>` element, voor verwijderde of niet meer geldige inhoud.",
			},
		},
	},
	render: () => `<p><del>Dit is doorgestreepte tekst.</del></p>`,
};

export const Ingevoegd = {
	parameters: {
		docs: {
			description: {
				story: "Ingevoegde tekst via het `<ins>` element, voor toegevoegde inhoud.",
			},
		},
	},
	render: () => `<p><ins>Dit is ingevoegde tekst.</ins></p>`,
};

export const SubscriptSuperscript = {
	parameters: {
		docs: {
			description: {
				story: "`<sub>` en `<sup>` voor subscript en superscript, bijvoorbeeld in wiskundige formules.",
			},
		},
	},
	render: () => `
<p>
	<sub>subscript</sub> en <sup>superscript</sup> voor bijvoorbeeld een
	wiskundige formule als x<sup>2</sup><sub>n</sub> + y<sup>2</sup><sub>n</sub> = r<sup>2</sup>
</p>
`,
};

export const InlineCode = {
	parameters: {
		docs: {
			description: {
				story: "Inline code via het `<code>` element binnen lopende tekst.",
			},
		},
	},
	render: () => `<p>Dit is <code>inline code</code> in een zin.</p>`,
};

export const Afkorting = {
	parameters: {
		docs: {
			description: {
				story: "Afkorting via het `<abbr>` element met een `title` attribuut voor de volledige term.",
			},
		},
	},
	render: () =>
`<p>Dit is een <abbr title="afkorting">afk.</abbr> in een zin.</p>`,
};

export const Toetsenbord = {
	parameters: {
		docs: {
			description: {
				story: "Toetsenbordinvoer via het `<kbd>` element.",
			},
		},
	},
	render: () =>
`<p><kbd>Ctrl</kbd> + <kbd>S</kbd> om op te slaan.</p>`,
};

export const Voorbeelduitvoer = {
	parameters: {
		docs: {
			description: {
				story: "Voorbeelduitvoer van een programma via het `<samp>` element.",
			},
		},
	},
	render: () =>
`<p>Het resultaat is <samp>voorbeelduitvoer</samp>.</p>`,
};

export const Variabele = {
	parameters: {
		docs: {
			description: {
				story: "Wiskundige of programmeervariabele via het `<var>` element.",
			},
		},
	},
	render: () =>
`<p>De variabele <var>x</var> staat voor een onbekende waarde.</p>`,
};
