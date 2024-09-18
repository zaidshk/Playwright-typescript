import { Page } from "playwright";
import { isPropertyName } from "typescript";


export default class Property {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  public static async create(name: string): Promise<boolean> {
    //let result: boolean
    // let propertyname;

    try {

      // Click :nth-match(:text("Properties"), 2)
      await page.isEnabled(':nth-match(:text("Properties"), 2)')
      await page.click(':nth-match(:text("Properties"), 2)')

      // Click text=New Property
      await page.isEnabled("//header-create-new/div[1]/a[1]");
      await page.click("//header-create-new/div[1]/a[1]");

      // Click input[name="property_name"]
      await page.click('input[name="property_name"]');

      // Fill input[name="property_name"]
      await page.fill('input[name="property_name"]', name);

      // Click input[name="construction_year"]
      await page.click('input[name="construction_year"]');

      // Fill input[name="construction_year"]
      await page.fill('input[name="construction_year"]', '1990');

      // Click input[name="renovation_year"]
      await page.click('input[name="renovation_year"]');

      // Fill input[name="renovation_year"]
      await page.fill('input[name="renovation_year"]', '2020');


      // Click input[name="street_address"]
      await page.click('input[name="street_address"]');

      await page.keyboard.type('Saudi Arabia');

      await page.waitForTimeout(100);

      // Click text=Country * Select a country >> input[type="text"]
      await page.click('text=Country * Select a country >> input[type="text"]');

      await page.locator("text=Country * Select a country >> input[type='text']").fill("saudi");

      // Fill text=Select a countryAfghanistanAlbaniaAlgeriaAndorraAngolaAntigua and BarbudaArgenti >> input[type="text"]
      // await page.fill('text=Select a countryAfghanistanAlbaniaAlgeriaAndorraAngolaAntigua and BarbudaArgenti >> input[type="text"]', 'saudi');

      await page.waitForTimeout(100);

      // Click text=Saudi Arabia
      await page.click('text=Saudi Arabia');

      // Fill input[name="street_address"]
      // await page.fill('input[name="street_address"]', 'QAteststreet');


      // await page.click("//button[normalize-space()='Dubai, Dubai, United Arab Emirates']");


      // await page.click("//div[@class='flex px-5 gap-x-6']");

      // Click input[name="street_address"]
      //  await page.click('input[name="street_address"]');



      // Click input[name="street_number"]
      await page.click('input[name="street_number"]');

      // Click input[name="street_number"]
      await page.click('input[name="street_number"]');

      // Fill input[name="street_number"]
      await page.fill('input[name="street_number"]', '123456');

      await page.keyboard.press('Tab');

      // Click input[name="city"]
      await page.click('input[name="city"]');

      // Fill input[name="city"]
      await page.fill('input[name="city"]', 'Saudi');

      // Click input[name="region"]
      await page.click('input[name="region"]');

      // Fill input[name="region"]
      await page.fill('input[name="region"]', 'WTC');

      // Click input[name="postal_code"]
      await page.click('input[name="postal_code"]');

      // Fill input[name="postal_code"]
      await page.fill('input[name="postal_code"]', '12345');

      // Click text=Gym
      await page.click('text=Gym');

      // Click text=Elevator
      await page.click('text=Elevator');

      // Click text=Playground
      await page.click('text=Playground');

      // Click text=Pool
      await page.click('text=Pool');

      // Click text=Spa
      await page.click('text=Spa');

      // Click text=Storage
      await page.click('text=Storage');

      // Click text=Waterfront
      await page.click('text=Waterfront');

      //result = true;


    } catch (error) {
      throw error;
      //result = false;
    }


    return true;





  }


  public static async createUnit(name: string, owner: string): Promise<string> {
    //let result: boolean

    try {
      // Click button:has-text("New unit")
      //await page.click('button:has-text("Add unit")');
      /*
            await page.evaluate(async => {
              var ele = document.querySelector("button[class='flex items-center justify-center px-3 py-3 text-sm font-medium text-red-500 rounded-md focus:outline-none gap-x-2 hover:bg-gray-50'] span");
              ele?.scrollIntoView({ behavior: 'smooth', block: 'start' })
            });
      */

      await page.evaluate(async => {
        var ele = document.querySelector(".flex.justify-end.pb-5.gap-x-3");
        ele?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      });

      //click on Add unit page
      //await page.click('.flex > .flex > .flex > #properties-add-unit > span')

      // Click input[name="unit_name"]
      await page.locator('input[name="unit_name"]').click();


      // Fill input[name="unit_name"]
      await page.fill('input[name="unit_name"]', name);

      //await page.locator("//span[contains(text(),'Apartment')]").click();
      //await page.locator('ng-select:has-text("Unit type") input[type="text"]').click();

      //await page.getByText('Apartment').click();

      // Click text=Type *Unit type >> input[type="text"]
      //await page.click('text=Type *Unit type >> input[type="text"]');

      await page.locator('ng-select:has-text("Unit type") input[type="text"]').click();

      await page.getByText('Apartment').click();

      // Click input[name="unit_area"]
      await page.click('input[name="unit_area"]');

      // Fill input[name="unit_area"]
      await page.fill('input[name="unit_area"]', '1000');

      // Click input[name="unit_floor"]
      await page.click('input[name="unit_floor"]');

      // Fill input[name="unit_floor"]
      await page.fill('input[name="unit_floor"]', '3');

      // // Click input[name="unit_floors"]//
      // await page.click('input[name="unit_floors"]');

      // // Fill input[name="unit_floors"]
      // await page.fill('input[name="unit_floors"]', '3');

      // Click input[name="unit_bedrooms"]
      await page.click('input[name="unit_bedrooms"]');

      // Fill input[name="unit_bedrooms"]
      await page.fill('input[name="unit_bedrooms"]', '2');

      // Click input[name="unit_bathrooms"]
      await page.click('input[name="unit_bathrooms"]');

      // Fill input[name="unit_bathrooms"]
      await page.fill('input[name="unit_bathrooms"]', '2');

      // Click input[name="unit_parking"]
      await page.click('input[name="unit_parking"]');

      // Fill input[name="unit_parking"]
      await page.fill('input[name="unit_parking"]', '2');

      // // Click text=Unit OwnerSelect an option >> span
      // await page.click('text=Unit OwnerSelect an option >> span');

      // // Click text=owner
      // await page.click('text="' + owner + '"');

      // // Click text=Expected Rent AmountCurrency >> input[type="number"]
      // await page.click('text=Expected Rent AmountCurrency >> input[type="number"]');
      // // Fill text=Expected Rent AmountCurrency >> input[type="number"]
      // await page.fill('text=Expected Rent AmountCurrency >> input[type="number"]', '10000');
      /*// Click text=Expected Rent AmountCurrency >> span
      await page.click('text=Expected Rent AmountCurrency >> span');
      // Click text=- Saudi Riyal
      await page.click('text=- Saudi Riyal');*/

      // await page.locator('ng-select:has-text("Currency") span').first().click();

      //await page.locator("//span[@class='ng-option-label']//span[@class='font-normal text-gray-400'][normalize-space()='- Saudi Riyal']").click();
      // await page.keyboard.type('SAR');
      // await page.keyboard.press('Enter');

      //result = true;

    } catch (error) {
      throw error;
      //result = false
    }


    return name;
  }
  public static async editUnitType(propertyName:string): Promise<boolean> {
    //let result: boolean

    try {
      // Click :nth-match(:text("Properties"), 2)
      await page.isEnabled(':nth-match(:text("Properties"), 2)');
      await page.click(':nth-match(:text("Properties"), 2)');

      //click on property
      //*[@id="properties-view2"]/div[1]
      await page.locator('//a[@id="properties-view2"]').click();
      //await page.locator('div[id="properties-view2"] div:has-text("QA")').click();

      //click edit button
      //*[@id="properties-edit"]
      await page.locator('//a[@id="properties-edit"]').click();

      //Edit Unit type
      await page.locator('ng-select:has-text("Unit type") input[type="text"]').click();

      await page.getByText('House').click();
      //await page.click('text=Save');
      await page.locator('//button[@id="properties-save"]').click();
      // await page.click('#properties-save');
      //*[@id="properties-save"]
      await page.waitForURL(/\/properties$/);
      //await page.waitForSelector("//tbody");
      //*[@id="filter-search"]
      await page.locator('//input[@id="filter-search"]').fill(propertyName);
      await page.locator("//div[contains(text(),'" + propertyName + "')] ").click();

      //If the edited text is visible then the test case is successful
      await page.waitForSelector(`text=House`, { state: 'visible' });



    } catch (error) {
      throw error;
      //result = false
    }


    return true;
  }
  public static async editCloneUnit(): Promise<boolean> {
    //let result: boolean

    try {
      // Click :nth-match(:text("Properties"), 2)
      await page.isEnabled(':nth-match(:text("Properties"), 2)');
      await page.click(':nth-match(:text("Properties"), 2)');

      //click on property
      //*[@id="properties-view2"]/div[1]
      await page.locator('//a[@id="properties-view2"]').click();
      // await page.click('div[id="properties-view2"] div:has-text("QA")');

      //click edit button
      //*[@id="properties-edit"]
      await page.locator('//a[@id="properties-edit"]').click();
      //click clone button
     await page.click('text=Clone unit');
      //click save button
      //*[@id="properties-save"]
      await page.locator('//button[@id="properties-save"]').click();

      //wait for timeout
      await page.waitForURL(/\/properties$/);

      //If the edited text is visible then the test case is successful
      await page.waitForSelector(`text=Total 2`, { state: 'visible' });



    } catch (error) {
      throw error;
      //result = false
    }


    return true;
  }
  public static async deleteCloneUnit(): Promise<boolean> {
    //let result: boolean

    try {
      // Click :nth-match(:text("Properties"), 2)
      await page.isEnabled(':nth-match(:text("Properties"), 2)');
      await page.click(':nth-match(:text("Properties"), 2)');

      //click on property
      //*[@id="properties-view2"]/div[1]
      await page.locator('//a[@id="properties-view2"]').click();
      // await page.click('div[id="properties-view2"] div:has-text("QA")');

      //click edit button
      //*[@id="properties-edit"]
      await page.locator('//a[@id="properties-edit"]').click();
      //click clone button
      //await page.click('text=Clone unit');
      //await page.click('text=Save');

      //click delete button
      await page.click('text=Delete unit');

      //click save
      //*[@id="properties-save"]
      await page.locator('//button[@id="properties-save"]').click();

      //wait for timeout
      await page.waitForURL(/\/properties$/);

      //If the edited text is visible then the test case is successful
      await page.waitForSelector(`text=Total 1`, { state: 'visible' });



    } catch (error) {
      throw error;
      //result = false
    }


    return true;
  }
  public static async cancelCloneUnit(): Promise<boolean> {
    //let result: boolean

    try {
      // Click :nth-match(:text("Properties"), 2)
      await page.isEnabled(':nth-match(:text("Properties"), 2)');
      await page.click(':nth-match(:text("Properties"), 2)');

      //click on property
      //*[@id="properties-view2"]/div[1]
      await page.locator('//a[@id="properties-view2"]').click();
      // await page.click('div[id="properties-view2"] div:has-text("QA")');

      //click edit button
      //*[@id="properties-edit"]
      await page.locator('//a[@id="properties-edit"]').click();
      //click clone button
      await page.click('text=Clone unit');

      //click cancel button
      //*[@id="properties-cancel"]
      await page.click('text=Cancel');

      //wait for timeout
      await page.waitForURL(/\/properties$/);

      //If the edited text is visible then the test case is successful
      await page.waitForSelector(`text=Total 1`, { state: 'visible' });



    } catch (error) {
      throw error;
      //result = false
    }


    return true;
  }

}

