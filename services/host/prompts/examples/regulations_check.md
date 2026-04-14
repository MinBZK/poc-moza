Voorbeeld: Informatieplicht Energiebesparing checken (KvK + BAG + RegelRecht + RVO)

Gebruiker: Moet mijn bedrijf voldoen aan de Informatieplicht Energiebesparing?

Assistent roept tool aan: kvk__mijn_bedrijf()
Assistent ontvangt: Test BV Donald, KvK 68750110, adres Hizzaarderlaan 3A Lollum, BAG: gebruiksdoel industriefunctie, is_woonfunctie: false

Assistent roept tool aan: regelrecht__check(kvk_nummer="68750110", is_woonfunctie=false)
Assistent ontvangt: ontbrekende gegevens — energieverbruik nodig

Assistent:
Uw bedrijf: Test BV Donald (KvK 68750110)
Vestiging: Hizzaarderlaan 3A, Lollum
Woonfunctie: nee

Om de informatieplicht te toetsen heb ik nog het volgende nodig:

- Jaarlijks elektriciteitsverbruik: ___ kWh
- Jaarlijks gasverbruik: ___ m³

Bron: KvK Handelsregister

---

Gebruiker: 60.000 kWh elektriciteit en 10.000 m3 gas

Assistent roept tool aan: regelrecht__check(kvk_nummer="68750110", jaarlijks_elektriciteitsverbruik_kwh=60000, jaarlijks_gasverbruik_m3=10000, is_woonfunctie=false)
Assistent roept tool aan: rvo__zoek_regeling(trefwoord="informatieplicht energiebesparing")

Assistent:
De Informatieplicht Energiebesparing is van toepassing op Test BV Donald.

- Energiebesparingsplicht: ja (60.000 kWh > drempel 50.000 kWh)
- Informatieplicht: ja
- Onderzoeksplicht: nee

U kunt de rapportage direct hier indienen. Daarvoor heb ik nog het volgende nodig:

- Genomen energiebesparende maatregelen: ___

Voorbeelden: LED-verlichting, HR++ beglazing, spouwmuurisolatie, warmtepomp, aanwezigheidsdetectie

Let op: ik kan momenteel alleen de energiebesparingsplicht toetsen. Er kunnen andere verplichtingen gelden.

Bron: RegelRecht (art. 5.15 en 5.15d Besluit activiteiten leefomgeving)

---

Gebruiker: LED-verlichting en spouwmuurisolatie

Assistent:
Controleer de rapportage:

Inputwaarden:
- Bedrijf: Test BV Donald (KvK 68750110)
- Vestiging: Hizzaarderlaan 3A, Lollum
- Gebruiksdoel pand: industriefunctie
- Woonfunctie: nee
- Elektriciteitsverbruik: 60.000 kWh/jaar
- Gasverbruik: 10.000 m³/jaar

Berekening:
- Drempel elektriciteit: 60.000 kWh > 50.000 kWh — overschreden
- Drempel aardgas: 10.000 m³ < 25.000 m³ — niet overschreden
- Woonfunctie-uitzondering: nee

Uitkomst:
- Energiebesparingsplicht: ja
- Informatieplicht: ja
- Onderzoeksplicht: nee

Regeling: Informatieplicht Energiebesparing (EBR-2026)

Maatregelen:
1. LED-verlichting
2. Spouwmuurisolatie

Klopt dit? Dan dien ik het voor u in.

---

Gebruiker: Klopt, dien in

Assistent roept tool aan: rvo__indienen(kvk_nummer="68750110", regeling_id="EBR-2026", maatregelen=["LED-verlichting", "Spouwmuurisolatie"])

Assistent:
Uw rapportage is ingediend.

Referentienummer: RVO-EBR-2026-68750110-001
Status: In behandeling

Wat er nu gebeurt:
1. U ontvangt een bevestiging per e-mail
2. RVO beoordeelt uw rapportage
3. Volgende rapportage: over 4 jaar

U kunt de voortgang en het volledige verslag van deze zaak terugvinden onder 'Lopende zaken' op MijnOverheid Zakelijk.

Bron: RVO
