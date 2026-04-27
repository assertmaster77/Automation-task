import { type Page, type Locator } from '@playwright/test';

export class CarRentalSearchPage {
    // Search UI
    private readonly pickupLocation: Locator;
    private readonly searchBtn: Locator;
    // Results
    private readonly firstDeal: Locator;
    // Modals
    private readonly closeSigninModal: Locator;

    constructor(private readonly page: Page) {
        this.pickupLocation = page.getByRole('combobox', { name: 'Pick-up location' });
        this.searchBtn = page.getByRole('button', { name: 'Search' });
        this.firstDeal = page.getByRole('group').getByLabel('View deal').first();
        this.closeSigninModal = page.getByTestId('signin-modal-close');
    }

    async goto(): Promise<void> {
        await this.page.goto('/cars/index.en-gb.html');
    }

    async closeSigninModalIfVisible(): Promise<void> {
        if (await this.closeSigninModal.isVisible()) {
            await this.closeSigninModal.click();
        }
    }

    async enterPickupLocation(location: string): Promise<void> {
        await this.pickupLocation.pressSequentially(location, { delay: 80 });
    }

    async selectLocationSuggestion(name: string): Promise<void> {
        await this.page.getByRole('option', { name }).click();
    }

    async submitSearch(): Promise<void> {
        await this.searchBtn.click();
        await this.page.waitForLoadState('networkidle');
    }

    async openFirstDeal(): Promise<Page> {
        const [newPage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.firstDeal.click(),
        ]);
        await newPage.waitForLoadState('networkidle');
        return newPage;
    }
}