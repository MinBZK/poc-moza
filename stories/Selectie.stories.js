export default {
	title: "Componenten/Selectie",
	tags: ["autodocs"],
};

export const Checkboxes = {
	parameters: {
		docs: {
			description: {
				story: "Checkboxes voor meervoudige selectie. Bevat geneste opties met indeterminate staat en inactieve opties met `aria-disabled`.",
			},
		},
	},
	argTypes: {
		aantalItems: { name: "Aantal items", control: { type: "range", min: 1, max: 5, step: 1 } },
		item1: { name: "Item 1", control: "text" },
		item2: { name: "Item 2", control: "text" },
		item3: { name: "Item 3", control: "text" },
		item4: { name: "Item 4", control: "text" },
		item5: { name: "Item 5", control: "text" },
	},
	args: {
		aantalItems: 3,
		item1: "Checkbox optie 1",
		item2: "Checkbox optie 2",
		item3: "Checkbox optie 3",
		item4: "Checkbox optie 4",
		item5: "Checkbox optie 5",
	},
	render: ({ aantalItems, item1, item2, item3, item4, item5 }) => {
		const labels = [item1, item2, item3, item4, item5].slice(0, aantalItems);
		const items = labels.map((label, i) => {
			const id = `sb-checkbox-${i + 1}`;
			const checked = i === 0 ? " checked" : "";
			return `\t<li>\n\t\t<input type="checkbox" id="${id}"${checked} />\n\t\t<label for="${id}">${label}</label>\n\t</li>`;
		}).join("\n");
		return `
<ul class="selection">
${items}
	<li>
		<input type="checkbox" id="sb-checkbox-parent" />
		<label for="sb-checkbox-parent">Bovenliggende optie</label>
		<ul class="selection">
			<li>
				<input type="checkbox" id="sb-checkbox-nested-1" checked />
				<label for="sb-checkbox-nested-1">Geneste optie 1</label>
			</li>
			<li>
				<input type="checkbox" id="sb-checkbox-nested-2" />
				<label for="sb-checkbox-nested-2">Geneste optie 2</label>
			</li>
			<li>
				<input type="checkbox" id="sb-checkbox-nested-3" />
				<label for="sb-checkbox-nested-3">Geneste optie 3</label>
			</li>
		</ul>
	</li>
	<li>
		<input type="checkbox" id="sb-checkbox-disabled" aria-disabled />
		<label for="sb-checkbox-disabled">Inactieve optie</label>
	</li>
	<li>
		<input type="checkbox" id="sb-checkbox-disabled-checked" aria-disabled checked />
		<label for="sb-checkbox-disabled-checked">Inactieve aangevinkte optie</label>
	</li>
</ul>
`;
	},
};

export const RadioButtons = {
	parameters: {
		docs: {
			description: {
				story: "Radio buttons voor enkelvoudige selectie. Alle opties delen hetzelfde `name` attribuut. Bevat ook een inactieve optie met `aria-disabled`.",
			},
		},
	},
	argTypes: {
		aantalItems: { name: "Aantal items", control: { type: "range", min: 1, max: 5, step: 1 } },
		item1: { name: "Item 1", control: "text" },
		item2: { name: "Item 2", control: "text" },
		item3: { name: "Item 3", control: "text" },
		item4: { name: "Item 4", control: "text" },
		item5: { name: "Item 5", control: "text" },
	},
	args: {
		aantalItems: 3,
		item1: "Radio button optie 1",
		item2: "Radio button optie 2",
		item3: "Radio button optie 3",
		item4: "Radio button optie 4",
		item5: "Radio button optie 5",
	},
	render: ({ aantalItems, item1, item2, item3, item4, item5 }) => {
		const labels = [item1, item2, item3, item4, item5].slice(0, aantalItems);
		const items = labels.map((label, i) => {
			const id = `sb-radio-${i + 1}`;
			const checked = i === 0 ? " checked" : "";
			return `\t<li>\n\t\t<input type="radio" name="sb-radio" id="${id}"${checked} />\n\t\t<label for="${id}">${label}</label>\n\t</li>`;
		}).join("\n");
		return `
<ul class="selection">
${items}
	<li>
		<input type="radio" name="sb-radio" id="sb-radio-disabled" aria-disabled />
		<label for="sb-radio-disabled">Inactieve optie</label>
	</li>
</ul>
`;
	},
};

export const Keuzelijst = {
	parameters: {
		docs: {
			description: {
				story: "Keuzelijst (`<select>`) met gegroepeerde en individuele opties. Bevat ook een inactieve optie met `disabled`.",
			},
		},
	},
	argTypes: {
		aantalOpties: { name: "Aantal opties", control: { type: "range", min: 1, max: 7, step: 1 } },
		aantalGroepen: { name: "Aantal groepen", control: { type: "range", min: 0, max: 3, step: 1 } },
		optiesPerGroep: { name: "Opties per groep", control: { type: "range", min: 1, max: 3, step: 1 } },
		groep1: { name: "Groep 1", control: "text" },
		groep2: { name: "Groep 2", control: "text" },
		groep3: { name: "Groep 3", control: "text" },
		optie1: { name: "Optie 1", control: "text" },
		optie2: { name: "Optie 2", control: "text" },
		optie3: { name: "Optie 3", control: "text" },
		optie4: { name: "Optie 4", control: "text" },
		optie5: { name: "Optie 5", control: "text" },
		optie6: { name: "Optie 6", control: "text" },
		optie7: { name: "Optie 7", control: "text" },
	},
	args: {
		aantalOpties: 6,
		aantalGroepen: 1,
		optiesPerGroep: 3,
		groep1: "Groep met opties",
		groep2: "Tweede groep",
		groep3: "Derde groep",
		optie1: "Optie 1",
		optie2: "Optie 2",
		optie3: "Optie 3",
		optie4: "Optie 4",
		optie5: "Optie 5",
		optie6: "Optie 6",
		optie7: "Optie 7",
	},
	render: ({ aantalOpties, aantalGroepen, optiesPerGroep, groep1, groep2, groep3, optie1, optie2, optie3, optie4, optie5, optie6, optie7 }) => {
		const opties = [optie1, optie2, optie3, optie4, optie5, optie6, optie7].slice(0, aantalOpties);
		const groepLabels = [groep1, groep2, groep3].slice(0, aantalGroepen);
		let html = "";
		let index = 0;

		for (const label of groepLabels) {
			html += `\t<optgroup label="${label}">\n`;
			for (let i = 0; i < optiesPerGroep && index < opties.length; i++) {
				html += `\t\t<option value="${opties[index]}">${opties[index]}</option>\n`;
				index++;
			}
			html += `\t</optgroup>\n`;
		}

		while (index < opties.length) {
			html += `\t<option value="${opties[index]}">${opties[index]}</option>\n`;
			index++;
		}

		return `
<label for="sb-select">Keuzelijst</label>
<select id="sb-select">
${html}	<option value="" disabled>Inactieve optie</option>
</select>
`;
	},
};

export const KeuzelijstMeervoudig = {
	parameters: {
		docs: {
			description: {
				story: "Keuzelijst met `multiple` attribuut voor meervoudige selectie. Bevat ook een inactieve optie met `disabled`.",
			},
		},
	},
	argTypes: {
		aantalOpties: { name: "Aantal opties", control: { type: "range", min: 1, max: 7, step: 1 } },
		aantalGroepen: { name: "Aantal groepen", control: { type: "range", min: 0, max: 3, step: 1 } },
		optiesPerGroep: { name: "Opties per groep", control: { type: "range", min: 1, max: 3, step: 1 } },
		groep1: { name: "Groep 1", control: "text" },
		groep2: { name: "Groep 2", control: "text" },
		groep3: { name: "Groep 3", control: "text" },
		optie1: { name: "Optie 1", control: "text" },
		optie2: { name: "Optie 2", control: "text" },
		optie3: { name: "Optie 3", control: "text" },
		optie4: { name: "Optie 4", control: "text" },
		optie5: { name: "Optie 5", control: "text" },
		optie6: { name: "Optie 6", control: "text" },
		optie7: { name: "Optie 7", control: "text" },
	},
	args: {
		aantalOpties: 6,
		aantalGroepen: 1,
		optiesPerGroep: 3,
		groep1: "Groep met opties",
		groep2: "Tweede groep",
		groep3: "Derde groep",
		optie1: "Optie 1",
		optie2: "Optie 2",
		optie3: "Optie 3",
		optie4: "Optie 4",
		optie5: "Optie 5",
		optie6: "Optie 6",
		optie7: "Optie 7",
	},
	render: ({ aantalOpties, aantalGroepen, optiesPerGroep, groep1, groep2, groep3, optie1, optie2, optie3, optie4, optie5, optie6, optie7 }) => {
		const opties = [optie1, optie2, optie3, optie4, optie5, optie6, optie7].slice(0, aantalOpties);
		const groepLabels = [groep1, groep2, groep3].slice(0, aantalGroepen);
		let html = "";
		let index = 0;

		for (const label of groepLabels) {
			html += `\t<optgroup label="${label}">\n`;
			for (let i = 0; i < optiesPerGroep && index < opties.length; i++) {
				html += `\t\t<option value="${opties[index]}">${opties[index]}</option>\n`;
				index++;
			}
			html += `\t</optgroup>\n`;
		}

		while (index < opties.length) {
			html += `\t<option value="${opties[index]}">${opties[index]}</option>\n`;
			index++;
		}

		return `
<label for="sb-select-multiple">Keuzelijst met meervoudige selectie</label>
<select id="sb-select-multiple" multiple>
${html}	<option value="" disabled>Inactieve optie</option>
</select>
`;
	},
};
