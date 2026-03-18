# HTML String Stories

Stories return plain HTML as template literal strings. No framework (React, Vue, etc.) is used.

## Why

Deliberate choice to keep stories framework-free. The HTML in stories represents the actual markup that will be used in production templates.

## Format

```javascript
// Single-line for simple components
export const Primair = () => `<button type="button">Knoptekst</button>`;

// Multi-line for complex components
export const MetFeedback = () => `
  <div class="feedback feedback-error">
    ${feedbackIconError}
    <p>Foutmelding tekst</p>
  </div>
`;
```

## Rules

- Return template literals (backticks), not JSX
- HTML must be valid and use the same classes/attributes as production
- Reusable HTML fragments (e.g., SVG icons) can be stored as string constants at the top of the file
- No build-time dependencies beyond Storybook itself
