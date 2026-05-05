import { test, expect } from '@playwright/test';
import { Target } from '../service/targets-service';

const API_URL = '**/targets';

function mockTargets(targets: Partial<Target>[]) {
  return targets.map((t, i) => ({
    id: `test-${i}`,
    name: `Target ${i}`,
    signalClarity: 0.92,
    duration: 185,
    dimension: 'hawkins',
    lastKnownLocation: 'Test Location',
    avatar: '/profiles/mike.png',
    ...t,
  }));
}

async function focusFirstTarget(page: import('@playwright/test').Page) {
  await page.getByTestId('target-card').first().getByRole('button', { name: /focus/i }).click();
}

test.describe('Void Session page', () => {
  test('displays the page title', async ({ page }) => {
    await page.route(API_URL, (route) => route.fulfill({ json: mockTargets([{}]) }));
    await page.goto('/');

    await expect(page.getByTestId('page-title')).toBeVisible();
  });

  test('displays a list of targets', async ({ page }) => {
    await page.route(API_URL, (route) =>
      route.fulfill({ json: mockTargets([{ name: 'Alpha' }, { name: 'Beta' }]) }),
    );
    await page.goto('/');

    await expect(page.getByTestId('target-card')).toHaveCount(2);
  });

  test('each target card has a Focus button', async ({ page }) => {
    await page.route(API_URL, (route) =>
      route.fulfill({ json: mockTargets([{}, {}]) }),
    );
    await page.goto('/');

    await expect(page.getByRole('button', { name: /focus/i })).toHaveCount(2);
  });
});

test.describe('Connected outcome', () => {
  test.beforeEach(async ({ page }) => {
    await page.route(API_URL, (route) =>
      route.fulfill({
        json: mockTargets([{ signalClarity: 0.92, dimension: 'hawkins', duration: 185, lastKnownLocation: 'Maple Street' }]),
      }),
    );
    await page.goto('/');
    await focusFirstTarget(page);
  });

  test('shows Connected heading and copy', async ({ page }) => {
    await expect(page.getByTestId('outcome-heading')).toHaveText('Connected');
    await expect(page.getByTestId('outcome-message')).toHaveText('Target located. Signal is strong.');
  });

  test('shows lastKnownLocation', async ({ page }) => {
    await expect(page.getByTestId('outcome-location')).toHaveText('Maple Street');
  });

  test('hides the target list', async ({ page }) => {
    await expect(page.getByTestId('target-card')).not.toBeAttached();
  });
});

test.describe('Interference outcome', () => {
  test('shows Interference when signal is below 0.8', async ({ page }) => {
    await page.route(API_URL, (route) =>
      route.fulfill({ json: mockTargets([{ signalClarity: 0.79, dimension: 'hawkins' }]) }),
    );
    await page.goto('/');
    await focusFirstTarget(page);

    await expect(page.getByTestId('outcome-heading')).toHaveText('Interference');
    await expect(page.getByTestId('outcome-message')).toHaveText('Something is blocking the signal. The Upside Down is interfering.');
  });

  test('shows Interference when target is in the Upside Down', async ({ page }) => {
    await page.route(API_URL, (route) =>
      route.fulfill({ json: mockTargets([{ signalClarity: 0.92, dimension: 'upside_down' }]) }),
    );
    await page.goto('/');
    await focusFirstTarget(page);

    await expect(page.getByTestId('outcome-heading')).toHaveText('Interference');
  });

  test('does not show lastKnownLocation', async ({ page }) => {
    await page.route(API_URL, (route) =>
      route.fulfill({ json: mockTargets([{ signalClarity: 0.79, dimension: 'hawkins' }]) }),
    );
    await page.goto('/');
    await focusFirstTarget(page);

    await expect(page.getByTestId('outcome-location')).not.toBeAttached();
  });
});

test.describe('Lost outcome', () => {
  test('shows Lost when signal clarity is below 0.3', async ({ page }) => {
    await page.route(API_URL, (route) =>
      route.fulfill({ json: mockTargets([{ signalClarity: 0.2 }]) }),
    );
    await page.goto('/');
    await focusFirstTarget(page);

    await expect(page.getByTestId('outcome-heading')).toHaveText('Lost');
    await expect(page.getByTestId('outcome-message')).toHaveText('Connection severed. Eleven needs to rest.');
  });

  test('shows Lost when session duration exceeds 20 minutes', async ({ page }) => {
    await page.route(API_URL, (route) =>
      route.fulfill({ json: mockTargets([{ signalClarity: 0.92, dimension: 'hawkins', duration: 1201 }]) }),
    );
    await page.goto('/');
    await focusFirstTarget(page);

    await expect(page.getByTestId('outcome-heading')).toHaveText('Lost');
  });
});

test.describe('Release', () => {
  test('clicking Release returns to the target list', async ({ page }) => {
    await page.route(API_URL, (route) =>
      route.fulfill({ json: mockTargets([{ name: 'Test Target' }]) }),
    );
    await page.goto('/');
    await focusFirstTarget(page);
    await page.getByTestId('release-button').click();

    await expect(page.getByTestId('target-card')).toBeVisible();
  });
});
