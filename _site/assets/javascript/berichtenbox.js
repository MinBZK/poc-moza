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
	if (!wrapper) return;

	const data = window.berichtenboxData;
	if (!data || !Array.isArray(data.berichten) || !Array.isArray(data.mappen) || !Array.isArray(data.magazijnen)) {
		console.error('[Berichtenbox] window.berichtenboxData ontbreekt of is incompleet; script gestopt.');
		return;
	}

	// Eleventy pathPrefix — via window.PATH_PREFIX uit base.njk.
	// pathPrefix moet beginnen met '/'; herstel dat als dat niet zo is.
	let rawPrefix = (typeof window.PATH_PREFIX === 'string' && window.PATH_PREFIX) ? window.PATH_PREFIX : '/';
	if (!rawPrefix.startsWith('/')) rawPrefix = '/' + rawPrefix;
	const PATH_PREFIX = rawPrefix;
	function url(absPath) {
		if (PATH_PREFIX === '/') return absPath;
		return PATH_PREFIX.replace(/\/$/, '') + absPath;
	}
	const POLL_MIN_SEC = 5;
	const NIEUWE_BERICHTEN_LIMIET = 50;

	const LS_KEY = "berichtenbox";

	const defaultState = {
		eersteBezoekGehad: false,
		gelezen: {},
		ongelezenToegevoegd: {},
		gearchiveerd: {},
		verwijderd: {},
		mapOverride: {},
		eigenMappen: [],
		// Via polling binnengekomen berichten; bewaard zodat ze na reload zichtbaar blijven.
		nieuweBerichten: [],
	};

	function readState() {
		try {
			const raw = localStorage.getItem(LS_KEY);
			if (!raw) return { ...defaultState };
			const parsed = JSON.parse(raw);
			if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
				throw new Error('state is geen object');
			}
			const merged = { ...defaultState, ...parsed };
			// Normaliseer types zodat writeState/render niet kunnen crashen op corrupte keys.
			if (!Array.isArray(merged.nieuweBerichten)) merged.nieuweBerichten = [];
			if (!Array.isArray(merged.eigenMappen)) merged.eigenMappen = [];
			['gelezen','ongelezenToegevoegd','gearchiveerd','verwijderd','mapOverride'].forEach((k) => {
				if (!merged[k] || typeof merged[k] !== 'object' || Array.isArray(merged[k])) merged[k] = {};
			});
			return merged;
		} catch (e) {
			console.warn('[Berichtenbox] State corrupt of niet toegankelijk; terugvallen op default.', e);
			return { ...defaultState };
		}
	}

	function writeState(state) {
		if (state.nieuweBerichten.length > NIEUWE_BERICHTEN_LIMIET) {
			state.nieuweBerichten = state.nieuweBerichten.slice(-NIEUWE_BERICHTEN_LIMIET);
		}
		try {
			localStorage.setItem(LS_KEY, JSON.stringify(state));
		} catch (e) {
			// QuotaExceededError of SecurityError (Safari private mode) — laat demo verder draaien.
			console.error('[Berichtenbox] Kon state niet opslaan.', e);
		}
	}

	const state = readState();

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

	function huidigeView() {
		const lijst = document.querySelector('[data-berichtenbox-lijst]');
		const attr = lijst ? lijst.dataset.berichtenboxView : null;
		if (attr) return attr;
		const path = location.pathname;
		if (path.includes('/archief/')) return 'archief';
		if (path.includes('/prullenbak/')) return 'prullenbak';
		return 'inbox';
	}

	const MAANDEN = ['januari','februari','maart','april','mei','juni','juli','augustus','september','oktober','november','december'];

	// Parse "YYYY-MM-DD" direct om timezone-drift te voorkomen (new Date() interpreteert UTC).
	function datumNL(datumStr) {
		if (!datumStr) return '';
		const m = datumStr.match(/^(\d{4})-(\d{2})-(\d{2})$/);
		if (!m) return 'Onbekende datum';
		const mnd = parseInt(m[2], 10);
		if (mnd < 1 || mnd > 12) return 'Onbekende datum';
		return parseInt(m[3], 10) + ' ' + MAANDEN[mnd - 1] + ' ' + parseInt(m[1], 10);
	}

	// Op andere views dan inbox worden statische rijen altijd verborgen; die views worden volledig door JS gevuld.
	function pasStateToeOpRijen() {
		const view = huidigeView();
		const rijen = document.querySelectorAll('.berichtenbox-rij');
		rijen.forEach((rij) => {
			const id = rij.dataset.berichtId;
			const status = statusVan(id);
			if (view === 'inbox') {
				rij.hidden = status !== 'inbox';
				const origineel = rij.classList.contains('is-ongelezen');
				const nu = isOngelezen(id, origineel);
				rij.classList.toggle('is-ongelezen', nu);
			} else {
				rij.hidden = true;
			}
		});
	}

	function render(view) {
		const tellerTotaal = document.querySelector('[data-berichtenbox-teller-totaal]');
		let getoond = 0;
		if (view === 'inbox') {
			getoond = data.berichten.filter((b) => statusVan(b.id) === 'inbox').length;
		} else if (view === 'archief') {
			getoond = Object.keys(state.gearchiveerd).length;
		} else if (view === 'prullenbak') {
			getoond = Object.keys(state.verwijderd).length;
		}
		if (tellerTotaal) tellerTotaal.textContent = getoond;

		const tellerOngelezen = document.querySelector('[data-berichtenbox-teller-ongelezen]');
		if (tellerOngelezen) {
			const n = data.berichten.filter((b) =>
				statusVan(b.id) === 'inbox' && isOngelezen(b.id, b.isOngelezen)
			).length;
			tellerOngelezen.textContent = n;
		}

		const navInbox = document.querySelector('[data-berichtenbox-count="inbox"]');
		if (navInbox) {
			navInbox.textContent = data.berichten.filter((b) => statusVan(b.id) === 'inbox').length;
		}
		const navArchief = document.querySelector('[data-berichtenbox-count="archief"]');
		if (navArchief) navArchief.textContent = Object.keys(state.gearchiveerd).length;
		const navPrullenbak = document.querySelector('[data-berichtenbox-count="prullenbak"]');
		if (navPrullenbak) navPrullenbak.textContent = Object.keys(state.verwijderd).length;

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

	// Inline-paneel i.p.v. <dialog>, omdat het contextueel bij de geklikte knop hoort.
	// Sluit bij Escape, klik buiten het paneel, of herhaalde klik op de openende knop.
	let actiefVerplaatsPaneel = null;
	let actieveVerplaatsKnop = null;
	function sluitVerplaatsPaneel() {
		if (!actiefVerplaatsPaneel) return;
		actiefVerplaatsPaneel.remove();
		if (actieveVerplaatsKnop) actieveVerplaatsKnop.setAttribute('aria-expanded', 'false');
		actiefVerplaatsPaneel = null;
		actieveVerplaatsKnop = null;
	}
	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape' && actiefVerplaatsPaneel) sluitVerplaatsPaneel();
	});
	document.addEventListener('click', (e) => {
		if (!actiefVerplaatsPaneel) return;
		if (actiefVerplaatsPaneel.contains(e.target)) return;
		if (actieveVerplaatsKnop && actieveVerplaatsKnop.contains(e.target)) return;
		sluitVerplaatsPaneel();
	});

	function toonVerplaatsPaneel(berichtId, knop) {
		if (actiefVerplaatsPaneel) {
			sluitVerplaatsPaneel();
			return;
		}
		const alleMappen = [
			...data.mappen,
			...state.eigenMappen,
		];

		const paneel = document.createElement('div');
		paneel.className = 'berichtenbox-verplaats-paneel';
		paneel.setAttribute('role', 'group');
		paneel.setAttribute('aria-label', 'Verplaats bericht naar map');

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
		nieuweMapLabel.appendChild(nieuweMapInput);
		const nieuweMapBevestig = document.createElement('button');
		nieuweMapBevestig.type = 'button';
		nieuweMapBevestig.className = 'link-button';
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
				sluitVerplaatsPaneel();
				render(huidigeView());
				updateMapLabelDetail(m.slug);
			});
			li.appendChild(btn);
			ul.appendChild(li);
		});
		if (state.mapOverride[berichtId]) {
			const li = document.createElement('li');
			const btn = document.createElement('button');
			btn.type = 'button';
			btn.className = 'link-button';
			btn.textContent = 'Uit map halen';
			btn.addEventListener('click', () => {
				state.mapOverride[berichtId] = null;
				opslaan();
				sluitVerplaatsPaneel();
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
			sluitVerplaatsPaneel();
			render(huidigeView());
			updateMapLabelDetail(slug);
			voegMapToeAanZijbalk({ slug, naam });
		});
		knop.parentNode.insertBefore(paneel, knop.nextSibling);
		knop.setAttribute('aria-expanded', 'true');
		actiefVerplaatsPaneel = paneel;
		actieveVerplaatsKnop = knop;
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
		if (lijst.querySelector('[data-map-slug="' + map.slug + '"]')) return;
		const li = document.createElement('li');
		li.dataset.mapSlug = map.slug;
		const a = document.createElement('a');
		a.href = url('/moza/berichtenbox/?map=' + map.slug);
		a.textContent = map.naam + ' ';
		const teller = document.createElement('span');
		teller.className = 'berichtenbox-nav-count';
		teller.dataset.berichtenboxCount = 'map:' + map.slug;
		teller.textContent = '0';
		a.appendChild(teller);
		li.appendChild(a);
		lijst.appendChild(li);
	}

	// Dynamische polling-berichten (id start met 'msg-live-') krijgen een <div>-wrapper
	// i.p.v. <a>, omdat er geen statische detailpagina voor bestaat.
	function createRij(bericht) {
		const ongelezen = isOngelezen(bericht.id, bericht.isOngelezen);
		const effMap = mapVan(bericht.id, bericht.map);
		const dynamisch = bericht.id.startsWith('msg-live-');

		const li = document.createElement('li');
		li.className = 'berichtenbox-rij' + (ongelezen ? ' is-ongelezen' : '') + (dynamisch ? ' is-dynamisch' : '');
		li.dataset.berichtId = bericht.id;
		li.dataset.afzenderId = bericht.magazijnId;
		if (effMap) li.dataset.map = effMap;

		const inner = document.createElement(dynamisch ? 'div' : 'a');
		if (!dynamisch) inner.href = url('/moza/berichtenbox/bericht/' + bericht.id + '/');

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
		spanDat.textContent = datumNL(bericht.datum);
		inner.appendChild(spanDat);

		if (bericht.heeftBijlage) {
			// aria-label op <span> wordt door sommige screenreaders genegeerd;
			// daarom aria-hidden op het emoji + visueel-verborgen tekst.
			const spanBij = document.createElement('span');
			spanBij.className = 'berichtenbox-rij-bijlage';
			spanBij.setAttribute('aria-hidden', 'true');
			spanBij.textContent = '📎';
			inner.appendChild(spanBij);
			const bijVh = document.createElement('span');
			bijVh.className = 'visually-hidden';
			bijVh.textContent = 'Heeft bijlage. ';
			inner.appendChild(bijVh);
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
		let items = [];
		if (view === 'archief') {
			items = data.berichten.filter((b) => state.gearchiveerd[b.id]);
		} else if (view === 'prullenbak') {
			items = data.berichten.filter((b) => state.verwijderd[b.id]);
		}
		if (view === 'archief' || view === 'prullenbak') {
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

		if (afzenderPaneel) {
			while (afzenderPaneel.firstChild) afzenderPaneel.removeChild(afzenderPaneel.firstChild);
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

		const mapFilter = mapUitUrl();
		if (mapFilter) {
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
					location.href = url('/moza/berichtenbox/');
				} else if (actie === 'verwijderen') {
					state.verwijderd[berichtId] = true;
					delete state.gearchiveerd[berichtId];
					opslaan();
					location.href = url('/moza/berichtenbox/');
				} else if (actie === 'markeer-ongelezen') {
					state.ongelezenToegevoegd[berichtId] = true;
					delete state.gelezen[berichtId];
					opslaan();
					location.href = url('/moza/berichtenbox/');
				} else if (actie === 'verplaatsen') {
					toonVerplaatsPaneel(berichtId, btn);
				}
			});
		});

		laadBijlagen();
	}

	function laadBijlagen() {
		const bijlSec = document.querySelector('[data-berichtenbox-bijlagen]');
		if (!bijlSec) return;
		const laden = bijlSec.querySelector('[data-berichtenbox-bijlagen-laden]');
		const lijst = bijlSec.querySelector('[data-berichtenbox-bijlagen-lijst]');
		if (!laden || !lijst) {
			console.warn('[Berichtenbox] Bijlage-sectie onvolledig: template-drift?');
			return;
		}

		setTimeout(() => {
			const namen = [
				'Beschikking.pdf',
				'Bijlage-specificatie.pdf',
				'Toelichting.pdf',
				'Overzicht.pdf',
			];
			const aantal = 1 + Math.floor(Math.random() * 3);
			const gekozen = namen.slice(0, aantal);

			while (lijst.firstChild) lijst.removeChild(lijst.firstChild);

			// DOM-methoden i.p.v. innerHTML voorkomen XSS als bronnen ooit dynamisch worden.
			gekozen.forEach((n) => {
				const li = document.createElement('li');
				const a = document.createElement('a');
				a.href = '#';
				a.textContent = n;
				a.addEventListener('click', (e) => e.preventDefault());
				li.appendChild(a);
				lijst.appendChild(li);
			});

			laden.hidden = true;
			lijst.hidden = false;
		}, 1500);
	}

	function toonMappenZijbalk() {
		const kop = document.querySelector('[data-berichtenbox-mappen-kop]');
		const lijst = document.querySelector('[data-berichtenbox-mappen]');
		if (kop) kop.hidden = false;
		if (lijst) lijst.hidden = false;
		state.eigenMappen.forEach(voegMapToeAanZijbalk);
	}

	function voortgangsAnimatie(opKlaar) {
		const wrap = document.querySelector('[data-berichtenbox-voortgang]');
		const lijst = document.querySelector('[data-berichtenbox-lijst]');
		const pagnav = document.querySelector('.berichtenbox-content .pagination');
		if (!wrap || !lijst) { opKlaar(); return; }

		lijst.hidden = true;
		if (pagnav) pagnav.hidden = true;
		wrap.hidden = false;

		const totaalBronnen = data.aantalMagazijnen;
		const totaalBerichten = data.berichten.filter((b) => statusVan(b.id) === 'inbox').length;

		const bronEl = document.querySelector('[data-berichtenbox-voortgang-bron]');
		const totaalEl = document.querySelector('[data-berichtenbox-voortgang-totaal]');
		const gevondenEl = document.querySelector('[data-berichtenbox-voortgang-gevonden]');
		const balk = document.querySelector('[data-berichtenbox-voortgang-balk]');
		if (totaalEl) totaalEl.textContent = totaalBronnen;

		// Simuleer SSE-gedrag: elke bron arriveert op eigen moment. Trekken uit een
		// heavy-tailed verdeling (x^3) zodat de meeste bronnen snel antwoorden, maar
		// een trage staart tot het einde doortikt. Berichten komen mee met hun bron.
		const bronTijden = [];
		for (let i = 0; i < totaalBronnen; i++) {
			const r = Math.random();
			bronTijden.push(Math.pow(r, 3));
		}
		bronTijden.sort((a, b) => a - b);

		const berichtTijden = [];
		for (let i = 0; i < totaalBerichten; i++) {
			const r = Math.random();
			berichtTijden.push(Math.pow(r, 3));
		}
		berichtTijden.sort((a, b) => a - b);

		const duur = 3500;
		const start = performance.now();

		function aantalVoor(tijden, t) {
			// Binary-search lookup: hoeveel tijden <= t?
			let lo = 0, hi = tijden.length;
			while (lo < hi) {
				const mid = (lo + hi) >>> 1;
				if (tijden[mid] <= t) lo = mid + 1; else hi = mid;
			}
			return lo;
		}

		function stap(nu) {
			const t = Math.min(1, (nu - start) / duur);
			const bronnenBinnen = aantalVoor(bronTijden, t);
			const berichtenBinnen = aantalVoor(berichtTijden, t);
			if (bronEl) bronEl.textContent = bronnenBinnen;
			if (gevondenEl) gevondenEl.textContent = berichtenBinnen;
			if (balk) balk.style.inlineSize = ((bronnenBinnen / totaalBronnen) * 100) + '%';
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
		if (!data.magazijnen.length) return;
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
			inhoud: 'Dit is een demo-bericht van ' + mag.naam + '.',
			datum: nu,
			isOngelezen: true,
			map: null,
			heeftBijlage: Math.random() < 0.3,
		};
		state.nieuweBerichten.push(bericht);
		opslaan();

		// Synchroniseer window-data zodat render/filter het nieuwe bericht meenemen.
		data.berichten.unshift(bericht);

		const lijst = document.querySelector('[data-berichtenbox-lijst]');
		if (lijst) {
			const li = createRij(bericht);
			li.classList.add('is-nieuw-binnen');
			lijst.prepend(li);
		}
		render('inbox');

		const live = document.querySelector('[data-berichtenbox-live]');
		if (live) live.textContent = 'Nieuw bericht van ' + bericht.afzender + ': ' + bericht.onderwerp;
	}

	function startPolling() {
		if (huidigeView() !== 'inbox') return;
		// Alleen op pagina 1 — nieuwe berichten landen bovenaan, op pagina 2+ zouden ze onzichtbaar zijn.
		if (/\/pagina-\d+\/$/.test(location.pathname)) return;
		// Niet op detail-pagina's (geen inbox-lijst om aan te prepender).
		if (!document.querySelector('[data-berichtenbox-lijst]')) return;
		const params = new URLSearchParams(location.search);
		const pollParam = parseInt(params.get('poll'), 10);
		let intervalSec = Number.isFinite(pollParam) && pollParam > 0 ? pollParam : 60;
		if (intervalSec < POLL_MIN_SEC) intervalSec = POLL_MIN_SEC;
		const intervalId = setInterval(() => {
			try {
				voegNieuwBerichtToe();
			} catch (e) {
				// Bij corrupte state zou polling elke tick opnieuw gooien; stop om console-spam te voorkomen.
				console.error('[Berichtenbox] Polling gestopt door fout.', e);
				clearInterval(intervalId);
			}
		}, intervalSec * 1000);
	}

	// Herstel eerder via polling binnengekomen berichten na reload.
	if (state.nieuweBerichten.length > 0) {
		state.nieuweBerichten.forEach((b) => {
			if (!data.berichten.some((x) => x.id === b.id)) {
				data.berichten.unshift(b);
			}
		});
		const lijst = document.querySelector('[data-berichtenbox-lijst]');
		if (lijst && huidigeView() === 'inbox' && !(/\/pagina-\d+\/$/.test(location.pathname))) {
			state.nieuweBerichten.forEach((b) => {
				if (lijst.querySelector('[data-bericht-id="' + b.id + '"]')) return;
				lijst.prepend(createRij(b));
			});
		}
	}

	document.querySelectorAll('[data-berichtenbox-reset]').forEach((link) => {
		link.addEventListener('click', (e) => {
			e.preventDefault();
			try {
				localStorage.removeItem(LS_KEY);
			} catch (err) {
				console.error('[Berichtenbox] Kon state niet wissen.', err);
			}
			location.href = url('/moza/berichtenbox/');
		});
	});

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

	// Debug-handle; niet bedoeld voor productiegebruik.
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
