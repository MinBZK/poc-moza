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

		// Map-tellers: tel berichten in inbox per map
		const alleMappen = [...data.mappen, ...state.eigenMappen];
		alleMappen.forEach((m) => {
			const el = document.querySelector(`[data-berichtenbox-count="map:${m.slug}"]`);
			if (!el) return;
			const n = data.berichten.filter((b) => {
				if (statusVan(b.id) !== 'inbox') return false;
				const effMap = (b.id in state.mapOverride) ? state.mapOverride[b.id] : b.map;
				return effMap === m.slug;
			}).length;
			el.textContent = n;
		});
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

	/**
	 * Bouwt een <li> bericht-rij als DOM-element.
	 * Retourneert HTMLLIElement (niet string).
	 * Als bericht.id begint met 'msg-live-', wordt een niet-klikbare <div> gebruikt.
	 */
	function createRij(bericht) {
		const ongelezen = isOngelezen(bericht.id, bericht.isOngelezen);
		const effMap = mapVan(bericht.id, bericht.map);
		const dynamisch = bericht.id.startsWith('msg-live-');
		const MAANDEN = ['januari','februari','maart','april','mei','juni','juli','augustus','september','oktober','november','december'];
		const d = new Date(bericht.datum);
		const datumNL = d.getDate() + ' ' + MAANDEN[d.getMonth()] + ' ' + d.getFullYear();

		const li = document.createElement('li');
		li.className = 'berichtenbox-rij' + (ongelezen ? ' is-ongelezen' : '') + (dynamisch ? ' is-dynamisch' : '');
		li.dataset.berichtId = bericht.id;
		li.dataset.afzenderId = bericht.magazijnId;
		if (effMap) li.dataset.map = effMap;

		// Inner wrapper: <a> voor klikbaar, <div> voor dynamisch
		const inner = document.createElement(dynamisch ? 'div' : 'a');
		if (!dynamisch) inner.href = '/moza/berichtenbox/bericht/' + bericht.id + '/';

		if (ongelezen) {
			const vh = document.createElement('span');
			vh.className = 'visually-hidden';
			vh.textContent = 'Ongelezen. ';
			inner.appendChild(vh);
		}

		const spanAfz = document.createElement('span');
		spanAfz.className = 'berichtenbox-rij-afzender';
		spanAfz.textContent = bericht.afzender;
		inner.appendChild(spanAfz);

		const spanOnd = document.createElement('span');
		spanOnd.className = 'berichtenbox-rij-onderwerp';
		spanOnd.textContent = bericht.onderwerp + (dynamisch ? ' (demo)' : '');
		inner.appendChild(spanOnd);

		const spanDat = document.createElement('span');
		spanDat.className = 'berichtenbox-rij-datum';
		spanDat.textContent = datumNL;
		inner.appendChild(spanDat);

		if (bericht.heeftBijlage) {
			const spanBij = document.createElement('span');
			spanBij.className = 'berichtenbox-rij-bijlage';
			spanBij.setAttribute('aria-label', 'heeft bijlage');
			spanBij.textContent = '📎';
			inner.appendChild(spanBij);
		}

		if (effMap) {
			const spanMap = document.createElement('span');
			spanMap.className = 'berichtenbox-rij-maplabel';
			spanMap.dataset.maplabel = '';
			spanMap.textContent = effMap;
			inner.appendChild(spanMap);
		}

		li.appendChild(inner);
		return li;
	}

	function renderLijstVoorView(view) {
		const lijst = document.querySelector('[data-berichtenbox-lijst]');
		const leeg = document.querySelector('[data-berichtenbox-leeg]');
		if (!lijst) return;
		const data = window.berichtenboxData;
		let items = [];
		if (view === 'archief') {
			items = data.berichten.filter((b) => state.gearchiveerd[b.id]);
		} else if (view === 'prullenbak') {
			items = data.berichten.filter((b) => state.verwijderd[b.id]);
		}
		if (view === 'archief' || view === 'prullenbak') {
			// Leeg eerst, dan rijen toevoegen
			while (lijst.firstChild) lijst.removeChild(lijst.firstChild);
			items.forEach((b) => lijst.appendChild(createRij(b)));
			if (leeg) leeg.hidden = items.length > 0;
		}
	}

	function bindInboxFilters() {
		if (huidigeView() !== 'inbox') return;
		const lijst = document.querySelector('[data-berichtenbox-lijst]');
		if (!lijst) return;

		const zoekInput = document.querySelector('[data-berichtenbox-zoek]');
		const afzenderPaneel = document.querySelector('[data-berichtenbox-afzender-paneel]');

		// Vul afzender-filterpaneel met unieke afzenders uit data (als DOM-elementen)
		if (afzenderPaneel) {
			while (afzenderPaneel.firstChild) afzenderPaneel.removeChild(afzenderPaneel.firstChild);
			const data = window.berichtenboxData;
			const uniek = new Map();
			data.berichten.forEach((b) => uniek.set(b.magazijnId, b.afzender));
			[...uniek.entries()]
				.sort((a, b) => a[1].localeCompare(b[1]))
				.forEach(([id, naam]) => {
					const label = document.createElement('label');
					const cb = document.createElement('input');
					cb.type = 'checkbox';
					cb.value = id;
					cb.dataset.afzenderCheck = '';
					label.appendChild(cb);
					label.appendChild(document.createTextNode(' ' + naam));
					afzenderPaneel.appendChild(label);
				});
		}

		function mapUitUrl() {
			const params = new URLSearchParams(location.search);
			return params.get('map');
		}

		function pasFilterToe() {
			const zoek = (zoekInput ? zoekInput.value : '').trim().toLowerCase();
			const gekozenAfzenders = new Set(
				[...document.querySelectorAll('[data-afzender-check]:checked')].map((c) => c.value)
			);
			const mapFilter = mapUitUrl();
			let zichtbaar = 0;
			document.querySelectorAll('.berichtenbox-rij').forEach((rij) => {
				if (statusVan(rij.dataset.berichtId) !== 'inbox') {
					rij.hidden = true;
					return;
				}
				let match = true;
				if (zoek) {
					const afzEl = rij.querySelector('.berichtenbox-rij-afzender');
					const ondEl = rij.querySelector('.berichtenbox-rij-onderwerp');
					const tekst = ((afzEl ? afzEl.textContent : '') + ' ' + (ondEl ? ondEl.textContent : '')).toLowerCase();
					if (!tekst.includes(zoek)) match = false;
				}
				if (gekozenAfzenders.size > 0) {
					if (!gekozenAfzenders.has(rij.dataset.afzenderId)) match = false;
				}
				if (mapFilter) {
					const dataMap = rij.dataset.map;
					const overrideMap = state.mapOverride[rij.dataset.berichtId];
					const effectieveMap = (rij.dataset.berichtId in state.mapOverride) ? overrideMap : dataMap;
					if (effectieveMap !== mapFilter) match = false;
				}
				rij.hidden = !match;
				if (match) zichtbaar++;
			});
			const leeg = document.querySelector('[data-berichtenbox-leeg]');
			if (leeg) leeg.hidden = zichtbaar > 0;
		}

		if (zoekInput) zoekInput.addEventListener('input', pasFilterToe);
		if (afzenderPaneel) afzenderPaneel.addEventListener('change', pasFilterToe);

		// Als er een map-filter actief is, toon dat visueel in de kop
		const mapFilter = mapUitUrl();
		if (mapFilter) {
			const data = window.berichtenboxData;
			const mapObj = [...data.mappen, ...state.eigenMappen].find((m) => m.slug === mapFilter);
			if (mapObj) {
				const kop = document.querySelector('.berichtenbox h1');
				if (kop) kop.textContent = 'Berichtenbox — ' + mapObj.naam;
			}
		}
		pasFilterToe();
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

	function toonMappenZijbalk() {
		const kop = document.querySelector('[data-berichtenbox-mappen-kop]');
		const lijst = document.querySelector('[data-berichtenbox-mappen]');
		if (kop) kop.hidden = false;
		if (lijst) lijst.hidden = false;
		// Voeg eigen mappen toe
		state.eigenMappen.forEach(voegMapToeAanZijbalk);
	}

	function voortgangsAnimatie(opKlaar) {
		const wrap = document.querySelector('[data-berichtenbox-voortgang]');
		const lijst = document.querySelector('[data-berichtenbox-lijst]');
		const pagnav = document.querySelector('.berichtenbox-content .pagination');
		if (!wrap || !lijst) { opKlaar(); return; }

		// Verberg lijst tijdens animatie
		lijst.hidden = true;
		if (pagnav) pagnav.hidden = true;
		wrap.hidden = false;

		const data = window.berichtenboxData;
		const totaalBronnen = data.aantalMagazijnen;
		const duur = 3000; // ms
		const start = performance.now();

		const bronEl = document.querySelector('[data-berichtenbox-voortgang-bron]');
		const totaalEl = document.querySelector('[data-berichtenbox-voortgang-totaal]');
		const gevondenEl = document.querySelector('[data-berichtenbox-voortgang-gevonden]');
		const balk = document.querySelector('[data-berichtenbox-voortgang-balk]');
		if (totaalEl) totaalEl.textContent = totaalBronnen;

		// Aantal berichten dat in de inbox hoort (dynamisch, rekening houdend met state)
		const totaalBerichten = data.berichten.filter((b) => statusVan(b.id) === 'inbox').length;

		function stap(nu) {
			const t = Math.min(1, (nu - start) / duur);
			const eased = 1 - Math.pow(1 - t, 2);
			if (bronEl) bronEl.textContent = Math.floor(eased * totaalBronnen);
			if (gevondenEl) gevondenEl.textContent = Math.floor(eased * totaalBerichten);
			if (balk) balk.style.inlineSize = (eased * 100) + '%';
			if (t < 1) {
				requestAnimationFrame(stap);
			} else {
				wrap.hidden = true;
				lijst.hidden = false;
				if (pagnav) pagnav.hidden = false;
				opKlaar();
			}
		}
		requestAnimationFrame(stap);
	}

	let nieuwBerichtTeller = 0;

	function voegNieuwBerichtToe() {
		if (huidigeView() !== 'inbox') return;
		const data = window.berichtenboxData;
		nieuwBerichtTeller++;
		const mag = data.magazijnen[Math.floor(Math.random() * data.magazijnen.length)];
		const nu = new Date().toISOString().slice(0, 10);
		const id = 'msg-live-' + Date.now() + '-' + nieuwBerichtTeller;
		const onderwerpen = [
			'Nieuw bericht ontvangen',
			'Bevestiging ontvangst',
			'Bericht beschikbaar',
			'Actie mogelijk vereist',
		];
		const bericht = {
			id,
			magazijnId: mag.id,
			afzender: mag.naam,
			onderwerp: onderwerpen[Math.floor(Math.random() * onderwerpen.length)],
			inhoud: 'Dit is een automatisch toegevoegd demo-bericht van ' + mag.naam + '. In productie zou dit een echt bericht uit het magazijn zijn.',
			datum: nu,
			isOngelezen: true,
			map: null,
			heeftBijlage: Math.random() < 0.3,
		};
		state.nieuweBerichten.push(bericht);
		opslaan();

		// Voeg ook toe aan window-data zodat render/filter het meenemen
		data.berichten.unshift(bericht);

		// Render nieuw rij bovenaan
		const lijst = document.querySelector('[data-berichtenbox-lijst]');
		if (lijst) {
			const li = createRij(bericht);
			li.classList.add('is-nieuw-binnen');
			lijst.prepend(li);
		}
		render('inbox');

		// Announceer voor screenreaders
		const live = document.querySelector('[data-berichtenbox-live]');
		if (live) live.textContent = 'Nieuw bericht van ' + bericht.afzender + ': ' + bericht.onderwerp;
	}

	function startPolling() {
		if (huidigeView() !== 'inbox') return;
		// Alleen op de eerste inbox-pagina — nieuwe berichten landen bovenaan daar
		if (/\/pagina-\d+\/$/.test(location.pathname)) return;
		const params = new URLSearchParams(location.search);
		const pollParam = parseInt(params.get('poll'), 10);
		const intervalSec = Number.isFinite(pollParam) && pollParam > 0 ? pollParam : 60;
		setInterval(voegNieuwBerichtToe, intervalSec * 1000);
	}

	// Herstel eerder gepolde berichten (na reload): voeg ze aan data toe
	if (state.nieuweBerichten.length > 0) {
		const data = window.berichtenboxData;
		state.nieuweBerichten.forEach((b) => {
			if (!data.berichten.some((x) => x.id === b.id)) {
				data.berichten.unshift(b);
			}
		});
		// De statisch gegenereerde HTML bevat deze niet — voeg dynamisch toe
		const lijst = document.querySelector('[data-berichtenbox-lijst]');
		if (lijst && huidigeView() === 'inbox' && !(/\/pagina-\d+\/$/.test(location.pathname))) {
			state.nieuweBerichten.forEach((b) => {
				if (lijst.querySelector('[data-bericht-id="' + b.id + '"]')) return;
				lijst.prepend(createRij(b));
			});
		}
	}

	// Initialisatie
	pasStateToeOpRijen();
	renderLijstVoorView(huidigeView());
	render(huidigeView());
	bindDetailPaginaActies();

	const isEerstePagina = !/\/pagina-\d+\/$/.test(location.pathname);

	if (huidigeView() === 'inbox' && isEerstePagina && !state.eersteBezoekGehad) {
		voortgangsAnimatie(() => {
			state.eersteBezoekGehad = true;
			opslaan();
			toonMappenZijbalk();
			bindInboxFilters();
			startPolling();
		});
	} else {
		toonMappenZijbalk();
		bindInboxFilters();
		startPolling();
	}

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
