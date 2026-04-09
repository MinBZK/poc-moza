const icons = {};
const iconNames = ["berichtenbox", "bewerken", "chevron", "financieen", "foutmelding", "gegevens", "gegevensdeling", "gezondheid", "home", "informatie", "instellingen", "link-extern", "link-intern", "lopende-zaken", "menu", "minus", "nieuws", "personeel", "persoon", "plus", "sluiten", "succes", "uitloggen", "vervoer", "vink", "waarschuwing"];

// Iconen worden asynchroon geladen bij eerste gebruik
async function loadIcon(name) {
	if (!icons[name]) {
		const response = await fetch(`/assets/icons/icon-${name}.svg`);
		icons[name] = await response.text();
	}
	return icons[name];
}

export default {
	title: "Componenten/Link met icoon",
	tags: ["autodocs"],
};

export const Standaard = {
	parameters: {
		docs: {
			description: {
				story: "Een link met een SVG-icoon ervoor. Het icoon kleurt mee met de tekst via currentColor.",
			},
		},
	},
	argTypes: {
		label: { control: "text", name: "Label" },
		icoon: { control: "select", options: iconNames, name: "Icoon" },
	},
	args: {
		label: "Contactgegevens wijzigen",
		icoon: "bewerken",
	},
	render: ({ label, icoon }) => {
		const container = document.createElement("div");
		loadIcon(icoon).then((svg) => {
			container.innerHTML = `
<a class="icon-link" href="#">
	${svg}
	${label}
</a>`;
		});
		return container;
	},
};
