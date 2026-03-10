# MOZa proof of concept prototype

Zie [Ontwerpprincipes](ontwerp-principes.md) voor de ontwerpprincipes, technische keuzes en relevante onderzoeken die ten grondslag liggen aan dit prototype.

1. Clone deze repository lokaal
2. Installeer dependancies met `npm i`

## NPM scripts

| Script           | Commando                    | Beschrijving                    |
| ---------------- | --------------------------- | ------------------------------- |
| `npm run dev`    | Astro serve + token watcher | Beide parallel, met live reload |
| `npm run build`  | Tokens + Astro              | Volledige productie-build       |
| `npm run tokens` | Alleen Style Dictionary     | Handmatig tokens bouwen         |

## (lokale) Design tokens

Er zijn nog design-tokens en een manier om die naar CSS om te zetten in dit project. Deze zijn geschikt om snel dingen op te zetten, maar uiteindelijk zal het meerendeel uit de MOX-nlds package gebruikt kunnen worden. De CSS en tokens uit package wordt in de `baseLayout.astro` geladen.

### Style Dictionary

Om de design tokens te vertalen naar CSS variabelen wordt [Style Dictionary](https://styledictionary.com/) gebruikt.

1. [Installeer Style Dictionary](https://styledictionary.com/getting-started/using_the_cli/#installation) in `/style-dictionary`, deze vertaald design tokens naar CSS variabelen
1. [Instaleer SD-Transforms](https://www.npmjs.com/package/@tokens-studio/sd-transforms#installation) in `/style-dictionary`, dit is een pakketje met extra transformatie-opties die nodig zijn om design tokens uit Figma [Tokens Studio](https://docs.tokens.studio/) te vertalen

De pipeline ziet er zo uit:

Figma met Tokens Studio óf IDE → tokens/tokens.json → Style Dictionary + SD-Transforms → CSS variabelen → Stylesheet (style.css)

Style Dictionary leest `tokens.json` en transformeert de tokens naar CSS custom properties. Omdat Tokens Studio een eigen tokenformaat hanteert dat afwijkt van het [standaard Design Token Community Group (DTCG) formaat](https://www.designtokens.org/tr/2025.10/format/), wordt [SD-Transforms](https://www.npmjs.com/package/@tokens-studio/sd-transforms) als aanvulling gebruikt. Dit zorgt onder andere voor het correct oplossen van tokenreferenties, het omrekenen van `px` naar `rem` waarden en het omzetten van namen naar ‘*kebab-case*’.

Het resultaat wordt opgesplitst in twee automatisch gegenereerde CSS-bestanden:

- **`_rijkshuisstijl.css`** — bevat de waarden uit de Rijkshuisstijl: het kleurenpalet, typografie-instellingen, maatvoering, etc. Dit zijn de beschikbare *opties*.
- **`_toepassing.css`** — bevat semantische variabelen die verwijzen naar de Rijkshuisstijl-waarden en daar een concrete betekenis aan geven, bijvoorbeeld `--color-text-default` of `--button-primary-background-color`. Dit zijn de *toepassingen* van de opties.

Gebruik in stylesheets en componenten altijd variabelen uit `_toepassing.css` en nooit rechtstreeks uit `_rijkshuisstijl.css`. De Rijkshuisstijl-variabelen zijn de bouwstenen; de toepassingsvariabelen bepalen *hoe* die bouwstenen worden ingezet. Door deze scheiding kan een Rijkshuisstijl-waarde wijzigen zonder dat stylesheets aangepast hoeven te worden — de toepassingslaag vangt de verandering op.

Beide bestanden worden automatisch gegenereerd en mogen niet handmatig bewerkt worden. Alle wijzigingen aan ontwerp-waarden horen thuis in `tokens/tokens.json`.

### Design tokens vertalen naar CSS variabelen

Gebruik dit commando om design tokens handmatig naar CSS variabelen om te zetten:

```bash
npm run tokens
```

Dit resulteert in wijzigingen in de CSS variabelen bestanden. Deze worden automatisch geïmporteerd in de globale `style.css` style sheet.

Bij het gebruik van `npm run dev` worden design tokens automatisch opnieuw gebouwd wanneer `tokens/tokens.json` wijzigt.

---

## Storybook

[Storybook](https://storybook.js.org/) is de omgeving om afzonderlijke componenten te bekijken, testen en documenteren.

### Lokaal opstarten

``` bash
npm run storybook
```

Storybook is vervolgens te bekijken op [`localhost:6006`](http://localhost:6006).

### Automatisch bouwen

Bij het gebruik van `npm run dev` wordt Storybook automatisch opnieuw gebouwd naar `_site/storybook` wanneer bestanden in `stories/` of `style/style.css` wijzigen. Dit gebeurt via [chokidar](https://www.npmjs.com/package/chokidar-cli) die het `build-storybook` script triggert bij elke wijziging.

### Stories

De stories staan in de `stories/` map. Elk bestand beschrijft één component en toont varianten, bijvoorbeeld:

| Bestand | Beschrijving |
| ------- | ------------ |
| `Knop.stories.js` | Knopvarianten (primair, secundair, negatief) |
| `Link.stories.js` | Linkvarianten |
| `Tekstinvoer.stories.js` | Tekstinvoervelden |
| `Selectie.stories.js` | Selectievakjes en keuzerondjes |
| `Feedback.stories.js` | Notificaties en foutmeldingen |
| `Navigatie.stories.js` | Navigatiecomponenten |
| `Typografie.stories.js` | Koppen en tekststijlen |
| `Tabel.stories.js` | Tabelopmaak |

---

### NPM scripts

Installeer dependencies in de root van het project:

``` bash
npm install
```

| Script | Commando | Beschrijving |
| ------ | -------- | ------------ |
| `npm run dev` | Eleventy serve + token watcher + Storybook watcher | Alle drie parallel, met live reload en automatische Storybook-build bij wijzigingen |
| `npm run build` | Tokens + Eleventy | Volledige productie-build |
| `npm run tokens` | Alleen Style Dictionary | Handmatig tokens bouwen |
| `npm run storybook` | Storybook dev server | Componentenbibliotheek lokaal bekijken |
| `npm run build-storybook` | Storybook productie-build | Statische Storybook-site bouwen |

---

## Structuur

```text
📂 assets
    📁 favicon          favicons voor diverse platformen
    📁 fonts            Rijksoverheid lettertype webfonts
    📁 icons            pictogrammen voor de interface
    📁 images           afbeeldingen
📂 src
    📁 components       Astro en React componenten
    📁 layouts          Layout bestanden voor pagina's
    📁 pages            Pagina's met file-based routing
📂 style
    📄 _reset.css       Cross-browser stijl normalisatie, opgenomen in style.css
    📄 _variables.css   CSS variabelen vertaald van design tokens, opgenomen in style.css
    📄 style.css        Algemene CSS stijl gelinkt vanuit HTML
📁 style-dictionary
    📄 config.json      Configuratiebestand voor Style Dictionary om design tokens naar CSS variabelen te vertalen
📁 tokens
    📄 tokens.json      Design tokens die als basis dienen voor CSS variabelen
📄 README.md            Dit bestand met nadere uitleg
📄 astro.config.mjs     Configuratiebestand voor Astro
```

## CSS conventies

### CSS patronen

Deze omgeving maakt gebruik van moderne CSS-features:

- **CSS nesting** voor o.a. component-staten en varianten
- **CSS custom properties** (variabelen) voor alle ontwerp-waarden
- **`:focus-visible`** (niet `:focus`) voor toetsenbordfocus-indicatoren
- **`aria-disabled`** en **`aria-invalid`** [ARIA](https://www.w3.org/TR/wai-aria/) attributen voor staten (niet `:disabled`)

### Variabele naamgeving

Gegenereerde variabelen volgen ‘kebab-case’ met een semantische hiërarchie:

``` text
--prefix-categorie-optionelesubcategorie-attribuut--optionelestaat
```

Voorbeelden:

- `--rijkhuisstijl-color-lintblauw-50`
- `--toepassing-button-primary-background-color`

### Logical properties

In de stylesheets worden [CSS ‘logical’ properties](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values) gebruikt in plaats van ‘physical’ properties. Logical properties passen zich automatisch aan op basis van de schrijfrichting (`direction`) en schrijfmodus (`writing-mode`), wat de CSS toekomstbestendig en beter geschikt maakt voor meertalige ondersteuning.

| Fysiek                           | Logisch                                       |
| -------------------------------- | --------------------------------------------- |
| `width`                          | `inline-size`                                 |
| `height`                         | `block-size`                                  |
| `max-width`                      | `max-inline-size`                             |
| `min-height`                     | `min-block-size`                              |
| `margin-top` / `margin-bottom`   | `margin-block-start` / `margin-block-end`     |
| `margin-left` / `margin-right`   | `margin-inline-start` / `margin-inline-end`   |
| `padding-top` / `padding-bottom` | `padding-block-start` / `padding-block-end`   |
| `padding-left` / `padding-right` | `padding-inline-start` / `padding-inline-end` |
| `border-top` / `border-bottom`   | `border-block-start` / `border-block-end`     |

---

## Git commit berichten

`Initial commit`
Initiële commit, een eerste versie die in de bestandsgeschiedenis geplaatst wordt.

`➕ Added`
Toevoeging(en) aan een bestand.

Voorbeeld: `➕ Link component`

`✏️ Modified`
Wijziging(en) aan een bestand.

Voorbeeld: `✏️ Kleur van :hover staat primaire knop`

`❌ Deleted`
Verwijdering van (iets in) een bestand.

Voorbeeld: `❌ contactpagina.html verwijderd`

`🧼 Hygiene`
Kleine aanpassing, fix.

Voorbeeld: `🧼 padding-inline-start → padding-inline`

`🐛 Bugfix`
Herstel van een bug.

Voorbeeld: `🐛 footer include werd niet getoond`

`💾 Backup`
Back-up van een bestand voordat grote wijzigingen plaatsvinden.

Voorbeeld: `💾 backup 2026-03-18 voorafgaand aan wijzigingen voor gebruikersonderzoeken`

`🔁 Renamed`
Hernoeming van (iets in) een bestand.

Voorbeeld: `🔁 contact-pagina.html hernoemd naar comntact.html`

`↩️ Revert commit`
Wijziging(en) in een vorige commit die ongedaan gemaakt worden.

Voorbeeld: `↩️ wijzigingen van vorige commit ongedaan gemaakt omdat deze performance issues veroorzaakte`

`🔀 IDE ↔︎ Figma`
Twee-wegverkeer tussen IDE en Figma, met name om design tokens in beide omgevingen te kunnen aanpassen en testen (Style Dictionary → CSS variabelen en Figma Tokens Studio)

## MijnOverheid Zakelijk prototype

[![Deploy Astro to GitHub Pages](https://github.com/rogier-barendregt/MOx/actions/workflows/astro.yml/badge.svg)](https://github.com/rogier-barendregt/MOx/actions/workflows/astro.yml)
