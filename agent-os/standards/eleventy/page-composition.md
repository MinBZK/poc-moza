# Page Composition

All pages follow the same layout structure.

## Structure

```html
{% include "side-nav-overheid.njk" %}

<article>
  <nav class="breadcrumb">...</nav>
  <h1>Page title</h1>

  <section class="card">
    <!-- Content section -->
  </section>

  <div class="tiles">
    <section class="card">...</section>
    <section class="card">...</section>
  </div>

  <section class="card accordion">
    <details name="faq">...</details>
  </section>
</article>
```

## Rules

- Side-nav is always included first
- Main content goes in `<article>`
- Content sections are wrapped in `.card`
- Multi-column layouts use `.tiles` wrapper (CSS grid, 2 columns)
- FAQ sections use `<details name="faq">` for grouped accordions
- Data tables use `.data-overview` class
- CTAs use `a.btn-cta` (not button) for navigation actions
