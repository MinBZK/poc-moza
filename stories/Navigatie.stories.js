export default {
	title: "Componenten/Navigatie",
	tags: ["autodocs"],
};

export const Hoofdnavigatie = {
	parameters: {
		docs: {
			description: {
				story: "Hoofdnavigatie met `aria-current=\"page\"` om de actieve pagina aan te geven.",
			},
		},
	},
	render: () => `
<nav class="main-nav">
	<ul>
		<li><a href="#" aria-current="page">Home</a></li>
		<li><a href="#">Pagina 1</a></li>
		<li><a href="#">Pagina 2</a></li>
		<li><a href="#">Pagina 3</a></li>
		<li><a href="#">Pagina 4</a></li>
	</ul>
</nav>
`,
};

export const SidebarNavigatie = {
	parameters: {
		docs: {
			description: {
				story: "Sidebar navigatie voor navigatie binnen een sectie.",
			},
		},
	},
	render: () => `
<nav class="side-nav">
	<ul>
		<li><a href="#" aria-current="page">Home</a></li>
		<li><a href="#">Pagina 1</a></li>
		<li><a href="#">Pagina 2</a></li>
		<li><a href="#">Pagina 3</a></li>
		<li><a href="#">Pagina 4</a></li>
	</ul>
</nav>
`,
};

export const Breadcrumb = {
	parameters: {
		docs: {
			description: {
				story: "Breadcrumb-navigatie die de hiërarchische positie van de huidige pagina toont.",
			},
		},
	},
	render: () => `
<nav class="breadcrumb">
	<ol>
		<li><a href="#">Home</a></li>
		<li><a href="#">Pagina 1</a></li>
		<li aria-current="page">Huidige sub-pagina</li>
	</ol>
</nav>
`,
};
