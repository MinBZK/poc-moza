import "../style/style.css";
import "../assets/javascript/aria-disabled.js";
import "../assets/javascript/indeterminate.js";

/** @type { import('@storybook/html-vite').Preview } */
const preview = {
	parameters: {
		a11y: {
			config: {
				rules: [
					{
						id: "region",
						enabled: false,
					},
				],
			},
		},
		controls: {
			matchers: {
				color: /(background|color)$/i,
				date: /Date$/i,
			},
		},
		docs: {
			source: {
				format: true,
			},
		},
	},
};

export default preview;
