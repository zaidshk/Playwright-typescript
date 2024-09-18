import { Page } from "playwright";

export default class Invoice {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public async create(): Promise<boolean> {
    const invoiceData = {
      tenantContact: 'QA Account - 1',
    }

    // Click :nth-match(span:has-text("Invoices"), 2)
    await this.page.click(':nth-match(span:has-text("Invoices"), 2)')

    // Click text=New Invoice
    await this.page.click("//header-create-new[@class='flex']");

    // Click text=Select or add tenant / payerSelect an option >> span
    await this.page.click('app-select text=Select or Add Customer'); // TODO verify dropdown code, fix

    // Click div[role="option"] div:has-text("QA Account - 1")
    await this.page.click(`role=option[name="${invoiceData.tenantContact}"]`);

    // Click text=Lessor / Unit Owner (name on invoice) *Select an option >> span
    await this.page.click('select-contact text=Lessor / Unit Owner *');

    // Click div[role="option"] div:has-text("QA Account - 1")
    await this.page.click(`div[role="option"] div:has-text("${invoiceData.tenantContact}")`);

    // Click text=Payment Type *Select an option >> span
    await this.page.click('text=Payment Type *Select an option >> span');
    //
    // Click text=Offline You will be able to generate the invoice but payers will not be able to
    await this.page.click('text=Offline You will be able to generate the invoice but payers will not be able to ');

    // Click [aria-label="Open Calendar"]
    await this.page.click('[aria-label="Open Calendar"]');

    // Click button:has-text("Today")
    await this.page.click('button:has-text("Today")');

    // Click #datepicker_01G041617SEKFGJW6FAJ68TTEX [aria-label="Open Calendar"]
    await this.page.click("(//button[@aria-label='Open Calendar'])[2]");

    // Click [aria-label="Next Year"]
    await this.page.click('[aria-label="Next Year"]');

    // Click [aria-label="Select day1"] >> text=1
    await this.page.click('[aria-label="Select day1"] >> text=1');

    // Click text=Currency *Select an option >> span
    await this.page.click('text=Currency *Select an option >> span');

    // Click [aria-label="Options list"] >> :nth-match(div:has-text("AED"), 4)
    await this.page.click('[aria-label="Options list"] >> :nth-match(div:has-text("AED"), 4)');

    // Click text=Add new item
    await this.page.click('text=Add new item');

    // Click text=Select an optionType is requiredSelect an option >> span
    await this.page.click('text=Select an optionType is requiredSelect an option >> span');

    // Click div[role="option"] div:has-text("Rent")
    await this.page.click('div[role="option"] div:has-text("Rent")');

    // Click input[type="number"]
    await this.page.click('input[type="number"]');

    // Fill input[type="number"]
    await this.page.fill('input[type="number"]', '100');

    // Click button:has-text("Save")
    await this.page.click('button:has-text("Save")')

    await page.waitForURL(/\/invoices$/)

    return true;
  };

}
