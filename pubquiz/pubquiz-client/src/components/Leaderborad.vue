<template>
 <div>
   <ol>
     <li v-for="player in sortedPlayerNames" :key="player">{{player}} {{this.players[player]}}</li>
   </ol>
 </div>
</template>

<script>
export default {
  name: 'Leaderborad.vue',
  data () {
    return {
      players: {}
    }
  },
  computed: {
    sortedPlayerNames () {
      const playerNames = Object.keys(this.players)
      return playerNames.sort((aName, bName) => {
        if (this.players[aName] > this.players[bName]) {
          return 1
        } else if (this.players[aName] < this.players[bName]) {
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
