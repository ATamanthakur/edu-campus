# Content Architecture Plan

## Source Site Inventory

- Sitemap fetched `2025-11-20` exposes **2056 crawlable URLs**. This project focuses on recreating the primary marketing experience (homepage + 10 first-level navigation destinations + dynamic child templates for programs/departments) so content editors can scale beyond that baseline.

## JSON Data Contract

All textual + media data is delivered through `/data/site-content.json`. The structure mirrors the UI primitives rendered by the Next.js app:

```jsonc
{
  "navigation": { ... }, // header + footer menus
  "global": { ... }, // social links, notification banner, seo defaults
  "pages": [
    {
      "slug": "home",
      "title": "...",
      "sections": [
        { "type": "hero", ... },
        { "type": "stats", ... },
        { "type": "accordion", ... }
      ]
    }
  ],
  "collections": {
    "courses": [ { "slug": "b-tech", ... } ],
    "departments": [ { "slug": "engineering", ... } ]
  }
}
```

### Supported Section Types

1. `hero` – full-bleed banner with badges, CTA buttons, background image/video.
2. `ticker` – rotating marquee for top-bar notices.
3. `cta-panel` – highlighted announcement rows.
4. `stats` – counter grid with animated values.
5. `carousel` – horizontally scrollable highlight cards (pure CSS snap scrolling).
6. `accordion` – rankings/accreditation stack.
7. `cards-grid` – responsive cards for programs, facilities, FAQs, etc.
8. `split-content` – two-column layouts mixing media and text.
9. `logos` – marquee of recruiter/company logos.
10. `testimonials` – slider-ready but rendered as stacked cards for accessibility.
11. `news` – featured + supporting stories.
12. `virtual-tour` – embeds interactive iframe tiles.
13. `richtext` – markdown-enabled prose blocks for secondary pages.

Dynamic routes (`/courses/[slug]`, `/departments/[slug]`) hydrate themselves from the matching collection entry inside the JSON file. Adding a new record automatically provisions a page without code changes.

## Routing Blueprint

- `/` (home)
- `/about`, `/admissions`, `/apply`, `/campus-life`, `/contact`, `/hostel`
- `/placements`, `/research`, `/international`, `/news-events`
- `/courses/[slug]` – generated from `collections.courses`
- `/departments/[slug]` – generated from `collections.departments`

Each static page describes its hero + content stack via the `pages` array. Shared atoms (header/footer/timer/notifications) consume `navigation` + `global` keys so they stay in sync site-wide.
