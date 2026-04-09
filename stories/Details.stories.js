export default {
	title: "Componenten/Accordeon",
	tags: ["autodocs"],
};

export const Paneel = {
	parameters: {
		docs: {
			description: {
				story: "Een enkel inklapbaar paneel. Gebruikt het `<details>` element.",
			},
		},
	},
	argTypes: {
		titel: { control: "text", name: "Titel" },
		inhoud: { control: "text", name: "Inhoud" },
	},
	args: {
		titel: "Titel",
		inhoud: "Inhoud",
	},
	render: ({ titel, inhoud }) => {
		return `
<div class="accordion">
	<details>
		<summary>${titel}</summary>
		<p>${inhoud}</p>
	</details>
</div>
`;
	},
};

const paneelLabels = ["Eerste", "Tweede", "Derde", "Vierde", "Vijfde"];

const accordeonArgTypes = {
	titel: { table: { disable: true } },
	inhoud: { table: { disable: true } },
	...Object.fromEntries(
		paneelLabels.flatMap((_, i) => [
			[`titel${i + 1}`, { control: "text", name: `Paneel ${i + 1} titel` }],
			[
				`inhoud${i + 1}`,
				{ control: "text", name: `Paneel ${i + 1} inhoud` },
			],
		]),
	),
};

const accordeonArgs = Object.fromEntries(
	paneelLabels.flatMap((label, i) => [
		[`titel${i + 1}`, `${label} paneel`],
		[`inhoud${i + 1}`, `Inhoud van het ${label.toLowerCase()} paneel.`],
	]),
);

export const Accordeon = {
	name: "Accordeon",
	parameters: {
		docs: {
			description: {
				story: "Een accordeon met meerdere panelen. Met de optie **Exclusief** bepaal je of slechts één paneel tegelijk open kan zijn (via het `name` attribuut op `<details>`) of dat alle panelen onafhankelijk werken.",
			},
		},
	},
	argTypes: {
		aantal: {
			control: { type: "number", min: 2, max: 5 },
			name: "Aantal panelen",
		},
		exclusief: {
			control: "inline-radio",
			options: ["Ja", "Nee"],
			name: "Exclusief",
			description:
				"Slechts één paneel tegelijk open (via het `name` attribuut)",
		},
		...accordeonArgTypes,
	},
	args: {
		aantal: 5,
		exclusief: "Ja",
		...accordeonArgs,
	},
	render: (args) => {
		const nameAttr = args.exclusief === "Ja" ? ' name="accordion"' : "";
		const panelen = Array.from(
			{ length: args.aantal },
			(_, i) => `
	<details${nameAttr}>
		<summary>${args[`titel${i + 1}`]}</summary>
		<p>${args[`inhoud${i + 1}`]}</p>
	</details>`,
		).join("");
		return `
<div class="accordion">${panelen}
</div>`;
	},
};
