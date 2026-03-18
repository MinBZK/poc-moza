# Dutch Language

All human-readable text in this project is in Dutch.

## Applies to

- CSS comments (`/* Formulier elementen */`)
- HTML content and labels
- Storybook story names and labels (`Speeltuin`, `Inactief`, `Knoptekst`)
- Code comments in JavaScript/config files
- Commit messages and documentation

## Exceptions

- Code syntax (CSS property names, JS keywords, HTML attributes)
- Library/framework identifiers (`argTypes`, `render`, `control`)
- Technical terms without a clear Dutch equivalent

## Examples

```css
/* Correct */
/* Voorkomt dat elementen de volledige breedte aannemen */

/* Wrong */
/* Prevents elements from taking full width */
```

```javascript
// Correct
title: "Componenten/Knop"

// Wrong
title: "Components/Button"
```
