# Logical Properties

Use CSS logical properties instead of physical (directional) properties.

## Mapping

| Physical (don't use) | Logical (use this) |
|---|---|
| `width` | `inline-size` |
| `height` | `block-size` |
| `margin-top` | `margin-block-start` |
| `margin-bottom` | `margin-block-end` |
| `margin-left` | `margin-inline-start` |
| `padding-right` | `padding-inline-end` |
| `top` | `inset-block-start` |
| `left` | `inset-inline-start` |
| `text-align: left` | `text-align: start` |
| `vertical-align: top` | `vertical-align: top` (no logical equivalent yet) |

## Shorthand

```css
margin-block: 1rem;         /* top + bottom */
padding-inline: 1rem 2rem;  /* left + right */
```

## Why

Modern CSS best practice. Logical properties are direction-agnostic, making layouts inherently ready for RTL or vertical writing modes.
