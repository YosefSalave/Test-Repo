import { test, expect, BrowserContext, Page } from '@playwright/test';
import { Products } from '../Pages/Products';
import { LoginPage } from '../Pages/LoginPage';

test.describe.configure({ mode: 'serial' });

test.describe('Products page after login', () => {
  let context: BrowserContext;
  let page: Page;

  test.beforeAll(async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();

    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test.afterAll(async () => {
    await context.close();
  });

  test('Verify products page', async () => {
    const products = new Products(page);
    await products.verifyProductsPage();
  });

  // Add more tests here and they will reuse the same logged-in page.
});
