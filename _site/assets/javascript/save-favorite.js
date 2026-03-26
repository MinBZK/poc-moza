/**
 * Slaat de staat van .save-favorite checkboxes op in localStorage.
 * Gebruikt de visually-hidden tekst als unieke sleutel per item.
 * Slaat titel, URL en beschrijving op als JSON zodat de bewaard-pagina
 * volledige cards kan tonen.
 */

function getFavoriteKey(checkbox) {
	const label = checkbox.closest(".save-favorite");
	const hidden = label?.querySelector(".visually-hidden");
	return hidden ? "favorite:" + hidden.textContent.trim() : null;
}

function getFavoriteData(checkbox) {
	const li = checkbox.closest("li");
	if (!li) return null;
	const link = li.querySelector("a.content-link");
	const title = link?.querySelector("h3")?.textContent.trim() || "";
	const url = link?.getAttribute("href") || "";
	const desc = li.querySelector(":scope > p")?.textContent.trim() || "";
	return { title, url, desc };
}

// Herstel opgeslagen staat bij laden
document.querySelectorAll(".save-favorite input[type='checkbox']").forEach((checkbox) => {
	const key = getFavoriteKey(checkbox);
	if (!key) return;
	const stored = localStorage.getItem(key);
	// Ondersteun zowel oud ("true") als nieuw (JSON) formaat
	if (stored && stored !== "false") {
		checkbox.checked = true;
	}
});

// Sla staat op bij wijziging
document.addEventListener("change", (e) => {
	if (e.target.matches(".save-favorite input[type='checkbox']")) {
		const key = getFavoriteKey(e.target);
		if (!key) return;
		if (e.target.checked) {
			const data = getFavoriteData(e.target);
			localStorage.setItem(key, JSON.stringify(data));
		} else {
			localStorage.removeItem(key);
		}
	}
});

// Verberg topic bij klik op "Niet relevant voor mij"
function getItemData(li) {
	const link = li.querySelector("a.content-link");
	const title = link?.querySelector("h3, h4")?.textContent.trim() || "";
	const url = link?.getAttribute("href") || "";
	const desc = li.querySelector(":scope > p")?.textContent.trim() || "";
	return { title, url, desc };
}

document.addEventListener("click", (e) => {
	const btn = e.target.closest(".hide-topic");
	if (!btn) return;
	const li = btn.closest("li");
	if (!li) return;
	const data = getItemData(li);
	if (data.title) {
		localStorage.setItem("hidden:" + data.title, JSON.stringify(data));
	}
	li.hidden = true;
});

// Relevant / Niet relevant toggle buttons
document.addEventListener("click", (e) => {
	const btn = e.target.closest(".mark-relevant, .mark-irrelevant");
	if (!btn) return;
	const li = btn.closest("li");
	if (!li) return;
	const data = getItemData(li);
	if (!data.title) return;

	const isPressed = btn.getAttribute("aria-pressed") === "true";
	const sibling = btn.matches(".mark-relevant")
		? li.querySelector(".mark-irrelevant")
		: li.querySelector(".mark-relevant");

	if (isPressed) {
		// Uitschakelen
		btn.setAttribute("aria-pressed", "false");
		localStorage.removeItem("relevant:" + data.title);
	} else {
		// Inschakelen en andere uitschakelen
		btn.setAttribute("aria-pressed", "true");
		if (sibling) sibling.setAttribute("aria-pressed", "false");
		const value = btn.matches(".mark-relevant") ? "relevant" : "irrelevant";
		localStorage.setItem("relevant:" + data.title, JSON.stringify({ ...data, value }));
	}
});

// Herstel relevant/irrelevant staat bij laden
document.querySelectorAll(".mark-relevant, .mark-irrelevant").forEach((btn) => {
	const li = btn.closest("li");
	if (!li) return;
	const data = getItemData(li);
	if (!data.title) return;
	const raw = localStorage.getItem("relevant:" + data.title);
	if (!raw) return;
	try {
		const stored = JSON.parse(raw);
		if (stored.value === "relevant" && btn.matches(".mark-relevant")) {
			btn.setAttribute("aria-pressed", "true");
		} else if (stored.value === "irrelevant" && btn.matches(".mark-irrelevant")) {
			btn.setAttribute("aria-pressed", "true");
		}
	} catch {}
});

// Sluit feedback-notificaties met .btn-close en onthoud dit
document.addEventListener("click", (e) => {
	const btn = e.target.closest(".btn-close");
	if (!btn) return;
	const feedback = btn.closest(".feedback[id]");
	if (!feedback) return;
	feedback.hidden = true;
	localStorage.setItem("dismissed:" + feedback.id, "true");
});

document.querySelectorAll(".feedback[id]").forEach((feedback) => {
	if (localStorage.getItem("dismissed:" + feedback.id) === "true") {
		feedback.hidden = true;
	}
});

// Verberg eerder verborgen topics bij laden (niet op de bewaard-pagina's eigen lijsten)
document.querySelectorAll(".list-content-links:not(#saved-items):not(#hidden-items) li").forEach((li) => {
	const data = getItemData(li);
	if (data.title && localStorage.getItem("hidden:" + data.title)) {
		li.hidden = true;
	}
});
