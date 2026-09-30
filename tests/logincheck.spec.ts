import { test, expect } from '@playwright/test';
import { LoginPage } from '../Pages/login';

test('Test para el checkout de Login', async ({ page }) => {

  const loginPage = new LoginPage(page);

  await loginPage.navigateToLoginPage();
  await loginPage.loginWithEnvCredentials();
  await loginPage.validateLogin();  
});
