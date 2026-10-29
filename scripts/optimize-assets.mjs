// Downloads the public source images from selacove.com (cached in .asset-cache/) and writes the
// optimized WebP files in public/assets/. Provenance for every file is documented in docs/asset-manifest.md.
// Usage: node scripts/optimize-assets.mjs
import sharp from 'sharp';
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync } from 'node:fs';
import { basename, dirname, join } from 'node:path';

const SHOWIT = 'https://static.showit.com/v2/246526';
const WP = 'https://selacove.com/wp-content/uploads/sites/43645';
const showit = (path, size = 2400) => `${SHOWIT}/${path}/variant/${size}/webp`;

// crop: fractions of the source (left, top, width, height). pad: pad the cropped image to this
// width/height ratio using `fill`, so wide cards are never cropped by their layout frame.
const jobs = [
  { out: 'branding/hero-sea-window-desk', src: showit('DZpfMi_vk0Yfh4QFCxB4Yg/sela_cove_8.png', 1200), width: 1024 }, // true original is 1024 px
  { out: 'products/audit-cover-portrait', src: showit('RhPEBIBF5-zxRDuREpb3oQ/brand_foundation_workbook.jpg'), crop: [0.2, 0.07, 0.6, 0.87], width: 1100 },
  { out: 'products/brand-foundation-cover-portrait', src: showit('qG7hkXJ7tBEsZDkrP2V1-w/brand_foundation_workbook_1.jpg'), crop: [0.2, 0.07, 0.6, 0.87], width: 1100 },
  { out: 'products/brand-foundation-workbook-mockup', src: showit('qG7hkXJ7tBEsZDkrP2V1-w/brand_foundation_workbook_1.jpg'), width: 1600 },
  { out: 'products/halden-mini-brand-kit', src: showit('Jj2kIev4N4YT8vXSWMIuUw/halden_mood_board_-_for_posting.png'), width: 1400 },
  { out: 'products/talia-blake-mini-brand-kit', src: showit('pI2D7n6APHEYYhiqXHIrVg/premade_logo_mini_brand_guide_1.png'), width: 1600 },
  { out: 'templates/patina-template', src: showit('VUHHPcNeO5c2vOvgkrG4Xg/portfolio_template.jpg'), width: 1600 },
  { out: 'templates/portfolio-blog-template', src: showit('SlAD2pzxOwFS11hJNX_TLQ/portfolio_template.jpg'), width: 1600 },
  { out: 'editorial/beach-textiles', src: showit('vQcm3sVVq2dwvICvJpvzUQ/sela_cove_brand_strategist_18.jpg'), width: 1600 },
  { out: 'editorial/sea-waves', src: showit('kqzpt-Bd0gmRCj5CwIn25g/wategos_byron_7.jpg', 1600), width: 1067 }, // true original is 1067 px
  { out: 'editorial/sea-foam', src: showit('VZ3eUJfxTUmjXfG7_IJeAw/custom_website_design_13.jpg'), width: 1200 },
  { out: 'blog/logo-not-right', src: `${WP}/2026/09/u1632386269_small_business_latin_tanned_skin_woman_sitting_at_0dbdfdb7-f741-4c22-8741-6e189cf16684_0-1.png`, width: 1456 },
  { out: 'blog/professional-logo', src: `${WP}/2025/07/Salt-Loft-Showit-Branding.png`, width: 1600 },
  // The keyword cover is a flat card on a pale margin: trim to the card, then pad to 3:2 with the card's own colour.
  { out: 'blog/keywords', src: `${WP}/2026/06/Sela-Cove-Keyword-Planner.png`, extract: { left: 118, top: 118, width: 1366, height: 604 }, pad: { ratio: 3 / 2, fill: { r: 233, g: 231, b: 219 } }, width: 1366 },
];

mkdirSync('.asset-cache', { recursive: true });
const cached = (url) => {
  const file = join('.asset-cache', url.replace(/[^a-z0-9.]+/gi, '_').slice(-120));
  if (!existsSync(file)) execFileSync('curl', ['-sSfL', '--max-time', '120', '-o', file, url]);
  return file;
};

for (const j of jobs) {
  let img = sharp(cached(j.src)).rotate();
  const meta = await img.metadata();
  if (j.crop) {
    const [l, t, w, h] = j.crop;
    img = sharp(await img.extract({ left: Math.round(l * meta.width), top: Math.round(t * meta.height), width: Math.round(w * meta.width), height: Math.round(h * meta.height) }).toBuffer());
  }
  if (j.extract) img = sharp(await img.extract(j.extract).toBuffer());
  if (j.pad) {
    const m = await img.metadata();
    const extra = Math.round(m.width / j.pad.ratio - m.height);
    img = sharp(await img.extend({ top: Math.ceil(extra / 2), bottom: Math.floor(extra / 2), background: j.pad.fill }).toBuffer());
  }
  const dest = `public/assets/${j.out}.webp`;
  mkdirSync(dirname(dest), { recursive: true });
  const info = await img.resize({ width: j.width, withoutEnlargement: true }).webp({ quality: 82 }).toFile(dest);
  console.log(basename(dest).padEnd(44), `source ${meta.width}x${meta.height}`.padEnd(22), `-> ${info.width}x${info.height}`.padEnd(14), Math.round(info.size / 1024) + 'KB');
}
