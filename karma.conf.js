module.exports = function(config) {
  config.set({
    basePath: './',
    frameworks: ['jasmine'],
    files: ['spectra.js', 'test/*.js'],
    reporters: ['progress', 'coverage'],
    colors: true,
    browsers: ['PhantomJS'],
    preprocessors: {
      'spectra.js': ['coverage']
    },
    coverageReporter: {
      type: 'html',
      dir: 'test/coverage'
    },
    plugins: [
      'karma-coverage',
      'karma-jasmine',
      'karma-phantomjs-launcher'
    ]
  });
};
