/**
 * Tri-state checkboxes voor geneste selectielijsten.
 *
 * Werkt op basis van de HTML-structuur: een checkbox waarvan het
 * bovenliggende <li> een geneste <ul class="selection"> bevat,
 * wordt automatisch als parent behandeld.
 *
 * - Sommige kinderen aangevinkt → parent indeterminate
 * - Alle kinderen aangevinkt → parent checked
 * - Geen kinderen aangevinkt → parent unchecked
 * - Parent aanvinken → alle kinderen aanvinken
 * - Parent uitvinken → alle kinderen uitvinken
 */

function getChildren(parent) {
	const list = parent.closest("li")?.querySelector("ul.selection");
	return list ? [...list.querySelectorAll(":scope > li > input[type='checkbox']")] : [];
}

function updateParent(parent) {
	const children = getChildren(parent);
	if (children.length === 0) return;

	const checked = children.filter((c) => c.checked).length;
	parent.checked = checked === children.length;
	parent.indeterminate = checked > 0 && checked < children.length;

	if (parent.indeterminate) {
		parent.setAttribute("data-indeterminate", "");
	} else {
		parent.removeAttribute("data-indeterminate");
	}
}

function initGroup(parent) {
	if (parent.dataset.tristate) return;
	parent.dataset.tristate = "true";

	updateParent(parent);

	const children = getChildren(parent);
	for (const child of children) {
		child.addEventListener("change", () => updateParent(parent));
	}

	parent.addEventListener("change", () => {
		for (const child of getChildren(parent)) {
			child.checked = parent.checked;
		}
		parent.indeterminate = false;
		parent.removeAttribute("data-indeterminate");
	});
}

function initAll(root) {
	root.querySelectorAll("ul.selection ul.selection").forEach((nested) => {
		const firstChild = nested.querySelector(":scope > li > input[type='checkbox']");
		if (!firstChild) return;

		const parentLi = nested.closest("li");
		const parent = parentLi?.querySelector(":scope > input[type='checkbox']");
		if (parent) initGroup(parent);
	});
}

function setup() {
	initAll(document);

	new MutationObserver(() => initAll(document))
		.observe(document.body, { childList: true, subtree: true });
}

if (document.body) {
	setup();
} else {
	document.addEventListener("DOMContentLoaded", setup);
}
