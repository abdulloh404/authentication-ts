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
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    clientCertificates: [
      {
        origin: 'https://localhost:3000',
        certPath: './../environments/certificate/localhost.crt',
        keyPath: './../environments/certificate/localhost.key',
      },
    ],
  },
  webServer: {
    command: 'npx nx run authentication-api:serve',
    url: 'https://localhost:3000',
    reuseExistingServer: !process.env['CI'],
    cwd: workspaceRoot,
  },
  reporter: [['list'], ['html', { outputFolder: 'test-results' }]],
});
