export default {
	title: "Design tokens/Transities",
	tags: ["autodocs"],
	parameters: {
		docs: {
			source: false,
		},
	},
};

function transitionDemo(varName, label, description, property) {
	return `<div style="margin-block-end: 1.5rem;">
		<h3 style="margin-block-end: 0.5rem;">${label}</h3>
		<p style="font-size: 0.875rem; color: #696969; margin-block-end: 0.5rem;">${description}</p>
		<code style="font-size: 0.75rem; color: #696969; display: block; margin-block-end: 0.75rem;">${varName}</code>
		<div style="display: flex; gap: 1rem; align-items: center; flex-wrap: wrap;">
			${property === "transform"
				? `<div class="transition-demo-transform" style="inline-size: 3rem; block-size: 3rem; background: var(--toepassing-color-interactive-default-background); border-radius: var(--toepassing-border-radius-md); transition: var(${varName}); cursor: pointer;" onmouseenter="this.style.transform='scale(1.3) rotate(45deg)'" onmouseleave="this.style.transform='scale(1) rotate(0)'"></div>
				<span style="font-size: 0.875rem; color: #696969;">Hover voor transform-transitie</span>`
				: `<button type="button" style="transition: var(${varName});">Hover voor transitie</button>
				<button type="button" class="secondary" style="transition: var(${varName});">Secundaire knop</button>
				<a href="#" style="transition: var(${varName});">Link met transitie</a>`
			}
		</div>
	</div>`;
}

export const Standaard = {
	parameters: {
		docs: {
			description: {
				story: "De transitie-tokens bepalen hoe elementen animeren tussen staten (hover, focus, active). Er zijn twee tokens: een standaard-transitie voor kleur- en randwijzigingen, en een transform-transitie voor rotaties en schaalveranderingen.",
			},
		},
	},
	render: () => {
		return transitionDemo(
			"--toepassing-transition-default",
			"Standaard",
			"Toegepast op background, border, color en accent-color. Gebruikt voor alle interactieve elementen.",
			"default"
		) + transitionDemo(
			"--toepassing-transition-transform",
			"Transform",
			"Toegepast op transform. Gebruikt voor bijvoorbeeld het roteren van het chevron-icoon in accordeons en het ha,burgermenu-icoon.",
			"transform"
		);
	},
};
