import { Page } from "playwright";

export default class ForgotPassword {

  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public static async resetPassword(username: string): Promise<boolean> {
    let result: boolean

    try {

      await page.getByRole('link', { name: 'Forgot password?' }).click();
      expect(page.waitForURL("https://ajar-dev.web.app/login/forgot-password"));
      // await expect(page.waitForURL("https://ajar-dev.web.app/login/forgot-password"));
      await page.getByPlaceholder('Email address').click();
      await page.getByPlaceholder('Email address').fill(username);
      await page.getByRole('button', { name: 'Reset Password' }).click();
      await page.getByText('Further instructions will be sent if the email address you entered is registered').click();

      result = true;
    }
    catch (error) {
      result = false
    }
    return result;
  };

}
