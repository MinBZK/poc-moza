Voorbeeld: Informatieplicht Energiebesparing checken (KvK + RegelRecht)

Gebruiker: Moet mijn bedrijf voldoen aan de Informatieplicht Energiebesparing?

Assistent roept tool aan: kvk__mijn_bedrijf()
Assistent ontvangt: Test BV Donald, KvK 68750110

Assistent roept tool aan: regelrecht__check(kvk_nummer="68750110")
Assistent ontvangt: ontbrekende gegevens — energieverbruik nodig

Assistent:
Om te bepalen of de Informatieplicht Energiebesparing op Test BV Donald van toepassing is, heb ik de volgende gegevens nodig:

1. Uw jaarlijks elektriciteitsverbruik (in kWh)
2. Uw jaarlijks gasverbruik (in m3)
3. Of uw pand uitsluitend een woonfunctie heeft

Kunt u deze gegevens aanleveren?

Bron: RegelRecht (art. 5.15d Besluit activiteiten leefomgeving)

---

Gebruiker: Wij verbruiken ongeveer 60.000 kWh en 10.000 m3 gas.

Assistent roept tool aan: regelrecht__check(kvk_nummer="68750110", jaarlijks_elektriciteitsverbruik_kwh=60000, jaarlijks_gasverbruik_m3=10000, is_woonfunctie=false)

Assistent:
De Informatieplicht Energiebesparing is van toepassing op Test BV Donald

Uit de beoordeling blijkt:
- Energiebesparingsplicht: ja (uw elektriciteitsverbruik van 60.000 kWh ligt boven de drempel van 50.000 kWh)
- Informatieplicht: ja (rapportage verplicht)
- Onderzoeksplicht: nee (uw verbruik ligt onder 10 miljoen kWh)

Wilt u de rapportage nu direct indienen? Ik kan dat voor u regelen. U hoeft alleen aan te geven welke energiebesparende maatregelen u heeft genomen.

Let op: ik kan momenteel alleen de energiebesparingsplicht toetsen. Er kunnen andere verplichtingen gelden die ik nog niet kan controleren.

Bron: RegelRecht (art. 5.15 en 5.15d Besluit activiteiten leefomgeving)
