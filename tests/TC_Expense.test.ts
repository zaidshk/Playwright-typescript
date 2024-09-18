import { Page } from 'playwright';
import BusinessProfile from '../pages/BusinessProfile.page';
import Expenses from '../pages/Expenses.page';
import Login from '../pages/Login.page';
import config from '../resources/config';

declare const page: Page;

describe('Expense tests', () => {
  let login: Login;

  beforeAll(async () => {
    login = new Login(page);
    await page.goto(config.frontendUrl);
  });

  test('Create expense', async () => {
    expect((await login.runGenerateTestData('landlord')).result).toBe(true);

    const businessProfile = await BusinessProfile.changeOrCreate()
    expect(businessProfile.result).toBe(true);

    expect(await Expenses.createExpense()).toBe(true);
    console.log('EXECUTED TEST');
  });

  test('Edit expense', async () => {
    expect(await Expenses.editExpense()).toBe(true);
    console.log('EXECUTED TEST');
  });

  test('Delete expense', async () => {
    expect(await Expenses.deleteExpense()).toBe(true);
    console.log('EXECUTED TEST');
  });

  test('General expense description is required', async () => {
    expect(await Expenses.expenseDescriptionRequired()).toBe(true);
    console.log('EXECUTED TEST');
  });

  afterAll(async () => {
    console.log('Executing after all');
    await page.close();
    await context.close();
    await browser.close();
  });
});
