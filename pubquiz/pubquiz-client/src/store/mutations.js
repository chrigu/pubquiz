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
  },
  setChapter (state, payload) {
    state.chapter = payload
  },
  setQuestion (state, payload) {
    state.question = payload
  },
  setAnswers (state, payload) {
    state.answers = payload
  },
  setTimer (state, payload) {
    state.timer = payload
  },
  setLeaderboard (state, payload) {
    console.log('setLeaderboard', payload)
    state.leaderboard = payload
  }
}
