import { expect, test } from '@playwright/test'

test.describe('Header & Navigation', () => {
  test('should display breadcrumbs on desktop and hide on mobile', async ({ page }) => {
    await page.goto('/en')

    const breadcrumb = page.locator('nav[aria-label="breadcrumb"]')

    await page.setViewportSize({ width: 1280, height: 720 })
    await expect(breadcrumb).toBeVisible()
    await expect(breadcrumb).toContainText(/home|startseite/i)

    await page.setViewportSize({ width: 375, height: 667 })
    await expect(breadcrumb).not.toBeVisible()
  })

  test('should open language dropdown when clicking the toggle', async ({ page }) => {
    await page.goto('/en')

    const langTrigger = page.getByTestId('language-toggle')
    await expect(langTrigger).toBeVisible()
    await langTrigger.click()

    const dropdownItem = page.locator('[role="menuitemradio"], [role="radio"]')
    await expect(dropdownItem.first()).toBeVisible({ timeout: 5_000 })
  })

  test('should navigate to home when clicking breadcrumb link', async ({ page }) => {
    await page.goto('/en')

    const homeLink = page.locator('nav[aria-label="breadcrumb"] a').first()
    await homeLink.click()

    await expect(page).toHaveURL(/\/en\/?$/)
  })

  test('should show login and register buttons for unauthenticated user', async ({ page }) => {
    await page.goto('/en')

    const loginButton = page.locator('header a[href*="sign-in"]')
    await expect(loginButton).toBeVisible()

    const registerButton = page.locator('header a[href*="sign-up"]')
    await expect(registerButton).toBeVisible()
  })
})
