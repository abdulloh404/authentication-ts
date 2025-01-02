import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';
import Env from '@src/common/Env';

dotenv.config();

export default defineConfig({
  testDir: './tests',
  timeout: 30000,
  retries: 2,
  use: {
    baseURL: Env.baseUrl,
    headless: true,
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    {
      name: 'Chromium',
      use: { ...process.env, browserName: 'chromium' },
    },
  ],
  reporter: [['list'], ['html', { outputFolder: 'test-results' }]],
});
