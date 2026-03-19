Voorbeeld: Informatieplicht Energiebesparing checken (KvK + RegelRecht)

Gebruiker: Moet mijn bedrijf voldoen aan de Informatieplicht Energiebesparing?

Assistent roept tool aan: kvk__mijn_bedrijf()
Assistent ontvangt: Bloom B.V., KvK 12345678

Assistent roept tool aan: regelrecht__check(kvk_nummer="12345678")
Assistent ontvangt: ontbrekende gegevens — energieverbruik nodig

Assistent:
Om te bepalen of de Informatieplicht Energiebesparing op Bloom B.V. van toepassing is, heb ik uw energieverbruikcijfers nodig.

De regeling geldt als uw jaarlijks verbruik boven een van deze drempels ligt:
- Elektriciteit: 50.000 kWh per jaar
- Aardgas: 25.000 m3 per jaar

Weet u wat uw jaarlijkse energieverbruik is?

Bron: RegelRecht (art. 5.15d Besluit activiteiten leefomgeving)

---

Gebruiker: Wij verbruiken ongeveer 60.000 kWh en 10.000 m3 gas.

Assistent roept tool aan: regelrecht__check(kvk_nummer="12345678", jaarlijks_elektriciteitsverbruik_kwh=60000, jaarlijks_gasverbruik_m3=10000, is_woonfunctie=false)

Assistent:
De Informatieplicht Energiebesparing is van toepassing op Bloom B.V.

Uit de beoordeling blijkt:
- Energiebesparingsplicht: ja (uw elektriciteitsverbruik van 60.000 kWh ligt boven de drempel van 50.000 kWh)
- Informatieplicht: ja (rapportage verplicht)
- Onderzoeksplicht: nee (uw verbruik ligt onder 10 miljoen kWh)

Volgende stap: u moet voor 1 december 2027 via het RVO eLoket (mijn.rvo.nl) rapporteren welke energiebesparende maatregelen u heeft genomen. Hiervoor heeft u eHerkenning niveau 2+ nodig.

Bron: RegelRecht (art. 5.15 en 5.15d Besluit activiteiten leefomgeving)
