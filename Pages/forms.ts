import { Page, Locator, expect } from '@playwright/test';

export class FormsPage {
    
  readonly page: Page;
  readonly clearForm: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly dateBirth: Locator;
  readonly dateJoining: Locator;
  readonly emailAdress: Locator;
  readonly phoneNumber: Locator;
  readonly countryResidence: Locator;
  readonly titlePerson: Locator;
  readonly phoneCode: Locator;
  readonly preferContact: Locator;
  readonly submitButton: Locator;
  readonly checkSubmit: Locator;



  constructor(page: Page) {
    this.page = page;
    this.firstNameInput = page.getByTestId('forms-first-name');
    this.lastNameInput = page.getByTestId('forms-last-name');
    this.dateBirth = page.getByTestId('forms-dob');
    this.dateJoining = page.getByTestId('forms-doj');
    this.emailAdress = page.getByTestId('forms-email');
    this.phoneNumber = page.getByTestId('forms-phone-number');
    this.countryResidence = page.getByTestId('forms-country');
    this.titlePerson = page.getByTestId('forms-title');
    this.phoneCode = page.getByTestId('forms-phone-code');
    this.preferContact = page.getByTestId('forms-comm-email');
    this.submitButton = page.getByTestId('forms-submit');
    this.clearForm = page.getByTestId('forms-clear');
    this.checkSubmit = page.getByTestId('forms-success');
  }

  async navigateToFormPage() {
    await this.page.goto('https://www.qapractice.com/practice-forms');
  }

  async fillForm(data: {
  firstName: string;
  lastName: string;
  dateBirth: string;
  dateJoining: string;
  email: string;
  phoneNumber: string;
  country: string;
  title: string;
  phoneCode: string;
}) 

{
    await this.clearForm.click();
    await this.firstNameInput.fill(data.firstName);
    await this.lastNameInput.fill(data.lastName);
    await this.dateBirth.fill(data.dateBirth);
    await this.dateJoining.fill(data.dateJoining);
    await this.emailAdress.fill(data.email);
    await this.phoneNumber.fill(data.phoneNumber);
    await this.countryResidence.selectOption({ label: data.country });
    await this.titlePerson.selectOption({ label: data.title });
    await this.phoneCode.selectOption({ label: data.phoneCode });
    await this.preferContact.check();
}

  async validateFormCheck() {
    if (await this.checkSubmit.isVisible()) {
        console.log("El formulario ha sido llenado correctamente")
    } else {
        throw new Error(
            `Error en el llenado del formulario`
        );
    }
  }
  
  async validateEmailContainsAt() {
    const email = await this.emailAdress.inputValue();
    expect(email).toContain("@");
    await this.submitButton.click();
}

  async validateEmptyFields() {
    if (await this.lastNameInput.isVisible()) {
        const message = await this.lastNameInput.textContent();
        throw new Error(
        `Error al iniciar sesión: ${message}`
      );
    }
  }

}