import { test, expect } from '@playwright/test';

test.describe('Source Toggles', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('all sources visible by default', async ({ page }) => {
    await expect(page.getByRole('button', { name: 'Sleeper' }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: 'MFL' }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: 'ESPN' }).first()).toBeVisible();
    await expect(page.getByRole('button', { name: 'FantasyPros' }).first()).toBeVisible();
  });

  test('toggles a source off and on', async ({ page }) => {
    const sleeperBtn = page.getByRole('button', { name: 'Sleeper' }).first();
    await sleeperBtn.click();
    await page.waitForTimeout(300);
    await sleeperBtn.click();
    await page.waitForTimeout(300);
    await expect(sleeperBtn).toBeVisible();
  });
});
