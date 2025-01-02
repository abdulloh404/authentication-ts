import Env from '@src/common/Env';
import { expect, test } from '@playwright/test';

test.describe('Authentication API Tests', () => {
  test('Register User', async ({ request }) => {
    const uniqueEmail = `john.doe+${Date.now()}@example.com`;
    const response = await request.post(`${Env.baseUrl}/api/auth/register`, {
      data: {
        firstName: 'John',
        lastName: 'Doe',
        email: uniqueEmail,
        password: 'password123',
        confirmPassword: 'password123',
      },
    });

    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    expect(responseBody.status).toBe(201);
    expect(responseBody.message).toBe('User registered successfully.');
  });

  // test('Login User', async ({ request }) => {
  //   const response = await request.post(`${BASE_URL}/api/auth/login`, {
  //     data: {
  //       email: 'john.doe@example.com',
  //       password: 'password123',
  //     },
  //   });

  //   expect(response.ok()).toBeTruthy();
  //   const responseBody = await response.json();
  //   expect(responseBody.status).toBe(200);
  //   expect(responseBody.message).toBe('Login successful.');
  // });
});
