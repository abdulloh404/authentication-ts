import Env from '../../src/common/Env';
import { expect, test } from '@playwright/test';

test.describe('Authentication API Tests', () => {
  test.beforeAll(() => {
    console.log('Loaded Environment Variables:', Env);
  });

  const baseURL = process.env['BASE_URL'] + ':' + process.env['PORT'];

  test.describe('Authentication API Tests', () => {
    test('Register User', async ({ request }) => {
      const uniqueEmail = `john.doe+${Date.now()}@example.com`;

      const response = await request.post(baseURL + '/api/auth/register', {
        ignoreHTTPSErrors: true,
        data: {
          firstName: 'John',
          lastName: 'Doe',
          email: uniqueEmail,
          password: 'password123',
          confirmPassword: 'password123',
        },
      });

      // ตรวจสอบสถานะและข้อความตอบกลับ
      expect(response.ok()).toBeTruthy();
      const responseBody = await response.json();
      expect(responseBody.status).toBe(201);
      expect(responseBody.message).toBe('User registered successfully.');
    });
  });

  // Uncomment and modify the following test as needed
  // test('Login User', async ({ request }) => {
  //   const response = await request.post(`${Env.baseUrl}/api/auth/login`, {
  //     data: {
  //       email: 'john.doe@example.com',
  //       password: 'password123',
  //     },
  //   });

  //   console.log(`Response Status: ${response.status()}`);
  //   const responseBody = await response.json();
  //   console.log('Response Body:', responseBody);

  //   expect(response.ok()).toBeTruthy();
  //   expect(responseBody.status).toBe(200);
  //   expect(responseBody.message).toBe('Login successful.');
  // });
});
