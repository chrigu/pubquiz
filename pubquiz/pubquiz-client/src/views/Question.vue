<template>
  <div class="question">
    <h1>{{question}}</h1>
    <ul>
      <li v-for="answer in answers" :key="answer">{{answer}}</li>
    </ul>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Question',
  computed: {
    ...mapGetters(['question', 'isAdmin', 'answers'])
  },
  methods: {
    ...mapActions(['nextQuestion'])
  }
}
</script>

<style scoped>

</style>
