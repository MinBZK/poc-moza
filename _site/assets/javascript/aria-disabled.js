/**
 * Voorkomt interactie met elementen die het aria-disabled attribuut hebben.
 * aria-disabled wordt gebruikt in plaats van het native disabled attribuut
 * zodat elementen bereikbaar blijven voor hulptechnologie.
 */

function isDisabled(element) {
	return element.closest("[aria-disabled]")
		|| (element.tagName === "LABEL" && element.htmlFor && document.getElementById(element.htmlFor)?.hasAttribute("aria-disabled"));
}

document.addEventListener("click", (e) => {
	if (isDisabled(e.target)) {
		e.preventDefault();
		e.stopPropagation();
	}
});

document.addEventListener("keydown", (e) => {
	if ((e.key === "Enter" || e.key === " ") && isDisabled(e.target)) {
		e.preventDefault();
	}
});

document.addEventListener("change", (e) => {
	if (e.target.matches("[aria-disabled]")) {
		if (e.target.type === "checkbox" || e.target.type === "radio") {
			e.target.checked = !e.target.checked;
		}
	}
});
