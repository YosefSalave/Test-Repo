import { test, expect } from '@playwright/test';
import {LoginPage} from '../Pages/LoginPage';

  test('User should login successfully', async ({ page }) => {

    // Create Login Page object
    const loginPage = new LoginPage(page);

    // Open login page
    await loginPage.goto();

    // Perform login
    await loginPage.login();

    // Verify successful login
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    console.log('User logged in successfully');
  });

  test('User should see error for invalid login', async ({ page }) => {

   const loginPage = new LoginPage(page);
   await loginPage.goto();
   await loginPage.invalidLogin();
   // Verify error message displayed
   await loginPage.verifyLoginError();
  });
