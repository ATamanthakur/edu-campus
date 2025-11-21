# Chandigarh University Replica (Next.js + Tailwind)

This workspace recreates the public marketing experience of [https://www.cuchd.in](https://www.cuchd.in) inside a fully static Next.js (App Router) project. Every page, section, and dynamic route is powered by structured JSON so content editors can scale the experience without touching React components.

## Content pipeline

- **Single source of truth:** `data/site-content.json` describes navigation, timers, notifications, 11 first-level marketing pages, and the dynamic course/department collections (3 courses + 2 departments today).
- **Section builder:** `components/PageBuilder.tsx` renders JSON-authored hero, ticker, CTA, stats, carousel, accordion, cards, split layouts, logos, testimonials, news, virtual tour, and rich text blocks.
- **Dynamic routes:**
  - `/[slug]` (via `app/(content)/[slug]/page.tsx`) covers `/about`, `/admissions`, `/apply`, `/campus-life`, `/contact`, `/hostel`, `/placements`, `/research`, `/international`, `/news-events`.
  - `/courses/[slug]` and `/departments/[slug]` read from `collections.courses` and `collections.departments` respectively.
- **Global chrome:** `components/Header`, `NotificationBar`, `TimerBanner`, and `Footer` hydrate from JSON `navigation` and `global` keys.

Updating any copy, CTA, media URL, or statistic only requires editing the JSON file; routes are regenerated during the Next.js build through `generateStaticParams` and `generateMetadata` helpers.

## Development commands

```bash
# install deps once
npm install

# run the JSON-driven experience locally
npm run dev

# lint before pushing changes
npm run lint

# production build / static export check
npm run build && npm run start
```

## Page inventory

- **Mapped pages:** 1 home + 10 secondary marketing destinations derived from the live navigation.
- **Dynamic collections:** 3 course detail pages and 2 department pages generated from JSON.
- **External references:** sitemap crawl on 20 Nov 2025 shows 2056 URLs. This project focuses on recreating the hero marketing experience with room to expand by appending new JSON records.

## Folder highlights

- `app/` – App Router entry points, content route group, and JSON-driven layouts.
- `components/` – UI atoms (header/footer), notification/timer widgets, and the `PageBuilder`.
- `data/site-content.json` – editable source for text, images, CTAs, metrics, and navigation.
- `docs/content-architecture.md` – notes on schema design, supported section types, and routing blueprint.
- `lib/content.ts` – helper utilities for querying navigation, pages, courses, and departments.
- `types/content.ts` – strict TypeScript contracts for JSON validation.

## Extending the site

1. Add/modify sections inside `data/site-content.json` using the documented schema.
2. Drop new course or department objects into `collections` to auto-generate routes.
3. Run `npm run dev` to preview changes locally (Hot Module Replacement reloads data instantly).
4. Keep lint clean with `npm run lint`; Next.js 16 enforces type safety for JSON imports.

Refer to `docs/content-architecture.md` for the full breakdown of supported section primitives, data contract, and routing coverage.
