import { Page } from 'playwright';

import Dashboard from '../pages/Dashboard.page';
import Login from "../pages/Login.page";
import Property from '../pages/Property.page';
import config from '../resources/config';

declare const page: Page;
declare const reporter: any;

describe("TC_VerifyDashboard_UnitsOverview.test", () => {
  // my pages

  let login: Login;
  let property: Property;
  let dashboard: Dashboard

  beforeAll(async () => {
    login = new Login(page);
    property = new Property(page);
    dashboard = new Dashboard(page)
    await page.goto(config.frontendUrl);
  });

  test("Verify units widget", async () => {
    expect((await login.runGenerateTestData('landlord')).result).toBe(true);
    expect(await dashboard.VerifyDashboard_UnitsOverview()).toBe(true);
  }, 120000);

  afterAll(async () => {
    console.log("executing afterall")
    // Refreshaccount.deletereferences
    await page.close();
    await context.close();
    await browser.close();

  })

})
