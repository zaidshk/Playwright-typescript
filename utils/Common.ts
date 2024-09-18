import { Page, PageScreenshotOptions } from "playwright";
import config from "../resources/config";

export default class Common {
  readonly page: Page;
  readonly element: any;

  constructor(page: Page) {
    this.page = page;
  }

  public static getRandomIntInclusive(): number {
    const min = Math.ceil(100000);
    const max = Math.floor(1000000);
    let randomnumber = Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive

    return randomnumber
  }

  public static randomPassword(length = 8) {
    return Math.random().toString(36).substr(2, length)
  }

  public static randomString(length = 8) {
    const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"
    return new Array(length).fill("a").map(() => alphabet[Math.floor(Math.random() * alphabet.length)]).join("")
  }

  public static randomEmail(options?: { prefix?: string, suffix?: string, domain?: string, email?: string }) {
    const opts = {
      prefix: '',
      email: Common.getCurrentTimestamp().toString(),
      suffix: '',
      domain: 'thisdomain.doesntexist',
      ...options
    }

    return `${opts.prefix}${opts.email}${opts.suffix}@${opts.domain}`.replaceAll(' ', '')
  }

  public static getCurrentTimestamp(): number {
    return Date.now()
  }

  public static getRandomQAEmail() {
    return `qaautomation+${Common.getCurrentTimestamp()}@ajar.ae`
  }

  /**
   *
   * @param options PageScreenshotOptions
   *
   * Wrapper to set the correct folder path for the screenshot. Just pass `options.path` with the filename and extension you want
   * @returns
   */
  public static screenshot(options?: PageScreenshotOptions) {
    return page.screenshot({ ...options, path: `${config.data.screenshotsDir}/${options?.path ?? Date.now().toString() + '.png'}` })
  }
}
