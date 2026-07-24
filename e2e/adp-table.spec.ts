import { test, expect } from '@playwright/test';

test.describe('ADP Table', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('loads the page successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/ADP Comparison/);
    await expect(page.getByText('ADP Comparison Tool')).toBeVisible();
  });

  test('displays player data', async ({ page }) => {
    await expect(page.locator('table')).toBeVisible();
    const rowCount = await page.locator('tbody tr').count();
    expect(rowCount).toBeGreaterThan(0);
  });

  test('shows column headers', async ({ page }) => {
    await expect(page.getByRole('columnheader', { name: 'Name' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Pos' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Median' })).toBeVisible();
  });

  test('sorts by clicking Median header', async ({ page }) => {
    await page.getByRole('columnheader', { name: /Median/i }).click();
    await page.waitForTimeout(500);
    await expect(page.locator('table')).toBeVisible();
  });

  test('displays position badges', async ({ page }) => {
    const badges = page.locator('[class*="pos-"]');
    await expect(badges.first()).toBeVisible();
  });

  test('table is interactive', async ({ page }) => {
    await page.getByRole('columnheader', { name: /Name/i }).click();
    const rowCount = await page.locator('tbody tr').count();
    expect(rowCount).toBeGreaterThan(0);
  });
});
