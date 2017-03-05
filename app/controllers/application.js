import Ember from 'ember'

const { Controller, inject: { service } } = Ember

export default Controller.extend({
  hoodieAccount: service('hoodie-account'),

  actions: {
    signIn (username, password) {
      this.get('hoodieAccount').signIn({ username, password })
    },

    signOut () {
      this.get('hoodieAccount').signOut()
    }
  }
})
