import { BasePage } from "@pages/BasePage";
import { Locator, Page } from "@playwright/test";

export class AAYourDetailsPage extends BasePage{

    private readonly startDateCheckbox: Locator;
    private readonly continueButton:Locator;
    
    constructor(page:Page){
        super(page)    
        this.startDateCheckbox = this.page.getByRole('radio',{name:'Today'});   
        this.continueButton = page.getByRole('button',{name:'Continue'})
 
    }

    async selectStartPolicy() : Promise<void>{
        await this.check(this.startDateCheckbox);
    }

    async fillPersonalDetails() : Promise<void>{
        await this.check(this.page.getByRole('radio',{name:"Mr",exact: true}));
        await this.fill(this.page.getByLabel('First name'),'John');
        await this.fill(this.page.getByLabel('Last name'),'Steve');
    }

    async fillContactDetails():Promise<void>{
        await this.click(this.page.getByRole('button',{name:' Find your address '}));
        await this.page.waitForTimeout(3000);
        await this.page.getByRole('combobox',{name:'Select an address'}).selectOption(' Automobile Association, Plant, Basing View ');
        await this.fill(this.page.locator('#contactDetailsPhoneNumber'),'01000000000');
        await this.fill(this.page.locator('#contactDetailsEmailAddress'),'steve.john@mailinator.com');
    }

    async clickOnContinueButton(): Promise<void>{
    await this.click(this.continueButton);
  }
}