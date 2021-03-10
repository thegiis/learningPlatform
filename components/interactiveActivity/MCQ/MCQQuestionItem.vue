<template>
  <div :class="$style.questionDiv">
    <p>{{ question.question }}</p>
    <MCQAnswerList
      :options="question.options"
      :multiChoice="multiChoice"
      :selectedOptions="selectedOptions"
      @select="handleSelect"
      :class="{disabledInput: correctlyAnswered}"
    />
    <button
      class="button is-primary"
      :class="getSubmitClass"
      @click="checkAns"
      :disabled="!isSelected || correctlyAnswered"
    >
      {{$t("submit")}}
    </button>
  </div>
</template>

<script>
import MCQAnswerList from '@/components/interactiveActivity/MCQ/MCQAnswerList.vue'
import { arraysEqual } from '@/utils/utils.js'

export default {
  name: 'MCQQuestionItem',
  components: {
    MCQAnswerList,
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
      selectedOptions: [],
      correctOptions: [],
      multiChoice: false,
      correctlyAnswered: null,
    }
  },
  created() {
    this.correctOptions = this.question.options.reduce(function (
      filtered,
      option
    ) {
      if (option.isCorrect) {
        filtered.push(option.option)
      }
      return filtered
    },
    [])
    if (this.correctOptions.length > 1) {
      this.multiChoice = true
    }
  },
  computed: {
    isSelected() {
      if (this.selectedOptions.length == 0) {
        return false
      }
      return true
    },
    getSubmitClass() {
      if (this.correctlyAnswered == null) {
        return ''
      } else if (this.correctlyAnswered == true) {
        return 'submit-correct-answer'
      } else {
        return 'submit-incorrect-answer'
      }
    },
  },

  methods: {
    checkAns() {
      if (arraysEqual(this.selectedOptions, this.correctOptions)) {
        this.correctlyAnswered = true
      } else {
        this.correctlyAnswered = false
      }
    },
    handleSelect(val) {
      const idx = this.selectedOptions.indexOf(val)
      if (idx !== -1) {
        this.selectedOptions.splice(idx, 1)
      } else {
        if (!this.multiChoice) {
          this.selectedOptions = []
        }
        this.selectedOptions.push(val)
      }
    },
  },
}
</script>

<style module>
.questionDiv {
  position: relative;
  padding: 2rem;
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
  background-color: greenyellow;
}
.submit-incorrect-answer {
  background-color: indianred;
}
.disabledInput{
  pointer-events: none;
}
</style>