'use strict'

import m from 'mithril'

function Chronicle () {
  this.id = m.prop() // will be filled later
  this.name = m.prop('')
  this.system = m.prop('')
  this.description = m.prop('')
  this.gamemaster = m.prop('')
}

Chronicle.prototype.toPojo = function () {
  let self = this

  return {
    name: self.name(),
    system: self.system(),
    description: self.description(),
    gamemaster: self.gamemaster()
  }
}

export default Chronicle
