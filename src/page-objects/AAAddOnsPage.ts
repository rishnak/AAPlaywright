import { BasePage } from "@pages/BasePage";
import { Locator, Page } from "@playwright/test";
import { aaFormData } from '../../src/data/aaTestData';

type AddOn = | 'PGC' | 'Tyre Cover' | 'Key Cover';
export class AAAddOnsPage extends BasePage {

    private readonly PGCCheckbox: Locator;
    private readonly TyreCoverCheckbox: Locator;
    private readonly KeyCoverCheckbox: Locator;
    private readonly continueButton: Locator;

    constructor(page: Page) {
        super(page);
        this.PGCCheckbox = this.page.getByRole('checkbox', { name: 'Parts and Garage Cover' });
        this.TyreCoverCheckbox = this.page.getByRole('checkbox', { name: 'Tyre Cover' });
        this.KeyCoverCheckbox = this.page.getByRole('checkbox', { name: 'Key Cover' });
        this.continueButton = page.getByRole('button', { name: 'Continue' })

    }

    async addAddOns(addOns: AddOn[]): Promise<void> {
        for (const addOn of addOns) {
            switch (addOn) {
                case 'PGC':
                    await this.PGCCheckbox.check();
                    await this.fill(this.page.locator('input[name="numberPlate"]').filter({ visible: true }),aaFormData.vrn);
                    await this.click(this.page.getByRole('button', { name: ' Add Parts and Garage ' }));
                    await this.click(this.page.getByRole('button', { name: 'Confirm' }));
                    break;

                case 'Tyre Cover':
                    await this.TyreCoverCheckbox.check();
                    await this.fill(this.page.locator('input[name="numberPlate"]').filter({ visible: true }),aaFormData.vrn);
                    await this.click(this.page.getByRole('button', { name: ' Add Tyre Cover ' }));
                    await this.click(this.page.getByRole('button', { name: 'Confirm' }));
                    break;

                case 'Key Cover':
                    await this.KeyCoverCheckbox.check();
                    break;
            }
        }
    }

    async clickOnContinueButton(): Promise<void> {
        await this.click(this.continueButton);
    }

}