<template>
  <div :class="$style.questionListDiv">
    <p>{{'question ' + questionNum + ' out of ' + questionCount}}</p>
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
      type: Array,
    },
  },
  data() {
    return {
      questionNum: 1,
      answers: [],
      questionCount: this.questionList.length
    };
  },
  computed: {
    getQuestion() {
      return this.questionList[this.questionNum - 1];
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
