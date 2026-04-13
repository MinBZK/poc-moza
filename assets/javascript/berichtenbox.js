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

	function opslaan() {
		writeState(state);
	}

	/**
	 * Verplaats-naar-map-dialoog: toont een klein inline-paneel met
	 * bestaande mappen + optie "Nieuwe map aanmaken".
	 */
	function toonVerplaatsPaneel(berichtId, knop) {
		const bestaand = document.querySelector('.berichtenbox-verplaats-paneel');
		if (bestaand) { bestaand.remove(); return; }

		const data = window.berichtenboxData;
		const alleMappen = [
			...data.mappen,
			...state.eigenMappen,
		];

		const paneel = document.createElement('div');
		paneel.className = 'berichtenbox-verplaats-paneel';

		const kiesP = document.createElement('p');
		kiesP.textContent = 'Kies een map:';
		paneel.appendChild(kiesP);

		const ul = document.createElement('ul');
		paneel.appendChild(ul);

		const nieuweMapP = document.createElement('p');
		const nieuweMapLabel = document.createElement('label');
		nieuweMapLabel.textContent = 'Nieuwe map: ';
		const nieuweMapInput = document.createElement('input');
		nieuweMapInput.type = 'text';
		nieuweMapInput.dataset.nieuweMapInput = '';
		nieuweMapLabel.appendChild(nieuweMapInput);
		const nieuweMapBevestig = document.createElement('button');
		nieuweMapBevestig.type = 'button';
		nieuweMapBevestig.className = 'link-button';
		nieuweMapBevestig.dataset.nieuweMapBevestig = '';
		nieuweMapBevestig.textContent = 'Aanmaken';
		nieuweMapP.appendChild(nieuweMapLabel);
		nieuweMapP.appendChild(document.createTextNode(' '));
		nieuweMapP.appendChild(nieuweMapBevestig);
		paneel.appendChild(nieuweMapP);

		alleMappen.forEach((m) => {
			const li = document.createElement('li');
			const btn = document.createElement('button');
			btn.type = 'button';
			btn.className = 'link-button';
			btn.textContent = m.naam;
			btn.addEventListener('click', () => {
				state.mapOverride[berichtId] = m.slug;
				opslaan();
				paneel.remove();
				render(huidigeView());
				updateMapLabelDetail(m.slug);
			});
			li.appendChild(btn);
			ul.appendChild(li);
		});
		// Optie: uit map halen
		if (state.mapOverride[berichtId]) {
			const li = document.createElement('li');
			const btn = document.createElement('button');
			btn.type = 'button';
			btn.className = 'link-button';
			btn.textContent = 'Uit map halen';
			btn.addEventListener('click', () => {
				state.mapOverride[berichtId] = null;
				opslaan();
				paneel.remove();
				render(huidigeView());
				updateMapLabelDetail(null);
			});
			li.appendChild(btn);
			ul.appendChild(li);
		}
		nieuweMapBevestig.addEventListener('click', () => {
			const naam = nieuweMapInput.value.trim();
			if (!naam) return;
			const slug = naam.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
			if (!slug) return;
			if (!state.eigenMappen.some((m) => m.slug === slug)) {
				state.eigenMappen.push({ slug, naam });
			}
			state.mapOverride[berichtId] = slug;
			opslaan();
			paneel.remove();
			render(huidigeView());
			updateMapLabelDetail(slug);
			// Voeg nieuwe map toe aan zijbalk
			voegMapToeAanZijbalk({ slug, naam });
		});
		knop.parentNode.insertBefore(paneel, knop.nextSibling);
	}

	function updateMapLabelDetail(mapSlug) {
		const meta = document.querySelector('.berichtenbox-detail-meta [data-maplabel]');
		if (!mapSlug) {
			if (meta) meta.remove();
			return;
		}
		if (meta) {
			meta.textContent = mapSlug;
		} else {
			const metaP = document.querySelector('.berichtenbox-detail-meta');
			if (metaP) {
				const span = document.createElement('span');
				span.dataset.maplabel = '';
				span.textContent = ' · ' + mapSlug;
				metaP.appendChild(span);
			}
		}
	}

	function voegMapToeAanZijbalk(map) {
		const lijst = document.querySelector('[data-berichtenbox-mappen]');
		if (!lijst) return;
		if (lijst.querySelector(`[data-map-slug="${map.slug}"]`)) return;
		const li = document.createElement('li');
		li.dataset.mapSlug = map.slug;
		const a = document.createElement('a');
		a.href = '/moza/berichtenbox/?map=' + map.slug;
		a.textContent = map.naam + ' ';
		const teller = document.createElement('span');
		teller.className = 'berichtenbox-nav-count';
		teller.dataset.berichtenboxCount = 'map:' + map.slug;
		teller.textContent = '0';
		a.appendChild(teller);
		li.appendChild(a);
		lijst.appendChild(li);
	}

	function bindDetailPaginaActies() {
		const content = document.querySelector('[data-bericht-id]');
		if (!content || !content.matches('.berichtenbox-content')) return;
		const berichtId = content.dataset.berichtId;

		// Markeer als gelezen bij openen
		delete state.ongelezenToegevoegd[berichtId];
		state.gelezen[berichtId] = true;
		opslaan();

		content.querySelectorAll('[data-actie]').forEach((btn) => {
			btn.addEventListener('click', () => {
				const actie = btn.dataset.actie;
				if (actie === 'archiveren') {
					state.gearchiveerd[berichtId] = true;
					delete state.verwijderd[berichtId];
					opslaan();
					location.href = '/moza/berichtenbox/';
				} else if (actie === 'verwijderen') {
					state.verwijderd[berichtId] = true;
					delete state.gearchiveerd[berichtId];
					opslaan();
					location.href = '/moza/berichtenbox/';
				} else if (actie === 'markeer-ongelezen') {
					state.ongelezenToegevoegd[berichtId] = true;
					delete state.gelezen[berichtId];
					opslaan();
					location.href = '/moza/berichtenbox/';
				} else if (actie === 'verplaatsen') {
					toonVerplaatsPaneel(berichtId, btn);
				}
			});
		});
	}

	// Initialisatie
	pasStateToeOpRijen();
	render(huidigeView());
	bindDetailPaginaActies();

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
