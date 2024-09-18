import { Page } from "playwright";

export default class Lease {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public static async payKSA() {
    let result: boolean

    try {
      await page.waitForURL(/\/invoices$/);
      await page.locator("(//input[@type='checkbox'])[1]").click();
      await page.getByRole('button', { name: 'Next' }).click();
      await page.getByPlaceholder('Michael Smith').click();
      await page.getByPlaceholder('Michael Smith').fill('Zaid shaikh');
      await page.getByPlaceholder('1234 5678 9012 3456').click();
      await page.getByPlaceholder('1234 5678 9012 3456').fill('5297 4100 0000 0002');
      await page.getByPlaceholder('04/24').click();
      await page.getByPlaceholder('04/24').fill('05/25');
      await page.getByPlaceholder('123', { exact: true }).click();
      await page.getByPlaceholder('123', { exact: true }).fill('123');
      await page.locator("//input[@id='tc']").click();
      await page.waitForSelector("//button[@id='payments-pay']")
      await page.locator("//button[@id='payments-pay']").click();
      await page.getByPlaceholder('Ex: 12345').click();
      await page.getByPlaceholder('Ex: 12345').fill('12345');
      await page.getByRole('button', { name: 'Confirm' }).click();
      result = await page.locator("//span[contains(text(),'Payment Receipt')]").isVisible();
    }
    catch {
      result = false
    }

    return result
  }
}
