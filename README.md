# Sela Cove — independent design concept

A private, **unsolicited** website redesign concept for [Sela Cove](https://selacove.com) by **RSS Word Network** ("Quiet Coastal Editorial"). It is **not** the official Sela Cove website, has not been commissioned or approved by Sela Cove, collects no customer data, and is set to `noindex`. Do not publish it.

Stack: Next.js 16 (App Router) · TypeScript · Tailwind CSS 4 · lucide-react · Playwright. Fonts (Instrument Serif, Manrope) are self-hosted. Motion is CSS + one tiny `IntersectionObserver` component; `prefers-reduced-motion` is respected.

## Run it

```bash
npm install
npm run dev            # http://localhost:3000
```

Production:

```bash
npm run build
npm run start          # http://localhost:3000   (or: npx next start -p 3100)
```

## Test it

```bash
npm run build
npx playwright test            # Chromium; starts `next start` on :3100 if nothing is running
BROWSERS=firefox,webkit npx playwright test   # adds Firefox and/or WebKit (npx playwright install firefox webkit)
npm run lint                   # tsc --noEmit
BASE_URL=http://localhost:3100 npm run shots   # screenshots into artifacts/screenshots/
```

If the Playwright browser build in your environment differs from the pinned `@playwright/test` version, install matching browsers with `npx playwright install chromium`.

## Layout

```
src/app/            routes: / , [slug] (placeholders), shop/[product], journal/[article], not-found
src/components/     Header, Footer, Button, Wordmark, Reveal, Placeholder, home/* sections
src/data/site.ts    nav, products, articles, placeholder pages
src/app/globals.css design tokens (colors, type scale, buttons)
public/assets/      optimized local images from selacove.com (see docs/asset-manifest.md)
scripts/            optimize-assets.mjs, screenshots.mjs
tests/              Playwright suite
docs/               asset-manifest.md, content-sources.md, testing-report.md
```

## Documentation
- [Asset manifest and rights status](docs/asset-manifest.md)
- [Content sources](docs/content-sources.md)
- [Testing report](docs/testing-report.md)

## Deploying to Cloudflare Workers (private preview)
The repo ships an explicit `wrangler.jsonc` and `open-next.config.ts` (OpenNext adapter). The Worker name **must match** the Worker in your Cloudflare dashboard (`sela-cove`), including the `WORKER_SELF_REFERENCE` service binding.

In Workers Builds set **Deploy command** to `npm run deploy` (it runs `opennextjs-cloudflare build && opennextjs-cloudflare deploy`; the build command can stay `npm run build`). Local check: `npm run preview`. The site sends `X-Robots-Tag: noindex`, but a workers.dev URL is still reachable by anyone who has the link.
