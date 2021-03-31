<template>
  <div class="question">
    <h1>{{question.text}}</h1>
    <p>answer</p>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Solution',
  computed: {
    ...mapGetters(['question', 'isAdmin',])
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
