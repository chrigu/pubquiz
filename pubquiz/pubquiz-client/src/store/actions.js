import {joinChannel} from "@/ws";

export default {
  setGameName ({ commit, state }, gameName) {
    commit('setGameName', gameName)
  },
  setPlayer ({ commit, state }, player) {
    commit('setPlayer', player)
  },
  setPlayers ({ commit, state }, players) {
    commit('setPlayers', players)
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
  joinGameChannel ({ state, dispatch }) {
    joinChannel(dispatch, state.token, state.gameName)
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
  },
  startGame ({ state, dispatch }) {
    dispatch('setGameName', 'chapterTitle')
  },
  showAnswer ({ state, dispatch }) {
    // check if q left
    // check if game done
    dispatch('setGameName', 'showAnswer')
  },
  nextQuestion ({ state, dispatch }) {
    // check if q left
    // check if game done
    dispatch('setGameName', 'question')
  }
}
