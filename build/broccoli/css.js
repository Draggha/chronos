/*
 * 1. Process all Less files and generate CSS
 * 2. Concatenate the old CSS file (from Metastorm) and the freshly generated CSS file
 * 3. /profit
 *
 *
 * options = {
 *    compress: Boolean, // should the custom built CSS be compressed?
 *    exclude: Array<String> // An Array of to-be-excluded files given as a string with a path relative to project root
 * }
 */
module.exports = function generateCSS(tree, options) {
   // ==================================
   // DEFAULT VALUES
   if (!options) {
      options = {};
   }
   if (!options.compress) {
      options.compress = false;
   }
   if (!options.exclude) {
      options.exclude = [];
   }
   // ==================================

   var path = require('path');
   // broccoli functions
   var pickFiles = require('broccoli-static-compiler'),
      compileLess = require('broccoli-less-single');



   // fetch all Less files
   var lessFiles = pickFiles(tree, {
      srcDir: './',
      files: ['**/*.less'],
      destDir: '/'
   });

   // compile all less files into one CSS file
   var compiledCss = compileLess([lessFiles],
      'app.less', // input file
      'css/chronos.css', // output file
      {
         paths: ['./modules', './vendor'], // Specify search paths for @import directives
         compress: options.compress
      }
   );

   return compiledCss;
};
