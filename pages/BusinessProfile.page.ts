import { Page } from "playwright";


export default class BusinessProfile {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public static async create(profileName: string = `Profile ${Date.now()}`) {
    await page.click('#profiles-menu');
    // click add business profile
    await page.evaluate(() => {
      var simMousedownEvent = new MouseEvent('mousedown', { 'view': window, 'bubbles': true, 'cancelable': true });
      // (document.querySelector('#profiles-menu') as HTMLButtonElement)?.click()
      document.querySelector('#add-business-profile')?.dispatchEvent(simMousedownEvent)
    })

    await page.getByLabel('Portfolio Name *').click()
    await page.getByLabel('Portfolio Name *').fill(profileName);

    const previousAccountId = page.url().split('/dashboard/')[1].split('/')[0]
    await page.click('button:has-text("Add Portfolio")')

    // wait for url to change
    await page.waitForURL(new RegExp(`dashboard\/(?!${previousAccountId})`))

    return { result: true, name: profileName };
  }

  public static async changeToBusinessAccount(name?: string) {
    // wait for profiles button to show up
    await (await page.waitForSelector('#profiles-menu')).click()

    // wait for data to be loaded
    await page.waitForSelector('.account')

    const accountsEls = await page.$$('#accounts-list .account')

    for (const accountEl of accountsEls) {
      const text = await accountEl.textContent()
      const isBusiness = text?.includes('Portfolio')
      const isActive = text?.includes('Active')
      const hasName = name == null || text?.includes(name)

      if (hasName && isBusiness) {
        if (!isActive) {
          await accountEl.asElement().dispatchEvent('mousedown')
          name = await accountEl.innerText()
        }

        return { name: name, result: true }
      }
    }

    return { name: name ?? '', result: false }
  }

  public static async changeOrCreate(name?: string) {
    let createResult = undefined

    const changed = await this.changeToBusinessAccount(name)
    if (changed.result === false) {
      createResult = await this.create(name)

      const result = await this.changeToBusinessAccount(createResult?.name)
      return { name: result.name ?? '', result: result.result }
    }

    return { name: name ?? '', result: changed.result }
  }
}
