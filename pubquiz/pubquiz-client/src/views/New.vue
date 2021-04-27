<template>
  <div class="new">
    <h1>Start a new game</h1>
    <div>
      <label for="name">Name</label>
      <t-input type="text" v-model="player" />
      <button
        type="button"
        class="mt-5 rounded bg-green-800 hover:bg-green-600 px-5 py-3 text-white"
        @click="createGame">Start game</button>
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
      player: ''
    }
  },
  methods: {
    ...mapActions(['initGame']),
    createGame (event) {
      const ctrl = this
      axios.post('http://localhost:4000/api/start', {
        player: this.player
      }).then(function ({ status, data }) {
        ctrl.initGame({
          player: data.game_info.name,
          gameName: data.game_info.game_name,
          token: data.token
        })
        ctrl.$router.push({ name: 'waitingRoom', params: { id: data.game_info.game_name } })
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>
