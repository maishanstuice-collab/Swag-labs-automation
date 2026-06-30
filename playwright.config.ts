import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './src/tests',
  /* Run tests in files sequentially so the user can visually track browser execution */
  fullyParallel: false,
  /* Set workers to 1 to prevent multiple headed browser windows overlapping */
  workers: 1,
  reporter: [['html', { open: 'never' }]],
  /* 60 seconds timeout across all generated test scripts */
  timeout: 60000,
  expect: {
    timeout: 60000,
  },
  use: {
    baseURL: 'https://www.saucedemo.com',
    trace: 'on-first-retry',
    /* Headed execution: headless must be false */
    headless: false,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 60000,
    navigationTimeout: 60000,
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
