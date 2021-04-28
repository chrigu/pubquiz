<template>
  <div class="question">
    <h1>{{question.text}}</h1>
    <ul>
      <li v-for="answer in answers"
          :key="answer.text"
          :class="{'bg-green-100': answer.correct}">
        {{answer.text}}
      </li>
    </ul>
    <div v-if="isAdmin">
      <button class="button" @click="nextQuestion">Next Question</button>
    </div>
    <Leaderborad />
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Leaderborad from '@/components/Leaderborad'

export default {
  name: 'Solution',
  components: { Leaderborad },
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
