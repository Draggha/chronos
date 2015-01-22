/*
 * Build the app.js file and optionally minify it
 *
 * options = {
 *    compress: Boolean, // should the JS be minified and mangled?
 *    exclude: Array<String> // An Array of to-be-excluded files given as a string with a path relative to project root
 * }
 */
module.exports = function generateJS(tree, options) {
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

   // broccoli functions
   var mergeTrees = require('broccoli-merge-trees'),
      pickFiles = require('broccoli-static-compiler'),
      webpackify = require('broccoli-webpack'),
      transpile = require('broccoli-6to5-transpiler'),
      uglify = require('broccoli-uglify-js');


   /**********************************************
    *                 APP.js
    **********************************************/
   // es6 module transpiler
   var transpilerOptions = {
      modules: 'common',
      comments: true,

      // language features
      whitelist: [
         "arrowFunctions",
         "computedPropertyNames",
         "constants",
         "defaultParameters",
         "destructuring",
         "forOf",
         "generators",
         "letScoping",
         "modules",
         "restParameters",
         "spread",
         "templateLiterals",
         "classes"
         //"propertyMethodAssignment",
         //"propertyNameShorthand",
         //"unicodeRegex",
      ]
   };
   if (!options.compress) {
      // don't generate source maps for production (source maps don't work with broccoli-traceur for now!)
      transpilerOptions.sourceMaps = true;
   } else {
      // prod doesn't need comments
      transpilerOptions.comments = false;
   }
   var compiledJs = transpile(tree, transpilerOptions);

   // webpack
   var webpackOptions = {
      entry: ['./app/app.js'],
      output: {
         filename: '/js/chronos.js',
         library: 'Chronos',
         libraryTarget: 'var'
      }
   };
   // don't generate source maps for production
   if (!options.compress) {
      webpackOptions.devtool = 'source-map';
      /* source maps don't work with broccoli-traceur for now so don't concatenate them
       webpackOptions.module = {
       preLoaders: [
       {
       test: /\.js$/,
       loader: "source-map-loader"
       }
       ]
       };
       */
   }
   compiledJs = webpackify(compiledJs, webpackOptions);

   // minify it all for production
   if (options.compress) {
      compiledJs = uglify(compiledJs, {
         mangle: true
      });
   }

   /**********************************************
    *                 LIBS.js
    **********************************************/
   var compiledLibs = pickFiles(tree, {
      srcDir: 'vendor',
      files: [
         'jquery-2.1.0.min.js'
      ],
      destDir: '/js'
   });

   return mergeTrees([compiledLibs, compiledJs]);
};
