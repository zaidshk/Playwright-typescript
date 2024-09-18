/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  verbose: true,
  preset: 'jest-playwright-preset',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  //testRunner: 'jasmine2',
  //setupFilesAfterEnv: ['jest-allure/dist/setup'],
  testMatch: ['<rootDir>/tests/**'],
  bail: true,
  testTimeout: 60 * 1000, // hours * minutes * seconds * milliseconds
};
