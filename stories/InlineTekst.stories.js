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
	argTypes: { tekst: { control: "text", name: "Tekst" } },
	args: { tekst: "Dit is gemarkeerde tekst." },
	render: ({ tekst }) => `<p><mark>${tekst}</mark></p>`,
};

export const Doorgestreept = {
	parameters: {
		docs: {
			description: {
				story: "Doorgestreepte tekst via het `<del>` element, voor verwijderde of niet meer geldige inhoud.",
			},
		},
	},
	argTypes: { tekst: { control: "text", name: "Tekst" } },
	args: { tekst: "Dit is doorgestreepte tekst." },
	render: ({ tekst }) => `<p><del>${tekst}</del></p>`,
};

export const Ingevoegd = {
	parameters: {
		docs: {
			description: {
				story: "Ingevoegde tekst via het `<ins>` element, voor toegevoegde inhoud.",
			},
		},
	},
	argTypes: { tekst: { control: "text", name: "Tekst" } },
	args: { tekst: "Dit is ingevoegde tekst." },
	render: ({ tekst }) => `<p><ins>${tekst}</ins></p>`,
};

export const SubscriptSuperscript = {
	parameters: {
		docs: {
			description: {
				story: "`<sub>` en `<sup>` voor subscript en superscript, bijvoorbeeld in wiskundige formules.",
			},
		},
	},
	argTypes: { tekst: { control: "text", name: "Tekst" } },
	args: { tekst: "x² + y² = r²" },
	render: ({ tekst }) => `<p>${tekst}</p>`,
};

export const InlineCode = {
	parameters: {
		docs: {
			description: {
				story: "Inline code via het `<code>` element binnen lopende tekst.",
			},
		},
	},
	argTypes: { tekst: { control: "text", name: "Tekst" } },
	args: { tekst: "inline code" },
	render: ({ tekst }) => `<p>Dit is <code>${tekst}</code> in een zin.</p>`,
};

export const Afkorting = {
	parameters: {
		docs: {
			description: {
				story: "Afkorting via het `<abbr>` element met een `title` attribuut voor de volledige term.",
			},
		},
	},
	argTypes: {
		afkorting: { control: "text", name: "Afkorting" },
		volledig: { control: "text", name: "Volledige term" },
	},
	args: {
		afkorting: "afk.",
		volledig: "afkorting",
	},
	render: ({ afkorting, volledig }) => `<p>Dit is een <abbr title="${volledig}">${afkorting}</abbr> in een zin.</p>`,
};

export const Toetsenbord = {
	parameters: {
		docs: {
			description: {
				story: "Toetsenbordinvoer via het `<kbd>` element.",
			},
		},
	},
	argTypes: {
		toets1: { control: "text", name: "Toets 1" },
		toets2: { control: "text", name: "Toets 2" },
	},
	args: {
		toets1: "Ctrl",
		toets2: "S",
	},
	render: ({ toets1, toets2 }) => `<p><kbd>${toets1}</kbd> + <kbd>${toets2}</kbd> om op te slaan.</p>`,
};

export const Voorbeelduitvoer = {
	parameters: {
		docs: {
			description: {
				story: "Voorbeelduitvoer van een programma via het `<samp>` element.",
			},
		},
	},
	argTypes: { tekst: { control: "text", name: "Tekst" } },
	args: { tekst: "voorbeelduitvoer" },
	render: ({ tekst }) => `<p>Het resultaat is <samp>${tekst}</samp>.</p>`,
};

export const Variabele = {
	parameters: {
		docs: {
			description: {
				story: "Wiskundige of programmeervariabele via het `<var>` element.",
			},
		},
	},
	argTypes: { tekst: { control: "text", name: "Tekst" } },
	args: { tekst: "x" },
	render: ({ tekst }) => `<p>De variabele <var>${tekst}</var> staat voor een onbekende waarde.</p>`,
};
