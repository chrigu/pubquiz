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
    const allPlayersWithScore = state.players.reduce((allPlayerLeaderboard, player) => {
      let score = 0
      if (state.leaderboard[player]) {
        score = state.leaderboard[player]
      }

      return Object.assign(allPlayerLeaderboard, {
        [player]: score
      })
    }, {})
    const playerNames = Object.keys(allPlayersWithScore)

    const leaderboard = playerNames.sort((aName, bName) => {
      if (allPlayersWithScore[aName] > allPlayersWithScore[bName]) {
        return 1
      } else if (allPlayersWithScore[aName] < allPlayersWithScore[bName]) {
        return -1
      }
      return 0
    }).map(name => ({ name, score: allPlayersWithScore[name] }))
    console.log('leaderboard', leaderboard, state.players)
    return leaderboard
  }
}
