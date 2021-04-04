<template>
  <div class="chaptertitle">
    <h1>{{chapterTitle}}</h1>
    <button v-if="isAdmin" type="button" @click="showQuestion()">Start</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'ChapterTitle',
  computed: {
    ...mapGetters(['chapterTitle', 'isAdmin'])
  },
  methods: {
    ...mapActions(['showQuestion'])
  }
}
</script>

<style scoped>

</style>
