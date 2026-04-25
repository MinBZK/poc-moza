/**
 * homepage-profiel.js
 *
 * Vult dynamische secties op de homepage, overzichtspagina's en
 * detailoverzichtspagina's op basis van het actieve testprofiel.
 */

(function () {
	"use strict";

	var profielen = window.testprofielenData;
	var subsidies = window.subsidiesData;
	var regelgeving = window.regelgevingData;
	if (!profielen || !subsidies || !regelgeving) return;

	var LS_KEY = "testprofiel";
	var PAGINA_GROOTTE = 5;
	var PATH_PREFIX = (typeof window.PATH_PREFIX === "string" && window.PATH_PREFIX !== "/")
		? window.PATH_PREFIX.replace(/\/$/, "")
		: "";

	function actiefProfiel() {
		var id;
		try { id = localStorage.getItem(LS_KEY); } catch (e) { /* */ }
		var profiel = id ? profielen.find(function (p) { return p.id === id; }) : null;
		return profiel || profielen.find(function (p) { return p.actief; }) || profielen[0];
	}

	function vindSubsidie(id) { return subsidies.find(function (s) { return s.id === id; }); }
	function vindRegeling(id) { return regelgeving.find(function (r) { return r.id === id; }); }

	function maakSubsidieLi(item) {
		var li = document.createElement("li");
		li.className = "card-topic";
		var a = document.createElement("a");
		a.href = PATH_PREFIX + "/moza/subsidies/" + item.id + "/";
		a.className = "content-link is-unread";
		a.innerHTML = "<h3>" + item.titel + "</h3><span class=\"card-link\"></span>";
		li.appendChild(a);
		var p = document.createElement("p");
		p.textContent = item.beschrijving;
		li.appendChild(p);
		var dl = document.createElement("dl");
		dl.className = "data-overview";
		dl.innerHTML = "<dt>Verstrekker</dt><dd>" + item.verstrekker + "</dd>"
			+ "<dt>Type</dt><dd>" + (item.type || "") + "</dd>"
			+ "<dt>Aanvraagperiode</dt><dd>" + (item.aanvraagperiode || "") + "</dd>"
			+ (item.maximaalBedrag ? "<dt>Maximaal bedrag</dt><dd>" + item.maximaalBedrag + "</dd>" : "");
		li.appendChild(dl);
		return li;
	}

	function maakRegelingLi(item) {
		var li = document.createElement("li");
		li.className = "card-topic";
		var a = document.createElement("a");
		a.href = PATH_PREFIX + "/moza/regelgeving/" + item.id + "/";
		a.className = "content-link is-unread";
		a.innerHTML = "<h3>" + item.titel + "</h3><span class=\"card-link\"></span>";
		li.appendChild(a);
		var p = document.createElement("p");
		p.textContent = item.beschrijving;
		li.appendChild(p);
		var dl = document.createElement("dl");
		dl.className = "data-overview";
		dl.innerHTML = "<dt>Bron</dt><dd>" + (item.bron || "") + "</dd>"
			+ "<dt>In werking</dt><dd>" + (item.inwerkingtreding || "") + "</dd>"
			+ "<dt>Geldt voor</dt><dd>" + (item.geldtVoor || "") + "</dd>";
		li.appendChild(dl);
		return li;
	}

	function vulLijst(container, items, maakFn, limiet) {
		if (!container) return;
		var ul = container.querySelector("ul");
		while (ul.firstChild) ul.removeChild(ul.firstChild);
		var getoond = limiet ? items.slice(0, limiet) : items;
		getoond.forEach(function (item) {
			ul.appendChild(maakFn(item));
		});
		ul.setAttribute("aria-busy", "false");
	}

	function vulPaginering(container, items, maakFn) {
		if (!container) return;
		var paginering = container.querySelector("[data-paginering]");
		var ul = container.querySelector("ul");
		var totaalPaginas = Math.ceil(items.length / PAGINA_GROOTTE);
		var huidigePagina = 0;

		function toonPagina(pagina) {
			huidigePagina = pagina;
			while (ul.firstChild) ul.removeChild(ul.firstChild);
			var start = pagina * PAGINA_GROOTTE;
			var eind = Math.min(start + PAGINA_GROOTTE, items.length);
			for (var i = start; i < eind; i++) {
				ul.appendChild(maakFn(items[i]));
			}
			ul.setAttribute("aria-busy", "false");
			renderPaginering();
		}

		function renderPaginering() {
			if (totaalPaginas <= 1) {
				paginering.hidden = true;
				return;
			}
			paginering.hidden = false;
			while (paginering.firstChild) paginering.removeChild(paginering.firstChild);
			var ol = document.createElement("ol");

			if (huidigePagina > 0) {
				var prevLi = document.createElement("li");
				var prevA = document.createElement("a");
				prevA.href = "#";
				prevA.innerHTML = "Vorige<span class=\"visually-hidden\"> pagina</span>";
				prevA.addEventListener("click", function (e) { e.preventDefault(); toonPagina(huidigePagina - 1); });
				prevLi.appendChild(prevA);
				ol.appendChild(prevLi);
			}

			for (var i = 0; i < totaalPaginas; i++) {
				var li = document.createElement("li");
				if (i === huidigePagina) {
					var span = document.createElement("span");
					span.setAttribute("aria-current", "page");
					span.textContent = i + 1;
					li.appendChild(span);
				} else {
					var a = document.createElement("a");
					a.href = "#";
					a.textContent = i + 1;
					(function (pag) {
						a.addEventListener("click", function (e) { e.preventDefault(); toonPagina(pag); });
					})(i);
					li.appendChild(a);
				}
				ol.appendChild(li);
			}

			if (huidigePagina < totaalPaginas - 1) {
				var nextLi = document.createElement("li");
				var nextA = document.createElement("a");
				nextA.href = "#";
				nextA.innerHTML = "Volgende<span class=\"visually-hidden\"> pagina</span>";
				nextA.addEventListener("click", function (e) { e.preventDefault(); toonPagina(huidigePagina + 1); });
				nextLi.appendChild(nextA);
				ol.appendChild(nextLi);
			}

			paginering.appendChild(ol);
		}

		toonPagina(0);
	}

	function resolveIds(ids, vindFn) {
		return ids.map(vindFn).filter(Boolean);
	}

	function render() {
		var profiel = actiefProfiel();
		var bedrijfSubIds = profiel.homepageSubsidies || [];
		var brancheSubIds = (profiel.subsidies || []).filter(function (id) { return bedrijfSubIds.indexOf(id) === -1; });
		var bedrijfRegIds = profiel.homepageRegelgeving || [];
		var brancheRegIds = (profiel.regelgeving || []).filter(function (id) { return bedrijfRegIds.indexOf(id) === -1; });

		var bedrijfSubs = resolveIds(bedrijfSubIds, vindSubsidie);
		var brancheSubs = resolveIds(brancheSubIds, vindSubsidie);
		var bedrijfRegs = resolveIds(bedrijfRegIds, vindRegeling);
		var brancheRegs = resolveIds(brancheRegIds, vindRegeling);

		// Homepage
		vulLijst(document.querySelector("[data-homepage-subsidies]"), bedrijfSubs, maakSubsidieLi);
		vulLijst(document.querySelector("[data-homepage-regelgeving]"), bedrijfRegs, maakRegelingLi);

		// Overzichtspagina's (max 3 items)
		vulLijst(document.querySelector("[data-overzicht-subsidies-bedrijf]"), bedrijfSubs, maakSubsidieLi, 3);
		vulLijst(document.querySelector("[data-overzicht-subsidies-branche]"), brancheSubs, maakSubsidieLi, 3);
		vulLijst(document.querySelector("[data-overzicht-regelgeving-bedrijf]"), bedrijfRegs, maakRegelingLi, 3);
		vulLijst(document.querySelector("[data-overzicht-regelgeving-branche]"), brancheRegs, maakRegelingLi, 3);

		// Detailoverzichtspagina's (volledige lijst met paginering)
		var volledigSubBedrijf = document.querySelector("[data-volledig-subsidies-bedrijf]");
		var volledigSubBranche = document.querySelector("[data-volledig-subsidies-branche]");
		var volledigRegBedrijf = document.querySelector("[data-volledig-regelgeving-bedrijf]");
		var volledigRegBranche = document.querySelector("[data-volledig-regelgeving-branche]");

		if (volledigSubBedrijf) vulPaginering(volledigSubBedrijf, bedrijfSubs, maakSubsidieLi);
		if (volledigSubBranche) vulPaginering(volledigSubBranche, brancheSubs, maakSubsidieLi);
		if (volledigRegBedrijf) vulPaginering(volledigRegBedrijf, bedrijfRegs, maakRegelingLi);
		if (volledigRegBranche) vulPaginering(volledigRegBranche, brancheRegs, maakRegelingLi);
	}

	render();
})();
