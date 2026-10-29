# Sela Cove — independent design concept

A private, **unsolicited** website redesign concept for [Sela Cove](https://selacove.com) by **RSS World Network** ("Quiet Coastal Editorial"). It is **not** the official Sela Cove website, has not been commissioned or approved by Sela Cove, collects no customer data, and is set to `noindex`. Do not publish it.

Stack: Next.js 16 (App Router, **static export**) · TypeScript · Tailwind CSS 4 · lucide-react · Playwright. Fonts (Instrument Serif, Manrope) are self-hosted. Motion is CSS + one tiny `IntersectionObserver` component; `prefers-reduced-motion` is respected.

## Run it

```bash
npm install
npm run dev            # http://localhost:3000
```

Production:

```bash
npm run build          # writes the static site to ./out
npm run start          # serves ./out with wrangler dev at http://localhost:3000
```

## Test it

```bash
npm run build
npx playwright test            # Chromium; starts `next start` on :3100 if nothing is running
BROWSERS=firefox,webkit npx playwright test   # adds Firefox and/or WebKit (npx playwright install firefox webkit)
npm run lint                   # tsc --noEmit
node scripts/audit.mjs                  # full-page screenshots + layout metrics (BASE_URL, OUT, IMGS=1 env vars)
BASE_URL=https://your-deployment node scripts/verify.mjs   # manual-style browser checks against any deployment
```

If the Playwright browser build in your environment differs from the pinned `@playwright/test` version, install matching browsers with `npx playwright install chromium`.

## Layout

```
src/app/            routes: / , [slug] (placeholders), shop/[product], journal/[article], not-found
src/components/     Header, Footer, Button, Wordmark, Reveal, Placeholder, home/* sections
src/data/site.ts    nav, products, articles, placeholder pages
src/app/globals.css design tokens (colors, type scale, buttons)
public/assets/      optimized local images from selacove.com (see docs/asset-manifest.md)
scripts/            optimize-assets.mjs, audit.mjs, verify.mjs, screenshots.mjs
tests/              Playwright suite
docs/               asset-manifest.md, content-sources.md, testing-report.md
```

## Documentation
- [Asset manifest and rights status](docs/asset-manifest.md)
- [Content sources](docs/content-sources.md)
- [Testing report](docs/testing-report.md)

## Deploying to Cloudflare Workers (private preview)
The site is a static export (`output: 'export'`) deployed as **static assets only** (`wrangler.jsonc`, Worker name `sela-cove`). Nothing runs per request: pages, the 404 page and every image width are files in `./out`. Responses get `X-Robots-Tag: noindex` from `public/_headers`.

Workers Builds: build command `npm run build`, deploy command `npm run deploy` (it builds and runs `wrangler deploy`). Local check: `npm run preview`.

Images: `next/image` uses a custom loader (`src/lib/image-loader.ts`) that points at pre-generated widths in `public/assets/r/`. After changing anything in `public/assets`, run `npm run assets` (downloads/optimizes the sources, then regenerates the widths and `src/data/image-widths.json`) and commit the result.

A workers.dev or custom-domain URL is still reachable by anyone who has the link.
