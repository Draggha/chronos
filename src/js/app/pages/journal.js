var m = require('mithril.elements');

// register all needed components
require('../components/journal/editor');

var journal = m.element('pages/journal', {
   controller: function () {
      this.chronicle = m.route.param("chronicle");
   },
   view: function (ctrl) {
      if (!window.Chronos || !window.Chronos.chronicle) {
         m.route("/403");
      }

      return [
         m('h1', 'Welcome to the chronicle "' + ctrl.chronicle + '"'),
         m('.row', [
            m('.col-md-12', [
               m('journal/editor')
            ])
         ])
      ];
   }
});

module.exports = journal;
