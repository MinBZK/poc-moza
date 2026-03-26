/**
 * account-switcher.js
 *
 * Toggle-logica voor de accountwisselaar in de header.
 * Opent/sluit het menu bij klik op de knop en sluit bij klik buiten het menu of Escape.
 */

document.addEventListener("click", (e) => {
	const toggle = e.target.closest(".account-switcher-toggle");
	if (toggle) {
		const menu = toggle.nextElementSibling;
		const expanded = toggle.getAttribute("aria-expanded") === "true";
		toggle.setAttribute("aria-expanded", String(!expanded));
		menu.hidden = expanded;
		return;
	}

	// Sluit alle open menu's bij klik buiten de switcher
	if (!e.target.closest(".account-switcher")) {
		document.querySelectorAll(".account-switcher-toggle[aria-expanded='true']").forEach((btn) => {
			btn.setAttribute("aria-expanded", "false");
			btn.nextElementSibling.hidden = true;
		});
	}
});

document.addEventListener("keydown", (e) => {
	if (e.key === "Escape") {
		document.querySelectorAll(".account-switcher-toggle[aria-expanded='true']").forEach((btn) => {
			btn.setAttribute("aria-expanded", "false");
			btn.nextElementSibling.hidden = true;
			btn.focus();
		});
	}
});
