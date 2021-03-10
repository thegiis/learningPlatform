<template>
  <div :class="$style.quizSection">
    <section class="container is-max-desktop">
      <h1 :class="$style.quizTitle">{{$t("quizTime")}}</h1>
      <QuestionList :questionList="quizData" />
    </section>
  </div>
</template>

<script>
import enData from '@/assets/data/pollination/quiz/quiz_en.json'
import npData from '@/assets/data/pollination/quiz/quiz_np.json'
import QuestionList from '@/components/interactiveActivity/QuestionList.vue'

const msg = {
  en: enData,
  np: npData,
};

export default {
  components: {
    QuestionList,
  },
  head() {
    return {
      title: 'Quiz',
    }
  },
  computed:{
      quizData() {
          return this.$i18n.messages[this.$i18n.locale].questions
      }
  },
  i18n: {
    messages: msg,
  },
}
</script>

<style module>
.quizSection {
  padding-top: 2rem;
  padding-bottom: 5rem;
  background-color: #f8f9fa;
}
.quizSection > section {
  padding: 2rem;
}
.quizTitle {
  font-size: 2.5rem;
  color: #1e4d63;
  text-align: center;
}
</style>
