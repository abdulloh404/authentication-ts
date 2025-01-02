import { test, expect } from '@playwright/test';
import Env from '@src/common/Env';

const BASE_URL = Env.baseUrl; // แก้ไขตาม URL ของเซิร์ฟเวอร์

test.describe('Authentication API Tests', () => {
  test('Register User', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/auth/register`, {
      data: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      },
    });

    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    expect(responseBody.status).toBe(201);
    expect(responseBody.message).toBe('User registered successfully.');
  });

  test('Login User', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/api/auth/login`, {
      data: {
        email: 'john.doe@example.com',
        password: 'password123',
      },
    });

    expect(response.ok()).toBeTruthy();
    const responseBody = await response.json();
    expect(responseBody.status).toBe(200);
    expect(responseBody.message).toBe('Login successful.');
  });
});