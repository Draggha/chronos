module.exports = function (grunt) {
   "use strict";

   var gruntConfig = {};

   gruntConfig.devDir = 'www';
   gruntConfig.prodDir = 'www';

   gruntConfig.clean = require('./build/clean')(grunt);
   gruntConfig.broccoli = require('./build/broccoli')(grunt);
   gruntConfig.karma = require('./build/karma')(grunt);
   gruntConfig.nightwatch = require('./build/nightwatch')(grunt);
   gruntConfig.shell = require('./build/shell')(grunt);
   gruntConfig.concurrent = require('./build/concurrent')(grunt);

   grunt.initConfig(gruntConfig);

   // the default task can be run just by typing "grunt" on the command line
   grunt.registerTask('default', [
      'clean:dev',
      'clean:tmp',
      'broccoli:dev:serve'
   ]);

   grunt.registerTask('watch', ['broccoli:dev:serve']);

   grunt.registerTask('dev', [
      'clean:dev',
      'clean:tmp',
      'broccoli:dev:build'
   ]);

   // generate the JavaScript API documentation
   grunt.registerTask('docs', [
      'dev',
      'clean:docs',
      'shell:jsdoc'
   ]);

   // test the code (needs dev server through grunt dev or grunt task!)
   grunt.registerTask('test:unit', ['karma']);
   // test the UI
   grunt.registerTask('test:ui', ['nightwatch']);

   // builds all sources and minifies them for production use
   grunt.registerTask('prod', [
      'clean:all',
      'clean:tmp',
      'broccoli:prod:build'
   ]);
};
