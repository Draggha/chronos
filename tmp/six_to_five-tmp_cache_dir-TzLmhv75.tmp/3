var m = require("mithril.elements");

function createEditor($element) {
  var nicEditor = require("./nicedit/nicedit").nicEditor;
  console.log(nicEditor);
  console.log($element);

  var journal = new nicEditor({
    fullPanel: true
  }).panelInstance("js--journal-editor", {
    hasPanel: true
  });
}


var texteditor = m.element("journal/editor", {
  view: function (ctrl) {
    return m("textarea.journal.shadow", {
      id: "js--journal-editor",
      config: createEditor
    });
  }
});

module.exports = texteditor;