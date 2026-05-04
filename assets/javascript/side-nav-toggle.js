document.querySelectorAll(".side-nav-toggle").forEach(function (toggle) {
	toggle.addEventListener("click", function () {
		var expanded = toggle.getAttribute("aria-expanded") === "true";
		toggle.setAttribute("aria-expanded", String(!expanded));
	});
});
