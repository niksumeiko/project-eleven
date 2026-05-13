import { expect, test } from '@playwright/test';

test('focus on a target and see connection outcome', async ({ page }) => {
  await page.route('**/targets', (route) =>
    route.fulfill({
      json: [
        {
          id: 'st-001',
          name: 'Mike Wheeler',
          signalClarity: 0.92,
          duration: 185,
          dimension: 'hawkins',
          lastKnownLocation: 'Wheeler residence, Maple Street',
        },
        {
          id: 'st-002',
          name: 'Will Byers',
          signalClarity: 0.41,
          duration: 720,
          dimension: 'upside_down',
          lastKnownLocation: 'Castle Byers',
        },
      ],
    }),
  );

  await page.goto('/');

  await expect(
    page.getByRole('heading', { name: 'Void Session' }),
  ).toBeVisible();

  const mikeCard = page
    .getByRole('listitem')
    .filter({ hasText: 'Mike Wheeler' });

  await expect(
    page.getByRole('listitem').filter({ hasText: 'Will Byers' }),
  ).toBeVisible();

  await mikeCard.getByRole('button', { name: 'Focus' }).click();

  await expect(page.getByRole('heading', { name: 'Connected' })).toBeVisible();
  await expect(
    page.getByText('Target located. Signal is strong.'),
  ).toBeVisible();
  await expect(page.getByText('Wheeler residence, Maple Street')).toBeVisible();

  await page.getByRole('button', { name: 'Release' }).click();

  await expect(
    page.getByRole('heading', { name: 'Void Session' }),
  ).toBeVisible();
  await expect(mikeCard).toBeVisible();
});
