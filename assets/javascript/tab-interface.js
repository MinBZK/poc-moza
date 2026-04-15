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
				var index = Array.prototype.indexOf.call(tabs, e.currentTarget);
				var dir =
					e.key === "ArrowLeft"
						? index - 1
						: e.key === "ArrowRight"
							? index + 1
							: null;

				if (e.key === "ArrowDown") {
					e.preventDefault();
					var panel = tabbed.querySelector(
						"#" + e.currentTarget.getAttribute("aria-controls"),
					);
					if (panel) panel.focus();
					return;
				}

				if (dir !== null && tabs[dir]) {
					e.preventDefault();
					switchTab(e.currentTarget, tabs[dir]);
				}
			});
		});

		function switchTab(oldTab, newTab) {
			oldTab.setAttribute("aria-selected", "false");
			oldTab.setAttribute("tabindex", "-1");

			newTab.setAttribute("aria-selected", "true");
			newTab.removeAttribute("tabindex");
			newTab.focus();

			panels.forEach(function (panel) {
				panel.hidden = panel.id !== newTab.getAttribute("aria-controls");
			});
		}

		// Initialiseer: alle tabs behalve de actieve krijgen tabindex -1
		tabs.forEach(function (tab) {
			if (tab.getAttribute("aria-selected") !== "true") {
				tab.setAttribute("tabindex", "-1");
			}
		});
	});
})();
