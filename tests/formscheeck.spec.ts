import { test, expect } from '@playwright/test';
import { FormsPage } from '../Pages/forms';

test('Test para el checkout de Login', async ({ page }) => {

  const formsPage = new FormsPage(page);

  await formsPage.navigateToFormPage();
  await formsPage.fillForm({
    firstName: 'Jaime',
    lastName: 'Espinoza Ceron',
    dateBirth: '2001-03-03',
    dateJoining: '01/10/2026',
    email: 'jimmyceron03@gmail.com',
    phoneNumber: '+525549674142',
    country: 'United States',
    title: 'Mr.',
    phoneCode: '+Other'
  });

  await formsPage.validateEmailContainsAt();
  await formsPage.validateFormCheck();

});
