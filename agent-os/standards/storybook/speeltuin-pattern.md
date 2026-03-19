# Speeltuin Pattern

Every story file exports a `Speeltuin` (playground) as the first named export, plus individual variant exports.

## Structure

```javascript
export default {
  title: "Componenten/<ComponentName>",
  argTypes: { /* all interactive controls */ },
};

// Playground with all props exposed
export const Speeltuin = {
  args: { /* sensible defaults */ },
  render: ({ ...args }) => `<html>...</html>`,
};

// Predefined common combinations
export const Primair = () => `<button>Primaire knop</button>`;
export const Secundair = () => `<button class="secondary">Secundaire knop</button>`;
export const Inactief = () => `<button aria-disabled>Inactieve knop</button>`;
```

## Rules

- `Speeltuin` is always the first named export
- `Speeltuin` exposes all interactive controls via `argTypes` + `args`
- Variant exports are arrow functions returning static HTML (no args)
- Variant exports show common/important combinations
- Variant names are in Dutch
- Title follows `"Componenten/<DutchName>"` hierarchy
- An `AlleVarianten` export showing all variants side by side is encouraged
