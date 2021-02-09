<template>
  <div class="new">
    <h1>Start a new game</h1>
    <div>
      <label for="name">Name</label>
      <input id="name" type="text" v-model="name" />
      <button type="button" @click="createGame">Start game</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'

export default {
  name: 'New',
  data () {
    return {
      name: ''
    }
  },
  methods: {
    createGame (event) {
      axios.post('http://localhost:4000/api/start', {
        name: this.name,
        lastName: 'Flintstone'
      }).then(function (response) {
        console.log(response)
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>
