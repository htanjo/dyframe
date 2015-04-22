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
    browsers: ['Chrome', 'Firefox', 'Opera', 'PhantomJS'],
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
        browserName: 'chrome',
        platform: 'Windows 8.1'
      },
      'SL_Firefox': {
        base: 'SauceLabs',
        browserName: 'firefox',
        platform: 'Windows 8.1'
      },
      'SL_Opera': {
        base: 'SauceLabs',
        browserName: 'opera',
        platform: 'Windows 7'
      },
      // 'SL_IE_9': {
      //   base: 'SauceLabs',
      //   browserName: 'internet explorer',
      //   platform: 'Windows 7',
      //   version: '9'
      // },
      'SL_IE_10': {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 7',
        version: '10'
      },
      'SL_IE_11': {
        base: 'SauceLabs',
        browserName: 'internet explorer',
        platform: 'Windows 8.1',
        version: '11'
      },
      'SL_Safari': {
        base: 'SauceLabs',
        browserName: 'safari',
        platform: 'OS X 10.10'
      },
      'SL_iOS': {
        base: 'SauceLabs',
        browserName: 'iphone',
        version: '8.2'
      },
      'SL_Android': {
        base: 'SauceLabs',
        browserName: 'android',
        version: '4.4'
      }
    }
  });

  // Override concfig for CI environment
  if (process.env.CI) {
    if (process.env.SAUCE_USERNAME && process.env.SAUCE_ACCESS_KEY) {
      config.reporters.push('saucelabs');
      config.browsers = Object.keys(config.customLaunchers);
      config.captureTimeout = 0;
    }
    else {
      config.browsers = ['PhantomJS'];
    }
  }

};
