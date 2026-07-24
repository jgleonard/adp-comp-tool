import { test, expect } from '@playwright/test';

test.describe('Responsive Design', () => {
  test('renders correctly on mobile', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 375, height: 667 },
    });
    const page = await context.newPage();
    await page.goto('/');
    await expect(page.getByText('ADP Comparison Tool')).toBeVisible();
    await expect(page.locator('table')).toBeVisible();
    await context.close();
  });

  test('renders correctly on tablet', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 768, height: 1024 },
    });
    const page = await context.newPage();
    await page.goto('/');
    await expect(page.getByText('ADP Comparison Tool')).toBeVisible();
    await expect(page.locator('table')).toBeVisible();
    await context.close();
  });

  test('renders correctly on desktop', async ({ browser }) => {
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
    });
    const page = await context.newPage();
    await page.goto('/');
    await expect(page.getByText('ADP Comparison Tool')).toBeVisible();
    await expect(page.locator('table')).toBeVisible();
    const rowCount = await page.locator('tbody tr').count();
    expect(rowCount).toBeGreaterThan(10);
    await context.close();
  });
});
