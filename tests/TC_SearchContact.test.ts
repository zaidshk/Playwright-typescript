import { Page } from 'playwright';
import Login from "../pages/Login.page";
import search from '../pages/SearchContacts.page';
import config from '../resources/config';

declare const page: Page;

describe("TC_SearchContact.test", () => {
  let login: Login;

  beforeAll(async () => {
    login = new Login(page);
    await page.goto(config.frontendUrl);
  });

  test("Search contact", async () => {
    expect(await search.fetchcontact("ajar_qa")).toBe(true);
    console.log("EXECUTED TEST")
  });

  afterAll(async () => {
    console.log("executing afterall")
    await page.close();
    await context.close();
    await browser.close();
  })

})
