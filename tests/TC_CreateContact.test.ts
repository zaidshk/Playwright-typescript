import { Page } from 'playwright';
import BusinessProfile from '../pages/BusinessProfile.page';
import Contacts from "../pages/Contacts.page";
import Dashboard from '../pages/Dashboard.page';
import Login from "../pages/Login.page";
import config from '../resources/config';
import APIs, { GetGenerateTestDataResponse } from '../utils/APIs';
import Common from '../utils/Common';

declare const page: Page;

describe("TC_CreateContact.test", () => {
  // my pages

  let login: Login;
  let testData: GetGenerateTestDataResponse['data']['testData']
  let contacts: Contacts
  let dashboard: Dashboard
  let profileName = `Profile ${Date.now()}`

  beforeAll(async () => {
    login = new Login(page);
    contacts = new Contacts(page);
    dashboard = new Dashboard(page)

    await page.goto(config.frontendUrl);

    testData = (await APIs.generateTestData()).testData
  });

  test("contacts", async () => {

    expect((await login.runCreateUser()).result).toBe(true);

    // expect((await BusinessProfile.create(profileName)).result).toBe(true)
    const businessProfile = await BusinessProfile.create()
    expect(businessProfile.result).toBe(true);

    const contactEmail = Common.randomEmail({ prefix: 'client-automation-', domain: 'ajar.ae' })
    console.info('Contact email:', contactEmail)
    expect(await Contacts.create(page, contactEmail)).toBe(true);
    console.log("EXECUTED TEST")
  });

  afterAll(async () => {
    console.log("executing afterall")
    await page.close();
    await context.close();
    await browser.close();

  })

})
