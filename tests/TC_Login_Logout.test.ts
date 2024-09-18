import { Page } from 'playwright';
import Login from "../pages/Login.page";
import Logout from '../pages/Logout.page';
import config from '../resources/config';

declare const page: Page;

describe("TC_Login.test", () => {
  let login: Login;

  beforeAll(async () => {
    login = new Login(page);
    await page.goto(config.frontendUrl);
  });

  test("Login", async () => {
    expect((await login.runGenerateTestData('landlord')).result).toBe(true);

    console.log("EXECUTED TEST")
  });

  test("Logout", async () => {
    expect(await Logout.runSuccess()).toBe(true);

    console.log("EXECUTED TEST")
  });

  afterAll(async () => {
    console.log("executing afterall")
    await page.close();
    await context.close();
    await browser.close();
  })
})



