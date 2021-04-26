<template>
  <div class="home">
    <h1 class="m-10">Welcome to the Pubquiz</h1>
    <div>
      <router-link to="/new">Start new game</router-link>
      <router-link to="/join">Join existing game</router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  mounted () {
    this.$store.reset()
  }
}
</script>
