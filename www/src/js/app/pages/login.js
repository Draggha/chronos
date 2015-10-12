'use strict'

import m from 'mithril'
import hoodie from '../helper/hoodie'
import User from '../models/user'

let vm = (function () {
  let vm = {}
  vm.init = function () {
    vm.user = new User()
  }
  vm.saveUser = function () {
    hoodie.account.signUp(vm.user.name(), vm.user.password())
      .done(function () {
        console.log('[Signup] New user "', vm.user.name(), '" created!')
      })
      .fail(function (error) {
        console.log('[Signup] Error! ', error)
      })
  }
  vm.login = function () {
    hoodie.account.signIn(vm.user.name(), vm.user.password())
      .done(function (name) {
        console.log('[SignIn] Successfully logged in as ' + name + '!')
      })
      .fail(function (error) {
        console.log('[SignIn] Something broke...', error)
      })
  }
  vm.logout = function () {
    hoodie.account.signOut()
      .done(function () {
        console.log('[SignOut] Success!')
      })
      .fail(function () {
        console.log('[SignOut] Something broke...')
      })
  }
  return vm
})()

let loginPage = {
  controller: function () {
    vm.init()
  },
  view: function (ctrl) {
    return m('div', [
      m('h1', 'Login or sign up'),
      m('.row', [
        m('.col-md-6', [
          m('.form-group', [
            m('label', {
              'for': 'user-name'
            }, 'Name'),
            m('input', {
              id: 'user-name',
              type: 'text',
              'class': 'form-control',
              onchange: m.withAttr('value', vm.user.name),
              value: vm.user.name()
            })
          ])
        ]),
        m('.col-md-6', [
          m('.form-group', [
            m('label', {
              'for': 'user-password'
            }, 'Password'),
            m('input', {
              id: 'user-password',
              type: 'password',
              'class': 'form-control',
              onchange: m.withAttr('value', vm.user.password),
              value: vm.user.password()
            })
          ])
        ])
      ]),
      m('.row', [
        m('.col-md-6.col-md-offset-5', [
          m('button', {
            type: 'button',
            'class': 'btn btn-success btn-lg',
            onclick: function () {
              vm.saveUser()
            }
          }, 'Signup'),
          m('button', {
            type: 'button',
            'class': 'btn btn-success btn-lg',
            onclick: function () {
              vm.login()
            }
          }, 'Login'),
          m('button', {
            type: 'button',
            'class': 'btn btn-success btn-lg',
            onclick: function () {
              vm.logout()
            }
          }, 'Logout')
        ])
      ])
    ])
  }
}

export default loginPage
