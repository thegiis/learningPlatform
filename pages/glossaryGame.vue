<template>
  <div class="container" :class="$style.glossaryGameContainer">
    <GlossaryHead :answers="answers" :key="glossaryScore" v-if="!isLastPage" />
    <GlossaryQuestion
      :questionItem="getQuestionItem"
      @answer="handleAnswer"
      @next="handleNext"
      v-if="!isLastPage"
    />
    <GlossarySummary
      :answers="getAnswers"
      :questionList="questions"
      :userAnswers="selectedAns"
      v-if="isLastPage"
      @repeat="playAgain()"
    />
  </div>
</template>

<script>
import GlossaryHead from "@/components/GlossaryGame/GlossaryHead.vue";
import GlossarySummary from "@/components/GlossaryGame/GlossarySummary.vue";
import GlossaryQuestion from "@/components/GlossaryGame/GlossaryQuestion.vue";
import gameData from "@/assets/data/glossary/glossaryGame.json";

export default {
  components: {
    GlossaryHead,
    GlossaryQuestion,
    GlossarySummary,
  },

  data() {
    return {
      answers: [],
      selectedAns: [],
      glossaryScore: 0, // to update score
      currentQuestion: 0,
      totalQuestions: 0,
      questions: gameData["questions"],
    };
  },

  created() {
    this.answers = new Array(this.questions.length).fill(0);
    this.selectedAns = new Array(this.questions.length).fill("");
    this.totalQuestions = this.questions.length;
  },
  mounted() {
    // to ensure the size of browser
    const htmlElement = document.querySelector("html");
    htmlElement.style.overflowX = "auto";
    htmlElement.style.minWidth = "800px";
  },
  beforeDestroy() {
    const htmlElement = document.querySelector("html");
    htmlElement.style.overflowX = "hidden";
    htmlElement.style.minWidth = "300px";
  },

  computed: {
    getAnswers() {
      return this.answers;
    },
    getQuestionItem() {
      return this.questions[this.currentQuestion];
    },
    isLastPage() {
      if (this.currentQuestion === this.totalQuestions) {
        return true;
      }
      return false;
    },
  },

  methods: {
    handleAnswer(obj) {
      this.glossaryScore += 1;
      this.selectedAns[this.currentQuestion] = obj.val;
      if (obj.result) {
        // handle correct
        this.answers[this.currentQuestion] = true;
      } else {
        // handle incorrect
        this.answers[this.currentQuestion] = false;
      }
    },

    handleNext() {
      this.currentQuestion += 1;
    },
    playAgain() {
      this.currentQuestion = 0;
      this.answers = new Array(this.questions.length).fill(0);
      this.selectedAns = new Array(this.questions.length).fill("");
    },
  },
};
</script>

<style module>
.glossaryGameContainer {
  min-width: 800px;
  min-height: 600px;
}
</style>
<style scoped>
html {
  min-width: 800px;
  overflow-x: auto;
}
</style>