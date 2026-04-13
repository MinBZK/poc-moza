/**
 * berichtenbox.js
 *
 * Client-side gedrag voor de FBS Berichtenbox-mock.
 * State (gelezen, archief, prullenbak, map-toewijzingen, eigen mappen)
 * wordt bewaard in localStorage onder de key "berichtenbox".
 * Statische lijst komt uit de server-gerenderde HTML; JS manipuleert
 * zichtbaarheid en klassen op basis van state.
 */

(function() {
	"use strict";

	const wrapper = document.querySelector('.berichtenbox');
	if (!wrapper) return; // niet op een berichtenbox-pagina

	const LS_KEY = "berichtenbox";

	const defaultState = {
		eersteBezoekGehad: false,
		gelezen: {},        // { [berichtId]: true }
		ongelezenToegevoegd: {}, // { [berichtId]: true } — "markeer als ongelezen" op oorspronkelijk gelezen
		gearchiveerd: {},   // { [berichtId]: true }
		verwijderd: {},     // { [berichtId]: true }
		mapOverride: {},    // { [berichtId]: mapSlug | null }
		eigenMappen: [],    // [{ slug, naam }]
		nieuweBerichten: [], // berichten die via polling zijn toegevoegd (full objects)
	};

	function readState() {
		try {
			const raw = localStorage.getItem(LS_KEY);
			if (!raw) return { ...defaultState };
			return { ...defaultState, ...JSON.parse(raw) };
		} catch (e) {
			return { ...defaultState };
		}
	}

	function writeState(state) {
		localStorage.setItem(LS_KEY, JSON.stringify(state));
	}

	const state = readState();

	/**
	 * Bepaalt de effectieve status van één bericht.
	 * Retourneert: "inbox" | "archief" | "prullenbak"
	 */
	function statusVan(berichtId) {
		if (state.verwijderd[berichtId]) return "prullenbak";
		if (state.gearchiveerd[berichtId]) return "archief";
		return "inbox";
	}

	function isOngelezen(berichtId, origineelOngelezen) {
		if (state.ongelezenToegevoegd[berichtId]) return true;
		if (state.gelezen[berichtId]) return false;
		return origineelOngelezen;
	}

	function mapVan(berichtId, origineleMap) {
		if (berichtId in state.mapOverride) return state.mapOverride[berichtId];
		return origineleMap;
	}

	/**
	 * Bepaalt welke view de huidige pagina toont.
	 * Gebruikt een data-attribuut op de lijst, of valt terug op URL-pad.
	 */
	function huidigeView() {
		const lijst = document.querySelector('[data-berichtenbox-lijst]');
		const attr = lijst ? lijst.dataset.berichtenboxView : null;
		if (attr) return attr;
		const path = location.pathname;
		if (path.includes('/archief/')) return 'archief';
		if (path.includes('/prullenbak/')) return 'prullenbak';
		return 'inbox';
	}

	/**
	 * Past de status van alle statisch-gerenderde rijen toe.
	 * Op de Inbox: verbergt rijen die gearchiveerd/verwijderd zijn.
	 */
	function pasStateToeOpRijen() {
		const view = huidigeView();
		const rijen = document.querySelectorAll('.berichtenbox-rij');
		rijen.forEach((rij) => {
			const id = rij.dataset.berichtId;
			const status = statusVan(id);
			if (view === 'inbox') {
				rij.hidden = status !== 'inbox';
				// Pas ongelezen-klasse aan
				const origineel = rij.classList.contains('is-ongelezen');
				const nu = isOngelezen(id, origineel);
				rij.classList.toggle('is-ongelezen', nu);
			} else {
				rij.hidden = true; // alle statische rijen verbergen op andere views
			}
		});
	}

	/**
	 * Update tellers op basis van huidige state.
	 */
	function render(view) {
		const tellerTotaal = document.querySelector('[data-berichtenbox-teller-totaal]');
		const data = window.berichtenboxData || { berichten: [] };
		let getoond = 0;
		if (view === 'inbox') {
			getoond = data.berichten.filter((b) => statusVan(b.id) === 'inbox').length
				+ state.nieuweBerichten.filter((b) => statusVan(b.id) === 'inbox').length;
		} else if (view === 'archief') {
			getoond = Object.keys(state.gearchiveerd).length;
		} else if (view === 'prullenbak') {
			getoond = Object.keys(state.verwijderd).length;
		}
		if (tellerTotaal) tellerTotaal.textContent = getoond;

		// Update ongelezen-teller in inbox
		const tellerOngelezen = document.querySelector('[data-berichtenbox-teller-ongelezen]');
		if (tellerOngelezen) {
			const n = data.berichten.filter((b) =>
				statusVan(b.id) === 'inbox' && isOngelezen(b.id, b.isOngelezen)
			).length;
			tellerOngelezen.textContent = n;
		}

		// Update nav-tellers in de zijbalk
		const navInbox = document.querySelector('[data-berichtenbox-count="inbox"]');
		if (navInbox) {
			navInbox.textContent = data.berichten.filter((b) => statusVan(b.id) === 'inbox').length;
		}
		const navArchief = document.querySelector('[data-berichtenbox-count="archief"]');
		if (navArchief) navArchief.textContent = Object.keys(state.gearchiveerd).length;
		const navPrullenbak = document.querySelector('[data-berichtenbox-count="prullenbak"]');
		if (navPrullenbak) navPrullenbak.textContent = Object.keys(state.verwijderd).length;
	}

	// Initialisatie
	pasStateToeOpRijen();
	render(huidigeView());

	// Exporteer voor latere taken via een global namespace
	window.Berichtenbox = {
		state,
		readState,
		writeState,
		statusVan,
		isOngelezen,
		mapVan,
		huidigeView,
		pasStateToeOpRijen,
		render,
	};
})();
