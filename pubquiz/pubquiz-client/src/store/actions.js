import {joinChannel, fetchChapterTitle, startGame, nextQuestion} from '@/ws'

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
  setGameState ({ commit }, gameName) {
    commit('setGameName', gameName)
  },
  setChapter ({ commit }, chapter) {
    commit('setChapter', chapter)
  },
  setQuestion ({ commit }, question) {
    commit('setQuestion', question)
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
    nextQuestion()
  },
  summary ({ state, dispatch }, summary) {
    if (summary.over) {
      dispatch('setGameState', 'gameOver')
    } else if (state.chapter.index !== summary.current_chapter) {
      dispatch('setChapter', summary.current_chapter)
      dispatch('setGameState', 'chapterTitle')
    } else if (summary.answers[0] && summary.answers[0].hasOwnProperty('correct')) { // check if has correct answer
      dispatch('setGameState', 'showSolution')
    } else if (state.question.index !== summary.current_question) {
      dispatch('setQuestion', summary.current_question)
      dispatch('setGameState', 'showQuestion')
    }// check if has new question index

  },
  next_question ({ dispatch }) {
    dispatch('setGameState', 'showQuestion')
  },
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
