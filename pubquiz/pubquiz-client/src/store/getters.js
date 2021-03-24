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
  timer: state => state.timer
}
