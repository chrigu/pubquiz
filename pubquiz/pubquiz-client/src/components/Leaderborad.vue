<template>
 <div>
   <ol>
     <li v-for="player in leaderboard" :key="player.name">{{player.name}} {{player.score}}</li>
   </ol>
 </div>
</template>

<script>
export default {
  name: "Leaderborad.vue",
  data () {
    return {
      players: []
    }
  },
  computed: {
    leaderboard () {
      return this.players.sort(({ aScore }, { bScore }) => {
        if (aScore > bScore) {
          return 1
        } else if (aScore < bScore) {
          return -1
        }
        return 0
      })
    }
  }
}
</script>

<style scoped>

</style>
