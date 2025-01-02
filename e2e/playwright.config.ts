import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 2,
  use: {
    ignoreHTTPSErrors: true,
    baseURL: process.env['BASE_URL'] || 'http://localhost:3000',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'Chromium',
      use: { ...process.env, browserName: 'chromium' },
    },
    {
      name: 'Firefox',
      use: { ...process.env, browserName: 'firefox' },
    },
    {
      name: 'WebKit',
      use: { ...process.env, browserName: 'webkit' },
    },
  ],
  reporter: [['list'], ['html', { outputFolder: 'test-results' }]],
});
