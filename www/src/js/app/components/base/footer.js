'use strict'

import m from 'mithril'

let footer = {
  view: function (ctrl) {
    return m('footer', [
      m('p', [
        'Brought to you by ',
        m('a[href="https://github.com/Draggha"]', 'Johann Haaf')
      ])
    ])
  }
}

export default footer
