import { Page } from "playwright";
import Bank from "./Bank.page";
import BusinessProfile from "./BusinessProfile.page";
import Lease from "./Lease.page";
import Property from "./Property.page";

let propertyName = "QAproperty"
let unitName = "QAUnit"
let bankIban = "SA03 8000 0000 6080 1016 7519"
let tenant = "QAtenant"
let issuer = "QAissuer"
let businessName = "business 1"

export default class Dashboard {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;

  }

  public async VerifyDashboard_UnitsOverview(): Promise<boolean> {

    let profileName = `Profile ${Date.now()}`
    //Add Business profile
    BusinessProfile.create(businessName)

    // Click text=Dashboard >> nth=1
    await page.locator('text=Dashboard').nth(1).click();

    // get vacant units
    let vacantCount = parseInt(await page.locator("//body/app-root[1]/app-dashboard[1]/div[1]/div[1]/main[1]/div[1]/div[1]/dashboard-home[1]/dashboard-account[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/span").innerText());
    console.log("vacant unit count is: " + vacantCount)

    // get occupied units
    let occupiedCount = parseInt(await page.locator("//body/app-root[1]/app-dashboard[1]/div[1]/div[1]/main[1]/div[1]/div[1]/dashboard-home[1]/dashboard-account[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[2]/div[1]/span").innerText());
    console.log("vacant unit count is: " + occupiedCount)

    // get Total unit counts
    let totalCount = parseInt(await page.locator("//body/app-root[1]/app-dashboard[1]/div[1]/div[1]/main[1]/div[1]/div[1]/dashboard-home[1]/dashboard-account[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[3]/div[1]/span").innerText());
    console.log("vacant unit count is: " + totalCount)

    //Cretae new property
    Property.create(propertyName);
    Property.createUnit(unitName, profileName);

    // Click text=Dashboard >> nth=1
    await page.locator('text=Dashboard').nth(1).click();

    // get vacant units
    let vacantCount1 = parseInt(await page.locator("//body/app-root[1]/app-dashboard[1]/div[1]/div[1]/main[1]/div[1]/div[1]/dashboard-home[1]/dashboard-account[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/span").innerText());

    // get Total unit counts
    let totalcount1 = parseInt(await page.locator("//body/app-root[1]/app-dashboard[1]/div[1]/div[1]/main[1]/div[1]/div[1]/dashboard-home[1]/dashboard-account[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[3]/div[1]/span").innerText());

    if (vacantCount1 == vacantCount + 1 && totalcount1 == totalCount + 1) {
      console.log("test pass")
    }
    //Create a Bank account
    Bank.create(bankIban)
    //Create/ASsign a lease
    Lease.createSaudi(propertyName, unitName, bankIban, tenant, issuer)
    // Click text=Dashboard >> nth=1
    await page.locator('text=Dashboard').nth(1).click();

    let vacantcount2 = parseInt(await page.locator("//body/app-root[1]/app-dashboard[1]/div[1]/div[1]/main[1]/div[1]/div[1]/dashboard-home[1]/dashboard-account[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]/div[1]/div[1]/span").innerText());

    let occupiedcount1 = parseInt(await page.locator("//body/app-root[1]/app-dashboard[1]/div[1]/div[1]/main[1]/div[1]/div[1]/dashboard-home[1]/dashboard-account[1]/div[1]/div[1]/div[1]/div[1]/div[1]/div[2]").innerText());

    if (occupiedcount1 == occupiedCount + 1 && occupiedcount1 == vacantCount1 - 1) {
      console.log("test pass")
    }

    return true;
  }

  public async VerifyDashboard_LeaseWidget(): Promise<boolean> {
    // Click text=Dashboard >> nth=1


    let profileName = `Profile ${Date.now()}`
    await page.locator('text=Dashboard').nth(1).click();
    let overdueCount = parseInt(await page.locator("//body/app-root[1]/app-dashboard[1]/div[1]/div[1]/main[1]/div[1]/div[1]/dashboard-home[1]/dashboard-account[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]").innerText());

    let dueCount = parseInt(await page.locator("//body/app-root[1]/app-dashboard[1]/div[1]/div[1]/main[1]/div[1]/div[1]/dashboard-home[1]/dashboard-account[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[2]").innerText());

    let blockedcount = parseInt(await page.locator("//body/app-root[1]/app-dashboard[1]/div[1]/div[1]/main[1]/div[1]/div[1]/dashboard-home[1]/dashboard-account[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[3]/div[2]").innerText());

    //Create new property
    Property.create(propertyName);
    Property.createUnit(unitName, profileName);

    //Create a Bank account
    Bank.create(bankIban)

    //Create/ASsign a lease
    Lease.createSaudi(propertyName, unitName, bankIban, tenant, issuer)

    // Click text=Dashboard >> nth=1
    await page.locator('text=Dashboard').nth(1).click();
    await page.locator('text=Dashboard').nth(1).click();

    let overdueCount1 = parseInt(await page.locator("//body/app-root[1]/app-dashboard[1]/div[1]/div[1]/main[1]/div[1]/div[1]/dashboard-home[1]/dashboard-account[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]").innerText());

    let dueCount1 = parseInt(await page.locator("//body/app-root[1]/app-dashboard[1]/div[1]/div[1]/main[1]/div[1]/div[1]/dashboard-home[1]/dashboard-account[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[2]/div[2]").innerText());

    if (overdueCount1 > overdueCount && dueCount1 > dueCount) {
      console.log("test passed")
    }

    return true;
  }


  //expiring lease copunt 30, 60,90 days filter is yet to fix
  public async VerifyDashboard_ExpiringLeaseWidget(): Promise<boolean> {

    let profileName = `Profile ${Date.now()}`
    // Click text=Dashboard >> nth=1
    await page.locator('text=Dashboard').nth(1).click();
    let expiredleasecount = parseInt(await page.locator("//body/app-root[1]/app-dashboard[1]/div[1]/div[1]/main[1]/div[1]/div[1]/dashboard-home[1]/dashboard-account[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]").innerText());

    //
    //Cretae new property
    Property.create(propertyName);
    Property.createUnit(unitName, profileName);

    //Create a Bank account
    Bank.create(bankIban)
    //Create/ASsign a lease
    Lease.createSaudi(propertyName, unitName, bankIban, tenant, issuer)

    // Click text=Dashboard >> nth=1
    await page.locator('text=Dashboard').nth(1).click();

    let expiredleasecount1 = parseInt(await page.locator("//body/app-root[1]/app-dashboard[1]/div[1]/div[1]/main[1]/div[1]/div[1]/dashboard-home[1]/dashboard-account[1]/div[1]/div[1]/div[2]/div[1]/div[1]/div[1]/div[2]").innerText());


    if (expiredleasecount1 > expiredleasecount) {
      console.log("test passed")
    }


    return true;
  }

}


