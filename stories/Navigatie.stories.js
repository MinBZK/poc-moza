export default {
	title: "Componenten/Navigatie",
	tags: ["autodocs"],
};

export const Hoofdnavigatie = {
	parameters: {
		docs: {
			description: {
				story: "Hoofdnavigatie met `aria-current=\"page\"` om de actieve pagina aan te geven.",
			},
		},
	},
	argTypes: {
		aantalItems: { name: "Aantal items", control: { type: "range", min: 2, max: 6, step: 1 } },
		item1: { name: "Item 1", control: "text" },
		item2: { name: "Item 2", control: "text" },
		item3: { name: "Item 3", control: "text" },
		item4: { name: "Item 4", control: "text" },
		item5: { name: "Item 5", control: "text" },
		item6: { name: "Item 6", control: "text" },
	},
	args: {
		aantalItems: 5,
		item1: "Home",
		item2: "Pagina 1",
		item3: "Pagina 2",
		item4: "Pagina 3",
		item5: "Pagina 4",
		item6: "Pagina 5",
	},
	render: ({ aantalItems, item1, item2, item3, item4, item5, item6 }) => {
		const labels = [item1, item2, item3, item4, item5, item6].slice(0, aantalItems);
		const items = labels.map((label, i) => {
			const current = i === 0 ? ' aria-current="page"' : "";
			return `\t<li><a href="#"${current}>${label}</a></li>`;
		}).join("\n");
		return `
<nav class="main-nav">
	<ul>
${items}
	</ul>
</nav>
`;
	},
};

export const SidebarNavigatie = {
	parameters: {
		docs: {
			description: {
				story: "Sidebar navigatie voor navigatie binnen een sectie.",
			},
		},
	},
	argTypes: {
		aantalItems: { name: "Aantal items", control: { type: "range", min: 2, max: 6, step: 1 } },
		item1: { name: "Item 1", control: "text" },
		item2: { name: "Item 2", control: "text" },
		item3: { name: "Item 3", control: "text" },
		item4: { name: "Item 4", control: "text" },
		item5: { name: "Item 5", control: "text" },
		item6: { name: "Item 6", control: "text" },
	},
	args: {
		aantalItems: 5,
		item1: "Home",
		item2: "Pagina 1",
		item3: "Pagina 2",
		item4: "Pagina 3",
		item5: "Pagina 4",
		item6: "Pagina 5",
	},
	render: ({ aantalItems, item1, item2, item3, item4, item5, item6 }) => {
		const labels = [item1, item2, item3, item4, item5, item6].slice(0, aantalItems);
		const items = labels.map((label, i) => {
			const current = i === 0 ? ' aria-current="page"' : "";
			return `\t<li><a href="#"${current}>${label}</a></li>`;
		}).join("\n");
		return `
<nav class="side-nav">
	<ul>
${items}
	</ul>
</nav>
`;
	},
};

export const Paginering = {
	parameters: {
		docs: {
			description: {
				story: "Pagineringsnavigatie met `aria-current=\"page\"` op de huidige pagina (als `<span>`, niet als link). Bevat optioneel Vorige/Volgende-links met `rel=\"prev\"`/`rel=\"next\"`.",
			},
		},
	},
	argTypes: {
		aantalPaginas: { name: "Aantal pagina's", control: { type: "range", min: 2, max: 10, step: 1 } },
		huidigePagina: { name: "Huidige pagina", control: { type: "range", min: 1, max: 10, step: 1 } },
	},
	args: {
		aantalPaginas: 3,
		huidigePagina: 1,
	},
	render: ({ aantalPaginas, huidigePagina }) => {
		const pagina = Math.min(huidigePagina, aantalPaginas);
		const items = [];

		if (pagina > 1) {
			items.push(`\t\t<li><a href="#" rel="prev">Vorige<span class="visually-hidden"> pagina</span></a></li>`);
		}

		for (let i = 1; i <= aantalPaginas; i++) {
			if (i === pagina) {
				items.push(`\t\t<li><span aria-current="page">${i}</span></li>`);
			} else {
				items.push(`\t\t<li><a href="#">${i}</a></li>`);
			}
		}

		if (pagina < aantalPaginas) {
			items.push(`\t\t<li><a href="#" rel="next">Volgende<span class="visually-hidden"> pagina</span></a></li>`);
		}

		return `
<nav class="pagination" aria-label="Paginering">
	<ol>
${items.join("\n")}
	</ol>
</nav>
`;
	},
};

export const Breadcrumb = {
	parameters: {
		docs: {
			description: {
				story: "Breadcrumb-navigatie die de hiërarchische positie van de huidige pagina toont.",
			},
		},
	},
	argTypes: {
		aantalItems: { name: "Aantal items", control: { type: "range", min: 2, max: 5, step: 1 } },
		item1: { name: "Item 1", control: "text" },
		item2: { name: "Item 2", control: "text" },
		item3: { name: "Item 3", control: "text" },
		item4: { name: "Item 4", control: "text" },
		item5: { name: "Item 5", control: "text" },
	},
	args: {
		aantalItems: 3,
		item1: "Home",
		item2: "Niveau 1",
		item3: "Niveau 2",
		item4: "Niveau 3",
		item5: "Niveau 4",
	},
	render: ({ aantalItems, item1, item2, item3, item4, item5 }) => {
		const labels = [item1, item2, item3, item4, item5].slice(0, aantalItems);
		const items = labels.map((label, i) => {
			if (i === labels.length - 1) return `\t<li aria-current="page">${label}</li>`;
			return `\t<li><a href="#">${label}</a></li>`;
		}).join("\n");
		return `
<nav class="breadcrumb">
	<ol>
${items}
	</ol>
</nav>
`;
	},
};
