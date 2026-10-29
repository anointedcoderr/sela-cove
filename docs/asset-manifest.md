# Asset manifest

All images below were downloaded on 2026-10-29 from publicly reachable URLs on selacove.com (served from Sela Cove's Showit CDN `static.showit.com/v2/246526/…` or its WordPress uploads at `selacove.com/wp-content/uploads/…`). Nothing behind a login, checkout or download gate was fetched, and no purchased or gated file was downloaded.

**Rights status for every row: not cleared.** Public visibility is not permission to republish. These files are © their owner (or their original licensors) and are used here only inside a private, clearly labelled, noindexed design concept. **All of them need Sela Cove's written approval before any public launch.** Rows marked ⚠ carry an extra question (see notes).

All assets are stored locally in `public/assets/`; nothing is hot-linked. Files were converted to WebP (quality 82) by `scripts/optimize-assets.mjs`, which also records each crop.

**Resolution note.** The Showit CDN will generate any size up to 3200 px for most files, but those larger renditions are enlargements. Higher variants did not show more real detail on a native-pixel check of the audit cover's small text, so the files above are capped at 1600 to 2400 px (portrait cover crops at about 1100 px) rather than the largest size offered. Two files are genuinely small at the source: the hero (1024 px) and the waves photo (1067 px); both are shown no wider than that at 2x density. Everything is rebuilt by `node scripts/optimize-assets.mjs`, which downloads from the URLs above into a git-ignored `.asset-cache/`.

| Local file | Original source URL | Found on | Used for | Notes (resolution, crop, flags) |
|---|---|---|---|---|
| `branding/hero-sea-window-desk.webp` | https://static.showit.com/v2/246526/DZpfMi_vk0Yfh4QFCxB4Yg/sela_cove_8.png (variant 1200) | selacove.com/ coming-soon hero | Homepage hero | 1024×1024. This is the true original: the CDN stops at 1024 for this file. ⚠ Unidentified woman; not presented as the founder. |
| `products/audit-cover-portrait.webp` | https://static.showit.com/v2/246526/RhPEBIBF5-zxRDuREpb3oQ/brand_foundation_workbook.jpg (variant 2400) | /audit, /shop | Pathway card 01, audit feature | Cover-only crop of the 2400×1920 mockup (cover, soft shadow and backdrop kept). The CDN file is named "brand_foundation_workbook" but shows the audit cover. |
| `products/brand-foundation-cover-portrait.webp` | https://static.showit.com/v2/246526/qG7hkXJ7tBEsZDkrP2V1-w/brand_foundation_workbook_1.jpg (variant 2400) | /shop | Pathway card 02 | Cover-only crop of the 2400×1920 mockup. |
| `products/brand-foundation-workbook-mockup.webp` | https://static.showit.com/v2/246526/qG7hkXJ7tBEsZDkrP2V1-w/brand_foundation_workbook_1.jpg (variant 2400) | /shop | Shop card, product placeholder | Full 5:4 mockup, uncropped, 1600 px wide. |
| `products/halden-mini-brand-kit.webp` | https://static.showit.com/v2/246526/Jj2kIev4N4YT8vXSWMIuUw/halden_mood_board_-_for_posting.png (variant 2400) | /shop | Shop card, product placeholder | Portrait photo, 1400×1925. Shown in a 5:4 card with object-position set to keep the cards in frame. |
| `products/talia-blake-mini-brand-kit.webp` | https://static.showit.com/v2/246526/pI2D7n6APHEYYhiqXHIrVg/premade_logo_mini_brand_guide_1.png (variant 2400) | /shop | Shop card, product placeholder | Full 5:4 image, 1600 px wide. ⚠ Contains a stock-style photo of a model. |
| `templates/patina-template.webp` | https://static.showit.com/v2/246526/VUHHPcNeO5c2vOvgkrG4Xg/portfolio_template.jpg (variant 2400) | /shop | Shop card, product placeholder | Full 5:4 mockup, 1600 px wide. |
| `templates/portfolio-blog-template.webp` | https://static.showit.com/v2/246526/SlAD2pzxOwFS11hJNX_TLQ/portfolio_template.jpg (variant 2400) | /shop | Product placeholder | Full 5:4 mockup, 1600 px wide. |
| `editorial/beach-textiles.webp` | https://static.showit.com/v2/246526/vQcm3sVVq2dwvICvJpvzUQ/sela_cove_brand_strategist_18.jpg (variant 2400) | /about | Founder section | 1600×2000. |
| `editorial/sea-waves.webp` | https://static.showit.com/v2/246526/kqzpt-Bd0gmRCj5CwIn25g/wategos_byron_7.jpg (variant 1600) | /audit | Default placeholder-page image | 1067×1600, the true original. ⚠ File name suggests a stock/licensed photo. |
| `editorial/sea-foam.webp` | https://static.showit.com/v2/246526/VZ3eUJfxTUmjXfG7_IJeAw/custom_website_design_13.jpg (variant 2400) | /about | Closing section (desktop only) | 1200×1800. |
| `blog/logo-not-right.webp` | https://selacove.com/wp-content/uploads/sites/43645/2026/09/u1632386269_small_business_latin_tanned_skin_woman_sitting_at_0dbdfdb7-f741-4c22-8741-6e189cf16684_0-1.png | /blog/ | Journal featured card | 1456×816, the full-size upload. ⚠ File name suggests AI-generated imagery; confirm licence/terms. |
| `blog/professional-logo.webp` | https://selacove.com/wp-content/uploads/sites/43645/2025/07/Salt-Loft-Showit-Branding.png | /blog/ | Journal card | Full-size 4500×3000 upload, resized to 1600 px wide. |
| `blog/keywords.webp` | https://selacove.com/wp-content/uploads/sites/43645/2026/06/Sela-Cove-Keyword-Planner.png | /blog/ | Journal card | Trimmed to the sand card and padded to 3:2 with the card's own colour (the source is a flat text card). |

## Found and deliberately not used
- `ag_allure_stock_images8790.jpg`: obvious licensed stock photo.
- `u1632386269_hispanic_woman_working…png`, `u1632386269_medium_tanned_skinned_woman…png`: appear AI-generated; not needed.
- Showit "classic film grain" overlays, other template/blog mockups (Gracie Morgan, Sarai Callahan, Nox Avery, sitemap guide): not needed for the homepage.
- Instagram feed thumbnails embedded on every page: third-party content, not collected.

## Not obtained
- **A logo file.** The live site's wordmark is live text in a commercial typeface (Neue Haas Display) plus a plain "SC" text monogram; there is no downloadable logo asset. This concept uses its own typographic treatment of SELA COVE (Instrument Serif, tracked capitals) and a minimal SC favicon. **This is a concept treatment, not an approved identity.**
- **A portrait of the founder.** None is clearly identified on the site, so none is used.
- **Hi-res originals.** The CDN only served the sized variants listed above; the hero is 1024 px wide.
