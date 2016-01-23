'use strict'

import m from 'mithril'
// Just import the library. It registers the desired object on the window object.
// import TinyMCE from 'tinymce/tinymce.min' // eslint-disable-line no-unused-vars
// import { nicEditor as NicEditor } from './nicedit/nicedit'
import MarkdownEditor from 'markdown-editor-flavored/dist/markdown-editor.js'
window.MARKDOWN_EDITOR_FLAVORED_STYLE_PATH = 'src/jspm_packes/npm/markdown-editor-flavored@2.5.5/dist';

function createEditor (editorId) {
  /*
  return function (element, isInitialized) {
    if (!isInitialized) {
      // the "tinymce" object is being registered on the global scope via the tinymce library
      window.tinymce.init({
        selector: `#${editorId}`,
        theme_url: '/src/js/npm/jspm_packages/tinymce@4.2.6/themes/modern/theme.min.js',
        inline: true
      })
    }
  }
  */

  /*
    return function (element, isInitialized) {
      if (!isInitialized) {
        console.log(NicEditor)

        new NicEditor({
          fullPanel: true
        }).panelInstance('js--journal-editor', {hasPanel: true})
      }
    }
    */

  return function (element, isInitialized) {
    if (!isInitialized) {
      let editor = new MarkdownEditor('#js--journal-editor', {
        // this is optional 
        'width': '100%',
        'margin': '5px'
      })
      editor.render()
    }
  }
}

let texteditorComponent = {
  view: function (ctrl) {
    let editorElementId = 'js--journal-editor'
    return m('div.journal.shadow', {
      id: editorElementId,
      config: createEditor(editorElementId)
    })
  }
}

export default texteditorComponent
