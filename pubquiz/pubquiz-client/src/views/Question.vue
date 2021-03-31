<template>
  <div class="question">
    <h1>{{question.text}}</h1>
    <p>{{timer}}</p>
    <div v-for="(answer, index) in answers" :key="answer">
      <input type="radio"
             class="answer"
             :id="`answer-${1}`"
             name="drone"
             :value="index"
             :disabled="answered"
             :class="{'answer--selected': answer}"
             @click="answerQuestion(index)">
      <label :id="`answer-${1}`">{{answer}}</label>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Question',
  computed: {
    ...mapGetters(['question', 'isAdmin', 'answers', 'timer'])
  },
  methods: {
    ...mapActions(['answer']),
    answerQuestion: function (index) {
      if (this.answered) {
        return
      }

      this.answer(index)
      this.answered = true
    }
  },
  data: function () {
    return {
      answered: false
    }
  }
}
</script>

<style scoped>

</style>
