/**
 * content-interactions.js
 *
 * Beheert alle interacties op inhoud en slaat staten op in localStorage:
 * - Bewaren (favorite:)
 * - Verbergen / niet relevant voor mij (hidden:)
 * - Relevant / niet relevant toggles (relevant:)
 * - Notificaties sluiten (dismissed:)
 */

// Vul lege visually-hidden labels in op basis van de heading in dezelfde <li>
document.querySelectorAll(".action-group .visually-hidden").forEach((span) => {
	if (span.textContent.trim()) return;
	const heading = span.closest("li")?.querySelector("h2, h3, h4");
	if (heading) span.textContent = heading.textContent.trim();
});

function getCategory(li) {
	const section = li.closest("section");
	const heading = section?.querySelector("h2, h3");
	return heading?.textContent.trim() || "";
}

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
	const category = getCategory(li);
	return { title, url, desc, category };
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
	const category = getCategory(li);
	return { title, url, desc, category };
}

function showNextReserve(list) {
	// Zoek het eerste reserve-topic dat nog verborgen is en niet al aan het verdwijnen is
	const reserve = list?.querySelector("li.reserve-topic[hidden]:not(.removing)");
	if (!reserve) return;
	reserve.hidden = false;
	reserve.classList.remove("reserve-topic");
}

function removeTopic(li) {
	const list = li.closest("ul");
	// Toon de volgende reserve direct, zodat het totaal aantal zichtbare items klopt
	showNextReserve(list);
	// Fade het verwijderde item uit
	let done = false;
	function hide() {
		if (done) return;
		done = true;
		li.hidden = true;
		li.classList.remove("remove-item");
	}
	li.offsetHeight;
	li.classList.add("remove-item");
	li.addEventListener("transitionend", hide, { once: true });
	setTimeout(hide, 1000);
}

// Deel topic via Web Share API (fallback: kopieer link naar klembord)
document.addEventListener("click", async (e) => {
	const btn = e.target.closest(".share-topic");
	if (!btn) return;
	const li = btn.closest("li");
	if (!li) return;
	const data = getItemData(li);
	const shareData = { title: data.title, text: data.desc, url: data.url };
	try {
		if (navigator.share) {
			await navigator.share(shareData);
		} else {
			await navigator.clipboard.writeText(data.url);
			btn.textContent = "Link gekopieerd";
			setTimeout(() => { btn.textContent = "Deel"; }, 2000);
		}
	} catch {}
});

// Relevantie radio groups: unieke namen toewijzen en verbergen bij "niet relevant"
let relevanceCounter = 0;
document.querySelectorAll(".relevance-group").forEach((fieldset) => {
	const radios = fieldset.querySelectorAll("input[type='radio']");
	const groupName = "relevance-" + relevanceCounter++;
	radios.forEach((r) => { r.name = groupName; });
});

document.addEventListener("change", (e) => {
	const radio = e.target.closest(".relevance-group input[type='radio']");
	if (!radio) return;
	const li = radio.closest("li");
	if (!li) return;
	const data = getItemData(li);
	if (!data.title) return;

	const value = radio.value;
	localStorage.setItem("relevant:" + data.title, JSON.stringify({ ...data, value }));

	if (value === "irrelevant") {
		localStorage.setItem("hidden:" + data.title, JSON.stringify(data));
		removeTopic(li);
	}
});

// Herstel relevantie-staat bij laden
document.querySelectorAll(".relevance-group").forEach((fieldset) => {
	const li = fieldset.closest("li");
	if (!li) return;
	const data = getItemData(li);
	if (!data.title) return;
	const raw = localStorage.getItem("relevant:" + data.title);
	if (!raw) return;
	try {
		const stored = JSON.parse(raw);
		const radio = fieldset.querySelector(`input[value="${stored.value}"]`);
		if (radio) radio.checked = true;
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

// Markeer reserve-topics die eerder als niet-relevant zijn gemarkeerd,
// zodat showNextReserve() ze overslaat bij het doorschuiven
document.querySelectorAll(".list-content-links li.reserve-topic").forEach((li) => {
	const data = getItemData(li);
	if (data.title && localStorage.getItem("hidden:" + data.title)) {
		li.classList.remove("reserve-topic");
	}
});

// Verberg eerder verborgen topics bij laden en schuif reserve-topics door
// Alleen voor items die nog zichtbaar waren — items die al hidden zijn
// (bijv. reserves waarvan .reserve-topic hierboven is verwijderd) overslaan
document.querySelectorAll(".list-content-links li:not(.reserve-topic)").forEach((li) => {
	if (li.closest("#saved-groups") || li.closest("#hidden-groups")) return;
	if (li.hidden) return;
	const data = getItemData(li);
	if (data.title && localStorage.getItem("hidden:" + data.title)) {
		li.hidden = true;
		showNextReserve(li.closest("ul"));
	}
});
