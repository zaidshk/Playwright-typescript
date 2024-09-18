import { CountryCode, IBAN } from 'ibankit';
import { Page } from 'playwright';

export default class Bank {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  //Using UAE IBAN for these test cases.
  //Separate test cases need to be created for Saudi as there is additional functionality of populating with Saudi bank list
  public static async generateRandomIban(countryCode: CountryCode) {
    return IBAN.random(countryCode).toString();
  }

  public static async create(iban?: string) {
    if (iban == null) {
      iban = await this.generateRandomIban(CountryCode.AE);
      console.log('iban', iban);
    }

    await page.click('#sidebar-banks-desktop');
    await page.waitForURL(/\/banks$/);

    await page.click('a:has-text("Add Bank Account")');
    await page.waitForURL(/\/add$/);

    await page.click('input[type="text"]');
    await page.fill('input[type="text"]', 'Saudi bank');
    await page.click(':nth-match(input[type="text"], 2)');
    await page.fill(':nth-match(input[type="text"], 2)', `bank nickname ${Date.now()}`);
    await page.click(':nth-match(input[type="text"], 3)');
    await page.fill(':nth-match(input[type="text"], 3)', iban);

    await page.waitForSelector('#bank-name .ng-select-container') // for UAE, SAR banks

    const bankNameAlreadySet = (await page.evaluate(() => {
      return document.querySelector('#bank-name .ng-select-container')?.classList.contains('ng-has-value') ?? false
    }))
    if (bankNameAlreadySet === false) {
      await page.locator('ng-select:has-text("Select Bank Name") span').first().click();
      await page.locator("(//div[@role='option'])[1]").click();
    }

    await page.getByRole('button', { name: 'Add Account' }).click();
    await page.waitForURL(/\/banks$/);

    return { result: true, iban: iban };
  }


  public static async createKSA(iban?: string) {
    if (iban == null) {
      iban = await this.generateRandomIban(CountryCode.SA);
      console.log('iban', iban);
    }

    await page.click('#sidebar-banks-desktop');
    await page.waitForURL(/\/banks$/);

    await page.click('a:has-text("Add Bank Account")');
    await page.waitForURL(/\/add$/);

    await page.click('input[type="text"]');
    await page.fill('input[type="text"]', 'Saudi bank');
    await page.click(':nth-match(input[type="text"], 2)');
    await page.fill(':nth-match(input[type="text"], 2)', `bank nickname ${Date.now()}`);
    await page.click(':nth-match(input[type="text"], 3)');
    await page.fill(':nth-match(input[type="text"], 3)', iban);

    await page.waitForSelector('#bank-name .ng-select-container') // for UAE, SAR banks

    const bankNameAlreadySet = (await page.evaluate(() => {
      return document.querySelector('#bank-name .ng-select-container')?.classList.contains('ng-has-value') ?? false
    }))
    if (bankNameAlreadySet === false) {
      await page.locator('ng-select:has-text("Select Bank Name") span').first().click();
      await page.locator("(//div[@role='option'])[1]").click();
    }

    await page.getByRole('button', { name: 'Add Account' }).click();
    await page.waitForURL(/\/banks$/);

    return { result: true, iban: iban };
  }

  public static async editBankAccount(): Promise<boolean> {
    const editedName = `edited ${Date.now()}`;

    // click view bank details
    await page.click('(//*[@id="banks-view"])[last()]');

    // click edit bank
    await page.locator('//*[@id="banks-edit"]').click();

    // fill name
    await page.locator('//div[1]/input').fill(editedName);
    await page.getByRole('button', { name: 'Save' }).click();

    // wait for edit button to show up
    await page.waitForSelector('#banks-edit');

    //If the edited text is visible then the test case is successful
    await page.waitForSelector(`text=${editedName}`, { state: 'visible' });

    return true;
  }

  public static async createFirstBankAccount(iban: string): Promise<boolean> {
    await page.click('#sidebar-banks-desktop');
    await page.waitForURL(/\/banks$/);

    await page.click('a:has-text("Add Bank Account")');
    await page.waitForURL(/\/add$/);

    await page.click('input[type="text"]');
    await page.fill('input[type="text"]', 'Bank 1');
    await page.click(':nth-match(input[type="text"], 2)');
    await page.fill(':nth-match(input[type="text"], 2)', `bank nickname ${Date.now()}`);
    await page.click(':nth-match(input[type="text"], 3)');
    await page.fill(':nth-match(input[type="text"], 3)', iban);

    await page.waitForSelector('#bank-name .ng-select-container') // for UAE, SAR banks

    const bankNameAlreadySet = (await page.evaluate(() => {
      return document.querySelector('#bank-name .ng-select-container')?.classList.contains('ng-has-value') ?? false
    }))
    if (bankNameAlreadySet === false) {
      await page.locator('ng-select:has-text("Select Bank Name") span').first().click();
      await page.locator("(//div[@role='option'])[1]").click();
    }

    await page.getByRole('button', { name: 'Add Account' }).click();
    await page.waitForURL(/\/banks$/);
    return true;
  }

  public static async checkDuplicateIban(iban: string): Promise<boolean> {
    await page.click('#sidebar-banks-desktop');
    await page.waitForURL(/\/banks$/);

    await page.click('a:has-text("Add Bank Account")');
    await page.waitForURL(/\/add$/);

    await page.click('input[type="text"]');
    await page.fill('input[type="text"]', 'Saudi bank 1');
    await page.click(':nth-match(input[type="text"], 2)');
    await page.fill(':nth-match(input[type="text"], 2)', `bank nickname ${Date.now()}`);
    await page.click(':nth-match(input[type="text"], 3)');
    await page.fill(':nth-match(input[type="text"], 3)', iban);

    await page.waitForSelector('#bank-name .ng-select-container') // for UAE, SAR banks

    const bankNameAlreadySet = (await page.evaluate(() => {
      return document.querySelector('#bank-name .ng-select-container')?.classList.contains('ng-has-value') ?? false
    }))
    if (bankNameAlreadySet === false) {
      await page.locator('ng-select:has-text("Select Bank Name") span').first().click();
      await page.locator("(//div[@role='option'])[1]").click();
    }

    await page.getByRole('button', { name: 'Add Account' }).click();

    await page.waitForSelector(`text='This IBAN is already added. Please try a different one.'`, { state: 'visible' });
    return true;
  }
}
