import router from '../router'
import { joinChannel, startGame, answerQuestion, showQuestion, nextQuestion } from '@/ws'

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
  setTimer ({ commit }, timer) {
    commit('setTimer', timer)
  },
  setLeaderboard ({ commit }, leaderboard) {
    commit('setLeaderboard', leaderboard)
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
      router.push({ name: 'gameOver', params: { id: state.gameName } })
    } else if (state.chapter.index !== summary.chapter.index) {
      dispatch('setChapter', summary.chapter)
      dispatch('setGameState', 'chapterTitle')
      console.log('chapter', summary)
      router.push({ name: 'chapterTitle', params: { id: state.gameName } })
    } else if (summary.answers[0] && typeof summary.answers[0] !== 'string') { // check if has correct answer
      console.log('showanswers', summary)
      dispatch('setGameState', 'showSolution')
      dispatch('setAnswers', summary.answers)
      dispatch('setLeaderboard', summary.leaderboard)
      router.push({ name: 'solution', params: { id: state.gameName } })
    } else if (state.gameState === 'chapterTitle' || (state.question.index !== summary.question.index)) {
      console.log('show', summary)
      dispatch('setQuestion', summary.question)
      dispatch('setAnswers', summary.answers)
      dispatch('setGameState', 'showQuestion')
      router.push({ name: 'question', params: { id: state.gameName } })
    }// check if has new question index
  },
  nextQuestion ({ state }) {
    console.log('nextQuestion')
    nextQuestion()
  },
  showQuestion ({ state }) {
    console.log('showQuestion')
    showQuestion()
  },
  answer (state, questionIndex) {
    answerQuestion(questionIndex)
  },
  showChapter ({ state, dispatch }, summary) {
    dispatch('setChapter', summary.chapter)
    dispatch('setGameState', 'chapterTitle')
    console.log('chaptert', summary)
    router.push({ name: 'chapterTitle', params: { id: state.gameName } })
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
