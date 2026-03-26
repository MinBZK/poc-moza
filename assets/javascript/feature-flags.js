/**
 * feature-flags.js
 *
 * Toont/verbergt secties op basis van feature flags in localStorage.
 * Elementen met data-feature="naam" worden verborgen als de flag uit staat.
 * Een toggle-paneel (geopend via de knop rechtsonder) laat alle flags zien,
 * gegroepeerd op data-feature-type ("pagina" of "functionaliteit").
 *
 * Standaard staan alle features aan. Pas als een feature expliciet op "false"
 * wordt gezet in localStorage (key: "feature:naam") wordt het element verborgen.
 */

const FEATURE_PREFIX = "feature:";

function getFeaturesByType() {
	const groups = {};
	document.querySelectorAll("[data-feature]").forEach((el) => {
		const type = el.dataset.featureType || "overig";
		if (!groups[type]) groups[type] = new Set();
		groups[type].add(el.dataset.feature);
	});
	// Sorteer features binnen elke groep
	for (const type in groups) {
		groups[type] = [...groups[type]].sort();
	}
	return groups;
}

// Verzamel features die standaard uit staan (data-feature-default="off")
const defaultOffFeatures = new Set();
document.querySelectorAll('[data-feature-default="off"]').forEach((el) => {
	defaultOffFeatures.add(el.dataset.feature);
});

function isFeatureEnabled(name) {
	const stored = localStorage.getItem(FEATURE_PREFIX + name);
	if (defaultOffFeatures.has(name)) {
		return stored === "true";
	}
	return stored !== "false";
}

function applyFeatureFlags() {
	document.querySelectorAll("[data-feature]").forEach((el) => {
		el.hidden = !isFeatureEnabled(el.dataset.feature);
	});
}

const TYPE_LABELS = {
	pagina: "Pagina's",
	functionaliteit: "Functionaliteit",
	overig: "Overig",
};

// Volgorde van groepen in het paneel
const TYPE_ORDER = ["pagina", "functionaliteit", "overig"];

function buildTogglePanel() {
	const groups = getFeaturesByType();
	const allTypes = TYPE_ORDER.filter((t) => groups[t]);
	if (allTypes.length === 0) return;

	const panel = document.createElement("div");
	panel.className = "feature-flags-panel";
	panel.hidden = true;

	const heading = document.createElement("p");
	heading.className = "feature-flags-heading";
	heading.textContent = "Feature flags";
	panel.appendChild(heading);

	allTypes.forEach((type) => {
		const groupHeading = document.createElement("p");
		groupHeading.className = "feature-flags-group-heading";
		groupHeading.textContent = TYPE_LABELS[type] || type;
		panel.appendChild(groupHeading);

		const list = document.createElement("ul");
		groups[type].forEach((name) => {
			const li = document.createElement("li");
			const label = document.createElement("label");
			const checkbox = document.createElement("input");
			checkbox.type = "checkbox";
			checkbox.checked = isFeatureEnabled(name);
			checkbox.addEventListener("change", () => {
				if (checkbox.checked) {
					if (defaultOffFeatures.has(name)) {
						localStorage.setItem(FEATURE_PREFIX + name, "true");
					} else {
						localStorage.removeItem(FEATURE_PREFIX + name);
					}
				} else {
					if (defaultOffFeatures.has(name)) {
						localStorage.removeItem(FEATURE_PREFIX + name);
					} else {
						localStorage.setItem(FEATURE_PREFIX + name, "false");
					}
				}
				applyFeatureFlags();
			});
			label.appendChild(checkbox);
			label.appendChild(document.createTextNode(" " + name));
			li.appendChild(label);
			list.appendChild(li);
		});
		panel.appendChild(list);
	});

	const clearBtn = document.createElement("button");
	clearBtn.className = "feature-flags-clear";
	clearBtn.textContent = "localStorage wissen";
	clearBtn.addEventListener("click", () => {
		localStorage.clear();
		location.reload();
	});
	panel.appendChild(clearBtn);

	const toggle = document.createElement("button");
	toggle.className = "feature-flags-toggle";
	toggle.setAttribute("aria-expanded", "false");
	toggle.textContent = "Flags";
	toggle.addEventListener("click", () => {
		const expanded = panel.hidden;
		panel.hidden = !expanded;
		toggle.setAttribute("aria-expanded", String(expanded));
	});

	document.body.appendChild(panel);
	document.body.appendChild(toggle);
}

applyFeatureFlags();
buildTogglePanel();
