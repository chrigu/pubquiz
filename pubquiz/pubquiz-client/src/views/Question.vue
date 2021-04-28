<template>
  <div class="question">
    <h1>{{question.text}}</h1>
    <p>{{timer}}</p>
    <label v-for="(answer, index) in answers" :key="answer" class="block">
      <t-radio class="answer"
             :id="`answer-${1}`"
             name="options"
             :value="index"
             :disabled="answered"
             :class="{'answer--selected': answer}"
             @click="answerQuestion(index)" />
      <span :id="`answer-${1}`">{{answer}}</span>
    </label>
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
