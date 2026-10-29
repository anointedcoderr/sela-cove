// Manual-style browser verification that can run against any deployment.
// Usage: BASE_URL=https://selacove.rssworldnet.work node scripts/verify.mjs
import { chromium, firefox } from '@playwright/test';

const base = (process.env.BASE_URL ?? 'http://localhost:3100').replace(/\/$/, '');
const routes = ['/start-here', '/work-with-me', '/shop', '/journal', '/about', '/audit', '/brand-foundation', '/creative-brand-direction', '/contact',
  '/shop/brand-foundation-workbook', '/shop/halden-mini-brand-kit', '/shop/talia-blake-mini-brand-kit', '/shop/patina-website-template',
  '/journal/why-cant-i-get-my-logo-to-look-right', '/journal/what-makes-a-logo-look-professional', '/journal/how-to-find-the-right-keywords-for-your-small-business'];
const widths = [[320, 740], [359, 740], [360, 740], [375, 812], [390, 844], [430, 932], [639, 900], [640, 900], [767, 1024], [768, 1024], [1023, 768], [1024, 768], [1279, 800], [1280, 800], [1440, 1000], [1920, 1080]];
const results = [];
const check = (name, ok, detail = '') => { results.push({ name, ok, detail }); console.log(`${ok ? 'PASS' : 'FAIL'}  ${name}${detail ? '  ' + detail : ''}`); };

const browser = await chromium.launch();

// 1. Every width: no overflow, all images load after scrolling, no console errors / failed local requests
for (const [w, h] of widths) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h } });
  const page = await ctx.newPage();
  const problems = [];
  page.on('console', (m) => { if (m.type() === 'error') problems.push('console: ' + m.text().slice(0, 120)); });
  page.on('pageerror', (e) => problems.push('pageerror: ' + e.message));
  page.on('response', (r) => { if (r.status() >= 400 && r.url().startsWith(base)) problems.push(`${r.status()} ${r.url().slice(0, 100)}`); });
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  await page.evaluate(async () => { document.documentElement.style.scrollBehavior = 'auto'; for (let y = 0; y < document.body.scrollHeight; y += 300) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 70)); } });
  await page.waitForTimeout(800);
  const m = await page.evaluate(() => ({
    sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth,
    broken: [...document.images].filter((i) => i.getBoundingClientRect().width > 0 && (!i.complete || i.naturalWidth === 0)).map((i) => i.currentSrc.slice(-60)),
    outside: [...document.querySelectorAll('h1,h2,h3,p,a,button,li,img')].filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && (r.right > innerWidth + 1 || r.left < -1); }).map((e) => e.tagName + ':' + (e.textContent ?? '').slice(0, 30)),
    h1Lines: Math.round(document.querySelector('h1').getBoundingClientRect().height / parseFloat(getComputedStyle(document.querySelector('h1')).lineHeight)),
    headerH: Math.round(document.querySelector('header').getBoundingClientRect().height),
  }));
  const ok = m.sw <= m.cw && m.broken.length === 0 && m.outside.length === 0 && problems.length === 0;
  check(`home @${w}x${h}`, ok, `h1 ${m.h1Lines} lines, header ${m.headerH}px${m.broken.length ? ', broken ' + m.broken : ''}${m.outside.length ? ', outside ' + m.outside : ''}${problems.length ? ', ' + problems : ''}`);
  await ctx.close();
}

// 2. Mobile menu by keyboard, including a short landscape viewport
for (const [w, h] of [[390, 844], [320, 740], [667, 375], [844, 390]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, hasTouch: true });
  const page = await ctx.newPage();
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  const toggle = page.getByRole('button', { name: 'Open menu' });
  await toggle.focus();
  await page.keyboard.press('Enter');
  const menu = page.getByRole('navigation', { name: 'Mobile' });
  await menu.waitFor({ state: 'visible' });
  const locked = await page.evaluate(() => document.body.style.overflow === 'hidden');
  // Tab through everything; focus must stay inside the header controls and loop back
  const seen = new Set();
  for (let i = 0; i < 12; i++) { await page.keyboard.press('Tab'); seen.add(await page.evaluate(() => document.activeElement?.getAttribute('aria-label') || document.activeElement?.textContent?.trim().slice(0, 20))); }
  const stillInHeader = await page.evaluate(() => !!document.activeElement?.closest('header'));
  await page.keyboard.press('Shift+Tab');
  const backInHeader = await page.evaluate(() => !!document.activeElement?.closest('header'));
  // Everything reachable? (last link visible/scrollable inside the panel)
  const lastLink = menu.getByRole('link', { name: 'Take the Free Audit' });
  await lastLink.scrollIntoViewIfNeeded();
  const lb = await lastLink.boundingBox();
  const fits = lb && lb.y + lb.height <= h + 1;
  await page.keyboard.press('Escape');
  const hidden = await menu.waitFor({ state: 'hidden', timeout: 3000 }).then(() => true, () => false);
  const focusReturned = await page.evaluate(() => document.activeElement?.getAttribute('aria-label') === 'Open menu');
  const unlocked = await page.evaluate(() => document.body.style.overflow !== 'hidden');
  await toggle.click();
  await menu.getByRole('link', { name: /About/ }).click();
  await page.waitForURL('**/about');
  const closedAfterNav = await menu.waitFor({ state: 'hidden', timeout: 3000 }).then(() => true, () => false);
  check(`menu keyboard @${w}x${h}`, locked && stillInHeader && backInHeader && fits && hidden && focusReturned && unlocked && closedAfterNav,
    `scrollLock ${locked}, focusTrapped ${stillInHeader}/${backInHeader}, ctaReachable ${fits}, escapeCloses ${hidden}, focusReturned ${focusReturned}, unlocked ${unlocked}, closeOnNav ${closedAfterNav}`);
  await ctx.close();
}

// 3. Every internal route: direct load, reload, home link
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  const problems = [];
  page.on('console', (m) => { if (m.type() === 'error') problems.push(m.text().slice(0, 100)); });
  page.on('pageerror', (e) => problems.push(e.message));
  for (const r of routes) {
    const res = await page.goto(base + r, { waitUntil: 'networkidle' });
    const h1 = await page.getByRole('heading', { level: 1 }).first().textContent();
    const msg = await page.getByText('Something thoughtful is taking shape.').isVisible();
    await page.reload({ waitUntil: 'networkidle' });
    const h1b = await page.getByRole('heading', { level: 1 }).first().textContent();
    await page.getByRole('link', { name: 'Back to Home' }).click();
    await page.waitForURL(base + '/');
    check(`route ${r}`, res.status() === 200 && msg && h1 === h1b, `"${h1?.trim()}"`);
  }
  check('routes: no console errors', problems.length === 0, problems.join('; '));
  await ctx.close();
}

// 4. Principal journeys through real links, and back/forward
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  await page.goto(base + '/');
  const journeys = [[/Explore the Free Audit/, '/audit'], [/Find Your Starting Point/, '/start-here'], [/Discover the Workbook/, '/brand-foundation'], [/Explore Creative Direction/, '/creative-brand-direction'],
    [/Meet Patina/, '/shop/patina-website-template'], [/Explore the Kit.*Halden/, '/shop/halden-mini-brand-kit'], [/Explore the Kit.*Talia/, '/shop/talia-blake-mini-brand-kit'], [/Discover the Workbook.*Brand Foundation Workbook/, '/shop/brand-foundation-workbook'],
    [/Read Article.*Why can/, '/journal/why-cant-i-get-my-logo-to-look-right'], [/Read Article.*What makes a logo/, '/journal/what-makes-a-logo-look-professional'], [/Read Article.*How to find/, '/journal/how-to-find-the-right-keywords-for-your-small-business'],
    [/Read the Full Story/, '/about'], [/Browse the whole shop/, '/shop'], [/All articles/, '/journal']];
  for (const [name, path] of journeys) {
    await page.goto(base + '/');
    const link = page.getByRole('link', { name }).first();
    await link.scrollIntoViewIfNeeded();
    await link.click();
    await page.waitForURL(base + path);
    await page.goBack(); await page.waitForURL(base + '/');
    await page.goForward(); await page.waitForURL(base + path);
    check(`journey ${name} -> ${path}`, true);
  }
  await ctx.close();
}

// 5. External links: correct destinations, safe attributes (not followed or logged into)
{
  const ctx = await browser.newContext({ viewport: { width: 1280, height: 800 } });
  const page = await ctx.newPage();
  await page.goto(base + '/');
  const links = await page.getByRole('contentinfo').locator('a[target=_blank]').evaluateAll((as) => as.map((a) => [a.href, a.rel]));
  const expected = ['https://www.instagram.com/sela_cove/', 'https://www.pinterest.com/sela_cove/', 'https://www.etsy.com/shop/SelaCove'];
  check('footer social links', expected.every((e) => links.some(([h, rel]) => h === e && /noopener/.test(rel))), JSON.stringify(links.map((l) => l[0])));
  await ctx.close();
}

// 6. Firefox smoke
try {
  const ff = await firefox.launch();
  const page = await (await ff.newContext({ viewport: { width: 390, height: 844 } })).newPage();
  await page.goto(base + '/', { waitUntil: 'networkidle' });
  const sw = await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth);
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.getByRole('navigation', { name: 'Mobile' }).getByRole('link', { name: /Shop/ }).click();
  await page.waitForURL('**/shop');
  check('firefox mobile smoke', sw);
  await ff.close();
} catch (e) { check('firefox mobile smoke', false, String(e).slice(0, 100)); }

await browser.close();
const failed = results.filter((r) => !r.ok);
console.log(`\n${results.length - failed.length}/${results.length} checks passed`);
process.exit(failed.length ? 1 : 0);
