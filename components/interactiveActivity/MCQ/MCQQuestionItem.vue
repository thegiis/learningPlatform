<template>
  <div :class="$style.questionDiv">
    <p>{{ question.question }}</p>
    <MCQAnswerList
      :options="question.options"
      :multiChoice="multiChoice"
      :selectedOptions="selectedOptions"
      :correctOptions="correctOptions"
      @select="handleSelect"
      :answered="isAnswered"
      :class="{ disabledInput: isAnswered }"
    />
    <button
      class="button is-primary"
      :class="getSubmitClass"
      @click="checkAns"
      :disabled="!isSelected"
    >
      {{ submitText }}
    </button>
    <HintInterface :display="showHint" hintText="this is hint" @close="closeHint()"/>
    <HintIcon @open="openHint()"/>
  </div>
</template>

<script>
import MCQAnswerList from "@/components/interactiveActivity/MCQ/MCQAnswerList.vue";
import HintInterface from "@/components/interactiveActivity/HintInterface.vue";
import HintIcon from "@/components/interactiveActivity/HintIcon.vue";
import { arraysEqual } from "@/utils/utils.js";

export default {
  name: "MCQQuestionItem",
  components: {
    MCQAnswerList,
    HintInterface,
    HintIcon
  },
  props: {
    question: {
      required: true,
      type: Object,
    },
    questionNum: {
      required: true,
      type: Number,
    },
  },
  data() {
    return {
      submitText: this.$i18n.t("submit"),
      selectedOptions: [],
      correctOptions: [],
      multiChoice: false,
      correctlyAnswered: null,
      hint: true,
    };
  },
  created() {
    this.correctOptions = this.question.options.reduce(function (
      filtered,
      option
    ) {
      if (option.isCorrect) {
        filtered.push(option.option);
      }
      return filtered;
    },
    []);
    if (this.correctOptions.length > 1) {
      this.multiChoice = true;
    }
  },
  computed: {
    showHint(){
      return this.hint
    },
    isAnswered(){
      return !(this.correctlyAnswered === null)
    },
    isSelected() {
      if (this.selectedOptions.length == 0) {
        return false;
      }
      return true;
    },
    getSubmitClass() {
      if (this.correctlyAnswered == null) {
        return "";
      } else if (this.correctlyAnswered == true) {
        return "submit-correct-answer";
      } else {
        return "submit-incorrect-answer";
      }
    },
  },

  methods: {
    checkAns() {
      if (this.correctlyAnswered === null) {
        if (arraysEqual(this.selectedOptions, this.correctOptions)) {
          this.submitText = this.$i18n.t("next");
          this.correctlyAnswered = true;
          this.$emit("answer", true);
        } else {
          this.submitText = this.$i18n.t("tryagain");
          this.correctlyAnswered = false;
          this.$emit("answer", false);
        }
      } else if(this.correctlyAnswered === true) {
        this.$emit("goNext", true);
        this.selectedOptions = [];
        this.correctlyAnswered = null;
        this.submitText = this.$i18n.t("submit");
      } else {
        this.selectedOptions = [];
        this.correctlyAnswered = null;
        this.submitText = this.$i18n.t("submit");
      }
    },
    handleSelect(val) {
      const idx = this.selectedOptions.indexOf(val);
      if (idx !== -1) {
        this.selectedOptions.splice(idx, 1);
      } else {
        if (!this.multiChoice) {
          this.selectedOptions = [];
        }
        this.selectedOptions.push(val);
      }
    },
    openHint(){
      this.hint = true
    },
    closeHint(){
      this.hint = false
    }
  },
};
</script>

<style module>
.questionDiv {
  position: relative;
  width: 100%;
  margin: 0.5rem;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
}
</style>
<style scoped>
.submit-correct-answer {
  background-color: #B8D34F;
}
.submit-correct-answer:hover {
  background-color: #84C251;
}
.submit-incorrect-answer {
  background-color: indianred;
}
.submit-incorrect-answer:hover {
  background-color: #FF918E;
}
.disabledInput {
  pointer-events: none;
}
</style>