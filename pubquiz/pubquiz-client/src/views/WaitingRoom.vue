<template>
  <div class="waiting-room">
    <h1>Waiting for players {{gameName}}</h1>
    <p>Hi {{player}}, we're waiting for other players</p>
    <ul v-if="hasOtherPlayers" class="players list-disc my-5 pl-5">
      <li v-for="playerName in playersWithoutMe" :key="playerName">{{playerName}}</li>
    </ul>
    <p class="mt-5" v-else>No other players</p>
    <button
      class="mt-5 rounded bg-green-800 hover:bg-green-600 px-5 py-3 text-white"
      v-if="isAdmin"
      type="button"
      @click="startGame">Start</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'WaitingRoom',
  data () {
    return {}
  },
  computed: {
    ...mapGetters(['player', 'players', 'gameName', 'isAdmin']),
    playersWithoutMe () {
      return this.otherPlayers()
    },
    hasOtherPlayers () {
      return this.otherPlayers().length > 0
    }
  },
  methods: {
    ...mapActions(['initGame', 'adminStartGame']),
    startGame (event) {
      this.adminStartGame()
    },
    otherPlayers () {
      return this.players.filter(playerName => this.player !== playerName)
    }
  }
}
</script>
