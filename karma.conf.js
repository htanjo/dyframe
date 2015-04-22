'use strict';

module.exports = function (config) {

  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      'src/dyframe.js',
      'test/spec/*.js'
    ],
    exclude: [],
    preprocessors: {},
    reporters: ['mocha'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome', 'Firefox', 'PhantomJS'],
    singleRun: true,
    client: {
      mocha: {
        reporter: 'html'
      }
    },

    // Browser test on Sauce Labs
    sauceLabs: {
      testName: 'Dyframe Tests'
    },
    customLaunchers: {
      'SL_Chrome': {
        base: 'SauceLabs',
        browserName: 'chrome'
      },
      'SL_IE_11': {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 8.1',
        version: '11'
      },
      'SL_iOS': {
        base: 'SauceLabs',
        browserName: 'iphone',
        platform: 'OS X 10.10',
        version: '8.2'
      }
    }
  });

  // Override concfig for CI environment
  if (process.env.CI) {
    if (process.env.SAUCE_USERNAME && process.env.SAUCE_ACCESS_KEY) {
      config.reporters.push('saucelabs');
      config.browsers = ['SL_Chrome', 'SL_IE_11'];
    }
    else {
      config.browsers = ['PhantomJS'];
    }
  }

};
