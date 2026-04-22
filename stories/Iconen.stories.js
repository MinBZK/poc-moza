const iconNames = ["berichtenbox", "bewerken", "chevron", "financieen", "foutmelding", "gegevens", "gegevensdeling", "gezondheid", "home", "informatie", "instellingen", "link-extern", "link-intern", "lopende-zaken", "menu", "minus", "nieuws", "personeel", "persoon", "plus", "sluiten", "succes", "uitloggen", "vervoer", "vink", "waarschuwing"];
const iconSizes = ["xs", "sm", "md", "lg", "xl"];
const iconColors = {
	"icon-default": "--toepassing-color-icon-default",
	"icon-inverse": "--toepassing-color-icon-inverse",
	"interactive-default": "--toepassing-color-interactive-default-icon",
	"interactive-hover": "--toepassing-color-interactive-hover-icon",
	"interactive-active": "--toepassing-color-interactive-active-icon",
	"interactive-selected": "--toepassing-color-interactive-selected-icon",
	"interactive-alternate-default": "--toepassing-color-interactive-alternate-default-icon",
	"interactive-alternate-hover": "--toepassing-color-interactive-alternate-hover-icon",
	"interactive-alternate-active": "--toepassing-color-interactive-alternate-active-icon",
	"interactive-alternate-selected": "--toepassing-color-interactive-alternate-selected-icon",
	"feedback-info": "--toepassing-color-feedback-info-icon",
	"feedback-success": "--toepassing-color-feedback-success-icon",
	"feedback-waarschuwing": "--toepassing-color-feedback-warning-icon",
	"feedback-fout": "--toepassing-color-feedback-error-icon",
	"feedback-neutraal": "--toepassing-color-feedback-neutral-icon",
};
const icons = {};

async function loadIcon(name) {
	if (!icons[name]) {
		const response = await fetch(`/assets/icons/icon-${name}.svg`);
		icons[name] = await response.text();
	}
	return icons[name];
}

export default {
	title: "Componenten/Iconen",
	tags: ["autodocs"],
};

export const Standaard = {
	parameters: {
		docs: {
			description: {
				story: "SVG-iconen worden inline gebruikt en kleuren mee via <code>currentColor</code>. De grootte wordt bepaald door <code>--toepassing-size-icon-*</code> tokens.",
			},
		},
	},
	argTypes: {
		icoon: { control: "select", options: iconNames, name: "Icoon" },
		grootte: { control: "select", options: iconSizes, name: "Grootte" },
		kleur: { control: "select", options: Object.keys(iconColors), name: "Kleur" },
	},
	args: {
		icoon: "home",
		grootte: "md",
		kleur: "icon-default",
	},
	render: ({ icoon, grootte, kleur }) => {
		const cssVar = iconColors[kleur];
		const container = document.createElement("div");
		loadIcon(icoon).then((svg) => {
			container.innerHTML = `
<div style="color: var(${cssVar});">
	<div style="inline-size: var(--toepassing-size-icon-${grootte}); block-size: var(--toepassing-size-icon-${grootte});">
		${svg}
	</div>
	<p style="font-size: 0.75rem; color: #696969; margin-block-start: 0.5rem;">
		${icoon} — --toepassing-size-icon-${grootte} — ${cssVar}
	</p>
</div>`;
		});
		return container;
	},
};

export const AlleGroottes = {
	parameters: {
		docs: {
			description: {
				story: "Overzicht van alle beschikbare icoongroottes (xs t/m xl).",
			},
		},
	},
	argTypes: {
		icoon: { control: "select", options: iconNames, name: "Icoon" },
	},
	args: {
		icoon: "home",
	},
	render: ({ icoon }) => {
		const container = document.createElement("div");
		loadIcon(icoon).then((svg) => {
			container.innerHTML = `
<div style="display: flex; align-items: flex-end; gap: 1.5rem; flex-wrap: wrap;">
	${iconSizes.map((size) => `
	<div style="text-align: center;">
		<div style="inline-size: var(--toepassing-size-icon-${size}); block-size: var(--toepassing-size-icon-${size}); color: var(--toepassing-color-interactive-default-text);">
			${svg}
		</div>
		<code style="font-size: 0.75rem; color: #696969; display: block; margin-block-start: 0.5rem;">${size}</code>
	</div>`).join("")}
</div>`;
		});
		return container;
	},
};

export const AllePictogrammen = {
	parameters: {
		docs: {
			description: {
				story: "Overzicht van alle beschikbare pictogrammen.",
			},
		},
	},
	argTypes: {
		grootte: { control: "select", options: iconSizes, name: "Grootte" },
	},
	args: {
		grootte: "md",
	},
	render: ({ grootte }) => {
		const container = document.createElement("div");
		Promise.all(iconNames.map((name) => loadIcon(name).then((svg) => ({ name, svg })))).then((results) => {
			container.innerHTML = `
<p style="font-size: 0.875rem; color: #696969; margin-block-end: 1rem;">Klik op het icoon om de SVG-code te kopiëren.</p>
<div style="display: flex; flex-wrap: wrap; gap: 1.5rem;">
	${results.map(({ name, svg }) => `
	<div class="icon-tile" data-svg="${svg.replace(/"/g, "&quot;")}" style="text-align: center; min-inline-size: 5rem; cursor: pointer;" title="Klik om SVG te kopieren">
		<div style="inline-size: var(--toepassing-size-icon-${grootte}); block-size: var(--toepassing-size-icon-${grootte}); margin-inline: auto; color: var(--toepassing-color-interactive-default-text);">
			${svg}
		</div>
		<div class="icon-tile-label" style="font-size: 0.75rem; color: #696969; margin-block-start: 0.5rem;">${name}</div>
	</div>`).join("")}
</div>`;
			container.querySelectorAll(".icon-tile").forEach((tile) => {
				tile.addEventListener("click", () => {
					navigator.clipboard.writeText(tile.dataset.svg).then(() => {
						const label = tile.querySelector(".icon-tile-label");
						const original = label.textContent;
						label.textContent = "Gekopieerd!";
						label.style.color = "var(--toepassing-color-feedback-success-text)";
						setTimeout(() => { label.textContent = original; label.style.color = ""; }, 1200);
					});
				});
			});
		});
		return container;
	},
};
