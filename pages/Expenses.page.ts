import { Page } from 'playwright';

export default class Expenses {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public static async createExpense(): Promise<boolean> {
    const expectedDescription = `Expense description ${Date.now()}`;
    // sidebar
    await page.click('#sidebar-expenses-desktop');
    await page.waitForURL(/\/expenses$/);

    // add button
    await page.click('a:has-text("Add Expense")');
    await page.waitForURL(/\/add$/);

    // select category
    await page.locator('ng-select:has-text("Select a category")').getByRole('combobox').click();
    await page.getByRole('option', { name: 'Utilities' }).locator('div:has-text("Utilities")').click();

    // amount
    await page.getByPlaceholder('0.00').fill('123');

    // currency
    await page.locator('#expense-form-currency div:has-text("Currency")').nth(0).click();
    await page.locator("(//div[@role='option'])[1]").click();

    await page.getByRole('switch', { name: 'Yes No Mark as Paid' }).click();
    await page.getByRole('textbox', { name: 'Date input field' }).click();
    await page.getByRole('button', { name: 'Clear Date' }).click();

    // date
    await page.getByRole('textbox', { name: 'Date input field' }).click();
    await page.getByRole('textbox', { name: 'Date input field' }).fill('2023-02-03');

    await page.waitForTimeout(100)

    // description
    await page.getByPlaceholder('Add details of this expense...').click();
    await page.getByPlaceholder('Add details of this expense...').fill(expectedDescription);

    // property
    await page.locator('ng-select:has-text("Select a property")').first().click();
    await page.locator("(//div[@role='option'])[1]").click();

    await page.waitForTimeout(1000)

    // unit
    await page.locator('ng-select:has-text("Select a unit")').first().click();
    await page.locator("(//div[@role='option'])[1]").click();

    // save
    await page.getByRole('button', { name: 'Add Expense' }).click();

    try {
      await page.waitForSelector(`text=${expectedDescription}`, { state: 'visible' });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  public static async editExpense(): Promise<boolean> {
    const editedDescription = `Edited description test ${Date.now()}`;
    await page.click('#sidebar-expenses-desktop');
    await page.waitForURL(/\/expenses$/);
    await page.locator("(//span[@id='edit-expense-button'])[1]").click();
    await page.getByPlaceholder('Add details of this expense...').click();
    await page.getByPlaceholder('Add details of this expense...').fill(editedDescription);
    await page.getByRole('button', { name: 'Save Edits' }).click();

    try {
      await page.waitForSelector(`text=${editedDescription}`, { state: 'visible' });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  public static async deleteExpense(): Promise<boolean> {
    const expectedDescription = `Expense to be deleted ${Date.now()}`;
    await page.click('#sidebar-expenses-desktop');
    await page.waitForURL(/\/expenses$/);
    await page.click('a:has-text("Add Expense")');
    await page.waitForURL(/\/add$/);
    await page.locator('ng-select:has-text("Select a category")').getByRole('combobox').click();
    await page.getByRole('option', { name: 'Utilities' }).locator('div:has-text("Utilities")').click();
    await page.getByPlaceholder('0.00').fill('12345');
    await page.locator('#expense-form-currency div:has-text("Currency")').nth(1).click();
    await page.locator("(//div[@role='option'])[1]").click();
    await page.getByRole('switch', { name: 'Yes No Mark as Paid' }).click();
    await page.getByRole('textbox', { name: 'Date input field' }).click();
    await page.getByRole('button', { name: 'Clear Date' }).click();
    await page.getByRole('textbox', { name: 'Date input field' }).click();
    await page.getByRole('textbox', { name: 'Date input field' }).fill('1982-05-09');
    await page.getByPlaceholder('Add details of this expense...').click();
    await page.getByPlaceholder('Add details of this expense...').fill(expectedDescription);
    await page.getByRole('button', { name: 'Add Expense' }).click();
    await page.locator('a:has-text("Delete")').click();
    await page.getByRole('button', { name: 'Delete' }).click();

    try {
      await page.waitForSelector(`text=May 9, 1982`, { state: 'hidden' });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }

  public static async expenseDescriptionRequired(): Promise<boolean> {
    const requiredLabelText = 'Description *';
    await page.click('#sidebar-expenses-desktop');
    await page.waitForURL(/\/expenses$/);
    await page.click('a:has-text("Add Expense")');
    await page.waitForURL(/\/add$/);
    await page.locator('ng-select:has-text("Select a category")').getByRole('combobox').click();
    await page.getByRole('option', { name: 'General Expense' }).locator('div:has-text("General Expense")').click();
    await page.getByPlaceholder('0.00').fill('123');
    await page.locator('#expense-form-currency div:has-text("Currency")').nth(1).click();
    await page.locator("(//div[@role='option'])[1]").click();
    await page.getByRole('switch', { name: 'Yes No Mark as Paid' }).click();
    await page.getByRole('textbox', { name: 'Date input field' }).click();
    await page.getByRole('button', { name: 'Clear Date' }).click();
    await page.getByRole('textbox', { name: 'Date input field' }).click();
    await page.getByRole('textbox', { name: 'Date input field' }).fill('2023-02-3');

    try {
      await page.waitForSelector(`text=${requiredLabelText}`, { state: 'visible' });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
