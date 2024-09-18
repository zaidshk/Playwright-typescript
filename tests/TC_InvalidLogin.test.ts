import { Page } from 'playwright';
import Login from "../pages/Login.page";
import config from '../resources/config';

declare const page: Page;

describe("TC_InvalidLogin.test", () => {
  let login: Login;

  beforeAll(async () => {
    login = new Login(page);
    await page.goto(config.frontendUrl);
  });

  test("Invalid Login", async () => {
    expect(await login.runFailed()).toBe(true);
    console.log("EXECUTED TEST")
  });

  afterAll(async () => {
    console.log("executing afterall")
    await page.close();
    await context.close();
    await browser.close();
  })
})
