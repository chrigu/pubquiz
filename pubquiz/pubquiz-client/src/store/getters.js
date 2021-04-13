export default {
  player: state => state.player,
  players: state => state.players,
  gameState: state => state.gameState,
  gameName: state => state.gameName,
  isAdmin: state => state.isAdmin,
  token: state => state.token,
  chapter: state => state.chapter,
  chapterTitle: state => state.chapter.title,
  question: state => state.question,
  answers: state => state.answers,
  timer: state => state.timer,
  leaderboard: state => {
    const playerNames = Object.keys(state.players)
    return playerNames.sort((aName, bName) => {
      if (state.leaderboard[aName] > state.leaderboard[bName]) {
        return 1
      } else if (state.leaderboard[aName] < state.leaderboard[bName]) {
        return -1
      }
      return 0
    })
  }
}
