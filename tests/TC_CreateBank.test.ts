import { CountryCode } from 'ibankit';
import { Page } from 'playwright';
import Bank from '../pages/Bank.page';
import BusinessProfile from '../pages/BusinessProfile.page';
import Login from "../pages/Login.page";
import config from '../resources/config';

declare const page: Page;

describe("Bank account tests", () => {
  let login: Login;
  let iban = ''

  beforeAll(async () => {
    login = new Login(page);
    await page.goto(config.frontendUrl);
  });

  test("Create bank account", async () => {
    expect((await login.runCreateUser()).result).toBe(true);

    const businessProfile = await BusinessProfile.create()
    expect(businessProfile.result).toBe(true);

    // expect(await UserGuide.userGuide()).toBe(true);
    const createBank = await Bank.create()
    expect(createBank.result).toBe(true);
    console.log("EXECUTED TEST")

  })

  test("Edit bank account name", async () => {
    expect(await Bank.editBankAccount()).toBe(true);
    console.log("EXECUTED TEST")
  });

  test("Create first bank account", async () => {
    iban = await Bank.generateRandomIban(CountryCode.SA)
    expect(await Bank.createFirstBankAccount(iban)).toBe(true);
    console.log("EXECUTED TEST")
  });

  test("Check for duplicate Iban with second bank account", async () => {
    expect(await Bank.checkDuplicateIban(iban)).toBe(true);
    console.log("EXECUTED TEST")
  });

  afterAll(async () => {
    console.log("Executing after all")
    await page.close();
    await context.close();
    await browser.close();
  })
})
