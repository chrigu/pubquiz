<template>
 <div>
   <ol>
     <li v-for="player in leaderboard" :key="player">{{player}} {{this.leaderboard[player]}}</li>
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
  },
}
</script>

<style scoped>

</style>
