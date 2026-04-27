import { type Page, type Locator, type FrameLocator } from '@playwright/test';
import type { BookerData, BillingData } from '../Config/dataGenerator';

export class CheckoutPage {
    // Contact details
    readonly emailField: Locator;
    private readonly firstNameField: Locator;
    private readonly lastNameField: Locator;
    private readonly phoneField: Locator;

    // Booker details
    private readonly bookerPhoneField: Locator;
    private readonly bookerFirstNameField: Locator;
    private readonly bookerLastNameField: Locator;

    // Billing details
    private readonly billingAddressField: Locator;
    private readonly billingPostcodeField: Locator;
    private readonly billingCityField: Locator;

    // Actions
    readonly extrasButton: Locator;
    private readonly checkoutButton: Locator;
    readonly bookNowButton: Locator;

    // Payment
    private readonly paymentFrame: FrameLocator;
    readonly googlePayButton: Locator;

    constructor(private readonly page: Page) {
        // Actions
        this.extrasButton = page.getByTestId('go-to-extras-button');
        this.checkoutButton = page.getByTestId('checkoutButton');
        this.bookNowButton = page.getByRole('button', { name: /book now/i });

        // Contact details
        this.emailField = page.getByTestId('email-field');
        this.firstNameField = page.getByTestId('firstName-field');
        this.lastNameField = page.getByTestId('lastName-field');
        this.phoneField = page.getByTestId('telephoneNumber-number-field');

        // Booker details
        this.bookerFirstNameField = page.getByTestId('bookerDetailsFirstName-field');
        this.bookerLastNameField = page.getByTestId('bookerDetailsLastName-field');
        this.bookerPhoneField = page.getByTestId('bookerDetailsTelephoneNumber-number-field');

        // Billing details
        this.billingAddressField = page.getByTestId('billingAddressAddress-field');
        this.billingCityField = page.getByTestId('billingAddressCity-field');
        this.billingPostcodeField = page.getByTestId('billingAddressPostcode-field');

        // Payment
        this.paymentFrame = page.locator('iframe[title="Payment"]').contentFrame();
        this.googlePayButton = this.paymentFrame.getByRole('button', { name: 'Google Pay' });
    }

    async proceedToExtras(): Promise<void> {
        await this.extrasButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async proceedToCheckout(): Promise<void> {
        await this.checkoutButton.click();
        await this.page.waitForLoadState('networkidle');
    }

    async fillContactDetails(data: BookerData): Promise<void> {
        await this.emailField.fill(data.email);
        await this.firstNameField.fill(data.firstName);
        await this.lastNameField.fill(data.lastName);
        await this.phoneField.fill(data.phone);
    }

    async fillBookerDetails(data: BookerData): Promise<void> {
        await this.bookerFirstNameField.fill(data.firstName);
        await this.bookerLastNameField.fill(data.lastName);
        await this.bookerPhoneField.fill(data.phone);
    }

    async fillBillingAddress(data: BillingData): Promise<void> {
        await this.billingAddressField.fill(data.address);
        await this.billingCityField.fill(data.city);
        await this.billingPostcodeField.fill(data.postcode);
    }

    async selectGooglePay(): Promise<void> {
        await this.paymentFrame.getByTestId('GOOGLE_PAY_DI').first().click();
    }
}