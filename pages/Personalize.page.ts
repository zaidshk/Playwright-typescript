import { Page } from "playwright";


export default class Personalize {
  readonly page: Page;

  usernameinput = "//input[@id='email']";

  constructor(page: Page) {
    this.page = page;
  }

  public static async run(language: string): Promise<boolean> {
    let result: boolean

    //
    // await page.waitForTimeout(7000);

    // Go to https://ajar-dev.web.app/dashboard/user/welcome
    //await page.goto('https://ajar-dev.web.app/dashboard/user/welcome');


    await page.reload();

    // Click input[name="first-name"]
    await page.click('input[name="first-name"]');

    // Fill input[name="first-name"]
    await page.fill('input[name="first-name"]', 'Zaid');

    // Click input[name="last-name"]
    await page.click('input[name="last-name"]');

    // Fill input[name="last-name"]
    await page.fill('input[name="last-name"]', 'shaikh');

    // Click span
    await page.click('span');

    // Fill text=Select an optionAfghanistanAlbaniaAlgeriaAndorraAngolaAntigua and BarbudaArgenti >> input[type="text"]
    await page.fill('text=Select an optionAfghanistanAlbaniaAlgeriaAndorraAngolaAntigua and BarbudaArgenti >> input[type="text"]', 'saudi');

    // Click div[role="option"] div:has-text("Saudi Arabia")
    await page.click('div[role="option"] div:has-text("Saudi Arabia")');

    // Click text=Language Preference * Select an option×English >> :nth-match(span, 4)
    await page.click('text=Language Preference * Select an option×English >> :nth-match(span, 4)');

    if (language.match("English")) {
      // Click div[role="option"] div:has-text("English")
      await page.click('div[role="option"] div:has-text("English")');
    }

    if (language.match("Arabic")) {
      // Click div[role="option"] div:has-text("English")
      await page.click('div[role="option"] div:has-text("Arabic")');
    }

    // Check input[name="consent"]
    await page.check('input[name="consent"]');

    // Click text=Continue
    await Promise.all([
      page.waitForNavigation(/*{ url: 'https://ajar-dev.web.app/dashboard/user' }*/),
      page.click('text=Continue')
    ]);

    await page.waitForTimeout(10000);

    return true;
  };
}
