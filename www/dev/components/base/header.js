var m = require('mithril.elements');

// register elements
require('../login/login');

var header = m.element('base/header', {
   view: function (ctrl) {
      return m('.jumbotron', [
         m('h1', 'Chronos'),
         m('ul', [
            m('li', [
               m('a[href="/"]', {
                  config: m.route
               }, 'Home')
            ]),
            m('li', [
               m('a[href="/test"]', {
                  config: m.route
               }, 'Test Page')
            ]),
            m('li', [
               m('a[href="/journal/test"]', {
                  config: m.route
               }, 'Journal')
            ])
         ]),
         m('login/login')
      ]);
   }
});

module.exports = header;
