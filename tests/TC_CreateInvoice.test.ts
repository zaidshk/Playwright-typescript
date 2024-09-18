import { Page } from 'playwright';
import BusinessProfile from '../pages/BusinessProfile.page';
import Dashboard from '../pages/Dashboard.page';

import Invoice from '../pages/Invoice.page';
import Login from "../pages/Login.page";
import config from '../resources/config';

declare const page: Page;

describe("TC_CreateInvoice.test", () => {
  let login: Login;
  let invoice: Invoice
  let dashboard: Dashboard

  beforeAll(async () => {
    login = new Login(page);
    invoice = new Invoice(page);
    dashboard = new Dashboard(page)

    await page.goto(config.frontendUrl);
  });

  test("invoice", async () => {
    expect((await login.runGenerateTestData('landlord')).result).toBe(true);

    expect((await BusinessProfile.changeToBusinessAccount()).result).toBe(true)

    expect(await invoice.create()).toBe(true);
    console.log("EXECUTED TEST")
  });

  afterAll(async () => {
    console.log("executing afterall")
    await page.close();
    await context.close();
    await browser.close();
  })
})
