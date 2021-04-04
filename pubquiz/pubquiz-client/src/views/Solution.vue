<template>
  <div class="question">
    <h1>{{question.text}}</h1>
    <ul>
      <li v-for="answer in answers"
          :key="answer.text"
          :class="{'correct': answer.correct}">
        {{answer.text}}
      </li>
    </ul>
    <div v-if="isAdmin">
      <button @click="nextQuestion">Next Question</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Solution',
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
