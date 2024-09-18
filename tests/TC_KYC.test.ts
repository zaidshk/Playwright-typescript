import { Page } from 'playwright';
import Kyc from '../pages/Kyc.page';
import Login from "../pages/Login.page";
import config from '../resources/config';

declare const page: Page;

describe("TC_KYC.test", () => {
  let login: Login;

  beforeAll(async () => {
    login = new Login(page);
    await page.goto(config.frontendUrl);
  });

  test("kyc", async () => {
    expect((await login.runGenerateTestData('landlord')).result).toBe(true);
    // expect(await Bank.createbankaccount(IBAN)).toBe(true);
    expect(await Kyc.kyc()).toBe(true);
    console.log("EXECUTED TEST")
  });

  afterAll(async () => {
    console.log("executing afterall")
    await page.close();
    await context.close();
    await browser.close();
  })
})
