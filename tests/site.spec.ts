import { expect, test, type Page } from '@playwright/test';

const routes = [
  '/start-here', '/work-with-me', '/shop', '/journal', '/about', '/contact', '/audit',
  '/brand-foundation', '/creative-brand-direction',
  '/shop/brand-foundation-workbook', '/shop/halden-mini-brand-kit', '/shop/talia-blake-mini-brand-kit',
  '/shop/patina-website-template', '/shop/portfolio-blog-website-template',
  '/journal/why-cant-i-get-my-logo-to-look-right', '/journal/what-makes-a-logo-look-professional',
  '/journal/how-to-find-the-right-keywords-for-your-small-business',
];

const widths = [320, 375, 390, 430, 768, 1024, 1280, 1440, 1920];

function watch(page: Page) {
  const problems: string[] = [];
  page.on('console', (m) => { if (m.type() === 'error') problems.push(`console: ${m.text()}`); });
  page.on('pageerror', (e) => problems.push(`pageerror: ${e.message}`));
  page.on('response', (r) => { if (r.status() >= 400 && r.url().startsWith('http://localhost')) problems.push(`${r.status()} ${r.url()}`); });
  // Next.js aborts in-flight link prefetches (?_rsc=) when you navigate away; that is expected, not a failure.
  page.on('requestfailed', (r) => { if (!r.url().includes('_rsc=')) problems.push(`failed: ${r.url()}`); });
  return problems;
}

// Lazy images only load near the viewport: visit each one, then wait until it has decoded.
async function expectAllImagesLoaded(page: Page) {
  const count = await page.locator('img').count();
  for (let i = 0; i < count; i++) {
    const img = page.locator('img').nth(i);
    await img.scrollIntoViewIfNeeded();
    await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth > 0), { message: `image ${i} loads`, timeout: 15_000 }).toBe(true);
  }
}

async function scrollThrough(page: Page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 50)); }
    window.scrollTo(0, 0);
  });
}

test.describe('homepage', () => {
  test('loads with hero, fonts, images and no errors', async ({ page }) => {
    const problems = watch(page);
    await page.goto('/');
    await expect(page).toHaveTitle(/Sela Cove/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText('Before you change everything');
    await expect(page.getByRole('link', { name: 'Explore the Free Audit' }).first()).toBeVisible();

    await expectAllImagesLoaded(page);

    const fonts = await page.evaluate(async () => {
      await document.fonts.ready;
      return { serif: document.fonts.check('40px "Instrument Serif"'), sans: document.fonts.check('16px Manrope'), loaded: [...document.fonts].filter((f) => f.status === 'loaded').length };
    });
    expect(fonts.loaded).toBeGreaterThanOrEqual(2);
    const h1Font = await page.locator('h1').evaluate((e) => getComputedStyle(e).fontFamily);
    expect(h1Font).toMatch(/instrument/i);
    expect(problems).toEqual([]);
  });

  test('has one h1, ordered headings, alt text and noindex', async ({ page }) => {
    await page.goto('/');
    expect(await page.locator('h1').count()).toBe(1);
    const missingAlt = await page.$$eval('img', (imgs) => imgs.filter((i) => !i.getAttribute('alt')).length);
    expect(missingAlt).toBe(0);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', /noindex/);
    await expect(page.getByRole('contentinfo')).toContainText('RSS World Network');
    await expect(page.getByRole('contentinfo')).toContainText('not the official Sela Cove website');
  });

  test('primary CTAs go where they say', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Explore the Free Audit' }).first().click();
    await expect(page).toHaveURL(/\/audit$/);
    await page.goBack();
    await page.getByRole('link', { name: 'Find Your Starting Point' }).first().click();
    await expect(page).toHaveURL(/\/start-here$/);
    await page.goBack();
    await page.getByRole('link', { name: /Discover the Workbook/ }).first().click();
    await expect(page).toHaveURL(/\/brand-foundation$/);
    await page.goBack();
    await page.getByRole('link', { name: /Explore Creative Direction/ }).first().click();
    await expect(page).toHaveURL(/\/creative-brand-direction$/);
  });

  test('product and article cards lead to their placeholders', async ({ page }) => {
    await page.goto('/');
    for (const [name, url] of [
      [/Meet Patina/, '/shop/patina-website-template'],
      [/Explore the Kit.*Halden/, '/shop/halden-mini-brand-kit'],
      [/Explore the Kit.*Talia/, '/shop/talia-blake-mini-brand-kit'],
      [/Read Article.*Why can/, '/journal/why-cant-i-get-my-logo-to-look-right'],
      [/Read Article.*What makes a logo/, '/journal/what-makes-a-logo-look-professional'],
      [/Read Article.*How to find/, '/journal/how-to-find-the-right-keywords-for-your-small-business'],
    ] as const) {
      await page.getByRole('link', { name }).first().scrollIntoViewIfNeeded();
      await page.getByRole('link', { name }).first().click();
      await expect(page).toHaveURL(new RegExp(url + '$'));
      await expect(page.getByText('Something thoughtful is taking shape.')).toBeVisible();
      await page.goBack();
      await expect(page).toHaveURL(/localhost:\d+\/$/);
    }
  });
});

test.describe('routes', () => {
  for (const route of routes) {
    test(`${route} resolves directly, survives reload, and links home`, async ({ page }) => {
      const problems = watch(page);
      const res = await page.goto(route);
      expect(res?.status()).toBe(200);
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(page.getByText('Something thoughtful is taking shape.')).toBeVisible();
      await expect(page.getByRole('contentinfo')).toContainText('RSS World Network');
      await page.reload();
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await page.waitForLoadState('networkidle');
      await expectAllImagesLoaded(page);
      await page.getByRole('link', { name: 'Back to Home' }).click();
      await expect(page).toHaveURL(/localhost:\d+\/$/);
      expect(problems).toEqual([]);
    });
  }

  test('unknown routes show the styled fallback, not a bare 404', async ({ page }) => {
    await page.goto('/definitely-not-a-page');
    await expect(page.getByRole('link', { name: 'Back to Home' })).toBeVisible();
    await expect(page.locator('header')).toBeVisible();
  });
});

test.describe('desktop navigation', () => {
  test.use({ viewport: { width: 1440, height: 900 } });
  test('every nav item works and back/forward behave', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation', { name: 'Primary' });
    const items = [['Start Here', '/start-here'], ['Work With Me', '/work-with-me'], ['Shop', '/shop'], ['Journal', '/journal'], ['About', '/about']] as const;
    for (const [label, path] of items) {
      await nav.getByRole('link', { name: label }).click();
      await expect(page).toHaveURL(new RegExp(path + '$'));
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
      await expect(nav.getByRole('link', { name: label })).toHaveAttribute('aria-current', 'page');
    }
    await page.goBack();
    await expect(page).toHaveURL(/\/journal$/);
    await page.goForward();
    await expect(page).toHaveURL(/\/about$/);
    await nav.getByRole('link', { name: 'Home' }).click();
    await expect(page).toHaveURL(/localhost:\d+\/$/);
    await page.getByRole('banner').getByRole('link', { name: 'Take the Free Audit' }).click();
    await expect(page).toHaveURL(/\/audit$/);
  });

  test('keyboard focus is visible and skip link works', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
    await page.keyboard.press('Tab');
    await expect(page.getByRole('banner').getByRole('link', { name: 'Sela Cove, home' })).toBeFocused();
    const outline = await page.evaluate(() => getComputedStyle(document.activeElement!).outlineStyle);
    expect(outline).not.toBe('none');
  });
});

test.describe('mobile menu', () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test('opens, traps nothing it shouldn’t, closes with Escape and after navigation', async ({ page }) => {
    await page.goto('/');
    const toggle = page.getByRole('button', { name: 'Open menu' });
    await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    await toggle.click();
    const menu = page.getByRole('navigation', { name: 'Mobile' });
    await expect(page.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true');
    await expect(menu.getByRole('link', { name: /Shop/ })).toBeVisible();
    await page.keyboard.press('Escape');
    await expect(menu).toBeHidden();
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeFocused();

    await page.getByRole('button', { name: 'Open menu' }).click();
    await menu.getByRole('link', { name: /Journal/ }).click();
    await expect(page).toHaveURL(/\/journal$/);
    await expect(menu).toBeHidden();
    await expect(page.getByRole('button', { name: 'Open menu' })).toHaveAttribute('aria-expanded', 'false');
  });

  test('every mobile menu link navigates', async ({ page }) => {
    for (const label of ['Home', 'Start Here', 'Work With Me', 'Shop', 'Journal', 'About']) {
      await page.goto('/contact');
      await page.getByRole('button', { name: 'Open menu' }).click();
      await page.getByRole('navigation', { name: 'Mobile' }).getByRole('link', { name: new RegExp(label) }).click();
      await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    }
    await page.goto('/');
    await page.getByRole('button', { name: 'Open menu' }).click();
    await page.getByRole('navigation', { name: 'Mobile' }).getByRole('link', { name: 'Take the Free Audit' }).click();
    await expect(page).toHaveURL(/\/audit$/);
  });
});

test.describe('responsive', () => {
  for (const width of widths) {
    test(`no horizontal overflow or clipped text at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: width < 700 ? 844 : 900 });
      for (const path of ['/', '/start-here', '/shop/halden-mini-brand-kit']) {
        await page.goto(path);
        await scrollThrough(page);
        const m = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth }));
        expect(m.sw, `${path} scrollWidth`).toBeLessThanOrEqual(m.cw);
        const overflowing = await page.evaluate(() => {
          const out: string[] = [];
          for (const el of document.querySelectorAll('h1,h2,h3,p,a,button,li')) {
            const r = el.getBoundingClientRect();
            if (r.width > 0 && (r.right > window.innerWidth + 1 || r.left < -1)) out.push(`${el.tagName}:${(el.textContent ?? '').slice(0, 40)}`);
          }
          return out;
        });
        expect(overflowing, `${path} elements outside the viewport`).toEqual([]);
        const header = await page.locator('header').boundingBox();
        expect(header!.height).toBeLessThan(100);
      }
    });
  }

  test('touch targets on mobile are at least 40px', async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto('/');
    for (const loc of [page.getByRole('button', { name: 'Open menu' }), page.getByRole('link', { name: 'Explore the Free Audit' }).first(), page.getByRole('link', { name: 'Find Your Starting Point' }).first()]) {
      const b = await loc.boundingBox();
      expect(b!.height).toBeGreaterThanOrEqual(40);
      expect(b!.width).toBeGreaterThanOrEqual(40);
    }
  });
});

test.describe('motion', () => {
  test.use({ reducedMotion: 'reduce' });
  test('reduced motion leaves all content visible without scrolling', async ({ page }) => {
    await page.goto('/');
    const hidden = await page.$$eval('[data-reveal="hidden"]', (els) => els.length);
    expect(hidden).toBe(0);
  });
});
