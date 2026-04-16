export default {
	title: "Componenten/Badge",
	tags: ["autodocs"],
};

export const Standaard = {
	parameters: {
		docs: {
			description: {
				story: "Een badge toont een korte waarde zoals een teller of status-label. Wordt bijvoorbeeld gebruikt in navigatie-items en naast headings.",
			},
		},
	},
	argTypes: {
		waarde: { control: "text", name: "Waarde" },
	},
	args: {
		waarde: "3",
	},
	render: ({ waarde }) => `<span class="badge">${waarde}</span>`,
};

export const InHeading = {
	parameters: {
		docs: {
			description: {
				story: "Een badge naast een heading, bijvoorbeeld om een datum of teller te tonen.",
			},
		},
	},
	argTypes: {
		titel: { control: "text", name: "Titel" },
		badge: { control: "text", name: "Badge" },
	},
	args: {
		titel: "Binnenkort beschikbaar",
		badge: "najaar 2026",
	},
	render: ({ titel, badge }) => `<h2>${titel} <span class="badge">${badge}</span></h2>`,
};

export const InNavigatie = {
	parameters: {
		docs: {
			description: {
				story: "Een badge in een navigatie-item, bijvoorbeeld om het aantal ongelezen berichten te tonen.",
			},
		},
	},
	render: () => `
<nav class="side-nav">
	<ul>
		<li>
			<a href="#">
				Berichtenbox
				<span class="badge">3</span>
			</a>
		</li>
		<li>
			<a href="#" aria-current="page">
				Lopende zaken
				<span class="badge">1</span>
			</a>
		</li>
	</ul>
</nav>`,
};
