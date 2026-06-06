// @ts-check
import { defineConfig, devices } from '@playwright/test';
export default defineConfig({
  testDir: './tests',

  fullyParallel: true,

  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 0,

  workers: process.env.CI ? 1 : undefined,

  // FIXED: Add BOTH reporters
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['junit', { outputFile: 'test-results/junit-report.xml' }]
  ],

  use: {
    headless: true, // REQUIRED for Jenkins

    trace: 'on-first-retry',

    screenshot: 'only-on-failure', //  debugging

    video: 'retain-on-failure', //  debugging
  },

  projects: [
    // {
    //   name: 'chromium',
    //   use: { ...devices['Desktop Chrome'] }, //  safer for CI
    // },

    // Optional: keep Edge if you want
    {
      name: 'Microsoft Edge',
      use: { ...devices['Desktop Edge'], channel: 'msedge' },
    }
  ],
});
