export default {
	title: "Typografie/Koppen",
	tags: ["autodocs"],
};

export const AlleKoppen = {
	parameters: {
		docs: {
			description: {
				story: "Overzicht van alle zes kopniveaus naast elkaar ter vergelijking.",
			},
		},
	},
	render: () => `
<h1>Koptekst niveau 1</h1>
<h2>Koptekst niveau 2</h2>
<h3>Koptekst niveau 3</h3>
<h4>Koptekst niveau 4</h4>
<h5>Koptekst niveau 5</h5>
<h6>Koptekst niveau 6</h6>
`,
};

export const H1 = {
	parameters: {
		docs: {
			description: {
				story: "Koptekst niveau 1. Gebruik voor de hoofdtitel van een pagina.",
			},
		},
	},
	render: () => `<h1>Koptekst niveau 1</h1>`,
};

export const H2 = {
	parameters: {
		docs: {
			description: {
				story: "Koptekst niveau 2. Gebruik voor hoofdsecties binnen een pagina.",
			},
		},
	},
	render: () => `<h2>Koptekst niveau 2</h2>`,
};

export const H3 = {
	parameters: {
		docs: {
			description: {
				story: "Koptekst niveau 3. Gebruik voor subsecties.",
			},
		},
	},
	render: () => `<h3>Koptekst niveau 3</h3>`,
};

export const H4 = {
	parameters: {
		docs: {
			description: {
				story: "Koptekst niveau 4.",
			},
		},
	},
	render: () => `<h4>Koptekst niveau 4</h4>`,
};

export const H5 = {
	parameters: {
		docs: {
			description: {
				story: "Koptekst niveau 5.",
			},
		},
	},
	render: () => `<h5>Koptekst niveau 5</h5>`,
};

export const H6 = {
	parameters: {
		docs: {
			description: {
				story: "Koptekst niveau 6.",
			},
		},
	},
	render: () => `<h6>Koptekst niveau 6</h6>`,
};
