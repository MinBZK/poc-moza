(function () {
	document.querySelectorAll(".tabs").forEach(function (tabbed) {
		var tabs = tabbed.querySelectorAll("[role=tab]");
		var panels = tabbed.querySelectorAll("[role=tabpanel]");

		tabs.forEach(function (tab) {
			tab.addEventListener("click", function () {
				var current = tabbed.querySelector("[role=tab][aria-selected=true]");
				if (tab === current) return;
				switchTab(current, tab);
			});

			tab.addEventListener("keydown", function (e) {
				if (e.key === "ArrowDown") {
					e.preventDefault();
					var panel = tabbed.querySelector(
						"#" + e.currentTarget.getAttribute("aria-controls"),
					);
					if (panel) panel.focus();
				}
			});
		});

		function switchTab(oldTab, newTab) {
			oldTab.setAttribute("aria-selected", "false");
			newTab.setAttribute("aria-selected", "true");
			newTab.focus({ preventScroll: true });

			panels.forEach(function (panel) {
				panel.hidden = panel.id !== newTab.getAttribute("aria-controls");
			});
		}
	});
})();
