import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'
import state from './state'
import { createStore } from 'vuex-extensions'

Vue.use(Vuex)

export default createStore(Vuex.Store, {
  state,
  mutations,
  getters,
  actions
})
