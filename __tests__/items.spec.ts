import { expect, test, type Page } from '@playwright/test'

const TEST_USER = {
  name: 'E2E Test User',
  email: 'e2e@test.com',
  password: 'password123',
}

async function authenticate(page: Page) {
  await page.request.post('/auth/sign-up', { data: TEST_USER }).catch(() => {})
  await page.request.post('/auth/sign-in', {
    data: { email: TEST_USER.email, password: TEST_USER.password },
  })
}

test.describe('Items list page (ISR)', () => {
  test.beforeEach(async ({ page }) => {
    await authenticate(page)
  })

  test('should display pokemon cards on /en/items', async ({ page }) => {
    await page.goto('/en/items')

    const cards = page.locator('.grid a')
    await expect(cards.first()).toBeVisible({ timeout: 30_000 })

    const count = await cards.count()
    expect(count).toBeGreaterThanOrEqual(1)

    const firstName = cards.first().locator('h3.capitalize').first()
    await expect(firstName).toBeVisible()
  })

  test('should navigate to detail page when clicking a card', async ({ page }) => {
    await page.goto('/en/items')

    const firstCard = page.locator('.grid a').first()
    await expect(firstCard).toBeVisible({ timeout: 30_000 })

    const pokemonName = await firstCard.locator('h3.capitalize').first().textContent()
    await firstCard.click()

    await page.waitForURL(/\/en\/items\//, { timeout: 30_000 })
    await expect(page).toHaveURL(/\/en\/items\/.+/)

    const heading = page.locator('h1')
    await expect(heading).toBeVisible({ timeout: 30_000 })
    await expect(heading).toHaveText(pokemonName!, { ignoreCase: true })
  })

  test('should show pagination and navigate to page 2', async ({ page }) => {
    await page.goto('/en/items')

    const pagination = page.locator('nav[aria-label="pagination"]')
    await expect(pagination).toBeVisible({ timeout: 30_000 })

    const nextButton = page.locator('[data-testid="pagination-next"]')
    await expect(nextButton).toBeVisible()
    await nextButton.click()

    await expect(page).toHaveURL(/page=2/, { timeout: 15_000 })

    const cards = page.locator('.grid a')
    await expect(cards.first()).toBeVisible({ timeout: 30_000 })
  })
})

test.describe('Item detail page (SSR)', () => {
  test.beforeEach(async ({ page }) => {
    await authenticate(page)
  })

  test('should display pokemon details and back button', async ({ page }) => {
    await page.goto('/en/items/bulbasaur', { timeout: 60_000 })

    const heading = page.locator('h1')
    await expect(heading).toBeVisible({ timeout: 30_000 })
    await expect(heading).toHaveText(/bulbasaur/i)

    const backLink = page.locator('a[href*="/items"]').first()
    await expect(backLink).toBeVisible()

    const statsHeading = page.getByText('Base Stats')
    await expect(statsHeading).toBeVisible()

    const evolutionHeading = page.getByText('Evolution Chain')
    await expect(evolutionHeading).toBeVisible()
  })

  test('should show not-found page for non-existent pokemon', async ({ page }) => {
    await page.goto('/en/items/nonexistent-pokemon-xyz-99999', { timeout: 60_000 })

    const notFoundHeading = page.getByText(/page not found/i)
    await expect(notFoundHeading).toBeVisible({ timeout: 30_000 })
  })
})

test.describe('Auth page', () => {
  test('should display login form with validation', async ({ page }) => {
    await page.goto('/en/sign-in')

    const emailInput = page.locator('input[name="email"]')
    const passwordInput = page.locator('input[name="password"]')
    const submitButton = page.locator('button[type="submit"]')

    await expect(emailInput).toBeVisible()
    await expect(passwordInput).toBeVisible()
    await expect(submitButton).toBeVisible()

    await submitButton.click()

    const errorMessage = page.locator('p:text-matches("invalid|required|email", "i")')
    await expect(errorMessage.first()).toBeVisible({ timeout: 5_000 })
  })

  test('should navigate between sign-in and sign-up', async ({ page }) => {
    await page.goto('/en/sign-in')

    const registerLink = page.locator('a[href*="sign-up"]')
    await expect(registerLink).toBeVisible()
    await registerLink.click()

    await page.waitForURL(/sign-up/, { timeout: 15_000 })
    await expect(page).toHaveURL(/\/en\/sign-up/)

    const nameInput = page.locator('input[name="name"]')
    const confirmPasswordInput = page.locator('input[name="confirmPassword"]')
    await expect(nameInput).toBeVisible()
    await expect(confirmPasswordInput).toBeVisible()

    const loginLink = page.locator('a[href*="sign-in"]')
    await expect(loginLink).toBeVisible()
  })
})
