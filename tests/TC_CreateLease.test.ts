import { Page } from 'playwright';
import Bank from '../pages/Bank.page';
import BusinessProfile from '../pages/BusinessProfile.page';
import Lease from "../pages/Lease.page";
import Login from "../pages/Login.page";
import config from '../resources/config';
import APIs, { GetGenerateTestDataResponse } from '../utils/APIs';

declare const page: Page;

describe("TC_CreateLease.test", () => {
  let login: Login;
  let testData: GetGenerateTestDataResponse['data']['testData']

  beforeAll(async () => {
    login = new Login(page);

    await page.goto(config.frontendUrl);

    testData = (await APIs.generateTestData()).testData
  });

  test("Lease", async () => {
    jest.setTimeout(60000);

    expect((await login.runGenerateTestData("landlord")).result).toBe(true);

    console.log("This is the Portfolio name ", testData.account.name);

    await BusinessProfile.changeToBusinessAccount(testData.account.name);
    let IBAN = (await Bank.createKSA()).iban;
    console.log("IBAN:", IBAN)

    expect(
      await Lease.createSaudi1(testData.propertyUnit.name,
        testData.propertyUnit.units[0].name,
        IBAN,
        testData.tenantContact.name,
        testData.landLordUser.email)
    ).toBe(true);
    console.log("EXECUTED TEST")
  });

  afterAll(async () => {
    console.log("executing afterall")
    await page.close();
    await context.close();
    await browser.close();

  })
})
