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

	var DELEN_ICON = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><path fill="currentColor" d="M48 42c-2.045 0-3.925.69-5.436 1.84L23.921 33.13c.046-.372.078-.747.078-1.13a8.956 8.956 0 0 0-1.975-5.618c.088-.08.31-.095.518.038.378.239 1.78 1.273 3.323 3.4l16.712-9.648A8.948 8.948 0 0 0 48 22a9 9 0 1 0-9-9c0 .377.03.746.076 1.111L20.46 24.858A8.95 8.95 0 0 0 15 23a9 9 0 0 0 0 18c2.032 0 3.9-.681 5.407-1.817l18.666 10.725A9.047 9.047 0 0 0 39 51a9 9 0 1 0 9-9z"/></svg>';

	function maakActionGroup(titel) {
		var div = document.createElement("div");
		div.className = "action-group topic-options";
		div.innerHTML = '<label class="save-favorite"><input type="checkbox" /> <span class="favorite-label">Bewaar</span> <span class="visually-hidden">' + titel + '</span></label>'
			+ '<button class="link-button share-topic" data-feature="Delen" data-feature-type="functionaliteit">' + DELEN_ICON + ' Deel</button>'
			+ '<button class="link-button hide-topic">Niet relevant voor mij</button>';
		return div;
	}

	function maakInterestSmall(interestType) {
		if (!interestType) return null;
		var small = document.createElement("small");
		small.className = "interest-" + interestType;
		small.innerHTML = interestType === "business" ? "Mogelijk relevant voor <b>uw bedrijf</b>" : "Mogelijk relevant voor <b>uw branche</b>";
		return small;
	}

	function maakSubsidieLi(item, interestType) {
		var li = document.createElement("li");
		li.className = "card-topic";
		var a = document.createElement("a");
		a.href = PATH_PREFIX + "/moza/subsidies/" + item.id + "/";
		a.className = "content-link is-unread";
		a.innerHTML = "<h3>" + item.titel + "</h3><span class=\"card-link\"></span>";
		li.appendChild(a);
		var interest = maakInterestSmall(interestType);
		if (interest) li.appendChild(interest);
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
		li.appendChild(maakActionGroup(item.titel));
		return li;
	}

	function maakRegelingLi(item, interestType) {
		var li = document.createElement("li");
		li.className = "card-topic";
		var a = document.createElement("a");
		a.href = PATH_PREFIX + "/moza/regelgeving/" + item.id + "/";
		a.className = "content-link is-unread";
		a.innerHTML = "<h3>" + item.titel + "</h3><span class=\"card-link\"></span>";
		li.appendChild(a);
		var interest = maakInterestSmall(interestType);
		if (interest) li.appendChild(interest);
		var p = document.createElement("p");
		p.textContent = item.beschrijving;
		li.appendChild(p);
		var dl = document.createElement("dl");
		dl.className = "data-overview";
		dl.innerHTML = "<dt>Bron</dt><dd>" + (item.bron || "") + "</dd>"
			+ "<dt>In werking</dt><dd>" + (item.inwerkingtreding || "") + "</dd>"
			+ "<dt>Geldt voor</dt><dd>" + (item.geldtVoor || "") + "</dd>";
		li.appendChild(dl);
		li.appendChild(maakActionGroup(item.titel));
		return li;
	}

	function vulLijst(container, getagdeItems, limiet) {
		if (!container) return;
		var ul = container.querySelector("ul");
		while (ul.firstChild) ul.removeChild(ul.firstChild);
		var getoond = limiet ? getagdeItems.slice(0, limiet) : getagdeItems;
		getoond.forEach(function (entry) {
			ul.appendChild(entry.maakFn(entry.item, entry.interest));
		});
		ul.setAttribute("aria-busy", "false");
	}

	function vulPaginering(container, getagdeItems) {
		if (!container) return;
		var paginering = container.querySelector("[data-paginering]");
		var ul = container.querySelector("ul");
		var totaalPaginas = Math.ceil(getagdeItems.length / PAGINA_GROOTTE);
		var huidigePagina = 0;

		function toonPagina(pagina) {
			huidigePagina = pagina;
			while (ul.firstChild) ul.removeChild(ul.firstChild);
			var start = pagina * PAGINA_GROOTTE;
			var eind = Math.min(start + PAGINA_GROOTTE, getagdeItems.length);
			for (var i = start; i < eind; i++) {
				var entry = getagdeItems[i];
				ul.appendChild(entry.maakFn(entry.item, entry.interest));
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
				prevA.href = "#hoofd-inhoud";
				prevA.innerHTML = "Vorige<span class=\"visually-hidden\"> pagina</span>";
				prevA.addEventListener("click", function (e) { e.preventDefault(); toonPagina(huidigePagina - 1); document.getElementById("hoofd-inhoud").scrollIntoView(); });
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
					a.href = "#hoofd-inhoud";
					a.textContent = i + 1;
					(function (pag) {
						a.addEventListener("click", function (e) { e.preventDefault(); toonPagina(pag); document.getElementById("hoofd-inhoud").scrollIntoView(); });
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
				nextA.addEventListener("click", function (e) { e.preventDefault(); toonPagina(huidigePagina + 1); document.getElementById("hoofd-inhoud").scrollIntoView(); });
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

	function tagItems(items, maakFn, interest) {
		return items.map(function (item) { return { item: item, maakFn: maakFn, interest: interest }; });
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

		// Voorkom dat subsidies en regelgeving hetzelfde aantal tonen
		if (brancheSubs.length > 0 && (bedrijfSubs.length + brancheSubs.length) === (bedrijfRegs.length + brancheRegs.length)) {
			brancheSubs = brancheSubs.slice(0, -1);
		}

		// Gecombineerde lijsten: bedrijf-items eerst, dan branche-items
		var alleSubs = tagItems(bedrijfSubs, maakSubsidieLi, "business")
			.concat(tagItems(brancheSubs, maakSubsidieLi, "industry"));
		var alleRegs = tagItems(bedrijfRegs, maakRegelingLi, "business")
			.concat(tagItems(brancheRegs, maakRegelingLi, "industry"));

		// Homepage (zonder badges)
		var homeSubItems = tagItems(bedrijfSubs, maakSubsidieLi, null);
		var homeRegItems = tagItems(bedrijfRegs, maakRegelingLi, null);
		vulLijst(document.querySelector("[data-homepage-subsidies]"), homeSubItems);
		vulLijst(document.querySelector("[data-homepage-regelgeving]"), homeRegItems);

		// Overzichtspagina's (gecombineerd, met paginering)
		var ovzSub = document.querySelector("[data-overzicht-subsidies]");
		var ovzReg = document.querySelector("[data-overzicht-regelgeving]");
		if (ovzSub) vulPaginering(ovzSub, alleSubs);
		if (ovzReg) vulPaginering(ovzReg, alleRegs);

		// Side-nav badges updaten
		var totaleSubs = alleSubs.length;
		var totaleRegs = alleRegs.length;
		document.querySelectorAll('[data-badge-id="subsidies-count"]').forEach(function (el) {
			el.textContent = totaleSubs;
			el.hidden = totaleSubs === 0;
		});
		document.querySelectorAll('[data-badge-id="regelgeving-count"]').forEach(function (el) {
			el.textContent = totaleRegs;
			el.hidden = totaleRegs === 0;
		});
	}

	render();
})();
