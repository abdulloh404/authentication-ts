import { test, expect } from '@playwright/test';

test.describe('Authentication API Tests', () => {
  test('Register User', async ({ request }) => {
    const response = await request.post('/api/auth/register', {
      data: {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      },
    });

    expect(response.status()).toBe(201);
    const body = await response.json();
    expect(body).toMatchObject({
      message: 'User registered successfully.',
    });
  });

  test('Login User', async ({ request }) => {
    const response = await request.post('/api/auth/login', {
      data: {
        email: 'john.doe@example.com',
        password: 'password123',
      },
    });

    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toHaveProperty('token');
  });
});
