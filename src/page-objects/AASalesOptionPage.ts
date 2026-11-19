import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../pages/BasePage';
import { aaUrls, aaFormData } from '../../src/data/aaTestData';


type OptionalExtra = | 'At Home' | 'Onward Travel' | 'National Recovery';
export class AASalesOptionPage extends BasePage {

    private readonly AtHomeCheckbox: Locator;
    private readonly OnwardTravelCheckbox: Locator;
    private readonly NationalRecoveryCheckbox: Locator;
    private readonly continueButton: Locator;



    constructor(page: Page) {
        super(page);
        this.AtHomeCheckbox = this.page.getByRole('checkbox', { name: 'At Home' });
        this.OnwardTravelCheckbox = this.page.getByRole('checkbox', { name: 'Onward Travel' });
        this.NationalRecoveryCheckbox = this.page.getByRole('checkbox', { name: 'National Recovery' });
        this.continueButton = page.getByRole('button', { name: 'Continue' })

    }

    async clickOnContinueButton(): Promise<void> {
        await this.click(this.continueButton);
    }

    async addOptionalExtras(options: OptionalExtra[]): Promise<void> {
        for (const option of options) {
            switch (option) {
                case 'At Home':
                    await this.AtHomeCheckbox.check();
                    break;

                case 'Onward Travel':
                    await this.OnwardTravelCheckbox.check();
                    break;

                case 'National Recovery':
                    await this.NationalRecoveryCheckbox.check();
                    break;
            }
        }
    }

}