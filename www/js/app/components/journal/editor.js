'use strict'

import m from 'mithril'
import MarkdownIt from 'markdown-it'

let texteditorComponent = {}

texteditorComponent.vm = (function () {
  let vm = {}
  let md = new MarkdownIt()

  vm.inPreview = m.prop(false)
  vm.editorText = function () {
    return md.render(vm.editorSource())
  }
  vm.editorSource = m.prop('')

  return vm
})()

let editorRenderlet = function (vm) {
  let editor

  if (!vm.inPreview()) {
    editor = m('textarea', {
      onchange: m.withAttr('value', vm.editorSource),
      value: vm.editorSource()
    })
  } else {
    editor = m('div', m.trust(vm.editorText()))
  }
  return editor
}

texteditorComponent.view = function (ctrl) {
  let vm = texteditorComponent.vm

  return m('div.journal.shadow', {
    id: 'js--journal-editor'
  }, [
    m('div', [
      m('div', {
        onclick: function (clickEvent) {
          vm.inPreview(false)
        }
      }, 'Source'),
      m('div', {
        onclick: function (clickEvent) {
          vm.inPreview(true)
        }
      }, 'Preview')
    ]),
    editorRenderlet(vm)
  ])
}

export default texteditorComponent
