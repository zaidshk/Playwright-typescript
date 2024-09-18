import { Page } from "playwright";


export default class Lease {
  readonly page: Page;

  //usernameinput = "//input[@id='email']";

  constructor(page: Page) {
    this.page = page;
  }

  public static async createSaudi(propertyName: string, unitName: string, bankName: string, tenant: string, issuer: string): Promise<boolean> {
    let result: boolean

    try {
      // Click :nth-match(span:has-text("Leases"), 2)
      await page.click(':nth-match(span:has-text("Leases"), 2)')

      // Click text=New Lease
      await page.click('//header-create-new/div[1]/a[1]');

      // Click text=Select or add tenant / payerSelect an option >> span
      await page.locator('app-select:has-text("Select / Add Tenant *Select an option") span').first().click();
      // Click text=QA Account - 1
      await page.click('text="' + tenant + '"');
      // Click text=Lessor / Unit Owner (name on invoice) *Select an option >> span
      await page.click('text=Lessor / Unit Owner (name on invoice) *Select an option >> span');
      // Click [aria-label="Options list"] >> text=QA Account - 1
      await page.click('[aria-label="Options list"] >> text="' + issuer + '"');
      // Click text=Payment Type *Select an option >> span
      await page.click('text=Payment Type *Select an option >> span');
      // Click text=You will be able to generate the invoice but payers will not be able to pay onli
      await page.click('text=You will be able to generate the invoice but payers will not be able to pay onli');
      // Click text=Property *Select an option >> span
      await page.click('text=Property *Select an option >> span');
      // Click text=QACreateproperty3
      await page.click('text="' + propertyName + '"');

      await page.waitForTimeout(2000);
      // Click text=Unit *Select an option >> span
      await page.click('text=Unit *Select an option >> span');
      // Click text=QACreateunit
      await page.click('text="' + unitName + '"');
      // Click [aria-label="Open Calendar"]
      await page.click('[aria-label="Open Calendar"]');
      // Click button:has-text("Today")
      await page.click('button:has-text("Previous Year")');
      // Click :nth-match([aria-label="Open Calendar"], 2)
      await page.click("(//button[@aria-label='Open Calendar'])[2]");

      // Click [aria-label="Next Year"]
      await page.click('[aria-label="Next Year"]');
      // Click text=13
      await page.click('text=13');
      // Fill input[type="number"]
      await page.fill('input[type="number"]', '1');
      // Click input[type="number"]
      await page.click('input[type="number"]');
      // Click text=Renewal TermSelect an option >> input[type="text"]
      await page.click('text=Renewal TermSelect an option >> input[type="text"]');
      // Click text=Month(s)
      await page.click('text=Month(s)');
      // Click text=Renewal TermSelect an option× Month(s) >> :nth-match(span, 3)
      await page.click('text=Renewal TermSelect an option× Month(s) >> :nth-match(span, 3)');
      // Click text=Year(s)
      await page.click('text=Year(s)');
      // Click text=YesNoAuto-block checkbox
      await page.click('text=YesNoAuto-block checkbox');
      // Click text=After Select an option >> input[type="number"]
      await page.click('text=After Select an option >> input[type="number"]');
      // Fill text=After Select an option >> input[type="number"]
      await page.fill('text=After Select an option >> input[type="number"]', '1');
      // Click text=After Select an option >> span
      await page.click('text=After Select an option >> span');
      // Click div[role="option"] div:has-text("Year(s)")
      await page.click('div[role="option"] div:has-text("Year(s)")');
      // Click text=Invoice Rent Amount *Select an option >> input[type="number"]
      await page.click('text=Invoice Rent Amount *Select an option >> input[type="number"]');
      // Fill text=Invoice Rent Amount *Select an option >> input[type="number"]
      await page.fill('text=Invoice Rent Amount *Select an option >> input[type="number"]', '1000');
      // Click text=Invoice Rent Amount *Select an option >> span
      await page.click('text=Invoice Rent Amount *Select an option >> span');

      /*
      //scroll to the element
      await page.evaluate(async => {
        var ele = document.querySelector("div[formgroupname='rent'] input[type='number']");
        ele?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      });
      */


      // Click #a45233bb6557-1 div:has-text("AED")
      await page.click("//div[contains(text(),'SAR')]");
      // Click text=Collection Frequency *Select an option >> input[type="number"]
      await page.click('text=Collection Frequency *Select an option >> input[type="number"]');
      // Fill text=Collection Frequency *Select an option >> input[type="number"]
      await page.fill('text=Collection Frequency *Select an option >> input[type="number"]', '1');
      // Click text=Collection Frequency *Select an option >> span
      await page.click('text=Collection Frequency *Select an option >> span');
      // Click text=Month(s)
      await page.click('text=Month(s)');
      // Click button:has-text("Next")
      await page.click('button:has-text("Next")');
      // Click button:has-text("Save")

      await page.waitForTimeout(3000);

      await page.click('button:has-text("Save")')
    }
    catch (error) {
      throw error;
    }

    return true;

  };



  public static async createSaudi1(propertyName: string, unitName: string, bankIBAN: string, tenant: string, issuer: string): Promise<boolean> {
    let flag, result: boolean

    try {
      await page.getByRole('link', { name: 'Leases' }).click();
      expect(page.waitForURL(/\/leases$/));
      await page.getByRole('menuitem', { name: 'Add Lease' }).click();
      expect(page.waitForURL(/\/add$/));

      await page.locator("//label[normalize-space()='Select / Add Tenant *']/parent::div//ng-select").first().click();
      await page.getByText(tenant).click();

      await page.locator("//label[normalize-space()='Select / Add Property *']/parent::div//ng-select").first().click();
      await page.getByText(propertyName).click();
      await page.locator("//label[normalize-space()='Unit *']/parent::div//ng-select").first().click();
      //await page.getByRole('option', { name: unitName }).locator('div:has-text("' + unitName + '")').click();
      //await page.locator('div:has-text("' + unitName + '")').click();

      // lease start date
      await page.locator("//span[normalize-space()='" + unitName + "']").click();
      await page.locator("#lease-date-picker .date-picker-start-date .btnpicker").click();
      await page.locator("//button[@aria-label='Previous Month']").click();
      await page.locator("//button[@aria-label='Previous Month']").click();
      await page.locator("//button[@aria-label='Previous Month']").click();
      await page.locator("//div[@class='datevalue currmonth']").nth(3).click();

      // lease end date
      await page.locator('date-picker:has-text("Lease End Date *")').getByRole('button', { name: 'Open Calendar' }).click();
      await page.locator("//button[@aria-label='Next Month']").click();
      await page.locator("//button[@aria-label='Next Month']").click();
      await page.locator("//button[@aria-label='Next Month']").click();
      await page.locator("//div[@class='datevalue currmonth']").nth(3).click();

      //  await page.getByLabel('Renewal Term *').fill('1');
      // await page.getByLabel('Renewal Term *').click();
      //await page.locator('ng-select:has-text("Term") span').first().click();
      // await page.getByText('Year(s)').click();
      await page.locator("//label[normalize-space()='Lessor / Unit Owner *']/parent::div//ng-select").first().click();
      await page.getByText(issuer).click();
      await page.locator('app-select:has-text("Payment Type *Select an option") span').first().click();
      await page.locator("//span[normalize-space()='You will be able to receive transfers on the bank account you provide.']").click();

      // selects a bank by iban, if there are multiple banks to choose from
      // if (await page.locator('app-select:has-text("Select / Add Bank Account *Select an option") span').first().isEditable()) {
      //   await page.locator('app-select:has-text("Select / Add Bank Account *Select an option") span').first().click();
      //   await page.getByText(bankIBAN.substring(bankIBAN.length - 4)).click();
      // }

      //await page.locator('input[type="number"]').nth(1).click();
      await page.locator("//label[normalize-space()='Invoice Rent Amount *']/parent::div//div//input").fill('7799');
      await page.getByRole('button', { name: 'Next' }).click();
      await page.getByRole('button', { name: 'Save' }).click();

      //await page.waitForTimeout(9000);
      await page.waitForURL(/\/leases$/);

      await page.locator("//div[@title='" + propertyName + "']").waitFor({ state: "visible" })
      result = true
    }
    catch (error) {
      throw error;
    }

    return result;
  };
}
