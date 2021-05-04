<template>
  <div class="gameover">
    <h1>Gameover</h1>
    <p>The winner is {{winner}}</p>
    <div v-if="isAdmin">
      <button class="button" @click="nextQuestion">New Game</button>
    </div>
    <Leaderborad />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Leaderborad from '@/components/Leaderborad'

export default {
  name: 'Solution',
  components: { Leaderborad },
  computed: {
    ...mapGetters(['leaderboard']),
    winner () {
      return this.leaderboard[0]
    }
  }
}
</script>

<style scoped>

</style>
