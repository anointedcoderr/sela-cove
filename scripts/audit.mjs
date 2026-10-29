// Usage: BASE_URL=... OUT=artifacts/screenshots/before node scripts/audit.mjs
// Scrolls through the page, captures a full-page shot per viewport, and prints layout metrics.
import { chromium } from '@playwright/test';

const base = process.env.BASE_URL ?? 'http://localhost:3100';
const out = process.env.OUT ?? 'artifacts/screenshots/after';
const sizes = [[1440, 1000], [1024, 768], [768, 1024], [430, 932], [390, 844], [320, 740]];
const only = (process.env.ONLY ?? '').split(',').filter(Boolean).map(Number);

const browser = await chromium.launch();
for (const [w, h] of sizes) {
  if (only.length && !only.includes(w)) continue;
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  const page = await ctx.newPage();
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await page.evaluate(async () => {
    document.documentElement.style.scrollBehavior = 'auto'; // smooth scrolling would still be in flight when the screenshot is taken
    for (let y = 0; y < document.body.scrollHeight; y += 350) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 90)); }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(600);
  const m = await page.evaluate(() => {
    const imgs = [...document.querySelectorAll('main img')].map((i) => ({
      src: decodeURIComponent((i.currentSrc || i.src).replace(/^.*url=/, '').slice(0, 70)),
      natural: `${i.naturalWidth}x${i.naturalHeight}`,
      shown: `${Math.round(i.getBoundingClientRect().width)}x${Math.round(i.getBoundingClientRect().height)}`,
    }));
    const journal = [...document.querySelectorAll('#journal-title ~ ul > li, section[aria-labelledby="journal-title"] ul > li')].map((l) => Math.round(l.getBoundingClientRect().width));
    return { height: document.documentElement.scrollHeight, sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, imgs, journal };
  });
  console.log(`\n== ${w}x${h}: height ${m.height}, scrollWidth ${m.sw}/${m.cw}, journal col widths ${m.journal}`);
  if (process.env.IMGS) for (const i of m.imgs) console.log('  ', i.natural.padEnd(10), 'shown', i.shown.padEnd(9), i.src);
  await page.screenshot({ path: `${out}/home-${w}.png`, fullPage: true });
  await ctx.close();
}
await browser.close();
