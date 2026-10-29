// Usage: BASE_URL=http://localhost:3100 node scripts/screenshots.mjs [widths...]
import { chromium } from '@playwright/test';

const base = process.env.BASE_URL ?? 'http://localhost:3100';
const widths = process.argv.slice(2).map(Number).filter(Boolean);
const sizes = widths.length ? widths : [320, 375, 390, 430, 768, 1024, 1280, 1440, 1920];
const pages = { home: '/', placeholder: '/start-here' };

const browser = await chromium.launch();
for (const w of sizes) {
  const ctx = await browser.newContext({ viewport: { width: w, height: w < 700 ? 844 : 900 }, reducedMotion: 'reduce' });
  const page = await ctx.newPage();
  for (const [name, path] of Object.entries(pages)) {
    await page.goto(base + path, { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(300);
    await page.screenshot({ path: `artifacts/screenshots/${name}-${w}-full.png`, fullPage: true });
    await page.screenshot({ path: `artifacts/screenshots/${name}-${w}-fold.png` });
  }
  await ctx.close();
}
// Mobile menu open state
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 } });
  const page = await ctx.newPage();
  await page.goto(base + '/');
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.waitForTimeout(700);
  await page.screenshot({ path: 'artifacts/screenshots/home-390-menu-open.png' });
  await ctx.close();
}
await browser.close();
