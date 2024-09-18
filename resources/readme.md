The automation framework is build using the page object model approach.

The complete automation project is under `client-automation` folder on [https://github.com/Ajar-Online/ajar-firebase/](https://github.com/Ajar-Online/ajar-firebase/)

- `pages` folder - has the object repositories and logic stored for all the pages on ajar dev web
- `googlesheet` folder - consists of a sheet where you can choose whether you want to run the test scripts on localhost, dev or production (not sure how to run it?)
- `resources/config.ts` - you can find the basic config in this folder.
  - `environment` is the environment we want to run the tests on: local, dev, staging (prod) or production
  - If you want to use the saved data from Generate Test Data API on multiple files test cases, set `useGenerateTestDataFromFile` to `true`. If `useGenerateTestDataFromFile` is set to `false`, each file test cases will use the data from API (so new data each time).
  - If you want to use the saved data from Create User API on multiple files test cases, set `useCreateUserFromFile` to `true`. If `useCreateUserFromFile` is set to `false`, each file test cases will use the data from API (so new data each time).
  - `landingUrl` is the landing pages url.
  - `frontendUrl` is the dashboard url, main app.
  - `backendUrl` is the backend cloud functions entry point.
- `tests` folder -  consists of all the test scripts supposed to be executed
- `utils` - consists of all the supporting functions required in the test scripts
- `jest-playwright.config.ts`, `tsconfig.json` and `package.json` are the config files which are responsible for the jest runner, versions and typescript dependencies

To execute a test case you run:
- `cd client-automation`
- for single test:
  - `npx jest fulltestname` in the terminal
  - example: `npx jest TC_Login_Logout.test.ts` (evaluated regex is `/TC_Login_Logout.test.ts/i`)
- for multiple test:
  - `npx jest testnamepattern` in the terminal
  - example 1: `npx jest CreateLease` will run all files that have `CreateLease` in the name (evaluated regex is `/CreateLease/i`)
  - example 2: `npx jest ^TC` will run all files that have `TC` in the beginning of the name (evaluated regex is `/^TC/i`)

Debug with playwright on a page ([docs](https://playwright.dev/docs/debug-selectors)). Test options:
- `npm run debug:local`
- `npm run debug:dev`
- `npm run debug:prod`
- `npm run debug:production`

You will find a test runner added in the project which would allow you to run multiple test cases at once (what does this mean? how can i run multiple test cases at once?)

`client-automation/run-tests.sh` is used for Github Actions usage:
- It allows to seed the database with default data (will be moved to backend automatic actions later)
- It allows the wait of `landing` and `client` angular server
