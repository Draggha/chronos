var m = require('mithril.elements');

// base components
require('./components/base/header');
require('./components/base/footer');

// pages
require('./pages/index');
require('./pages/403');
require('./pages/login');
require('./pages/journal');
require('./pages/create-chronicle');

function app(element) {
   function addHeaderAndFooter(page) {
      return {
         controller: function () {},
         view: function () {
            return m('.container.main-content', [
               m('base/header'),
               m(page),
               m('base/footer')
            ]);
         }
      };
   }

   return m.route(element, "/", {
      "/": addHeaderAndFooter('pages/index'),
      "/login": addHeaderAndFooter('pages/login'),
      "/create-chronicle": addHeaderAndFooter('pages/create-chronicle'),
      "/journal/:chronicle": addHeaderAndFooter('pages/journal'),

      "/403": addHeaderAndFooter('pages/403')
   });
}

module.exports = app;
