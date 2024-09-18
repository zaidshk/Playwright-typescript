import { Page } from "playwright";


export default class Kyc {
  readonly page: Page;

  usernameinput = "//input[@id='email']";

  constructor(page: Page) {
    this.page = page;
  }

  public static async kyc(): Promise<boolean> {

    // Click text=Complete your verification
    await page.click('text=Complete your verification');

    await page.waitForTimeout(6000);


    // const firstName = await page.textContent("input[name='first_name']")
    // const firstName = await page.getAttribute(':nth-match(input[type="text"], 1)', "value")

    // Click input[name="first_name"]
    await page.click('input[name="first_name"]');

    // Fill input[name="first_name"]
    await page.fill('input[name="first_name"]', 'marwan');


    // Click input[name="last_name"]
    await page.click('input[name="last_name"]');

    // Fill input[name="last_name"]
    await page.fill('input[name="last_name"]', 'saleh');


    // Click input[aria-label="Date input field"]
    await page.click('input[aria-label="Date input field"]');

    // Fill input[aria-label="Date input field"]
    await page.fill('input[aria-label="Date input field"]', '2004-09-19');

    const email = await page.locator('input[name="email"]')
    let readonly = await email.getAttribute('readonly')


    // Click input[aria-autocomplete="list"]
    await page.click('input[aria-autocomplete="list"]');

    // Fill input[aria-autocomplete="list"]
    await page.fill('input[aria-autocomplete="list"]', 'Saudi Arabia');

    // Click div[role="option"] div:has-text("Saudi Arabia")
    await page.click('div[role="option"] div:has-text("Saudi Arabia")');


    // Click input[name="street_name"]
    await page.click('input[name="street_name"]');

    // Fill input[name="street_name"]
    await page.fill('input[name="street_name"]', 'amman');


    // Click input[name="city"]
    await page.click('input[name="city"]');

    // Fill input[name="city"]
    // await page.fill('input[name="city"]', 'amman');



    if (readonly = ' ') {
      await page.fill('input[name="city"]', readonly);

    } else {
      await page.fill('input[name="city"]', readonly);
    }

    await page.waitForTimeout(60000);

    return true;
  }
}
