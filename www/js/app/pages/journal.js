'use strict'

import m from 'mithril'

// register all needed components
import editorComponent from '../components/journal/editor'

var journalPage = {
  controller: function () {
    this.chronicle = m.route.param('chronicle')
  },
  view: function (ctrl) {
/*    if (!window.Chronos || !window.Chronos.chronicle) {
      m.route('/403')
    }
*/
    return m('div', [
      m('h1', `Welcome to the chronicle "${ctrl.chronicle}"`),
      m('.row', [
        m('.col-md-12', [
          m.component(editorComponent)
        ])
      ])
    ])
  }
}

export default journalPage
