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

export const GenestOngeordend = {
	parameters: {
		docs: {
			description: {
				story: "Ongeordende lijst met geneste lijsten tot twee niveaus diep, inclusief een mix van lijsttypen.",
			},
		},
	},
	argTypes: {
		item1: { control: "text" },
		item2: { control: "text" },
		item3: { control: "text" },
		genestItem1: { control: "text" },
		genestItem2: { control: "text" },
		genestItem3: { control: "text" },
		diepGenestItem1: { control: "text" },
		diepGenestItem2: { control: "text" },
		genestType: { control: "select", options: ["ul", "ol"] },
		diepGenestType: { control: "select", options: ["ul", "ol"] },
	},
	args: {
		item1: "Eerste item",
		item2: "Tweede item",
		item3: "Derde item",
		genestItem1: "Genest item 1",
		genestItem2: "Genest item 2",
		genestItem3: "Genest item 3",
		diepGenestItem1: "Diep genest item 1",
		diepGenestItem2: "Diep genest item 2",
		genestType: "ul",
		diepGenestType: "ol",
	},
	render: ({ item1, item2, item3, genestItem1, genestItem2, genestItem3, diepGenestItem1, diepGenestItem2, genestType, diepGenestType }) => `
<ul>
	<li>${item1}
		<${genestType}>
			<li>${genestItem1}</li>
			<li>${genestItem2}
				<${diepGenestType}>
					<li>${diepGenestItem1}</li>
					<li>${diepGenestItem2}</li>
				</${diepGenestType}>
			</li>
			<li>${genestItem3}</li>
		</${genestType}>
	</li>
	<li>${item2}</li>
	<li>${item3}</li>
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

export const GenestGeordend = {
	parameters: {
		docs: {
			description: {
				story: "Geordende lijst met geneste lijsten tot twee niveaus diep, inclusief een mix van lijsttypen.",
			},
		},
	},
	argTypes: {
		item1: { control: "text" },
		item2: { control: "text" },
		item3: { control: "text" },
		genestItem1: { control: "text" },
		genestItem2: { control: "text" },
		genestItem3: { control: "text" },
		diepGenestItem1: { control: "text" },
		diepGenestItem2: { control: "text" },
		genestType: { control: "select", options: ["ul", "ol"] },
		diepGenestType: { control: "select", options: ["ul", "ol"] },
	},
	args: {
		item1: "Eerste item",
		item2: "Tweede item",
		item3: "Derde item",
		genestItem1: "Genest item 1",
		genestItem2: "Genest item 2",
		genestItem3: "Genest item 3",
		diepGenestItem1: "Diep genest item 1",
		diepGenestItem2: "Diep genest item 2",
		genestType: "ol",
		diepGenestType: "ul",
	},
	render: ({ item1, item2, item3, genestItem1, genestItem2, genestItem3, diepGenestItem1, diepGenestItem2, genestType, diepGenestType }) => `
<ol>
	<li>${item1}
		<${genestType}>
			<li>${genestItem1}</li>
			<li>${genestItem2}
				<${diepGenestType}>
					<li>${diepGenestItem1}</li>
					<li>${diepGenestItem2}</li>
				</${diepGenestType}>
			</li>
			<li>${genestItem3}</li>
		</${genestType}>
	</li>
	<li>${item2}</li>
	<li>${item3}</li>
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

export const GenestDefinitie = {
	parameters: {
		docs: {
			description: {
				story: "Definitielijst met geneste lijsten in de beschrijvingen, tot twee niveaus diep.",
			},
		},
	},
	argTypes: {
		term1: { control: "text" },
		beschrijving1: { control: "text" },
		term2: { control: "text" },
		beschrijving2: { control: "text" },
		genestItem1: { control: "text" },
		genestItem2: { control: "text" },
		diepGenestItem1: { control: "text" },
		diepGenestItem2: { control: "text" },
		genestType: { control: "select", options: ["ul", "ol"] },
		diepGenestType: { control: "select", options: ["ul", "ol"] },
	},
	args: {
		term1: "Eerste term",
		beschrijving1: "Beschrijving met een geneste lijst:",
		term2: "Tweede term",
		beschrijving2: "Beschrijving met een geneste lijst:",
		genestItem1: "Genest item 1",
		genestItem2: "Genest item 2",
		diepGenestItem1: "Diep genest item 1",
		diepGenestItem2: "Diep genest item 2",
		genestType: "ul",
		diepGenestType: "ol",
	},
	render: ({ term1, beschrijving1, term2, beschrijving2, genestItem1, genestItem2, diepGenestItem1, diepGenestItem2, genestType, diepGenestType }) => `
<dl>
	<dt>${term1}</dt>
	<dd>${beschrijving1}
		<${genestType}>
			<li>${genestItem1}</li>
			<li>${genestItem2}
				<${diepGenestType}>
					<li>${diepGenestItem1}</li>
					<li>${diepGenestItem2}</li>
				</${diepGenestType}>
			</li>
		</${genestType}>
	</dd>
	<dt>${term2}</dt>
	<dd>${beschrijving2}
		<${genestType}>
			<li>${genestItem1}</li>
			<li>${genestItem2}</li>
		</${genestType}>
	</dd>
</dl>
`,
};
