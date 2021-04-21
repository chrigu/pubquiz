<template>
 <div>
   <h3>Leaderboard</h3>
   <ol>
     <li v-for="player in leaderboard" :key="player.name">{{player.name}} {{player.score}}</li>
   </ol>
 </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Leaderborad.vue',
  data () {
    return {
      players: {}
    }
  },
  computed: {
    ...mapGetters(['leaderboard'])
  }
}
</script>

<style scoped>

</style>
