'use strict'

import m from 'mithril'

// base components
import headerComponent from './components/base/header'
import footerComponent from './components/base/footer'

// pages
import indexPage from './pages/index'
import _403Page from './pages/403'
import loginPage from './pages/login'
import journalPage from './pages/journal'
import createChroniclePage from './pages/create-chronicle'

/**
 * @typedef {Object} IMithrilComponent
 * @property {Object} [vm]
 * @property {Function} controller
 * @property {Function} view
 */
/**
 * @param {IMithrilComponent} page A page component for mithril
 */
let addHeaderAndFooter = function addHeaderAndFooter (page) {
  return {
    view: function () {
      return m('.container.main-content', [
        m.component(headerComponent),
        m.component(page),
        m.component(footerComponent)
      ])
    }
  }
}

let app = (element) => {
  return m.route(element, '/', {
    '/': addHeaderAndFooter(indexPage),
    '/login': addHeaderAndFooter(loginPage),
    '/create-chronicle': addHeaderAndFooter(createChroniclePage),
    '/journal/:chronicle': addHeaderAndFooter(journalPage),
    '/403': addHeaderAndFooter(_403Page)
  })
}

let chronos = app(document.getElementById('js--main-content'))
// var hoodie = new window.Hoodie()

// let chronos = m.mount(document.getElementById('js--main-content'), indexPage)
export default chronos
