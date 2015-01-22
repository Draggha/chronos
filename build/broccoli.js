/*
 * Do various things with broccoli.
 */
module.exports = function (grunt) {
   'use strict';
   grunt.loadNpmTasks('grunt-broccoli');

   var config = {},
      // libs
      mergeTrees = require('broccoli-merge-trees'),
      // builder functions
      copyResources = require('./broccoli/resources'),
      generateCSS = require('./broccoli/css'),
      generateJS = require('./broccoli/js'),
      cssFilesBlacklist = [];



   // _______________________________________________
   // <ALL>
   config.resources = {
      dest: '<%= devDir %>',

      config: function () {
         return copyResources('./src');
      }
   };
   // </ALL>
   // ===============================================



   // _______________________________________________
   // <DEVELOPMENT>
   config.dev_css = {
      dest: '<%= devDir %>',

      config: function () {
         return generateCSS('./src/css', {
            compress: false,
            exclude: cssFilesBlacklist
         });
      }
   };

   config.dev_js = {
      dest: '<%= devDir %>',

      config: function () {
         return generateJS('./src/js', {
            compress: false
         });
      }
   };

   config.dev = {
      dest: '<%= devDir %>',

      config: function () {
         return mergeTrees([
    config.resources.config(), // copy resources
    config.dev_css.config(), // generate CSS
    config.dev_js.config() // generate JS
   ]);
      }
   };
   // </DEVELOPMENT>
   // ===============================================


   // _______________________________________________
   // <PRODUCTION>
   config.prod_css = {
      dest: '<%= prodDir %>',

      config: function () {
         return generateCSS('./src/css', {
            compress: true,
            exclude: cssFilesBlacklist
         });
      }
   };


   config.prod_js = {
      dest: '<%= prodDir %>',

      config: function () {
         return generateJS('./src/js', {
            compress: true
         });
      }
   };

   config.prod = {
      dest: '<%= prodDir %>',

      config: function () {
         return mergeTrees([
            config.resources.config(), // copy resources
            config.prod_css.config(), // generate CSS
            config.prod_js.config() // generate JS
         ]);
      }
   };
   // </PRODUCTION>
   // ===============================================



   return config;
};
