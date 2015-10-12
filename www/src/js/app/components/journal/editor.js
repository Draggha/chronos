'use strict'

import m from 'mithril'

function createEditor ($element) {
  let NicEditor = require('./nicedit/nicedit').nicEditor
  console.log(NicEditor)
  console.log($element)

  new NicEditor({
    fullPanel: true
  }).panelInstance('js--journal-editor', {hasPanel: true})
}

let texteditorComponent = {
  view: function (ctrl) {
    return m('textarea.journal.shadow', {
      id: 'js--journal-editor',
      config: createEditor
    })
  }
}

export default texteditorComponent
