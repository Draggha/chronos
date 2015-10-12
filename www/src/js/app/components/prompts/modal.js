'use strict'

import m from 'mithril'

let modal = {
  controller: function (options) {
    let open
    let backdrop
    let saveBodyClass = ''

    function close (e) {
      open = false
      options.trigger(false)
      document.body.className = saveBodyClass
      if (e) {
        m.redraw()
      }
    }

    this.close = {
      onclick: function () {
        close()
      }
    }
    this.state = options.trigger
    this.bind = function (element) {
      if (!open && options.trigger()) {
        open = element
        saveBodyClass = document.body.className
        document.body.className += ' modal-open'
        backdrop = element.getElementsByClassName('modal-backdrop')[0]
        backdrop.setAttribute('style', 'height:' + document.documentElement.clientHeight + 'px')
        backdrop.addEventListener('click', close)
      }
    }
  },

  view: function (ctrl, inner) {
    inner = inner()
    var isOpen = ctrl.state()
    return m((isOpen ? '.is-open' : '.modal.fade'), {
      config: ctrl.bind
    }, [
      (isOpen ? m('.modal-backdrop.fade.in') : ''),
      m('.modal-dialog', [
        m('.modal-content', [
          m('.modal-header', [
            m('button.close[type="button" data-dismiss="modal" aria-label="Close"]',
              m('span[aria-hidden=true]', ctrl.close, m.trust('&times;'))),
            m('h4.modal-title', inner.title)
          ]),
          m('.modal-body', inner.body),
          m('.modal-footer', [
            m('button.btn.btn-default[type="button" data-dismiss="modal"]', ctrl.close, inner.cancel || 'Close'),
            inner.ok ? m('button.btn.btn-primary[type="button"]', ctrl.close, inner.ok) : ''
          ])
        ])
      ])
    ])
  }
}

export default modal
