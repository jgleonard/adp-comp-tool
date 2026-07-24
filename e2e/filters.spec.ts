import { test, expect } from '@playwright/test';

test.describe('Filters', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('filters by position', async ({ page }) => {
    await page.getByRole('button', { name: 'QB' }).click();
    await page.waitForTimeout(300);
    const positions = page.locator('tbody tr').locator('[class*="pos-"]');
    await expect(positions.first()).toBeVisible();
  });

  test('toggles position filter off', async ({ page }) => {
    await page.getByRole('button', { name: 'QB' }).click();
    await page.waitForTimeout(300);
    await page.getByRole('button', { name: 'QB' }).click();
    await page.waitForTimeout(300);
    const rowCount = await page.locator('tbody tr').count();
    expect(rowCount).toBeGreaterThan(10);
  });

  test('combines search and position filter', async ({ page }) => {
    await page.getByRole('button', { name: 'WR' }).click();
    await page.waitForTimeout(300);
    const searchInput = page.getByPlaceholder('Search players...');
    await searchInput.fill('Jefferson');
    await page.waitForTimeout(400);
    const rowCount = await page.locator('tbody tr').count();
    expect(rowCount).toBeGreaterThan(0);
  });
});
