<template>
  <div class="chaptertitle">
    <h1>{{chapterTitle}}</h1>
    <!--button type="button" @click="nextQuestion()">Start</button-->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'ChapterTitle',
  computed: {
    ...mapGetters(['chapterTitle'])
  }
}
</script>

<style scoped>

</style>
