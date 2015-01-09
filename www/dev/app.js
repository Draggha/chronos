var m = require('mithril.elements');

// base components
require('./components/header');
require('./components/footer');

// pages
require('./pages/index');
require('./pages/403');
require('./pages/test');
require('./pages/journal');

function app(element) {
   function addHeaderAndFooter(page) {
      return {
         controller: function () {},
         view: function () {
            return m('.container.main-content', [
               m('draggha-header'),
               m(page),
               m('draggha-footer')
            ]);
         }
      };
   }

   return m.route(element, "/", {
      "/": addHeaderAndFooter('pages/index'),
      "/test": addHeaderAndFooter('pages/test'),
      "/journal/:chronicle": addHeaderAndFooter('pages/journal'),

      "/403": addHeaderAndFooter('pages/403')
   });
}

module.exports = app;
