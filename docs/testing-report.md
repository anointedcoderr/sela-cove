# Testing report (homepage refinement pass)

Run on 2026-10-29 with Playwright 1.63.0. Local checks serve the static export (`./out`) with `wrangler dev`, the same static-assets runtime used in production. The live site was then tested after each deploy (see "Live deployment").

## Page length before and after
Full-page height after scrolling through the whole page (script `scripts/audit.mjs`). "Before" is the previous live build.

| Viewport | Before | After | Change |
|---|---|---|---|
| 1440 × 1000 | 9,083 px | 6,259 px | −31% |
| 1024 × 768 | 9,838 px | 6,895 px | −30% |
| 768 × 1024 | 10,558 px | 7,568 px | −28% |
| 390 × 844 | 14,551 px | 8,259 px | −43% |
| 320 × 740 | 14,804 px | 8,915 px | −40% |

Screenshots: `artifacts/screenshots/before/` and `artifacts/screenshots/after/` (the "after" set also has 430 × 932).

## Automated suite (`npx playwright test`)
44 tests; Chromium and Firefox both pass (88 / 88 on the final run). WebKit cannot launch in this environment (missing system libraries), so Safari remains untested. New coverage added this pass: sections never transparent (also under reduced motion), JavaScript-disabled rendering, print view, tablet journal column widths and title line counts, preview note, 43 px+ footer hit areas, clicking a product image navigates (full-card link), external link attributes.

## Manual-style browser run (`node scripts/verify.mjs`, 53 checks)
- Home at 16 widths including the edges around every breakpoint (320, 359, 360, 375, 390, 430, 639, 640, 767, 768, 1023, 1024, 1279, 1280, 1440, 1920): no horizontal overflow, nothing outside the viewport, every visible image decoded after scrolling, no console errors or failed local requests.
- Mobile menu with the keyboard at 390 × 844, 320 × 740, and short landscape 667 × 375 and 844 × 390: scroll lock, focus loop (Tab and Shift+Tab), CTA reachable, Escape closes, focus returns to the toggle, closes on navigation.
- All 16 destination routes: direct load (200), reload, "Something thoughtful is taking shape." and Back to Home.
- 14 homepage journeys by real link clicks, with browser back and forward.
- Footer social hrefs are the expected Instagram, Pinterest and Etsy URLs with `target=_blank` and `rel=noopener`.
- Firefox mobile smoke test.

## Contrast (computed from the palette, composited over each real background)
| Pair | Ratio |
|---|---|
| Forest on ivory, body | 11.7 |
| Forest at 85% on ivory / sand / sand-light | 7.5 / 6.1 / 6.8 |
| Forest at 75% on sand (smallest notes) | 4.7 |
| Terracotta text `#7F4B3A` on ivory / sand / sand-light | 6.4 / 4.9 / 5.6 |
| Ivory on forest | 11.7 |
| Focus ring: terracotta on ivory, sand on forest | 6.4, 8.9 |

The earlier terracotta `#8E5846` measured 3.98 on sand, below 4.5 for small text, so it was darkened. The lighter clay `#B47C69` (3.15) is only used for decorative rules. This is arithmetic on the design tokens, not a full audit with assistive technology.

## Live deployment (https://selacove.rssworldnet.work)
Testing after the first deploy of this pass found two hosting problems that the local build did not have, and both were fixed in code:

1. **Hangs and 503s from the OpenNext Worker.** About one homepage request in four hung for 25 s or returned 503, and some `/_next/image` requests failed. Over the same network path, selacove.com answered 25/25 requests and static files on the concept's own host answered 20/20. Fix: the site is now a static export served as static assets only, with pre-generated responsive image widths. Afterwards: 30/30 homepage requests returned 200 in about 0.2 s.
2. **Redirect loop on route-data files.** Next names the data files of dynamic `[slug]` routes with `$`. Cloudflare's static assets answered Chromium's prefetches for them with a 307 back to the same URL (`ERR_TOO_MANY_REDIRECTS`). Fix: each placeholder route now has its own folder (same URLs and content), so no `$` filenames are produced.

Final live results (Chromium): the Playwright suite passed 44/44 against the live URL (`BASE_URL=https://selacove.rssworldnet.work npx playwright test --project=chromium`), and `scripts/verify.mjs` passed 52/53. The one failure is the Firefox smoke test: this sandbox's TLS proxy certificate is not trusted by Playwright's Firefox (`SEC_ERROR_UNKNOWN_ISSUER`), and I did not disable certificate checks to get around it. Firefox was therefore verified only against the local static build (44/44). The `X-Robots-Tag: noindex` header and the robots meta tag are present on the live site.

## Not done or not possible
- External destinations (Instagram, Pinterest, Etsy) were not opened in a browser. A plain request returned 200 for Pinterest, redirected Instagram to its login page, and Etsy answered 403 to scripted requests. I did not try to get around those protections or log in. Only the hrefs and attributes are verified.
- No Lighthouse run, no screen-reader pass, no real-device testing.
- Source-image limits: see `docs/asset-manifest.md` (hero 1024 px and waves 1067 px are the true originals).
