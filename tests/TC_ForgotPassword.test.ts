import { Page } from 'playwright';
import ForgotPassword from '../pages/ForgotPassword.page';
import Invoice from '../pages/invoice.page';
import Login from "../pages/Login.page";
import Logout from '../pages/Logout.page';
import PersonalizeScreen from '../pages/Personalize.page';
import config from '../resources/config';

declare const page: Page;

describe("TC_ForgotPassword.test", () => {
  let login: Login;
  let invoice: Invoice

  beforeAll(async () => {
    login = new Login(page);
    invoice = new Invoice(page);

    await page.goto(config.frontendUrl);
  });

  test("forgotpassword", async () => {

    const { email, result } = await login.runGenerateTestData('landlord');
    expect(result).toBe(true)
    await PersonalizeScreen.run("English");
    await Logout.runSuccess();
    expect(await ForgotPassword.resetPassword(email)).toBe(true);

    console.log("EXECUTED TEST")
  });

  afterAll(async () => {
    console.log("executing afterall")
    await page.close();
    await context.close();
    await browser.close();
  })
})
