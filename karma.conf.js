// https://github.com/karma-runner/karma-chrome-launcher
process.env.CHROME_BIN = require("puppeteer").executablePath();

module.exports = function (config) {
  config.set({
    basePath: "./",

    plugins: ["karma-chrome-launcher"],

    files: ["dist/index.browser.js"],

    colors: true,

    logLevel: config.LOG_DEBUG,

    browsers: ["ChromeHeadlessNoSandbox"],
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: "ChromeHeadless",
        flags: ["--no-sandbox", "--disable-web-security"],
      },
    },
  });
};
