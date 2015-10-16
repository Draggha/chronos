'use strict'

import m from 'mithril'
// Just import the library. It registers the desired object on the window object.
import TinyMCE from 'tinymce/tinymce.min' // eslint-disable-line no-unused-vars

function createEditor (editorId) {
  return function (element, isInitialized) {
    if (!isInitialized) {
      // the "tinymce" object is being registered on the global scope via the tinymce library
      window.tinymce.init({
        selector: `#${editorId}`,
        inline: true
      })
    }
  }
  /*
   let NicEditor = require('./nicedit/nicedit').nicEditor
   console.log(NicEditor)
   console.log($element)

   new NicEditor({
   fullPanel: true
   }).panelInstance('js--journal-editor', {hasPanel: true})
   */
}

let texteditorComponent = {
  view: function (ctrl) {
    let editorElementId = 'js--journal-editor'
    return m('textarea.journal.shadow', {
      id: editorElementId,
      config: createEditor(editorElementId)
    })
  }
}

export default texteditorComponent
