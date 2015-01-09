var m = require('mithril.elements');

var texteditor = m.element('draggha-texteditor', {
   view: function (ctrl) {
      return m('textarea.journal.shadow');
   }
});

module.exports = texteditor;
