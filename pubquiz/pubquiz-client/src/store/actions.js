import router from '../router'
import { joinChannel, startGame, showQuestion } from '@/ws'

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
  setGameState ({ commit }, gameState) {
    commit('setGameState', gameState)
  },
  setChapter ({ commit }, chapter) {
    commit('setChapter', chapter)
  },
  setQuestion ({ commit }, question) {
    commit('setQuestion', question)
  },
  setAnswers ({ commit }, answers) {
    commit('setAnswers', answers)
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
  adminStartGame () {
    startGame()
  },
  adminNextQuestion () {
    // nextQuestion()
  },
  summary ({ state, dispatch }, summary) {
    console.log('summary', summary)
    if (summary.over) {
      dispatch('setGameState', 'gameOver')
    } else if (state.chapter.index !== summary.chapter.index) {
      dispatch('setChapter', summary.chapter)
      dispatch('setGameState', 'chapterTitle')
      router.push({ name: 'chapterTitle', params: { id: state.gameName } })
    } else if (summary.answers[0] && typeof summary.answers[0] !== 'string') { // check if has correct answer
      dispatch('setGameState', 'showSolution')
    } else if (state.gameState === 'chapterTitle' && (state.question.index !== summary.question.index)) {
      dispatch('setQuestion', summary.question)
      dispatch('setAnswers', summary.answers)
      dispatch('setGameState', 'showQuestion')
      router.push({ name: 'question', params: { id: state.gameName } })
    }// check if has new question index

  },
  nextQuestion () {
    console.log('showQuestion')
    showQuestion()
  }
  // showSolution ({ state, dispatch }) {
  //   // check if q left
  //   // check if game done
  //   fetchSolution()
  //   dispatch('setGameState', 'showSolution')
  // },
  // nextQuestion ({ state, dispatch }) {
  //   // check if q left
  //   // check if game done
  //   dispatch('setGameName', 'question')
  // }
}
