/*
 * Starts functional and UI tests against a selenium server via webdriver API
 */
module.exports = function (grunt) {
   grunt.loadNpmTasks('grunt-nightwatch');

   var config = {};

   config.options = {
      standalone: true,
      jar_path: 'build/selenium/selenium-server-standalone-2.43.1.jar',
      src_folders: ['tests/ui'],
      output_folder: '.report',
      test_settings: {},
      selenium: {}
   };

   return config;
};
