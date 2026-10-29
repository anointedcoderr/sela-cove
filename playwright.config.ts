import { defineConfig, devices } from '@playwright/test';

const PORT = Number(process.env.PORT ?? 3100);

export default defineConfig({
  testDir: './tests',
  timeout: 60_000,
  retries: 0,
  reporter: [['list'], ['html', { open: 'never' }]],
  // Set BASE_URL to test a deployment instead of the local build.
  use: { baseURL: process.env.BASE_URL ?? `http://localhost:${PORT}`, trace: 'retain-on-failure' },
  webServer: process.env.BASE_URL ? undefined : {
    command: `npx wrangler dev --port ${PORT}`, // serves ./out exactly like production static assets; run `npm run build` first
    url: `http://localhost:${PORT}`,
    reuseExistingServer: true,
    timeout: 60_000,
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    // Opt in with e.g. BROWSERS=firefox,webkit (browsers must be installed and the host must have their system libraries).
    ...(process.env.BROWSERS?.split(',').includes('firefox') ? [{ name: 'firefox', use: { ...devices['Desktop Firefox'] } }] : []),
    ...(process.env.BROWSERS?.split(',').includes('webkit') ? [{ name: 'webkit', use: { ...devices['Desktop Safari'] } }] : []),
  ],
});
