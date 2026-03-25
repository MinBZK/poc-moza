export default {
	title: "Componenten/Tiles",
	tags: ["autodocs"],
};

export const Standaard = {
	parameters: {
		docs: {
			description: {
				story: "Tiles tonen cards in een 2-koloms grid dat op smalle schermen naar 1 kolom schakelt. De actieknop wordt automatisch naar de onderkant van elke card geduwd.",
			},
		},
	},
	argTypes: {
		aantalTiles: { name: "Aantal tiles", control: { type: "range", min: 2, max: 6, step: 1 } },
		...Object.fromEntries(
			Array.from({ length: 6 }, (_, i) => [
				[`titel${i + 1}`, { name: `Tile ${i + 1} titel`, control: "text" }],
				[`tekst${i + 1}`, { name: `Tile ${i + 1} tekst`, control: "text" }],
			]).flat()
		),
	},
	args: {
		aantalTiles: 4,
		titel1: "Bedrijfsactiviteiten",
		tekst1: "Bekijk de SBI-codes en omschrijvingen van de activiteiten die bij uw onderneming geregistreerd staan.",
		titel2: "Adresgegevens",
		tekst2: "Uw vestigings- en postadres zoals geregistreerd bij de Kamer van Koophandel.",
		titel3: "Vestigingen",
		tekst3: "Overzicht van alle vestigingen die gekoppeld zijn aan uw onderneming, inclusief neven\u00adverstigingen.",
		titel4: "UBO-register",
		tekst4: "Inzicht in de uiteindelijk belanghebbenden (UBO's) die voor uw organisatie zijn geregistreerd.",
		titel5: "Jaarrekeningen",
		tekst5: "Bekijk de bij de KVK gedeponeerde jaarrekeningen en financi\u00eble overzichten van uw onderneming.",
		titel6: "Contactgeschiedenis",
		tekst6: "Overzicht van alle momenten waarop een overheidsorganisatie contact met u heeft opgenomen.",
	},
	render: (args) => {
		const tiles = Array.from({ length: args.aantalTiles }, (_, i) => {
			const titel = args[`titel${i + 1}`];
			const tekst = args[`tekst${i + 1}`];
			return `
		<section class="card">
			<h3>${titel}</h3>
			<p>${tekst}</p>
			<a class="btn-cta" href="#">Ga naar ${titel}</a>
		</section>`;
		}).join("");
		return `<div class="tiles">${tiles}\n</div>`;
	},
};
