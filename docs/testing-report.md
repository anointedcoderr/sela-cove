# Testing report

Run on 2026-10-29 against the **production build** (`npm run build` then `next start`), driven by Playwright 1.63.0.

## Results
| Check | Result |
|---|---|
| `npm run build` | Passes; 21 static pages generated |
| `tsc --noEmit` | Passes |
| Playwright, Chromium | 37 / 37 passed |
| Playwright, Firefox 1543 | 37 / 37 passed on the final run (see flake note) |
| Playwright, WebKit | **Not run.** WebKit installs but cannot launch here: the host lacks system libraries (libgtk-4, libgraphene, libgstgl and others). Nothing is claimed for Safari. |
| Real-device or mobile-emulator browsers | Not run. Mobile coverage is Chromium and Firefox at mobile viewport sizes. |

**Flake note.** On one full Firefox run, `/shop` failed the "resolves directly, survives reload, and links home" test. I did not capture the failure message. The same test then passed 4 of 4 repeats and the whole suite passed again (74 / 74, Chromium + Firefox). Treat it as one unexplained intermittent failure.

## What the suite covers (`tests/site.spec.ts`)
- Homepage: loads, h1 text, Instrument Serif and Manrope loaded, every `<img>` (including lazy ones) decodes, no console errors, page errors, failed requests or 4xx on local origin, single h1, alt text on every image, `noindex` meta, concept disclaimer in footer.
- CTAs: hero buttons, pathway buttons, product cards, article cards go to the right placeholders; browser back works after each.
- All 17 internal routes (9 section pages, 5 products, 3 articles): direct load returns 200, reload works, placeholder copy and footer present, images load, "Back to Home" works. Unknown URLs render the styled fallback inside the site chrome.
- Desktop navigation: every item navigates, `aria-current` follows, back/forward work, header CTA works, skip link and visible focus ring.
- Mobile menu: opens, `aria-expanded` toggles, Escape closes and returns focus, closes after navigation, every menu link and the menu CTA work.
- Responsive at **320, 375, 390, 430, 768, 1024, 1280, 1440, 1920 px**, on `/`, `/start-here` and a product page: no horizontal scroll, no element outside the viewport, header height sane. Touch targets at 390 px are at least 40 px.
- `prefers-reduced-motion`: no content left in the hidden reveal state.

## Visual inspection
Screenshots in `artifacts/screenshots/` (`home-<width>-fold.png`, `home-<width>-full.png`, `placeholder-<width>-*.png`, and `home-390-menu-open.png`) were taken at all nine widths and **reviewed by eye** at 320, 390, 768, 1440 and 1920 px (full-page slices for 390, 768 and 1440), not only asserted. The 375, 430, 1024 and 1280 px captures exist and passed the automated overflow checks but were not individually examined.

## Issues found and fixed
| Issue | Found by | Fix |
|---|---|---|
| Mobile hero's KEEP/REFINE/TEST/STOP/LATER strip left "LATER" orphaned in a 2-column grid | Visual review at 390 px | Single-column rows on mobile, 5 columns from 640 px |
| Tablet hero used a tall portrait image after the text, leaving an awkward column | Visual review at 768 px | Landscape 16:10 crop on tablet, portrait only on desktop |
| Mobile headline was small (≈46 px) | Visual review | Larger fluid scale (min 3.1 rem) |
| "Free Audit" button wrapped to two lines and crowded the wordmark at 320 px | Visual review at 320 px | Smaller tracked wordmark under 360 px, no-wrap button |
| Keywords article image had pale bands and then clipped its title when cropped | Visual review | Cropped to the card and padded to 4:3 in the asset script |
| About-section image pair floated low against the text | Visual review | Larger main image, top-aligned grid |
| Blockquote used a `<footer>`, creating a second footer landmark | Test failure | Changed to `<p>` |
| Test selectors ambiguous (two logo links, lazy images, aborted Next prefetches) | Test failures | Scoped selectors, scroll-then-wait image check, ignore aborted `?_rsc=` prefetches |
| A stale `next start` served an old build with missing CSS and caused misleading failures | Debugging | Restarted the server and cleared `.next` before the final runs |

## Known limitations
- Imagery is not cleared for public use (see `asset-manifest.md`). Some files look AI-generated or stock; the owner must confirm.
- The hero photo is only 1024 px wide at source, and the audit cover is a heavily compressed upload, so both look soft on very large or high-density screens.
- No actual logo file exists to reuse; the SELA COVE wordmark and SC favicon are concept treatments.
- Lighthouse and screen-reader testing were not performed. Colour contrast was reasoned from the palette (clay-deep `#8E5846` for small text, lighter clay only for borders and large display) but not machine-audited.
- The sticky left column in the problem section was checked in code and full-page captures, not in a scroll recording.
