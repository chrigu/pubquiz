<template>
  <div class="home">
    <h1 class="">Welcome to the Pubquiz</h1>
    <div>
      <ul>
        <li class="mb-5"><router-link to="/new" class="text-indigo-800  hover:text-indigo-500">Start new game</router-link></li>
        <li><router-link to="/join" class="text-indigo-800 hover:text-indigo-500">Join existing game</router-link></li>
      </ul>
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
