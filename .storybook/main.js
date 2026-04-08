/** @type { import('@storybook/html-vite').StorybookConfig } */
const config = {
	stories: ["../stories/**/*.stories.@(js|ts)", "../stories/**/*.mdx"],
	addons: ["@storybook/addon-a11y", "@storybook/addon-docs"],
	framework: {
		name: "@storybook/html-vite",
		options: {},
	},
};

export default config;
