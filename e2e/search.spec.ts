import { test, expect } from '@playwright/test';

test.describe('Search Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('searches for a player by name', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search players...');
    await searchInput.fill('Jefferson');
    await page.waitForTimeout(600);
    const rowCount = await page.locator('tbody tr').count();
    expect(rowCount).toBeGreaterThan(0);
  });

  test('clears search', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search players...');
    await searchInput.fill('Jefferson');
    await page.waitForTimeout(600);
    await searchInput.fill('');
    await page.waitForTimeout(600);
    const rowCount = await page.locator('tbody tr').count();
    expect(rowCount).toBeGreaterThan(10);
  });

  test('search is case-insensitive', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search players...');
    await searchInput.fill('jefferson');
    await page.waitForTimeout(600);
    const rowCount = await page.locator('tbody tr').count();
    expect(rowCount).toBeGreaterThan(0);
  });

  test('handles search with no results', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search players...');
    await searchInput.fill('xyznonexistent123');
    await page.waitForTimeout(1000);
    await expect(page.getByText('No players match the current filters.')).toBeVisible();
  });
});
