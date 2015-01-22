/*
 * Copy all resource files to the output directory
 */
module.exports = function copyResources(tree) {
   var path = require('path');
   // broccoli functions
   var pickFiles = require('broccoli-static-compiler'),
      mergeTrees = require('broccoli-merge-trees'),
      htmlmin = require('broccoli-htmlmin');



   // fetch all resource files
   var resourceFiles = pickFiles(tree, {
      srcDir: 'css',
      files: [
         'img/**/*.*'
      ],
      destDir: '/css'
   });

   var htmlFiles = pickFiles(tree, {
      srcDir: '/',
      files: [
         'index.html'
      ],
      destDir: '/'
   });
   htmlFiles = htmlmin(htmlFiles, {
      empty: true // don't delete empty DOM nodes! They are needed to bootstrap the app :)
   });

   return mergeTrees([htmlFiles, resourceFiles]);
};
