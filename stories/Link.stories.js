export default {
	title: "Componenten/Link",
	tags: ["autodocs"],
};

export const Standaard = {
	parameters: {
		docs: {
			description: {
				story: "Een hyperlink binnen een lopende zin. Dit is de meest voorkomende manier om links te gebruiken.",
			},
		},
	},
	argTypes: {
		tekst: { control: "text" },
		href: { control: "text" },
	},
	args: {
		tekst: "hyperlink",
		href: "#",
	},
	render: ({ tekst, href }) =>
`<p>Dit is een <a href="${href}">${tekst}</a> in een zin.</p>`,
};

export const Alleenstaand = {
	parameters: {
		docs: {
			description: {
				story: "Een alleenstaande hyperlink, zonder omringende tekst.",
			},
		},
	},
	argTypes: {
		tekst: { control: "text" },
		href: { control: "text" },
	},
	args: {
		tekst: "Hyperlink",
		href: "#",
	},
	render: ({ tekst, href }) =>
`<a href="${href}">${tekst}</a>`,
};
