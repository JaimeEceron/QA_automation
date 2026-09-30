import { Page, Locator } from '@playwright/test';

export class LoginPage {
    
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly error: Locator;

  constructor(page: Page) {
    this.page = page;
    this.usernameInput = page.getByTestId('login-email');
    this.passwordInput = page.getByTestId('login-password');
    this.loginButton = page.getByTestId('login-submit');
    this.error = page.getByTestId('login-error');
  }

  async navigateToLoginPage() {
    await this.page.goto('https://www.qapractice.com/practice-login-form');
    await this.page.getByRole('heading', { name: 'Login to Your Practice Account' }).isVisible();
    console.log("Se ha validado la carga de la pagina exitosamente");
  }

  async loginWithEnvCredentials() {
    await this.usernameInput.fill("user@premiumbank.com");
    await this.passwordInput.fill("Bank@123");
    await this.loginButton.click();
  }

  async validateLogin() {
    if (await this.error.isVisible()) {
        const message = await this.error.textContent();
        throw new Error(
        `Error al iniciar sesión: ${message}`
      );
    }
  }

}