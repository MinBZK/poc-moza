# Ontwerp — FBS Berichtenbox in MOZa

**Datum:** 13 april 2026
**Branch:** `add-fbs-berichtenbox`
**Backend-referentie:** [MinBZK/moza-poc-fbs-berichtenbox](https://github.com/MinBZK/moza-poc-fbs-berichtenbox)

## Doel

Een mock-frontend in het MOZa-prototype die laat zien hoe het Federatief Berichtenstelsel (FBS) werkt voor ondernemers: één inbox waarin berichten uit honderden overheidsmagazijnen samenkomen. De ondernemer ervaart één plek; het federatieve aspect zit in het *gedrag* (meerdere bronnen ophalen, later aangemelde berichten, asynchroon bijlage-ophalen) en niet in een bijzondere layout.

## Uitgangspunten

- **Eén geïntegreerde inbox**, niet gegroepeerd of gefilterd per organisatie. De afzender is per rij te zien, dat is voldoende.
- **Federatie = gedrag**: zichtbaar bij (1) eerste opbouw via een voortgangsindicator, (2) later binnenkomende berichten via auto-polling, (3) asynchroon bijlage-ophalen op de detail-pagina, en (4) mappen die uit bericht-metadata komen en pas na ophalen verschijnen.
- **MOZa-stijl**: semantische HTML eerst, CSS logical properties, toepassingstokens, "u"-aanspreking, B1-taalniveau, geen nieuwe UI-patronen die elders niet voorkomen.
- **Geen frameworks**, geen preprocessors. Eleventy voor templating, plain JS voor gedrag.

## Pagina-architectuur

De bestaande `moza/berichtenbox.html` ("binnenkort beschikbaar") wordt vervangen. De feature-flag `Berichtenbox` in `moza.json` blijft bestaan en schakelt straks de nieuwe inbox in/uit.

### Routes

| URL | Inhoud |
|---|---|
| `/moza/berichtenbox/` | Inbox (standaard) |
| `/moza/berichtenbox/archief/` | Gearchiveerde berichten |
| `/moza/berichtenbox/prullenbak/` | Verwijderde berichten |
| `/moza/berichtenbox/bericht/{id}/` | Detail-pagina per bericht |

**Mappen krijgen geen eigen route.** Eleventy is statisch en gebruikers maken mappen runtime aan; een build-time route heeft geen betekenis voor pas-later-aangemaakte mappen. Klikken op een map in de zijbalk filtert de huidige Inbox-weergave client-side. Voor URL-deelbaarheid gebruiken we een query-parameter op de inbox: `/moza/berichtenbox/?map=belastingen-2025`. JS leest die parameter en filtert.

Query-parameter `?poll=N` op de inbox zet de interval van auto-polling op N seconden (standaard 60). Subtiel, URL-deelbaar voor demo's.

### Pagina-structuur

Binnen de berichtenbox-pagina's komt een **lokale zijbalk** (onderscheiden van MOZa's hoofdnavigatie) met:

- Inbox (met teller ongelezen)
- Archief
- Prullenbak
- ——
- Mappen (alfabetisch, elk met teller; verschijnen pas na eerste laden)

Bovenaan de inbox:
- Prominente teller: `X berichten · Y ongelezen`
- Subtiele secundaire regel: `opgehaald uit N bronnen`
- Zoekveld (zoekt in afzender + onderwerp)
- Filterknop "Afzender" → paneel met de afzenders die daadwerkelijk berichten leverden (niet alle 384)

Pagineren onderaan, consistent met bestaande paginering in MOZa.

## Eerste bezoek en federatief gedrag

### Eerste opbouw

Bij eerste bezoek in een browser-sessie (gemarkeerd via `localStorage`) is de inbox-pagina meteen aanwezig met z'n volledige layout (zijbalk, kop, zoekveld), maar het content-gebied waar de berichtenlijst zou staan, toont een voortgangsindicator:

> Berichten ophalen…
> **127 van 384 bronnen** · 23 berichten gevonden

Rustige progressie zonder visuele drukte: voortgangsbalk of percentage + oplopende getallen. Na circa 3 seconden verschijnt in één keer: de volledige lijst, de definitieve teller, en de mappen in de zijbalk (inclusief twee voorgevulde mappen).

Geen "waves" van rijen die één voor één verschijnen — dat is afgewezen als onrustig.

### Auto-polling (nieuwe berichten)

Elke 60 seconden (of zoals ingesteld via `?poll=`) verschijnt er één bericht bovenaan de inbox:
- Korte fade-in
- Subtiele markering "nieuw" tot de gebruiker interacteert (scrollt, klikt)
- Tellers lopen op (`totaal`, `ongelezen`)
- De binnenkomer kan uit een magazijn komen dat eerder stil was — laat zien dat ook bron 385 alsnog iets kan leveren

### Asynchroon bijlage-ophalen (detail-pagina)

Op de detail-pagina is de inhoud direct zichtbaar (die zit in de sessiecache). Bijlagen daarentegen worden *apart* bij het magazijn opgehaald. Dit visualiseren we met:

> Bijlagen ophalen bij {magazijn-naam}…

Spinner of rustige voortgang; na ±1,5 seconde verschijnt de lijst met bijlagen (klikbaar maar niet-functioneel, of opent een placeholder). Dit is een tweede, natuurlijk federatief moment, consistent met de backend-architectuur.

### Persistentie

- Vlag "eerste bezoek gehad" in `localStorage`, zodat navigatie tussen pagina's de demo niet herstart
- Gelezen/ongelezen, archief, prullenbak, mappen en map-toewijzingen: `localStorage`
- Paginafooter-link "Demo opnieuw starten" wist de sessie-vlag + alle state en herlaadt

## Inbox-lijst

Semantisch een `<ul>` met per bericht een `<li>`. Rij-inhoud:

- Ongelezen-indicator (stip links + vette tekst)
- Afzender (bijv. "Gemeente Utrecht", "Belastingdienst")
- Onderwerp (primaire klikbare tekst → detail-pagina)
- Datum rechts (dag maand jaar, volledige maandnaam)
- Subtiel label als het bericht in een map zit (bijv. "Belastingen 2025")
- Bijlage-icoon indien van toepassing (alleen visueel, niet interactief vanuit de lijst)

Standaardsortering: nieuwste eerst. **Geen inline acties** in de lijst — dat zou een overflow-menu of brede action-group op elke rij betekenen, wat niet past bij MOZa's rustige lijst-stijl. Acties gebeuren op de detail-pagina.

## Detail-pagina

Opbouw:

1. Breadcrumb: Home › Berichtenbox › \[onderwerp]
2. Heading = onderwerp
3. Metadata: afzender, datum, (optioneel) maplabel
4. Actieknoppen bovenaan: **Archiveren** (primaire knop), **Verplaatsen naar map…** (secundaire knop), **Markeer als ongelezen** (link-button), **Verwijderen** (link-button). MOZa-knopstijlen.
5. Inhoud van het bericht (2-4 zinnen placeholder per bericht)
6. Bijlagen-sectie onderaan met async ophaal-simulatie

"Verplaatsen naar map…" opent een klein paneel met bestaande mappen + optie "Nieuwe map aanmaken" (inputveld). Nieuwe map verschijnt direct in de zijbalk en is selecteerbaar.

## Acties en mappen

| Actie | Effect |
|---|---|
| Archiveren | Bericht weg uit Inbox → zichtbaar in Archief |
| Verwijderen | Bericht → Prullenbak |
| Verplaatsen naar map | Bericht krijgt label van de gekozen (of nieuw aangemaakte) map; blijft in Inbox tenzij ook gearchiveerd |
| Markeer als ongelezen | Zet `isOngelezen: true` terug; tellers reageren |

Mappen zijn gebruikerskeuze. Twee worden voorgevuld uit de mock-data (*Belastingen 2025*, *Subsidies*) om het patroon direct zichtbaar te maken. Een bericht kan in maximaal één map. Mappen verschijnen pas in de zijbalk nadat het eerste laden klaar is, consistent met "mappen zijn metadata uit het magazijn".

## Data

Één bestand: `_data/berichtenbox.json`.

### Magazijnen

Ongeveer 400 items, elk:

```json
{
  "id": "gem-utrecht",
  "naam": "Gemeente Utrecht",
  "type": "gemeente"
}
```

`type` is `"gemeente"` of `"instantie"`. Instanties (±10): Belastingdienst, KVK, RVO, SVB, UWV, RDW, CBS, IND, AP, Kadaster. Rest zijn Nederlandse gemeentes (echte namen). Dit geeft een realistische federatie-omvang waar de meeste bronnen stil blijven.

### Berichten

Circa 100-150 verspreid over 20-30 magazijnen, elk:

```json
{
  "id": "msg-0001",
  "magazijnId": "gem-utrecht",
  "afzender": "Gemeente Utrecht",
  "onderwerp": "Aanslag toeristenbelasting 2025",
  "inhoud": "Uw voorlopige aanslag toeristenbelasting 2025 is beschikbaar…",
  "datum": "2026-02-19",
  "isOngelezen": true,
  "map": null,
  "heeftBijlage": true
}
```

`afzender` is afgeleid van `magazijnId`, maar we nemen het ook expliciet op in de data zodat renderen simpel blijft. `map` is `null` of een map-slug. Een handvol berichten heeft `map: "belastingen-2025"` of `map: "subsidies"` zodat de voorgevulde mappen meteen gevuld zijn.

Datums over de afgelopen ~6 maanden verspreid, zodat de lijst realistisch oogt en pagineren zin heeft.

## Technische aanpak

- **Eleventy** genereert inbox-pagina's (Inbox, Archief, Prullenbak, per map) statisch uit `_data/berichtenbox.json`
- **Detail-pagina's** via pagination in Eleventy: één HTML-bestand per bericht
- **Nunjucks-includes** voor herhalende onderdelen (berichtenbox-zijbalk, bericht-rij, voortgangsindicator)
- **JavaScript** (`assets/javascript/berichtenbox.js`) voor:
  - Eerste-bezoek-voortgang en reveal
  - Auto-polling (60s, overridebaar via `?poll=`)
  - Zoek- en filter-interactie (client-side op gerenderde lijst)
  - Acties (archiveren, verwijderen, verplaatsen, markeer ongelezen) → DOM-manipulatie + `localStorage`
  - Asynchroon bijlage-ophalen op detail-pagina (`setTimeout`)
  - Reset-link in paginafooter
- **CSS** in `style/style.css`, uitsluitend `--toepassing-*`-tokens, `inline-size`/`block-size` etc. Nieuwe klassen voor berichtenbox-specifieke elementen (lijst, voortgangsindicator, zijbalk, teller, ongelezen-markering)
- **Zonder JS** werkt de lijst gewoon: inbox is server-gerenderd, klikken op bericht werkt, filteren/zoeken/acties zijn dan niet beschikbaar. Dit past bij MOZa's "platform boven framework"-principe

## Toegankelijkheid

- Ongelezen-indicatie niet alleen via kleur/vet: ook via `aria-label` of visueel-verborgen "Ongelezen"-tekst
- Voortgangsindicator gebruikt `role="status"` met `aria-live="polite"` zodat screenreaders de voortgang krijgen, maar niet schreeuwerig
- Nieuwe-bericht-animatie ook met `aria-live="polite"` op een annoncerings-regio ("Nieuw bericht van {afzender}: {onderwerp}")
- Alle acties bereikbaar via toetsenbord; `:focus-visible` consistent met MOZa

## Storybook

Bij het implementeren worden bestaande patronen herbruikt waar mogelijk. Als er patroonbeschrijving nodig is voor een nieuw element (berichtenbox-lijst, voortgangsindicator, lokale zijbalk) kan dat in een aparte story. Niet verplicht voor deze eerste versie, maar meenemen waar het de implementatie verheldert.

## Schrijfwijzer — afwijking vastgelegd

MOZa's schrijfwijzer schrijft voor: *"Niet relevant (niet Verbergen, Verwijderen)"* en *"Bewaar (niet Opslaan, Favoriet)"*. Deze regel geldt voor de actualiteiten-feed: iets weghalen uit je feed heet "niet relevant", niet "verwijderen".

In de Berichtenbox is het ander gedrag: een bericht daadwerkelijk wegwerken in een prullenbak. "Niet relevant" dekt dat niet. We gebruiken daarom expliciet: *Archiveren*, *Verwijderen*, *Verplaatsen naar map*. *Bewaar* doet niet mee in Berichtenbox.

## Wat bewust niet in dit ontwerp zit

- Bulk-selectie ("meerdere berichten tegelijk archiveren")
- Sorteren op iets anders dan datum
- Beantwoorden, doorsturen, delen van berichten
- Een echt beheer-scherm voor mappen (hernoemen/verwijderen) — alleen aanmaken en plaatsen
- Notificatie-instellingen per magazijn (sluit aan bij een latere FBS-iteratie, zit in de bestaande `Contactvoorkeuren`)
- Échte data-fetching (alles komt uit een statisch JSON-bestand)
- Authenticatie of gebruikerscontext

Deze beperken de scope tot wat het FBS-verhaal moet vertellen. Latere uitbreidingen kunnen in eigen ontwerpen.
