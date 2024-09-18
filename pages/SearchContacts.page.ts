import { Page } from "playwright";


export default class Lease {
  readonly page: Page;


  //usernameinput = "//input[@id='email']";

  constructor(page: Page) {
    this.page = page;
  }

  public static async fetchcontact(contactname: string) {
    let email

    try {

      await page.goto('https://ajar-dev.web.app/dashboard');
      await page.goto('https://ajar-dev.web.app/login');
      await page.getByLabel('Email Address *').click();
      await page.getByLabel('Email Address *').fill('iusoof+101@ajar.ae');
      await page.locator('input[name="password"]').click();
      await page.locator('input[name="password"]').fill('Password1');
      await page.getByRole('button', { name: 'Login' }).click();
      await page.waitForURL(/\/dashboard\//);
      await page.getByText('LL101').nth(2).click();
      await page.getByRole('link', { name: 'Contacts' }).click();
      await page.getByPlaceholder('Search contacts...').click();
      await page.getByPlaceholder('Search contacts...').fill('qa_ajar');
      await page.getByPlaceholder('Search contacts...').press('Enter');
      await page.getByPlaceholder('Search contacts...').click();
      await page.getByPlaceholder('Search contacts...').fill('iusoof+107');
      await page.getByRole('link', { name: 'Q qa_ajar arabic2 iusoof+107@ajar.ae' }).click();
      await page.waitForURL(/\/contacts\//);
      email = await page.locator("//div[contains(text(),'Email Address')]/following-sibling::div").textContent();



    } catch (error) {


      throw error;
      //result = false
    }
    return email;


  };
}
