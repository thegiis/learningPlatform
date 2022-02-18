<template>
  <div :class="$style.questionListDiv">
    <h5 class="lesson" v-if="!completed">
      Q.
      <span :value="questionNum - 1" :max="totalQuestions"></span>
      <span>{{ questionNum - 1 + " / " + totalQuestions }}</span>
    </h5>
    <h5 class="title">DRAG AND DROP</h5>
    <div :class="$style.questionContainer" v-if="!completed">
      <DragDrop
        :instruction="instruction"
        :instructions="instructions"
        :itemList="questions"
        :dropList="dropList"
        @answer="handleAnswer"
        @goNext="handleNext"
        :key="componentKey"
        :answerNums="answerNums"
      />
    </div>
    <div :class="$style.completedMessage" v-else>
      <p class="title is-1">Quiz Complete</p>
    </div>
  </div>
</template>

<script>
import DragDrop from "@/components/interactiveActivity/DragDrop/DragDrop.vue";

export default {
  name: "DragDropList",
  components: {
    DragDrop,
  },
  props: {
    questionList: {
      required: true,
      type: Array,
    },
    instructionClass: {
      default: null,
      required: false,
    },
    questionClass: {
      default: null,
      required: false,
    },
    dropClasses: {
      type: Array,
      required: false,
    },
    instructions: {
      type: String,
      required: false,
    },
    answerNums: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      componentKey: 0, //to rerender drag and drop component
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
    instruction() {
      return {
        text: this.questionList[this.questionNum - 1]["instruction"],
        class: this.instructionClass,
      };
    },
    questions() {
      return {
        list: this.questionList[this.questionNum - 1]["items"],
        class: this.questionClass,
      };
    },
    dropList() {
      let drops = this.questionList[this.questionNum - 1]["dropList"];
      const arrLen = drops.length;
      let classes = this.dropClasses;
      if (classes === undefined) {
        classes = [];
      }
      if (classes.length !== arrLen) {
        for (let i = 0; i < arrLen; i++) {
          classes.push(null);
        }
      }
      let result = drops.map(function (el, idx) {
        return { ...el, ...{ class: classes[idx] } };
      });
      return result;
    },
  },
  created() {
    // console.log(this.dropList);
  },
  methods: {
    handleAnswer(answer) {
      this.answers.push(answer);
    },
    handleNext(isNext) {
      if (isNext) {
        if (this.questionNum < this.totalQuestions) {
          this.questionNum += 1;
          this.componentKey += 1;
        } else {
          this.completed = true;
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
  color: black;
}
.completedMessage {
  position: relative;
}
</style>
