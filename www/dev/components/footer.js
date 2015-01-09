var m = require('mithril.elements');

var footer = m.element('draggha-footer', {
   view: function (ctrl) {
      return m('footer', [
         m('p', [
            'Brought to you by ',
            m('a[href="https://github.com/Draggha"]', 'this guy')
         ])
      ]);
   }
});

module.exports = footer;
