const icons = {};
const iconNames = ["berichtenbox", "bewerken", "chevron", "financieen", "foutmelding", "gegevens", "gegevensdeling", "gezondheid", "home", "informatie", "instellingen", "link-extern", "link-intern", "lopende-zaken", "menu", "minus", "nieuws", "personeel", "persoon", "plus", "sluiten", "succes", "uitloggen", "vervoer", "vink", "waarschuwing"];

async function loadIcon(name) {
	if (!icons[name]) {
		const response = await fetch(`/assets/icons/icon-${name}.svg`);
		icons[name] = await response.text();
	}
	return icons[name];
}

export default {
	title: "Componenten/Knop",
	tags: ["autodocs"],
};

export const Primair = {
	parameters: {
		docs: {
			description: {
				story: "De standaard primaire knop. Gebruik dit voor de belangrijkste actie op een pagina.",
			},
		},
	},
	argTypes: {
		label: { control: "text", name: "Label" },
	},
	args: {
		label: "Standaard primaire knop",
	},
	render: ({ label }) => `
<button type="button">${label}</button>
`,
};

export const Secundair = {
	parameters: {
		docs: {
			description: {
				story: "Secundaire knop. Gebruik dit voor minder prominente acties naast een primaire knop.",
			},
		},
	},
	argTypes: {
		label: { control: "text", name: "Label" },
	},
	args: {
		label: "Secundaire knop",
	},
	render: ({ label }) => `
<button type="button" class="secondary">${label}</button>
`,
};

export const Reset = {
	parameters: {
		docs: {
			description: {
				story: "Reset knop. Gebruik `type=\"reset\"` om formuliervelden terug te zetten naar hun beginwaarde.",
			},
		},
	},
	argTypes: {
		label: { control: "text", name: "Label" },
	},
	args: {
		label: "Reset knop",
	},
	render: ({ label }) => `
<button type="reset">${label}</button>
`,
};

export const Submit = {
	parameters: {
		docs: {
			description: {
				story: "Submit knop. Gebruik `type=\"submit\"` om een formulier te verzenden.",
			},
		},
	},
	argTypes: {
		label: { control: "text", name: "Label" },
	},
	args: {
		label: "Submit knop",
	},
	render: ({ label }) => `
<button type="submit">${label}</button>
`,
};

export const Inactief = {
	parameters: {
		docs: {
			description: {
				story: "Inactieve knop. Gebruikt `aria-disabled` in plaats van het `disabled` attribuut voor betere toegankelijkheid.",
			},
		},
	},
	argTypes: {
		label: { control: "text", name: "Label" },
	},
	args: {
		label: "Inactieve knop",
	},
	render: ({ label }) => `
<button aria-disabled>${label}</button>
`,
};

export const Destructief = {
	parameters: {
		docs: {
			description: {
				story: "Destructieve knop. Gebruik dit voor onomkeerbare acties zoals verwijderen.",
			},
		},
	},
	argTypes: {
		label: { control: "text", name: "Label" },
	},
	args: {
		label: "Destructieve actie",
	},
	render: ({ label }) => `
<button class="negative">${label}</button>
`,
};

export const MetTekststijlen = {
	parameters: {
		docs: {
			description: {
				story: "Knop met tekststijlen. Inline elementen zoals `<b>` en `<i>` zijn toegestaan binnen knoppen.",
			},
		},
	},
	render: () => `
<button type="button">Knop met <b>tekst</b> <i>stijlen</i></button>
`,
};

export const MetIcoon = {
	parameters: {
		docs: {
			description: {
				story: "Knop met een SVG-icoon voor de tekst. Het icoon kleurt mee via currentColor.",
			},
		},
	},
	argTypes: {
		label: { control: "text", name: "Label" },
		icoon: { control: "select", options: iconNames, name: "Icoon" },
	},
	args: {
		label: "Knop met icoon",
		icoon: "plus",
	},
	render: ({ label, icoon }) => {
		const container = document.createElement("div");
		loadIcon(icoon).then((svg) => {
			container.innerHTML = `<button type="button"><span>${svg}</span> ${label}</button>`;
		});
		return container;
	},
};

export const AlleVarianten = {
	parameters: {
		docs: {
			description: {
				story: "Overzicht van alle knopvarianten naast elkaar ter vergelijking.",
			},
		},
	},
	render: () => `
<div style="display: flex; flex-wrap: wrap; gap: 1rem; align-items: flex-start;">
	<button type="button">Primaire knop</button>
	<button type="button" class="secondary">Secundaire knop</button>
	<button type="reset">Reset knop</button>
	<button type="submit">Submit knop</button>
	<button class="negative">Destructieve actie</button>
	<button aria-disabled>Inactieve knop</button>
</div>
`,
};
