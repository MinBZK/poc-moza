# Testvragen Digitale Assistent

| Veld   | Waarde       |
|--------|--------------|
| Datum  | 2026-03-19   |
| Doel   | Handmatige testvragen per tool en per toolcombinatie |

## Individuele tools

### KvK -- `mijn_bedrijf`

1. "Wat zijn de gegevens van mijn bedrijf?"
2. "Hoeveel werknemers heeft mijn bedrijf en wat is onze SBI-code?"

### KOOP -- `zoek_regelgeving`

1. "Welke wetgeving is er over energiebesparing?"
2. "Zoek regelgeving over arbeidsomstandigheden."

### RegelRecht -- `check`

1. "Moet ik voldoen aan de informatieplicht energiebesparing?"
2. "Is de informatieplicht van toepassing als mijn bedrijf 60.000 kWh per jaar verbruikt?"

### RVO -- `zoek_regeling`

1. "Welke subsidies zijn er voor warmtepompen?"
2. "Zijn er openstaande regelingen voor energiebesparing?"

### RVO -- `indienen`

1. "Ik wil mijn energiebesparingsrapportage indienen voor EBR-2026. De maatregelen zijn LED-verlichting en HR++ beglazing."
2. "Dien een rapportage in voor regeling EBR-2026 met maatregelen: dakisolatie, zonnepanelen en warmtepomp."

---

## Toolcombinaties (2 tools)

### KvK + RegelRecht

1. "Is de informatieplicht energiebesparing op mijn bedrijf van toepassing?"
   -> KvK `mijn_bedrijf` (bedrijfsgegevens ophalen) -> RegelRecht `check` (KvK-nummer doorgeven)
2. "Aan welke energieverplichtingen moet mijn bedrijf voldoen?"

### KvK + KOOP

1. "Welke wetgeving is relevant voor de sector waarin mijn bedrijf actief is?"
   -> KvK `mijn_bedrijf` (SBI-code ophalen) -> KOOP `zoek_regelgeving` (zoeken op sector)
2. "Mijn bedrijf zit in de horeca -- welke regelgeving geldt voor ons?"

### KvK + RVO `zoek_regeling`

1. "Voor welke subsidies komt mijn bedrijf in aanmerking?"
   -> KvK `mijn_bedrijf` (bedrijfsprofiel) -> RVO `zoek_regeling` (zoeken op relevante termen)
2. "Zijn er openstaande RVO-regelingen die relevant zijn voor mijn bedrijf?"

### KvK + RVO `indienen`

1. "Dien de energiebesparingsrapportage in voor mijn bedrijf met maatregelen: LED-verlichting en spouwmuurisolatie."
   -> KvK `mijn_bedrijf` (KvK-nummer ophalen) -> RVO `indienen` (indienen met KvK-nummer)
2. "Ik wil rapporteren dat ik dakisolatie en een warmtepomp heb geinstalleerd. Dien dit in bij RVO."

### KOOP + RegelRecht

1. "Wat zegt de wet over de informatieplicht energiebesparing, en is die op mijn bedrijf van toepassing?"
   -> KOOP `zoek_regelgeving` (wettekst zoeken) -> RegelRecht `check` (toetsen)
2. "Zoek de wettelijke grondslag van de informatieplicht en controleer of die geldt bij een verbruik van 30.000 kWh."

### RVO `zoek_regeling` + RVO `indienen`

1. "Zoek de regeling voor energiebesparing en dien mijn rapportage in met maatregelen: HR-ketel en LED."
   -> RVO `zoek_regeling` (regeling-ID vinden) -> RVO `indienen` (indienen met gevonden ID)
2. "Welke energiebesparingsregeling is er? En dien daar mijn rapportage voor in."

---

## Toolcombinaties (3+ tools)

### KvK + RegelRecht + RVO `indienen`

1. "Moet ik een energiebesparingsrapportage indienen? Zo ja, doe dat dan met de maatregelen LED-verlichting en warmtepomp."
   -> KvK `mijn_bedrijf` -> RegelRecht `check` -> als plicht geldt: RVO `indienen`
2. "Controleer of de informatieplicht op mijn bedrijf van toepassing is en dien een rapportage in met dakisolatie en zonnepanelen."

### KvK + KOOP + RegelRecht

1. "Wat zijn mijn verplichtingen op het gebied van energiebesparing? Geef ook de wettelijke onderbouwing."
   -> KvK `mijn_bedrijf` -> RegelRecht `check` -> KOOP `zoek_regelgeving` (wettekst)
2. "Leg uit welke energiewetgeving op mijn bedrijf van toepassing is, met verwijzing naar de relevante wetsartikelen."

### KvK + RVO `zoek_regeling` + RVO `indienen` + RegelRecht

1. "Kijk of ik moet rapporteren, zoek de juiste regeling, en dien de rapportage in met maatregelen: LED, isolatie en warmtepomp."
   -> KvK `mijn_bedrijf` -> RegelRecht `check` -> RVO `zoek_regeling` -> RVO `indienen`
2. "Help me van begin tot eind: controleer mijn verplichtingen, vind de juiste regeling en dien mijn rapportage in."
