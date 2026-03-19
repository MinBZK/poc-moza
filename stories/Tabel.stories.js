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
	render: () => `
<table>
	<thead>
		<tr>
			<th>Kolom 1</th>
			<th>Kolom 2</th>
			<th>Kolom 3</th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td>Rij 1, cel 1</td>
			<td>Rij 1, cel 2</td>
			<td>Rij 1, cel 3</td>
		</tr>
		<tr>
			<td>Rij 2, cel 1</td>
			<td>Rij 2, cel 2</td>
			<td>Rij 2, cel 3</td>
		</tr>
		<tr>
			<td>Rij 3, cel 1</td>
			<td>Rij 3, cel 2</td>
			<td>Rij 3, cel 3</td>
		</tr>
	</tbody>
	<caption>Voorbeeld tabel met bijschrift</caption>
</table>
`,
};
