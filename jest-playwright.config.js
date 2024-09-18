/// <reference types="jest-playwright-preset" />
/// <reference types="expect-playwright" />

module.exports = {
  browsers: ['chromium'],
  exitOnPageError: false,
  launchType: 'LAUNCH',
  launchOptions: {
    headless: process.env.HEADLESS === 'true',
    args: ['--start-maximized'],
  },
  contextOptions: {
    recordVideo: {
      dir: './videos/',
    },
  },
};
