// Converts the raw public images downloaded from selacove.com into optimized WebP files.
// Usage: node scripts/optimize-assets.mjs <raw-dir>
import sharp from 'sharp';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';

const raw = process.argv[2];
if (!raw) throw new Error('Pass the raw download directory');
const files = readdirSync(raw);
const find = (prefix) => {
  const f = files.find((n) => n.startsWith(prefix + '_'));
  if (!f) throw new Error('Missing raw file ' + prefix);
  return join(raw, f);
};

// [raw index, output path, max width]
const jobs = [
  ['01', 'branding/hero-sea-window-desk', 1024],
  ['09', 'products/audit-cover', 1400],
  ['06', 'products/brand-foundation-workbook-cover', 1200],
  ['03', 'products/halden-mini-brand-kit', 800],
  ['08', 'products/talia-blake-mini-brand-kit', 1200],
  ['02', 'templates/patina-template', 1200],
  ['07', 'templates/portfolio-blog-template', 1200],
  ['10', 'editorial/sea-waves', 1067],
  ['25', 'editorial/beach-textiles', 1400],
  ['23', 'editorial/sea-foam', 800],
  ['12', 'blog/logo-not-right', 1440],
  ['13', 'blog/professional-logo', 1440],
  ['14', 'blog/keywords', 1440, { left: 112, top: 112, width: 1312, height: 582 }], // trim to the sand card, then pad to 4:3
];

for (const [idx, out, w, crop] of jobs) {
  const dest = `public/assets/${out}.webp`;
  let img = sharp(find(idx)).rotate();
  if (crop) {
    img = sharp(await img.extract(crop).toBuffer());
    // Pad the cropped card back out to 4:3 with its own fill colour so card layouts never crop the title.
    const pad = Math.round((crop.width * 3) / 4 - crop.height) / 2;
    img = sharp(await img.extend({ top: Math.ceil(pad), bottom: Math.floor(pad), background: { r: 233, g: 231, b: 219 } }).toBuffer());
  }
  const info = await img.resize({ width: w, withoutEnlargement: true }).webp({ quality: 80 }).toFile(dest);
  console.log(dest, `${info.width}x${info.height}`, Math.round(info.size / 1024) + 'KB');
}
