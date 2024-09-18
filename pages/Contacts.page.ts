import { Page } from 'playwright';

export default class Contacts {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public static async create(page: Page, contactEmail: string): Promise<Boolean> {
    const contactData = {
      email: contactEmail,
      firstName: 'QA-tenant',
      lastName: 'Aut',
      company: 'QA company',
      language: 'en', // en or ar
      role: 'Tenant',
    };

    await page.click(':nth-match(:text("Contacts"), 2)');
    await page.click('//header-create-new/div[1]/a[1]');
    await page.getByLabel(contactData.role).check();
    await page.click('input[name="first_name"]');
    await page.fill('input[name="first_name"]', contactData.firstName);
    await page.click('input[name="last_name"]');
    await page.fill('input[name="last_name"]', contactData.lastName);
    await page.click('input[name="company"]');
    await page.fill('input[name="company"]', contactData.company);

    await page.locator('#inviteEmailLabel').click();
    await page.getByLabel('Email Address*').fill(contactData.email);

    await page.locator('button#createNewContact:not([disabled])').waitFor();
    // Click "Save" button and wait for navigation
    await Promise.all([
      page.waitForNavigation(),
      await page.click('#createNewContact'),
    ]);

    try {
      await page.waitForSelector(`text=${contactData.email}`, { state: 'visible' });
      return true;
    } catch (e) {
      console.error(e);
      return false;
    }
  }
}
