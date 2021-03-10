<template>
  <div :class="$style.questionListDiv">
    <div :class="$style.questionContainer">
      <MCQQuestionItem :question="getQuestion" :questionNum="questionNum" />
    </div>
  </div>
</template>

<script>
import MCQQuestionItem from "@/components/interactiveActivity/MCQ/MCQQuestionItem.vue";

export default {
  name: "QuestionList",
  components: {
    MCQQuestionItem,
  },
  props: {
    questionList: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      questions: this.questionList[this.$i18n.locale].questions,
      questionNum: 1,
    };
  },
  computed: {
    getQuestion() {
      return this.questions[this.questionNum - 1];
    },
  },
};
</script>

<style module>
.questionListDiv {
  position: relative;
  padding: 2rem;
  width: 100%;
  background-color: white;
  margin: 0.5rem;
  min-height: 80vh;
}
</style>
