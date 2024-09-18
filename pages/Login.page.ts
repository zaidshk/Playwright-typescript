import { Page } from "playwright";
import APIs from "../utils/APIs";
import Common from "../utils/Common";

export default class Login {
  readonly page: Page;
  usernameinput = "//input[@id='email']";
  signinbutton = "//a[@id='landing-desktop-logIn']"
  //"//a[@class='text-base font-medium text-gray-500 whitespace-nowrap hover:text-gray-900']";
  userpassword = "//input[@id='password-field']"
  loginbutton = "//button[@id='login-button']"
  //"//button[normalize-space()='Sign in or Sign up']"

  constructor(page: Page,) {
    this.page = page;
  }

  public async runGenerateTestData(credentialsType: 'tenant' | 'landlord') {
    let username: string = ''
    let password: string = ''

    const createdData = (await APIs.generateTestData()).testData

    if (credentialsType === 'tenant') {
      username = createdData.tenantUser.email
      password = createdData.tenantUser.password
    }
    else if (credentialsType === 'landlord') {
      username = createdData.landLordUser.email
      password = createdData.landLordUser.password
    }

    return this.runLogin(username, password)
  }

  public async runCreateUser() {
    const createdData = (await APIs.createUser()).testUser
    let { email, password } = createdData

    return this.runLogin(email, password)
  }

  private async runLogin(username: string, password: string) {
    let result: boolean

    try {
      // landing pages check
      if (this.page.url().endsWith('login') === false) {
        // this line clicks on the LANDING page header button 'signup' button
        (await this.page.waitForSelector(this.signinbutton)).click();
      }

      // login details
      await page.click(this.usernameinput);
      await page.fill(this.usernameinput, username);

      await page.click(this.userpassword);
      await page.fill(this.userpassword, password);
      await page.click(this.loginbutton);

      // wait for dashboard url to load
      await this.page.waitForURL(/\/dashboard\//)

      result = this.page.url().includes('/dashboard/')
    }
    catch (error) {
      console.log('Failed to login', error)
      result = false
    }

    return { result: result, email: username };
  }

  public async runFailed(): Promise<boolean> {
    let result: boolean

    try {

      (await this.page.waitForSelector(this.signinbutton)).click();
      await this.page.fill(this.usernameinput, Common.randomEmail());
      await this.page.fill(this.userpassword, Common.randomPassword());
      await this.page.click(this.loginbutton);

      console.log(await this.page.innerText("//span[contains(text(),'The password is invalid or the user does not have a password.')]"));
      if (await this.page.innerText("//span[contains(text(),'The password is invalid or the user does not have a password.')]") == "The password is invalid or the user does not have a password.") {
        result = true
      }
      else {
        result = false
      }

    }
    catch (error) {
      result = false
    }

    return result;
  }
}
