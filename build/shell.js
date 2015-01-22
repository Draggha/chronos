/*
 * Trigger JSdoc 3
 */
module.exports = function (grunt) {
   grunt.loadNpmTasks('grunt-shell');

   var config = {};

   config = {
      options: {},
      jsdoc: {
         command: '.\\node_modules\\.bin\\jsdoc -c docs\\jsdoc.conf.json -d docs\\jsdoc'
      },
      hoodie: {
         command: 'node .\\node_modules\\hoodie-server\\bin\\start'
      }
   };

   return config;
};
