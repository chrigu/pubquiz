<template>
  <div class="question">
    <h1>{{question.text}}</h1>
    <div v-for="(answer, index) in answers" :key="answer">
      <input type="radio" :id="`answer-${1}`" name="drone" :value="index">
      <label :id="`answer-${1}`">{{answer}}</label>
    </div>
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
