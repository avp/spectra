module.exports = function(config) {
  config.set({
    basePath: './',
    frameworks: ['jasmine'],
    files: ['spectra.min.js', 'test/*.js'],
    reporters: ['progress'],
    colors: true,
    browsers: ['PhantomJS'],
    plugins: [
      'karma-jasmine',
      'karma-phantomjs-launcher'
    ]
  });
};
