import { Page } from 'playwright';
import Bank from "../pages/Bank.page";
import BusinessProfile from "../pages/BusinessProfile.page";
import Lease from "../pages/Lease.page";
import Login from "../pages/Login.page";
import Logout from "../pages/Logout.page";
import Payment from "../pages/Payment.page";
import config from '../resources/config';
import APIs, { GetGenerateTestDataResponse } from '../utils/APIs';

declare const page: Page;

describe("Payment KSA", () => {
  let login: Login;
  let testData: GetGenerateTestDataResponse['data']['testData']

  beforeAll(async () => {
    login = new Login(page);

    await page.goto(config.frontendUrl);

    testData = (await APIs.generateTestData()).testData;
  });

  test("KSA payments test", async () => {
    jest.setTimeout(60000);

    expect((await login.runGenerateTestData("landlord")).result).toBe(true);

    console.log("This is the Portfolio name  ", testData.account.name);

    await BusinessProfile.changeToBusinessAccount(testData.account.name);
    let IBAN = (await Bank.createKSA()).iban;
    console.log(IBAN)

    expect(await Lease.createSaudi1(testData.propertyUnit.name, testData.propertyUnit.units[0].name, IBAN, testData.tenantContact.name, testData.landLordUser.email)).toBe(true);

    expect(await Logout.runSuccess());

    expect((await login.runGenerateTestData("tenant")).result).toBe(true);

    expect(await Payment.payKSA()).toBe(true);
  });

  afterAll(async () => {
    console.log("Executing after all")
    await page.close();
    await context.close();
    await browser.close();
  })
})
