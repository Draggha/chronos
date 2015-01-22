/*
 * Do various things with broccoli.
 */
module.exports = function (grunt) {
   'use strict';
   grunt.loadNpmTasks('grunt-karma');

   var config = {};

   config.dev = {
      configFile: './src/tests/karma.conf.js'
   };

   return config;
};
