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
    singleRun: false,
    client: {
      mocha: {
        reporter: 'html'
      }
    }
  });
};
