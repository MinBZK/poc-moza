/**
 * personas.js
 *
 * Schakelt tussen persona's zodat het prototype met verschillende
 * gebruikers getoond kan worden in gebruikerstests. De actieve persona
 * wordt opgeslagen in localStorage onder de key "persona".
 *
 * Elementen met data-profiel-* attributen worden door dit script gevuld:
 *   data-profiel="voornaam"          → persoon.voornaam
 *   data-profiel="achternaam"        → persoon.achternaam
 *   data-profiel="initialen"         → persoon.initialen
 *   data-profiel="naam"              → persoon.voornaam + " " + persoon.achternaam
 *   data-profiel="initialen-bedrijf" → persoon.initialen + " " + persoon.achternaam + " van " + bedrijf.handelsnaam
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

	var LS_KEY = "persona";

	// Persona's worden door Eleventy als JSON in de pagina geïnjecteerd.
	var personas = window.personasData;
	if (!personas || !personas.length) return;

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

	function vindPersona(id) {
		return personas.find(function (p) { return p.id === id; });
	}

	function vindPersonaOpLabel(label) {
		return personas.find(function (p) { return p.label === label; });
	}

	function urlLabel(persona) {
		return persona.label || persona.id;
	}

	function personaUitUrl() {
		var params = new URLSearchParams(location.search);
		return params.get("persona");
	}

	function actievePersona() {
		// 1. URL-parameter heeft voorrang (deelbaar, zelfde voor iedereen).
		var urlParam = personaUitUrl();
		if (urlParam) {
			// Zoek op label eerst, dan op id als fallback.
			var urlPersona = vindPersonaOpLabel(urlParam) || vindPersona(urlParam);
			if (urlPersona) return urlPersona;
		}
		// 2. localStorage (persoonlijke keuze via Flags-paneel).
		var opgeslagen = leesActiefId();
		if (opgeslagen) {
			var persona = vindPersona(opgeslagen);
			if (persona) return persona;
		}
		// 3. Fallback: de persona die als actief is gemarkeerd in de data.
		return personas.find(function (p) { return p.actief; }) || personas[0];
	}

	function waarde(persona, sleutel) {
		var p = persona.persoon;
		var b = persona.bedrijf;
		switch (sleutel) {
			case "voornaam": return p.voornaam;
			case "achternaam": return p.achternaam;
			case "initialen": return p.initialen;
			case "naam": return p.voornaam + " " + p.achternaam;
			case "initialen-bedrijf": return p.initialen + " " + p.achternaam + " van " + b.handelsnaam;
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

	function pasToe(persona) {
		// Vul alle data-profiel elementen.
		document.querySelectorAll("[data-profiel]").forEach(function (el) {
			var sleutel = el.getAttribute("data-profiel");
			var tekst = waarde(persona, sleutel);
			if (tekst) el.textContent = tekst;
		});

		// Markeer de actieve persona in de kiezer.
		document.querySelectorAll("[data-profiel-id]").forEach(function (el) {
			var isActief = el.getAttribute("data-profiel-id") === persona.id;
			if (isActief) {
				el.setAttribute("aria-current", "true");
			} else {
				el.removeAttribute("aria-current");
			}
		});
	}

	// Bouw de persona-kiezer in het feature flags paneel.
	function bouwKiezer() {
		var panel = document.querySelector(".feature-flags-panel");
		if (!panel) return;

		var actief = actievePersona();

		// Voeg de kiezer toe vóór de "localStorage wissen" knop.
		var clearBtn = panel.querySelector(".feature-flags-clear");

		var heading = document.createElement("p");
		heading.className = "feature-flags-group-heading";
		heading.textContent = "Persona's";
		panel.insertBefore(heading, clearBtn);

		var list = document.createElement("ul");

		personas.forEach(function (persona, i) {
			var li = document.createElement("li");
			var label = document.createElement("label");
			var radio = document.createElement("input");
			radio.type = "radio";
			radio.name = "persona";
			radio.value = persona.id;
			radio.checked = persona.id === actief.id;
			radio.addEventListener("change", function () {
				slaActiefOp(persona.id);
				var params = new URLSearchParams(location.search);
				params.set("persona", urlLabel(persona));
				location.search = params.toString();
			});
			label.appendChild(radio);
			var kiezerLabel = persona.label || ("Persona " + i);
			label.appendChild(document.createTextNode(" " + kiezerLabel + ": " + persona.bedrijf.handelsnaam));
			li.appendChild(label);
			list.appendChild(li);
		});

		panel.insertBefore(list, clearBtn);
	}

	// Initialisatie.
	var persona = actievePersona();
	pasToe(persona);
	bouwKiezer();

	// Behoud ?persona= parameter op alle interne links.
	var urlPersonaId = personaUitUrl();
	if (urlPersonaId) {
		document.querySelectorAll("a[href]").forEach(function (a) {
			var href = a.getAttribute("href");
			// Alleen interne links (beginnen met / of zijn relatief, geen http/mailto/tel).
			if (!href || /^(https?:|mailto:|tel:)/.test(href)) return;
			// Voeg de parameter toe als die er nog niet in zit.
			if (href.indexOf("persona=") !== -1) return;
			var separator = href.indexOf("?") !== -1 ? "&" : "?";
			a.setAttribute("href", href + separator + "persona=" + encodeURIComponent(urlPersonaId));
		});
	}

	// Publieke API voor debugging.
	window.Personas = {
		actief: function () { return actievePersona(); },
		wissel: function (id) {
			var p = vindPersona(id) || vindPersonaOpLabel(id);
			if (!p) return;
			slaActiefOp(p.id);
			var params = new URLSearchParams(location.search);
			params.set("persona", urlLabel(p));
			location.search = params.toString();
		},
		personas: personas,
	};
})();
