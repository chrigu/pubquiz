import { Socket } from 'phoenix/js/phoenix'

const host = 'ws://localhost:4000'
let socket = null

export function joinChannel (authToken, gameName) {
  socket = new Socket(`${host}/socket`, { params: { token: authToken } })
  socket.connect()

  const channel = socket.channel(`games:${gameName}`, {})

  channel.on('game_summary', summary => {
    console.log('summary', summary)
    // this.players = this.toPlayers(this.presences)
  })
}
