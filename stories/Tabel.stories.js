export default {
	title: "Componenten/Tabel",
	tags: ["autodocs"],
};

export const Standaard = {
	parameters: {
		docs: {
			description: {
				story: "Standaard tabel met kolomkoppen, rijen en een bijschrift via `<caption>`.",
			},
		},
	},
	argTypes: {
		aantalKolommen: { name: "Aantal kolommen", control: { type: "range", min: 1, max: 10, step: 1 } },
		aantalRijen: { name: "Aantal rijen", control: { type: "range", min: 1, max: 15, step: 1 } },
		bijschrift: { name: "Bijschrift", control: "text" },
		kolom1: { name: "Kolom 1", control: "text" },
		kolom2: { name: "Kolom 2", control: "text" },
		kolom3: { name: "Kolom 3", control: "text" },
		kolom4: { name: "Kolom 4", control: "text" },
		kolom5: { name: "Kolom 5", control: "text" },
		kolom6: { name: "Kolom 6", control: "text" },
		kolom7: { name: "Kolom 7", control: "text" },
		kolom8: { name: "Kolom 8", control: "text" },
		kolom9: { name: "Kolom 9", control: "text" },
		kolom10: { name: "Kolom 10", control: "text" },
	},
	args: {
		aantalKolommen: 3,
		aantalRijen: 3,
		bijschrift: "Voorbeeld tabel met bijschrift",
		kolom1: "Kolom 1",
		kolom2: "Kolom 2",
		kolom3: "Kolom 3",
		kolom4: "Kolom 4",
		kolom5: "Kolom 5",
		kolom6: "Kolom 6",
		kolom7: "Kolom 7",
		kolom8: "Kolom 8",
		kolom9: "Kolom 9",
		kolom10: "Kolom 10",
	},
	render: ({ aantalKolommen, aantalRijen, bijschrift, kolom1, kolom2, kolom3, kolom4, kolom5, kolom6, kolom7, kolom8, kolom9, kolom10 }) => {
		const kolomLabels = [kolom1, kolom2, kolom3, kolom4, kolom5, kolom6, kolom7, kolom8, kolom9, kolom10].slice(0, aantalKolommen);

		const thead = kolomLabels.map((label) => `\t\t\t<th>${label}</th>`).join("\n");

		const tbody = Array.from({ length: aantalRijen }, (_, r) => {
			const cellen = kolomLabels.map((_, k) => `\t\t\t<td>Rij ${r + 1}, cel ${k + 1}</td>`).join("\n");
			return `\t\t<tr>\n${cellen}\n\t\t</tr>`;
		}).join("\n");

		return `
<table>
	<thead>
		<tr>
${thead}
		</tr>
	</thead>
	<tbody>
${tbody}
	</tbody>
	<caption>${bijschrift}</caption>
</table>
`;
	},
};
