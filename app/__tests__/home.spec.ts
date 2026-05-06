import { test, expect } from '@playwright/test';
import { mockTargets } from '../mocks/mockData';

// test('displays greeting from Hawkins', async ({ page }) => {
//     await page.goto('/');

//     await expect(page.getByText('Hello from Hawkins')).toBeVisible();
// });

test.describe('VoidSession', () => {
  test('should show loading state initially', async ({ page }) => {
    await page.route('**/targets', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await route.fulfill({ json: mockTargets });
    });

    await page.goto('/');
    await expect(page.getByText('Loading...')).toBeVisible();
  });

  test('should show error when fetch fails', async ({ page }) => {
    await page.route('**/targets', async (route) => {
      await route.fulfill({ status: 500 });
    });
    await page.goto('/');
    await expect(page.getByText(/error fetching data/i)).toBeVisible();
  });

  test('should show targets list on successful fetch', async ({ page }) => {
    await page.route('**/targets', async (route) => {
      await route.fulfill({ json: mockTargets });
    });
    await page.goto('/');

    await expect(page.getByText('Loading...')).not.toBeVisible();
    await expect(page.getByTestId('page-heading')).toBeVisible();
  });

  test('should show target outcome when a target is selected', async ({
    page,
  }) => {
    await page.route('**/targets', async (route) => {
      await route.fulfill({ json: mockTargets });
    });
    await page.goto('/');
    await expect(page.getByTestId('targets-list')).toBeVisible();

    await page.getByRole('button', { name: 'Focus' }).first().click();

    await expect(page.getByTestId('targets-list')).not.toBeVisible();
    await expect(page.getByTestId('target-outcome')).toBeVisible();
  });

  test('should show targets list again when the release button is clicked', async ({
    page,
  }) => {
    await page.route('**/targets', async (route) => {
      await route.fulfill({ json: mockTargets });
    });

    await page.goto('/');

    await expect(page.getByTestId('targets-list')).toBeVisible();

    await page.getByRole('button', { name: 'Focus' }).first().click();

    await expect(page.getByTestId('target-outcome')).toBeVisible();
    await expect(page.getByTestId('targets-list')).not.toBeVisible();

    await page.getByRole('button', { name: 'release' }).click();

    await expect(page.getByTestId('targets-list')).toBeVisible();
    await expect(page.getByTestId('target-outcome')).not.toBeVisible();
  });
});
