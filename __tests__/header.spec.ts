import { test, expect } from '@playwright/test';

test.describe('HeaderBarComponent', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display breadcrumbs on desktop and hide on mobile', async ({ page }) => {
    const breadcrumb = page.locator('nav[aria-label="breadcrumb"]');
    
    await page.setViewportSize({ width: 1280, height: 720 });
    await expect(breadcrumb).toBeVisible();
    await expect(breadcrumb).toContainText(/home/i);

    await page.setViewportSize({ width: 375, height: 667 });
    await expect(breadcrumb).not.toBeVisible();
  });

  test('should open language dropdown when clicking the globe icon', async ({ page }) => {
    const langTrigger = page.locator('button:has(svg)'); 
    await langTrigger.click();

    const dropdownContent = page.locator('[role="menu"], [role="listbox"]'); 
    await expect(dropdownContent).toBeVisible();
  });

  test('should navigate to home when clicking breadcrumb link', async ({ page }) => {
    const homeLink = page.locator('nav[aria-label="breadcrumb"] a').first();
    await homeLink.click();
    await expect(page).toHaveURL('/');
  });

  test('profile dropdown should be present', async ({ page }) => {
    const profileTrigger = page.locator('button:has-text("Profile"), button:has(img)'); 
    await expect(profileTrigger).toBeVisible();
  });
});