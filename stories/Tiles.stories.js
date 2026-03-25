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
	},
	args: {
		aantalTiles: 4,
	},
	render: ({ aantalTiles }) => {
		const items = [
			{ titel: "Bedrijfsactiviteiten", tekst: "Bekijk de SBI-codes en omschrijvingen van de activiteiten die bij uw onderneming geregistreerd staan." },
			{ titel: "Adresgegevens", tekst: "Uw vestigings- en postadres zoals geregistreerd bij de Kamer van Koophandel." },
			{ titel: "Vestigingen", tekst: "Overzicht van alle vestigingen die gekoppeld zijn aan uw onderneming, inclusief neven\u00adverstigingen." },
			{ titel: "UBO-register", tekst: "Inzicht in de uiteindelijk belanghebbenden (UBO's) die voor uw organisatie zijn geregistreerd." },
			{ titel: "Jaarrekeningen", tekst: "Bekijk de bij de KVK gedeponeerde jaarrekeningen en financi\u00eble overzichten van uw onderneming." },
			{ titel: "Contactgeschiedenis", tekst: "Overzicht van alle momenten waarop een overheidsorganisatie contact met u heeft opgenomen." },
		];
		const tiles = items.slice(0, aantalTiles).map(({ titel, tekst }) => `
		<section class="card">
			<h3>${titel}</h3>
			<p>${tekst}</p>
			<a class="btn-cta" href="#">Ga naar ${titel}</a>
		</section>`).join("");
		return `<div class="tiles">${tiles}\n</div>`;
	},
};
