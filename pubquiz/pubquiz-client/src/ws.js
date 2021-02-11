import { Socket, Presence } from 'phoenix/js/phoenix'

const host = 'ws://localhost:4000'
let socket = null
let presence = null

export function joinChannel (authToken, gameName) {
  socket = new Socket(`${host}/socket`, { params: { token: authToken } })
  socket.connect()

  const channel = socket.channel(`games:${gameName}`, {})

  presence = new Presence(channel)

  channel.join()
    .receive('ok', ({ messages }) => console.log('catching up', messages))
    .receive('error', ({ reason }) => console.log('failed join', reason))
    .receive('timeout', () => console.log('Networking issue. Still waiting...'))
  channel.on('game_summary', summary => {
    console.log('summary', summary)
    // this.players = this.toPlayers(this.presences)
  })

  presence.onSync(() => {
    console.log(presence.list())
  })
}
