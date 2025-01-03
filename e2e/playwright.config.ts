import dotenv from 'dotenv';
import { defineConfig } from '@playwright/test';
import { workspaceRoot } from '@nx/devkit';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
dotenv.config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const baseURL = process.env['BASE_URL'];

export default defineConfig({
  testDir: './src',
  timeout: 30000,
  retries: 2,
  use: {
    baseURL: baseURL,
    headless: true,
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    clientCertificates: [
      {
        origin: 'https://localhost.com:3000',
        certPath: './../environments/certificate/localhost.com.crt',
        keyPath: './../environments/certificate/localhost.com-key.pem',
      },
    ],
  },
  webServer: {
    command: 'npx nx run serve',
    url: 'https://localhost.com:3000',
    reuseExistingServer: !process.env['CI'],
    cwd: workspaceRoot,
  },
  reporter: [['list'], ['html', { outputFolder: 'test-results' }]],
});
