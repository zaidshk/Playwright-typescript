import { Page } from 'playwright';
import BusinessProfile from '../pages/BusinessProfile.page';
import Login from '../pages/Login.page';
import Property from '../pages/Property.page';
import config from '../resources/config';
import Common from '../utils/Common';

declare const page: Page;

describe('TC_CreateProperty&Units.test', () => {
  let login: Login;
  let property: Property;

  let propertyName = 'QAProperty' + Common.getRandomIntInclusive();
  let unitName = 'QAUnit';
  let numberOfUnits = 1;

  beforeAll(async () => {
    login = new Login(page);
    property = new Property(page);
    await page.goto(config.frontendUrl);
  });

  test('create property', async () => {
    expect((await login.runCreateUser()).result).toBe(true);

    const { result, name } = await BusinessProfile.create();
    let profileName = name;

    expect(result).toBe(true);

    expect(await Property.create(propertyName)).toBe(true);

    for (let i = 1; i <= numberOfUnits; i++) {
      expect(await Property.createUnit(unitName + i, profileName)).toBe(unitName + i);
    }

    //Click Save
    await page.click('text=Save');

    //wait for timeout
    await page.waitForURL(/\/properties$/);

    await page.waitForSelector('//tbody');

    expect(await page.isVisible(`text="${propertyName}"`)).toBe(true);
  }, 120000);

  test('edit unit type', async () => {
    expect(await Property.editUnitType(propertyName)).toBe(true);
    console.log('EXECUTED TEST');
  }, 120000);
  test('edit clone unit', async () => {
    expect(await Property.editCloneUnit()).toBe(true);
    console.log('EXECUTED TEST');
  }, 120000);
  test('delete clone unit', async () => {
    expect(await Property.deleteCloneUnit()).toBe(true);
    console.log('EXECUTED TEST');
  }, 120000);
  test('cancel clone unit', async () => {
    expect(await Property.cancelCloneUnit()).toBe(true);
    console.log('EXECUTED TEST');
  }, 120000);

  afterAll(async () => {
    console.log('executing afterall');
    await page.close();
    await context.close();
    await browser.close();
  });
});
