module.exports = function (config) {
   config.set({

      // base path, that will be used to resolve files and exclude
      basePath: '../../www',

      // frameworks to use
      frameworks: ['jasmine'],

      // list of files / patterns to load in the browser
      files: [
         'http://localhost:4200/js/libs.js',
         'http://localhost:4200/js/app.js',
         'http://localhost:4200/js/stubs.js',
         '../src/tests/unit/**/*.test.js'
     ],

      // list of files to exclude
      exclude: [],

      // test results reporter to use
      reporters: ['progress'],

      // web server port
      port: 9876,

      // enable / disable colors in the output (reporters and logs)
      colors: true,

      // level of logging
      logLevel: config.LOG_INFO,

      // enable / disable watching file and executing tests whenever any file changes
      autoWatch: true,

      // Start these browsers
      browsers: ['Chrome', 'Firefox', 'IE'],

      // If browser does not capture in given timeout [ms], kill it
      captureTimeout: 60000,

      // Continuous Integration mode
      // if true, it capture browsers, run tests and exit
      singleRun: false
   });
};
