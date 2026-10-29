// Generates the responsive WebP variants used by the custom image loader (src/lib/image-loader.ts).
// The site is a static export, so there is no image optimizer at request time: every width the browser
// might pick has to exist as a file. Run `npm run assets:responsive` after changing anything in public/assets.
import sharp from 'sharp';
import { mkdirSync, readdirSync, rmSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const WIDTHS = [128, 256, 384, 640, 828, 1080, 1440, 1920]; // keep in sync with next.config.ts
const ROOT = 'public/assets';
const OUT = join(ROOT, 'r');

const walk = (dir) => readdirSync(dir).flatMap((n) => {
  const p = join(dir, n);
  if (p === OUT) return [];
  return statSync(p).isDirectory() ? walk(p) : p.endsWith('.webp') ? [p] : [];
});

rmSync(OUT, { recursive: true, force: true });
const manifest = {};
let files = 0, bytes = 0;
for (const file of walk(ROOT)) {
  const src = '/' + relative('public', file).replaceAll('\\', '/');
  const { width: full } = await sharp(file).metadata();
  const widths = WIDTHS.filter((w) => w < full);
  for (const w of widths) {
    const dest = join(OUT, relative(ROOT, file).replace(/\.webp$/, `-${w}.webp`));
    mkdirSync(join(dest, '..'), { recursive: true });
    const info = await sharp(file).resize({ width: w }).webp({ quality: 80 }).toFile(dest);
    files++; bytes += info.size;
  }
  manifest[src] = { full, widths };
}
writeFileSync('src/data/image-widths.json', JSON.stringify(manifest, null, 2) + '\n');
console.log(`${Object.keys(manifest).length} images, ${files} variants, ${(bytes / 1024 / 1024).toFixed(1)} MB`);
