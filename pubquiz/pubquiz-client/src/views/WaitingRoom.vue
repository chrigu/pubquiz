<template>
  <div class="waiting-room">
    <h1>Waiting for players {{gameName}}</h1>
    <p>Hi {{player}}, we're waiting for other players</p>
    <ul class="players">
      <li v-for="playerName in players" :key="playerName">{{playerName}}</li>
    </ul>

    <button type="button" @click="startGame">Start</button>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'WaitingRoom',
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['player', 'players', 'gameName'])
  },
  methods: {
    ...mapActions(['initGame']),
    startGame (event) {
      axios.post('http://localhost:4000/api/start', {
        name: this.name
      }).then(function ({ status, data }) {
        console.log(data, status)
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>
