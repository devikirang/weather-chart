// Karma configuration

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'bower_components/jquery/dist/jquery.js',
      'bower_components/lodash/lodash.js',
      'bower_components/moment/moment.js',
      'bower_components/Chart.js/Chart.min.js',
      'bower_components/bootstrap/dist/js/bootstrap.js',
      'bower_components/handlebars/handlebars.js',
      'bower_components/ember/ember.debug.js',
      // endbower
      'bower_components/ember/ember-template-compiler.js',
      'bower_components/ember/ember-testing.js',
      'app/scripts/initApp.js',
      'app/scripts/searchApp.js',
      'app/scripts/chartApp.js',
      'test/mock/**/*.js',
      'test/spec/**/*.js'
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 8080,

    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'Chrome'
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-jasmine',
      'karma-coverage',
      "karma-spec-reporter",
      'karma-htmlfile-reporter',
      'karma-junit-reporter'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_DEBUG,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'

    // coverage reporter generates the coverage
    reporters: ['progress', 'coverage', 'spec', 'junit', 'html'],

    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      'app/scripts/*.js': ['coverage']
    },

    // optionally, configure the reporter
    coverageReporter: {
      dir: 'reports/',
      reporters: [{
        type: 'html',
        subdir: 'coverage-html'
      }, {
        type: 'json',
        subdir: 'coverage-json'
      }, ]
    },

    specReporter: {
      maxLogLines: 5
    },

    junitReporter: {
      outputFile: 'reports/test-results.xml'
    },

    htmlReporter: {
      outputFile: 'reports/test-results.html'
    }

  });
};
