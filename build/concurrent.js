/*
 * Run tasks concurrently
 */
module.exports = function (grunt) {
   grunt.loadNpmTasks('grunt-concurrent');

   var config = {};

   config.dev = {
      tasks: [
         'broccoli:dev:serve',
         'shell:hoodie'
      ],
      options: {
         logConcurrentOutput: true
      }
   };

   return config;
};
