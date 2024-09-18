import { Page } from 'playwright';
import BusinessProfile from '../pages/BusinessProfile.page';
import Login from "../pages/Login.page";
import Property from '../pages/Property.page';
import config from '../resources/config';
import Common from '../utils/Common';

declare const page: Page;

describe("TC_EditProperty.test", () => {
  let login: Login;
  let property: Property;

  let propertyName = 'QAProperty' + Common.getRandomIntInclusive()
  let unitName = "QAUnit"
  let numberOfUnits = 1

  beforeAll(async () => {
    login = new Login(page);
    property = new Property(page);
    await page.goto(config.frontendUrl);
  });

  test("Edit property", async () => {

    expect((await login.runGenerateTestData('landlord')).result).toBe(true);

    const { result, name } = await BusinessProfile.changeOrCreate()
    let profileName = name

    expect(result).toBe(true)

    //expect(await BusinessProfile.create("Ajar")).toBe(true)
    expect(await Property.create(propertyName)).toBe(propertyName);

    for (let i = 1; i <= numberOfUnits; i++) {
      expect(await Property.createUnit(unitName + i, profileName)).toBe(unitName + i);
    }

    //Click Save
    await page.click('text=Save');

    //wait for timeout
    await page.waitForURL(/\/properties$/);

    //  await expect(page.locator('text="'+propertyname+'"')).toBeVisible()

    expect((await page.isVisible(`text="${propertyName}"`))).toBe(true)

  }, 120000);

  afterAll(async () => {
    console.log("executing afterall")
    await page.close();
    await context.close();
    await browser.close();
  })
})
