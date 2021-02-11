import Vue from 'vue'
import Vuex from 'vuex'

import { joinChannel } from '../ws'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    player: '',
    players: [],
    gameState: 'waitingForPlayers',
    gameName: '',
    isAdmin: false,
    token: ''
  },
  mutations: {
    setPlayer (state, payload) {
      state.player = payload
    },
    updatePlayers (state, payload) {
      state.players = [...state.players, payload]
    },
    updateGameState (state, payload) {
      state.gameState = payload
    },
    setToken (state, payload) {
      state.token = payload
    },
    setAdmin (state, payload) {
      state.isAdmin = payload
    },
    setGameName (state, payload) {
      state.gameName = payload
    }
  },
  getters: {
    player: state => state.player,
    players: state => state.players,
    gameState: state => state.gameState,
    gameName: state => state.gameName,
    isAdmin: state => state.isAdmin,
    token: state => state.token
  },
  actions: {
    setGameName ({ commit, state }, gameName) {
      commit('setGameName', gameName)
    },
    setPlayer ({ commit, state }, player) {
      commit('setPlayer', player)
    },
    addPlayer ({ commit, state }, player) {
      commit('updatePlayers', player)
    },
    setToken ({ commit, state }, token) {
      commit('setToken', token)
    },
    setAdmin ({ commit, state }, isAdmin) {
      commit('setAdmin', isAdmin)
    },
    joinGameChannel ({ state }) {
      joinChannel(state.token, state.gameName)
    },
    async initGame ({ dispatch }, { player, gameName, token }) {
      await dispatch('setPlayer', player)
      await dispatch('setToken', token)
      await dispatch('setGameName', gameName)
      await dispatch('setAdmin', true)
      await dispatch('joinGameChannel')
    },
    async join ({ dispatch }, { player, gameName, token }) {
      await dispatch('setPlayer', player)
      await dispatch('setToken', token)
      await dispatch('setGameName', gameName)
      await dispatch('joinGameChannel')
    }
  },
  modules: {
  }
})
