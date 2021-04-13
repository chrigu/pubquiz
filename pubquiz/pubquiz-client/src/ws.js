import { Socket, Presence } from 'phoenix/js/phoenix'

const host = 'ws://localhost:4000'
let socket = null
let presences = {}
let channel = {}

export function joinChannel (dispatch, authToken, gameName) {
  socket = new Socket(`${host}/socket`, { params: { token: authToken } })
  socket.connect()

  channel = socket.channel(`games:${gameName}`, {})
  dispatch('setGameName', gameName)

  // presence = new Presence(channel)

  channel.join()
    .receive('ok', ({ messages }) => console.log('catching up', messages))
    .receive('error', ({ reason }) => console.log('failed join', reason))
    .receive('timeout', () => console.log('Networking issue. Still waiting...'))

  channel.on('game_summary', summary => {
    dispatch('setPlayers', summary)
  })

  channel.on('summary', summary => {
    console.log('summary', summary)
    dispatch('summary', summary)
  })

  channel.on('chapter', summary => {
    console.log('chapter', summary)
    dispatch('showChapter', summary)
  })

  channel.on('question', summary => {
    console.log('question', summary)
    dispatch('summary', summary)
  })

  channel.on('solution', question => {
    console.log('question', question)
    dispatch('setQuestion', question)
  })

  channel.on('timer', timer => {
    console.log('timer', timer)
    dispatch('setTimer', timer.count)
  })

  channel.on('presence_state', state => {
    presences = Presence.syncState(presences, state)
    const players = toPlayers(presences)
    dispatch('setPlayers', players)
  })

  channel.on('presence_diff', diff => {
    presences = Presence.syncDiff(presences, diff)
    console.log('diff', presences)
    const players = toPlayers(presences)
    dispatch('setPlayers', players)
  })
}

export function startGame () {
  channel.push('start_game', {})
}

export function fetchChapterTitle () {
  channel.push('chapter_title')
}

export function nextQuestion () {
  channel.push('next_question', {})
}

export function showQuestion () {
  channel.push('question', {})
}

export function answerQuestion (answerIndex) {
  console.log(answerIndex)
  channel.push('answer_question', { answer_index: answerIndex })
}

function toPlayers (presences) {
  const listBy = (name, { metas: [first, ...rest] }) => {
    // const score = this.scores[name] || 0
    // return { name: name, color: first.color, score: score }
    return name
  }

  return Presence.list(presences, listBy)
}
