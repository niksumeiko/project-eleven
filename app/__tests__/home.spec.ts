import { test, expect } from '@playwright/test';

test('displays greeting from Hawkins', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByText('Hello from Hawkins')).toBeVisible();
});
