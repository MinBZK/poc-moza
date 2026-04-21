/**
 * testprofielen.js
 *
 * Schakelt tussen testprofielen zodat het prototype met verschillende
 * persona's getoond kan worden in gebruikerstests. Het actieve profiel
 * wordt opgeslagen in localStorage onder de key "testprofiel".
 *
 * Elementen met data-profiel-* attributen worden door dit script gevuld:
 *   data-profiel="voornaam"          → persoon.voornaam
 *   data-profiel="achternaam"        → persoon.achternaam
 *   data-profiel="initialen"         → persoon.initialen
 *   data-profiel="naam"              → persoon.voornaam + " " + persoon.achternaam
 *   data-profiel="initialen-bedrijf" → persoon.initialen + " " + persoon.achternaam + " — " + bedrijf.handelsnaam
 *   data-profiel="handelsnaam"       → bedrijf.handelsnaam
 *   data-profiel="kvkNummer"         → bedrijf.kvkNummer
 *   data-profiel="rsinNummer"        → bedrijf.rsinNummer
 *   data-profiel="btwNummer"         → bedrijf.btwNummer
 *   data-profiel="omzetbelastingnummer" → bedrijf.omzetbelastingnummer
 *   data-profiel="startdatum"        → bedrijf.startdatum
 *   data-profiel="rechtsvorm"        → bedrijf.rechtsvorm
 *   data-profiel="vestigingsadres"   → bedrijf.vestigingsadres
 *   data-profiel="gemeente"          → bedrijf.gemeente
 *   data-profiel="rol"               → bedrijf.rol
 */

(function () {
	"use strict";

	var LS_KEY = "testprofiel";

	// Profielen worden door Eleventy als JSON in de pagina geïnjecteerd.
	var profielen = window.testprofielenData;
	if (!profielen || !profielen.length) return;

	function leesActiefId() {
		try {
			return localStorage.getItem(LS_KEY);
		} catch (e) {
			return null;
		}
	}

	function slaActiefOp(id) {
		try {
			localStorage.setItem(LS_KEY, id);
		} catch (e) { /* localStorage niet toegankelijk */ }
	}

	function vindProfiel(id) {
		return profielen.find(function (p) { return p.id === id; });
	}

	function vindProfielOpLabel(label) {
		return profielen.find(function (p) { return p.label === label; });
	}

	function urlLabel(profiel) {
		return profiel.label || profiel.id;
	}

	function profielUitUrl() {
		var params = new URLSearchParams(location.search);
		return params.get("profiel");
	}

	function actiefProfiel() {
		// 1. URL-parameter heeft voorrang (deelbaar, zelfde voor iedereen).
		var urlParam = profielUitUrl();
		if (urlParam) {
			// Zoek op label eerst, dan op id als fallback.
			var urlProfiel = vindProfielOpLabel(urlParam) || vindProfiel(urlParam);
			if (urlProfiel) return urlProfiel;
		}
		// 2. localStorage (persoonlijke keuze via Flags-paneel).
		var opgeslagen = leesActiefId();
		if (opgeslagen) {
			var profiel = vindProfiel(opgeslagen);
			if (profiel) return profiel;
		}
		// 3. Fallback: het profiel dat als actief is gemarkeerd in de data.
		return profielen.find(function (p) { return p.actief; }) || profielen[0];
	}

	function waarde(profiel, sleutel) {
		var p = profiel.persoon;
		var b = profiel.bedrijf;
		switch (sleutel) {
			case "voornaam": return p.voornaam;
			case "achternaam": return p.achternaam;
			case "initialen": return p.initialen;
			case "naam": return p.voornaam + " " + p.achternaam;
			case "initialen-bedrijf": return p.initialen + " " + p.achternaam + " \u2014 " + b.handelsnaam;
			case "handelsnaam": return b.handelsnaam;
			case "kvkNummer": return b.kvkNummer;
			case "rsinNummer": return b.rsinNummer;
			case "btwNummer": return b.btwNummer;
			case "omzetbelastingnummer": return b.omzetbelastingnummer;
			case "startdatum": return b.startdatum;
			case "rechtsvorm": return b.rechtsvorm;
			case "vestigingsadres": return b.vestigingsadres;
			case "gemeente": return b.gemeente;
			case "branche": return b.branche;
			case "rol": return b.rol;
			default: return "";
		}
	}

	function pasToe(profiel) {
		// Vul alle data-profiel elementen.
		document.querySelectorAll("[data-profiel]").forEach(function (el) {
			var sleutel = el.getAttribute("data-profiel");
			var tekst = waarde(profiel, sleutel);
			if (tekst) el.textContent = tekst;
		});

		// Markeer het actieve profiel in de kiezer.
		document.querySelectorAll("[data-profiel-id]").forEach(function (el) {
			var isActief = el.getAttribute("data-profiel-id") === profiel.id;
			if (isActief) {
				el.setAttribute("aria-current", "true");
			} else {
				el.removeAttribute("aria-current");
			}
		});
	}

	// Bouw de profielkiezer in het feature flags paneel.
	function bouwKiezer() {
		var panel = document.querySelector(".feature-flags-panel");
		if (!panel) return;

		var actief = actiefProfiel();

		// Voeg de kiezer toe vóór de "localStorage wissen" knop.
		var clearBtn = panel.querySelector(".feature-flags-clear");

		var heading = document.createElement("p");
		heading.className = "feature-flags-group-heading";
		heading.textContent = "Testprofielen";
		panel.insertBefore(heading, clearBtn);

		var list = document.createElement("ul");

		profielen.forEach(function (profiel, i) {
			var li = document.createElement("li");
			var label = document.createElement("label");
			var radio = document.createElement("input");
			radio.type = "radio";
			radio.name = "testprofiel";
			radio.value = profiel.id;
			radio.checked = profiel.id === actief.id;
			radio.addEventListener("change", function () {
				slaActiefOp(profiel.id);
				var params = new URLSearchParams(location.search);
				params.set("profiel", urlLabel(profiel));
				location.search = params.toString();
			});
			label.appendChild(radio);
			var kiezerLabel = profiel.label || ("Respondent " + i);
			label.appendChild(document.createTextNode(" " + kiezerLabel + ": " + profiel.bedrijf.handelsnaam));
			li.appendChild(label);
			list.appendChild(li);
		});

		panel.insertBefore(list, clearBtn);
	}

	// Initialisatie.
	var profiel = actiefProfiel();
	pasToe(profiel);
	bouwKiezer();

	// Behoud ?profiel= parameter op alle interne links.
	var urlProfielId = profielUitUrl();
	if (urlProfielId) {
		document.querySelectorAll("a[href]").forEach(function (a) {
			var href = a.getAttribute("href");
			// Alleen interne links (beginnen met / of zijn relatief, geen http/mailto/tel).
			if (!href || /^(https?:|mailto:|tel:)/.test(href)) return;
			// Voeg de parameter toe als die er nog niet in zit.
			if (href.indexOf("profiel=") !== -1) return;
			var separator = href.indexOf("?") !== -1 ? "&" : "?";
			a.setAttribute("href", href + separator + "profiel=" + encodeURIComponent(urlProfielId));
		});
	}

	// Publieke API voor debugging.
	window.Testprofielen = {
		actief: function () { return actiefProfiel(); },
		wissel: function (id) {
			var p = vindProfiel(id) || vindProfielOpLabel(id);
			if (!p) return;
			slaActiefOp(p.id);
			var params = new URLSearchParams(location.search);
			params.set("profiel", urlLabel(p));
			location.search = params.toString();
		},
		profielen: profielen,
	};
})();
