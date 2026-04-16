export default {
	title: "Componenten/Tekstinvoer",
	tags: ["autodocs"],
};

export const Standaard = {
	parameters: {
		docs: {
			description: {
				story: "Standaard tekstinvoerveld met label en optionele helptekst.",
			},
		},
	},
	argTypes: {
		label: { control: "text", name: "Label" },
		helptekst: { control: "text", name: "Helptekst" },
	},
	args: {
		label: "Standaard tekstinvoerveld",
		helptekst: "Optionele ondersteunende help tekst indien nodig, bijvoorbeeld een hint over het verwachte formaat van invoer.",
	},
	render: ({ label, helptekst }) => `
<label for="input-text">${label}</label>
<p class="form-field-helper-text" id="input-text--helper-text">
	${helptekst}
</p>
<input
	type="text"
	id="input-text"
	aria-describedby="input-text--helper-text"
/>
`,
};

export const Email = {
	parameters: {
		docs: {
			description: {
				story: "E-mailinvoerveld met `type=\"email\"` en een placeholder als voorbeeld.",
			},
		},
	},
	argTypes: {
		label: { control: "text", name: "Label" },
		placeholder: { control: "text", name: "Placeholder" },
	},
	args: {
		label: "E-mailadres",
		placeholder: "voorbeeld@rijksoverheid.nl",
	},
	render: ({ label, placeholder }) => `
<label for="input-email">${label}</label>
<p class="form-field-helper-text" id="emailadress--helper-text">
	Optionele ondersteunende help tekst indien nodig, bijvoorbeeld een hint
	over het verwachte formaat van invoer.
</p>
<input
	type="email"
	id="input-email"
	aria-describedby="emailadress--helper-text"
	placeholder="${placeholder}"
/>
`,
};

export const FoutieveInvoer = {
	parameters: {
		docs: {
			description: {
				story: "Invoerveld met `aria-invalid` om aan te geven dat de waarde ongeldig is.",
			},
		},
	},
	render: () => `
<label for="input-invalid">Foutieve invoer</label>
<p class="form-field-helper-text" id="input-invalid--helper-text">
	Optionele ondersteunende help tekst indien nodig, bijvoorbeeld een hint
	over het verwachte formaat van invoer.
</p>
<input
	type="text"
	id="input-invalid"
	aria-describedby="input-invalid--helper-text"
	placeholder="voorbeeld@rijksoverheid.nl"
	aria-invalid
/>
`,
};

export const Inactief = {
	parameters: {
		docs: {
			description: {
				story: "Inactief invoerveld met `aria-disabled` en `readonly` voor betere toegankelijkheid.",
			},
		},
	},
	render: () => `
<label for="input-disabled">Inactieve invoer</label>
<p class="form-field-helper-text" id="input-disabled--helper-text">
	Optionele ondersteunende help tekst indien nodig, bijvoorbeeld een hint
	over het verwachte formaat van invoer.
</p>
<input
	type="text"
	id="input-disabled"
	aria-describedby="input-disabled--helper-text"
	aria-disabled
	readonly
/>
`,
};

export const Zoekveld = {
	parameters: {
		docs: {
			description: {
				story: "Zoekveld met `type=\"search\"` en een bijbehorende zoekknop.",
			},
		},
	},
	render: () => `
<div>
	<label class="input-search" for="input-search">Zoekveld</label>
	<input type="search" id="input-search" /><button type="submit">Zoeken</button>
</div>
`,
};

export const Textarea = {
	parameters: {
		docs: {
			description: {
				story: "Textarea voor het invoeren van langere teksten.",
			},
		},
	},
	render: () => `
<label for="textarea">Textarea</label>
<textarea name="" id="textarea"></textarea>
`,
};

export const TextareaInactief = {
	parameters: {
		docs: {
			description: {
				story: "Inactieve textarea met `aria-disabled` en `readonly`.",
			},
		},
	},
	render: () => `
<label for="textarea-disabled">Inactieve textarea</label>
<textarea name="" id="textarea-disabled" aria-disabled readonly></textarea>
`,
};
