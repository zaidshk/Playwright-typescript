import { Page } from 'playwright';
import Landing from "../pages/Landing.page";
import config from '../resources/config';

declare const page: Page;

describe("TC_Landing.test", () => {
  beforeAll(async () => {
    await page.goto(config.landingUrl);
  });

  test("landing page", async () => {
    expect(await Landing.test()).toBe(true); //
    console.log("EXECUTED TEST")
  });

  afterAll(async () => {
    console.log("executing afterall")
    await page.close();
    await context.close();
    await browser.close();
  })
})
