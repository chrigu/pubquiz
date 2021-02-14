import { Socket, Presence } from 'phoenix/js/phoenix'

const host = 'ws://localhost:4000'
let socket = null
let presences = {}

export function joinChannel (dispatch, authToken, gameName) {
  socket = new Socket(`${host}/socket`, { params: { token: authToken } })
  socket.connect()

  const channel = socket.channel(`games:${gameName}`, {})

  // presence = new Presence(channel)

  channel.join()
    .receive('ok', ({ messages }) => console.log('catching up', messages))
    .receive('error', ({ reason }) => console.log('failed join', reason))
    .receive('timeout', () => console.log('Networking issue. Still waiting...'))
  channel.on('game_summary', summary => {
    console.log('summary', summary)
    // this.players = this.toPlayers(this.presences)
  })

  channel.on('presence_state', state => {
    presences = Presence.syncState(presences, state)
    console.log('state', presences)
    toPlayers(presences)
  })

  channel.on('presence_diff', diff => {
    presences = Presence.syncDiff(presences, diff)
    console.log('diff', presences)
  })
}

function toPlayers (presences) {
  const listBy = (name, { metas: [first, ...rest] }) => {
    // const score = this.scores[name] || 0
    // return { name: name, color: first.color, score: score }
    return name
  }

  return Presence.list(presences, listBy)
}
