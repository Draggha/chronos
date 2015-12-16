'use strict'

import m from 'mithril'
import hoodie from '../helper/hoodie'
import Chronicle from '../models/chronicle'
// register component
import modalComponent from '../components/prompts/modal'

let chronicleStore = hoodie.store('chronicle')

let vm = (function () {
  let vm = {}
  vm.init = function () {
    vm.chronicle = new Chronicle()
  }
  vm.saveChronicle = function () {
    if (!vm.chronicle.name() && !vm.chronicle.system()) {
      console.log('[SaveChronicle] Not sufficient data given!')
      return false
    }

    console.log(vm.chronicle.toPojo())

    if (!vm.chronicle.id()) {
      chronicleStore.add(vm.chronicle.toPojo())
        .done(function (chronicle) {
          vm.chronicle.id(chronicle.id) // save the id for later reference
          window.Chronos = window.Chronos || {}
          window.Chronos.chronicle = vm.chronicle // save it globally

          vm.chronicle = new Chronicle() // empty all fields
        })
        .fail(function (error) {
          console.log('[SaveChronicle] ', error)
        })
    }
  }
  return vm
})()

let overwriteChronicleModal = {
  controller: function () {
    // provide a boolean trigger for the dialog to
    // read open / closed state
    this.trigger = m.prop(false)

    this.save = function () {
      setTimeout(function () {
        window.alert('saved')
      }, 100)
    }
  },
  view: function (ctrl, content) {
    return m('div', [
      m('button.btn.btn-primary.btn-lg[type="button"]', {
        onclick: ctrl.trigger.bind(ctrl, true)
      }, 'Launch demo modal'),
      m.component(modalComponent, {
        trigger: ctrl.trigger
      }, function () {
        return {
          title: 'A Modal Title',
          body: ['Another fine example...',
            m('p', ' of a work in progress')
          ],
          cancel: 'Cancel',
          ok: m('.save', {
            onclick: ctrl.save.bind(ctrl)
          }, 'Save Changes')
        }
      })
    ])
  }
}

let createChroniclePage = {
  vm: vm,
  controller: function () {
    vm.init()
  },
  view: function (ctrl) {
    return m('div', [
      m('h1', 'Create a chronicle'),
      m('.row', [
        m('.col-md-6', [
          m('.form-group', [
            m('label', {
              'for': 'chronicle-name'
            }, 'Name'),
            m('input[type=text]', {
              id: 'chronicle-name',
              'class': 'form-control',
              onchange: m.withAttr('value', vm.chronicle.name),
              value: vm.chronicle.name()
            })
          ])
        ]),
        m('.col-md-6', [
          m('.form-group', [
            m('label', {
              'for': 'chronicle-system'
            }, 'System'),
            m('input[type=text]', {
              id: 'chronicle-system',
              'class': 'form-control',
              onchange: m.withAttr('value', vm.chronicle.system),
              value: vm.chronicle.system()
            })
          ])
        ])
      ]),
      m('.row', [
        m('.col-md-12', [
          m('.form-group', [
            m('label', {
              'for': 'chronicle-description'
            }, 'Description'),
            m('textarea', {
              id: 'chronicle-description',
              rows: 5,
              'class': 'form-control',
              onchange: m.withAttr('value', vm.chronicle.description),
              value: vm.chronicle.description()
            })
          ])
        ]),
        m('div', {
          'class': 'col-md-6 col-md-offset-5'
        }, [
          m('button', {
            type: 'button',
            'class': 'btn btn-success btn-lg',
            onclick: function () {
              vm.saveChronicle()
            }
          }, 'Save'),
          m('button', {
            type: 'button',
            'class': 'btn btn-success btn-lg',
            onclick: function () {
              chronicleStore.findAll()
                .done(function (chronicles) {
                  console.log(chronicles.length + ' chronicles found.')
                  chronicles.map(function (chronicle, index) {
                    console.log('______ Chronicle #', index, ' ______')
                    console.log('ID: ', chronicle.id)
                    console.log('Name: ', chronicle.name)
                    console.log('System: ', chronicle.system)
                    console.log('Description: ', chronicle.description)
                  })
                })
            }
          }, 'Find all')
        ])
      ]),
      m.component(overwriteChronicleModal)
    ])
  }
}

export default createChroniclePage
