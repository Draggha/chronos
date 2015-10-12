'use strict'

import m from 'mithril'

let _403Page = {
  view: function (ctrl) {
    return m('div', [
      m('h1', 'Authorization required!'),
      m('p', 'You have insufficient rights to view that content. If something is amiss ask a group administrator.'),
      m('a[href="/"]', {config: m.route}, 'back to index')
    ])
  }
}

export default _403Page
