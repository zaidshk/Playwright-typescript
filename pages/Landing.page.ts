import { Page } from "playwright";
import { landingUrl } from "../resources/config";
import Common from "../utils/Common";

export default class Landing {
  readonly page: Page;

  usernameinput = "//input[@id='email']";

  constructor(page: Page) {
    this.page = page;
  }

  public static async test(): Promise<boolean> {
    const url = landingUrl

    await page.waitForTimeout(300)
    // test on how to create a screenshot
    await Common.screenshot({
      path: 'Landing.test.png'
    })

    // Click :nth-match(a:has-text("Tenants"), 2)
    await page.locator(':nth-match(a:has-text("Tenants"), 2)').click();
    expect(page.url()).toBe(`${url}/tenant`);

    // Click :nth-match(:text("Pricing"), 2)
    await page.locator(':nth-match(:text("Pricing"), 2)').click();
    expect(page.url()).toBe(`${url}/pricing`);

    // Click :nth-match(:text("About Us"), 2)
    await page.click(':nth-match(:text("About Us"), 2)');
    expect(page.url()).toBe(`${url}/about-us`);

    // Click text=Contact us
    await page.click('text=Contact us');
    expect(page.url()).toBe(`${url}/contact-us`);

    // Click text=Schedule a demo
    await page.click('text=Schedule a demo');
    expect(page.url()).toBe(`${url}/schedule-demo`);

    // Click text=Privacy Policy
    await page.click('text=Privacy Policy');
    expect(page.url()).toBe(`${url}/privacy`);

    // Click text=Terms and Conditions
    await page.click('text=Terms and Conditions');
    expect(page.url()).toBe(`${url}/terms`);

    return true;
  };
}

