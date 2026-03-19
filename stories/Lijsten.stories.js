export default {
	title: "Componenten/Lijsten",
	tags: ["autodocs"],
};

export const OngeordendeLijst = {
	parameters: {
		docs: {
			description: {
				story: "Ongeordende lijst via `<ul>` voor opsommingen zonder volgorde.",
			},
		},
	},
	render: () => `
<ul>
	<li>Eerste item in een ongeordende lijst</li>
	<li>Tweede item in een ongeordende lijst</li>
	<li>Derde item in een ongeordende lijst</li>
</ul>
`,
};

export const GeordendeLijst = {
	parameters: {
		docs: {
			description: {
				story: "Geordende lijst via `<ol>` voor genummerde opsommingen.",
			},
		},
	},
	render: () => `
<ol>
	<li>Eerste item in een geordende lijst</li>
	<li>Tweede item in een geordende lijst</li>
	<li>Derde item in een geordende lijst</li>
</ol>
`,
};

export const Definitielijst = {
	parameters: {
		docs: {
			description: {
				story: "Definitielijst via `<dl>` met `<dt>` voor termen en `<dd>` voor beschrijvingen.",
			},
		},
	},
	render: () => `
<dl>
	<dt>Definitieterm</dt>
	<dd>Dit is de beschrijving van de definitieterm.</dd>
	<dt>Tweede term</dt>
	<dd>Dit is de beschrijving van de tweede term.</dd>
</dl>
`,
};
