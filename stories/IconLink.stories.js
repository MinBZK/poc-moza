const iconEdit = `<svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" baseProfile="tiny" version="1.2" viewBox="0 0 24 24">
<path fill="none" d="M0 0h24v24H0z" />
<path fill="currentColor" d="M17 20H5V9h4a1 1 0 0 0 1-1V4h4.979l2-2H9.413a1 1 0 0 0-.707.293L3.293 7.707A1 1 0 0 0 3 8.414V21a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-8.975l-2 2V20z" />
<path fill="currentColor" d="m21.938 5.28-2.215-2.216a1 1 0 0 0-1.414 0L9.802 11.57a.82.82 0 0 0-.198.32l-.591 3.771a.257.257 0 0 0 .325.325l3.777-.592a.81.81 0 0 0 .317-.196l8.505-8.504a1 1 0 0 0 0-1.414z" />
</svg>`;

const iconUser = `<svg xmlns="http://www.w3.org/2000/svg" baseProfile="tiny" version="1.2" viewBox="0 0 24 24">
<path fill="none" d="M0 0h24v24H0z"/>
<path fill="currentColor" d="M8.115 3.513c-.328.501-.362 1.274-.359 2.003.003.699-.014 1.358.048 1.698-.48-.023-.68.362-.607 1.666.066 1.156.527 1.406.803 1.565.243 1.17.712 2.277 1.541 3.114l.002-.012c-.051.304-.116.627-.2.948-1.141.401-3.944 1.445-4.764 2.31C3.545 17.896 3 22 3 22h18s-.545-4.105-1.58-5.194c-.818-.864-3.611-1.906-4.757-2.309a8.608 8.608 0 0 1-.219-.938c.83-.837 1.313-1.945 1.556-3.114.275-.159.723-.409.788-1.565.074-1.304-.127-1.69-.607-1.666.062-.338.067-.98.062-1.667-.005-.727-.04-1.507-.333-2.034-.365-.656-.878-1.04-1.878-.803-.875-.421-1.797-.873-3.34-.532-1.739.385-2.353.993-2.577 1.335z"/>
</svg>`;

export default {
	title: "Componenten/Icon-link",
	tags: ["autodocs"],
};

export const Standaard = {
	parameters: {
		docs: {
			description: {
				story: "Een link met een SVG-icoon ervoor. Het icoon kleurt mee met de tekst via currentColor.",
			},
		},
	},
	argTypes: {
		label: { control: "text" },
	},
	args: {
		label: "Contactgegevens wijzigen",
	},
	render: ({ label }) => `
<a class="icon-link" href="#">
	${iconEdit}
	${label}
</a>`,
};

export const Label = {
	parameters: {
		docs: {
			description: {
				story: "Een niet-klikbaar label met een icoon, bijvoorbeeld voor het tonen van een gebruikersnaam.",
			},
		},
	},
	argTypes: {
		label: { control: "text" },
	},
	args: {
		label: "R.J. Vogel",
	},
	render: ({ label }) => `
<span class="icon-label">
	${iconUser}
	${label}
</span>`,
};
