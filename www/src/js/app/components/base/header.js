'use strict'

import m from 'mithril'

// register elements
import loginComponent from '../login/login'

let header = {
  view: function (ctrl) {
    return m('nav', {
      'class': 'navbar navbar-inverse'
    }, [
      m('.container-fluid', [
        m('.navbar-header', [
          m('a[href="/"]', {
            'class': 'navbar-brand',
            config: m.route
          }, 'Chronos')
        ]),
        m('ul', {
          'class': 'nav navbar-nav'
        }, [
          m('li', {
            'class': 'dropdown'
          }, [
            m('a[href="/create-chronicle"]', {
              config: m.route, // TODO: remove this when the nav items are done
              'class': 'dropdown-toggle',
              role: 'button',
              ariaExpanded: 'false'
            }, [
              'Chronicle',
              m('span.caret')
            ]),
            m('ul', {
              'class': 'dropdown-menu',
              role: 'menu'
            }, [
              m('li', [
                m('a[href="/create-chronicle"]', {
                  config: m.route
                }, [
                  'Create'
                ])
              ])
            ])
          ])
        ]),
        m('a[href="/login"]', {
          config: m.route
        }, 'Login or sign up'),
        m('a[href="/journal/test"]', {
          config: m.route
        }, 'Journal'),
        m(`a[href="/journal/${((window.Chronos && window.Chronos.chronicle) ? window.Chronos.chronicle.name() : '_____undefined_____')}"]`, {
          config: m.route
        }, 'Journal'),
        m.component(loginComponent)
      ])
    ])
  }
}

export default header
