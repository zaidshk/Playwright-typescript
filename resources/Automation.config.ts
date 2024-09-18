import { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  use: {
    viewport: null,
    headless: !true,
    // browserName: "chromium",
    screenshot: "on",
    video: "on",
    // trace: "on",
    baseURL: "https://us-central1-ajar-dev.cloudfunctions.net/api",
    extraHTTPHeaders: {
      "X-Automation-Key": "YYXV0b21hdGlvbktleUAxMjMh"
    }

    // contextOptions: {
    //     permissions: ["clipboard-read"]
    // }
    ,
    launchOptions: {
      args: ["--start-maximized"],

      // logger: {
      //     // isEnabled: (name, severity) => true,
      //     // log: (name, severity, message, args) => console.log(name, severity)
      // }
    }
  },
  // timeout: 60000,
  // grep: [new RegExp("@smoke"), new RegExp("@reg")],
  // testMatch: ["harDemo/trackRequest.test.ts"],
  retries: 0,
  // reporter: "./customReport/myReporter.ts"
  /*reporter: [
    ["dot"], // -> console
    ["json", { outputFile: "test-result.json" }], //  -> JSON
    ['html', {
      open: "always"
    }] // -> HTML
  ],*/
  // globalTeardown: './helper/globalsetup.ts'
}
//export default config;
