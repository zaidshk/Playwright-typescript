import { Page } from "playwright";


export default class UserGuiding {
  page: Page;

  signinbutton = "//a[@id='landing-desktop-logIn']"

  constructor(page: Page) {
    this.page = page;
  }

  public static async run(): Promise<boolean> {
    await page.locator('button', { hasText: 'START' }).click();

    return true;

  };
}
