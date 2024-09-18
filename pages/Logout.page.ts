import { Page } from "playwright";

export default class Logout {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public static async runSuccess(): Promise<boolean> {
    let result: boolean

    try {
      await page.click("//button[@id='profiles-menu']");
      await page.click("//button[@id='profiles-menu-logout']");
      await page.waitForTimeout(5000);
      await page.waitForURL(/\/login$/);

      result = true
    }
    catch (error) {
      result = false
    }

    return result;
  }
}
