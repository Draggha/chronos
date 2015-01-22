var m = require("mithril.elements");

var index = m.element("pages/index", {
  view: function (ctrl) {
    return [m("h1", "This is the index page")];
  }
});

module.exports = index;