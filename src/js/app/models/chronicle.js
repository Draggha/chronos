var m = require('mithril.elements');

function Chronicle() {
   this.id = m.prop(); // will be filled later
   this.name = m.prop('');
   this.system = m.prop('');
   this.description = m.prop('');
   this.gamemaster = m.prop('');
}

Chronicle.prototype.toPojo = function () {
   var self = this;

   return {
      name: self.name(),
      system: self.system(),
      description: self.description(),
      gamemaster: self.gamemaster()
   };
};

module.exports = Chronicle;
