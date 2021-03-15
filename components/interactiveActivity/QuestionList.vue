<template>
  <div :class="$style.questionListDiv">
    <div :class="$style.progressWrapper" v-if="!completed">
      <progress
        class="progress is-success"
        :class="$style.progressBar"
        :value="questionNum - 1"
        :max="totalQuestions"
      ></progress>
      <span :class="$style.progressText">{{
        questionNum - 1 + "/" + totalQuestions
      }}</span>
    </div>
    <div :class="$style.questionContainer" v-if="!completed">
      <MCQQuestionItem
        :question="getQuestion"
        :questionNum="questionNum"
        @answer="handleAnswer"
        @goNext="handleNext"
      />
    </div>
    <div :class="$style.completedMessage" v-else>
      <p class="title is-1">Quiz Complete</p>
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
      completed: false,
      totalQuestions: this.questionList.length,
    };
  },
  computed: {
    getQuestion() {
      return this.questionList[this.questionNum - 1];
    },
  },
  methods: {
    handleAnswer(answer) {
      this.answers.push(answer);
    },
    handleNext(isNext) {
      if (isNext) {
        if (this.questionNum < this.totalQuestions) {
          this.questionNum += 1;
        } else {
          this.completed = true
        }
      }
    },
  },
};
</script>

<style module>
.questionListDiv {
  position: relative;
  padding: 2rem 1rem;
  width: 100%;
  min-height: 80vh;
}
.progressWrapper {
  position: relative;
}
.progressBar {
  border-radius: 0;
  height: 2rem;
}
.progressText {
  position: absolute;
  z-index: 10;
  top: 50%;
  left: 1rem;
  transform: translateY(-50%);
  color: white;
}
.completedMessage{
  position: relative;
}
</style>
