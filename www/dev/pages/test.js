var m = require('mithril.elements');

var test = m.element('pages/test', {
   view: function (ctrl) {
      return m('h1', "Test");
   }
});

module.exports = test;
