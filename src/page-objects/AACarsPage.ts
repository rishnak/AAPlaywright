import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from '../pages/BasePage';

export class AACarsPage extends BasePage{
   private readonly aaCarsPageHeader;
   
   constructor(page: Page){
    super(page);
    this.aaCarsPageHeader = this.page.getByRole('heading',{name:'Search AA Cars', level:1})
   }

   async verifyAACarsPageHeader(): Promise<void>{
    await expect(this.aaCarsPageHeader).toBeVisible();
   }
}