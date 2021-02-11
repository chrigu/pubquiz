<template>
  <div class="new">
    <h1>Join an existing game</h1>
    <div>
      <label for="player">Name</label>
      <input id="player" type="text" v-model="player" />
      <label for="game-name">Game name</label>
      <input id="game-name" type="text" v-model="gameName" />
      <button type="button" @click="joinGame">Start game</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import { mapActions } from 'vuex'

export default {
  name: 'New',
  data () {
    return {
      player: '',
      gameName: ''
    }
  },
  methods: {
    ...mapActions(['join']),
    joinGame (event) {
      const ctrl = this
      axios.post('http://localhost:4000/api/join', {
        player: this.player,
        gameName: this.gameName
      }).then(function ({ status, data }) {
        ctrl.join({
          player: data.game_info.name,
          gameName: data.game_info.game_name,
          token: data.token
        })

        ctrl.$router.push({ name: 'waitingRoom', params: { id: ctrl.gameName } })
      }).catch(function (error) {
        console.log('some', error)
      })
    }
  }
}
</script>
