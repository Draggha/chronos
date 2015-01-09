var m = require('mithril.elements');

// register all needed components
require('../components/texteditor');

var journal = m.element('pages/journal', {
   controller: function () {
      this.chronicle = m.route.param("chronicle");

      if (this.chronicle !== "test") {
         m.route("/403");
      }
   },
   view: function (ctrl) {
      return [
         m('h1', 'Welcome to the chronicle "' + ctrl.chronicle + '"'),
         m('.row', [
            m('.col-md-12', [
               m('draggha-texteditor')
            ])
         ])
      ];
   }
});

module.exports = journal;
