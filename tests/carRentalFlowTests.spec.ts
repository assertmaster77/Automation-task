import { test, expect, type Page } from '@playwright/test';
import { CarRentalSearchPage } from '../Pages/CarRent';
import { CheckoutPage } from '../Pages/Checkout';
import { createBookerData, createBillingData } from '../Config/dataGenerator';

test.describe.configure({ mode: 'serial' });

test.describe('Car rental booking flow', () => {
    let searchPage: CarRentalSearchPage;
    let checkoutPage: CheckoutPage;

    let booker: ReturnType<typeof createBookerData>;
    let billing: ReturnType<typeof createBillingData>;

    test.beforeAll(async ({ browser }) => {
        const page: Page = await browser.newPage();
        await page.addInitScript(() => {
            Object.defineProperty(navigator, 'webdriver', { get: () => undefined });
        });
        searchPage = new CarRentalSearchPage(page);
        // generate fresh test data per suite run
        booker = createBookerData();
        billing = createBillingData();
    });


    test('search for cars at JFK Airport', async () => {
        await searchPage.goto();
        await searchPage.enterPickupLocation('New York');
        await searchPage.selectLocationSuggestion('John F. Kennedy International');
        await searchPage.submitSearch();
    });

    test('open first car deal', async () => {
        await searchPage.closeSigninModalIfVisible();
        const newPage = await searchPage.openFirstDeal();
        checkoutPage = new CheckoutPage(newPage);
        await expect(checkoutPage.extrasButton).toBeVisible();
    });

    test('navigate to checkout', async () => {
        await checkoutPage.proceedToExtras();
        await checkoutPage.proceedToCheckout();
        await expect(checkoutPage.emailField).toBeVisible();
    });

    test('fill contact details', async () => {
        await checkoutPage.fillContactDetails(booker);
        await expect(checkoutPage.emailField).toHaveValue(booker.email);
    });

    test('fill booker details', async () => {
        await checkoutPage.fillBookerDetails(booker);
    });

    test('fill billing details', async () => {
        await checkoutPage.fillBillingAddress(billing);
    });

    test('select Google Pay', async () => {
        await checkoutPage.selectGooglePay();
        await expect(checkoutPage.googlePayButton).toBeVisible();
    });

    test('book now button should be enabled', async () => {
        await expect(checkoutPage.bookNowButton).toBeEnabled();
    });
});