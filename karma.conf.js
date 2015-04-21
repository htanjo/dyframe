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
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome', 'Firefox', 'PhantomJS'],
    singleRun: false,
    reporters: ['mocha'],
    client: {
      mocha: {
        reporter: 'html'
      }
    }
  });
};
