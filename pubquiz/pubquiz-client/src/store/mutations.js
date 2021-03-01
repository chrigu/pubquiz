export default {
  setPlayer (state, payload) {
    state.player = payload
  },
  updatePlayers (state, payload) {
    state.players = [...state.players, payload]
  },
  setPlayers (state, payload) {
    state.players = payload
  },
  setGameState (state, payload) {
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
}
