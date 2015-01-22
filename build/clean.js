/*
 * clean directories before the build starts again.
 */
module.exports = function (grunt) {
   grunt.loadNpmTasks('grunt-contrib-clean');

   var config = {};

   config.all = ['<%= devDir %>', '<%= prodDir %>'];

   config.tmp = ['tmp'];

   config.dev = ['web/js'];

   config.docs = ['docs/jsdoc'];

   return config;
};
