class SignupPage {
    constructor(page) {
        this.page = page;

        // Scoped forms to avoid confusion between similar fields in different forms
        this.signupForm = page.locator('form').filter({ hasText: 'Signup' });

        this.nameInput = this.signupForm.getByPlaceholder('Name');
        this.emailInput = page.locator('[data-qa="signup-email"]'); // it is outside the signup form and there is no other email field on the page, so we can directly use page.locator here
        this.signupBtn = this.signupForm.getByRole('button', { name: 'Signup' });

        this.titleMrs = page.getByLabel('Mrs.');
        this.firstName = page.getByRole('textbox', { name: 'First name *' });
        this.lastName = page.getByRole('textbox', { name: 'Last name *' });
        this.company = page.locator('[name="company"]');
        this.address = page.locator('#address1');
        this.country = page.getByRole('combobox', { name: 'Country *' });   
        this.state = page.getByRole('textbox', { name: 'State *' });
        this.city = page.getByRole('textbox', { name: 'City *' });
        this.zipcode = page.locator('input[name="zipcode"]');
        this.password = page.getByRole('textbox', { name: 'Password *' });
        this.mobile = page.getByRole('textbox', { name: 'Mobile Number *' });

        this.signupBtn = page.locator('button').filter({ hasText: 'Signup' })
        this.createBtn = page.getByRole('button', { name: 'Create Account' })

        this.successMessage = page.locator(':text("ACCOUNT CREATED!")')
        this.emailExistsError = page.locator('text=Email Address already exist!');
        this.continueBtn = page.getByText('Continue');
    }
    async signup(name, email) {
        await this.nameInput.fill(name);
        await this.emailInput.fill(email);
        await this.signupBtn.click();
    }

    async fillAccountDetails(data) {
        await this.titleMrs.check();
        await this.password.fill(data.password);

        await this.page.locator('#days').selectOption(data.day);
        await this.page.locator('#months').selectOption(data.month);
        await this.page.locator('#years').selectOption(data.year);

        await this.firstName.fill(data.firstName);
        await this.lastName.fill(data.lastName);
        await this.company.fill(data.company);
        await this.address.fill(data.address);

        await this.country.selectOption('Canada');
        await this.state.fill(data.state);
        await this.city.fill(data.city);
        await this.zipcode.fill(data.zipcode);
        await this.mobile.fill(data.mobile);
        await this.createBtn.click();
    }

    async submitSignup() {
        // Wait for the account-created confirmation and proceed via Continue
        await this.successMessage.waitFor({ state: 'visible', timeout: 15000 });
        // Click continue to go back to the main site (and be logged in)
        await this.continueBtn.click();
        // wait until the Logout link is visible (indicates logged-in state)
        await this.page.getByRole('link', { name: 'Logout' }).waitFor({ state: 'visible', timeout: 15000 });
    }
}

module.exports = { SignupPage };