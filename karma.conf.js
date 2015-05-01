/* jshint camelcase: false */
'use strict';

module.exports = function (config) {

  config.set({
    basePath: '',
    frameworks: ['mocha', 'chai'],
    files: [
      'src/*.js',
      'test/spec/*.js'
    ],
    exclude: [],
    preprocessors: {
      'src/*.js': ['coverage']
    },
    reporters: ['mocha', 'coverage'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome', 'PhantomJS'],
    singleRun: true,
    client: {
      mocha: {
        reporter: 'html'
      }
    },
    coverageReporter: {
      type : 'lcov',
      dir : 'coverage/'
    },

    // Browser test on Sauce Labs
    customLaunchers: {
      'BS_Chrome': {
        base: 'BrowserStack',
        browser: 'chrome',
        os: 'Windows',
        os_version: '8.1'
      },
      'BS_Firefox': {
        base: 'BrowserStack',
        browser: 'firefox',
        os: 'Windows',
        os_version: '8.1'
      },
      'BS_Opera': {
        base: 'BrowserStack',
        browser: 'opera',
        os: 'Windows',
        os_version: '8.1'
      },
      'BS_IE_11': {
        base: 'BrowserStack',
        browser: 'ie',
        browser_version: '11.0',
        os: 'Windows',
        os_version: '8.1'
      },
      'BS_IE_10': {
        base: 'BrowserStack',
        browser: 'ie',
        browser_version: '10.0',
        os: 'Windows',
        os_version: '7'
      },
      'BS_IE_9': {
        base: 'BrowserStack',
        browser: 'ie',
        browser_version: '9.0',
        os: 'Windows',
        os_version: '7'
      },
      'BS_Safari': {
        base: 'BrowserStack',
        browser: 'safari',
        os: 'OS X',
        os_version: 'Yosemite'
      },
      'BS_iOS': {
        base: 'BrowserStack',
        device: 'iPhone 5S',
        os: 'ios',
        os_version: '7.0'
      },
      'BS_Android': {
        base: 'BrowserStack',
        device: 'Samsung Galaxy S5',
        os: 'android',
        os_version: '4.4'
      }
    }
  });

  // Override concfig for CI environment
  if (process.env.CI) {
    config.browsers = Object.keys(config.customLaunchers);
    config.captureTimeout = 0;
    config.reporters.push('coveralls');
  }

};
