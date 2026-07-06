import { test, expect } from '@playwright/test';

const TEST_USER = {
  user_handle: `testuser_${Date.now()}`,
  email_address: `test_${Date.now()}@example.com`,
  first_name: 'Test',
  last_name: 'User',
};

test.describe.serial('Authentication flow', () => {
  test('sign up a new user and land on feed', async ({ page }) => {
    await page.goto('/signup');
    await expect(page.getByRole('heading', { name: 'Sign up' })).toBeVisible();

    await page.getByPlaceholder('Handle').fill(TEST_USER.user_handle);
    await page.getByPlaceholder('First name').fill(TEST_USER.first_name);
    await page.getByPlaceholder('Last name').fill(TEST_USER.last_name);
    await page.getByPlaceholder('Email').fill(TEST_USER.email_address);
    await page.getByRole('button', { name: 'Sign up' }).click();

    await page.waitForURL('/', { timeout: 10000 });

    const token = await page.evaluate(() => localStorage.getItem('twitter_clone_token'));
    expect(token).toBeTruthy();

    await expect(page.getByRole('button', { name: 'Sign out' })).toBeVisible();
  });

  test('sign out redirects to signin page', async ({ page }) => {
    await page.goto('/signin');
    await page.getByPlaceholder('Email').fill(TEST_USER.email_address);
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.waitForURL('/', { timeout: 10000 });

    await expect(page.getByRole('button', { name: 'Sign out' })).toBeVisible();

    await page.getByRole('button', { name: 'Sign out' }).click();
    await page.waitForURL('/signin', { timeout: 10000 });

    const token = await page.evaluate(() => localStorage.getItem('twitter_clone_token'));
    expect(token).toBeNull();

    await expect(page.getByRole('link', { name: 'Sign in' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign out' })).not.toBeVisible();
  });

  test('sign in with existing user', async ({ page }) => {
    await page.goto('/signin');
    await page.getByPlaceholder('Email').fill(TEST_USER.email_address);
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.waitForURL('/', { timeout: 10000 });

    await expect(page.getByRole('button', { name: 'Sign out' })).toBeVisible();
  });

  test('redirects unauthenticated users from / to /signin', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('/signin');
  });

  test('redirects authenticated users from /signin to /', async ({ page }) => {
    await page.goto('/signin');
    await page.getByPlaceholder('Email').fill(TEST_USER.email_address);
    await page.getByRole('button', { name: 'Sign in' }).click();
    await page.waitForURL('/', { timeout: 10000 });

    await page.goto('/signin');
    await expect(page).toHaveURL('/');
  });
});
