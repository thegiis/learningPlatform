<template>
  <div class="dragdropGameWrapper">
    <div class="instruction">
      <h4 class="lesson" :class="instruction.class">
        {{ instruction.text }}
      </h4>

      <div class="questionContainer">
        <div class="correctCheckIcon" ref="correctIcon">
          <i class="fas fa-check"></i>
        </div>
        <div class="incorrectCheckIcon" ref="incorrectIcon">
          <i class="fas fa-times"></i>
        </div>
        <draggable
          :disabled="!enabled"
          :list="dropAns"
          class="questionStructure"
          :class="getShape(question.shape)"
          data-type="dropBox"
          revertOnSpill="true,"
          group="activity"
          ref="questionList"
          @change="checkDrop"
        >
          <div>
            {{ question.text }}
          </div>
          <div
            class="selectedOption"
            :class="questionOutineClass"
            v-for="element in dropAns"
            :key="element.name"
          >
            <p
              v-if="checkFillQuestion(question.shape)"
              v-html="fillBlanks(question.text, element.name)"
            ></p>
            <p v-else>{{ element.name }}</p>
          </div>
        </draggable>
      </div>

      <div>
        <draggable
          :disabled="!enabled"
          v-for="(option, idx) in options"
          revertOnSpill="true,"
          data-type="option"
          :key="idx"
          :list="answers[idx]"
          :ref="option.name"
          class="optionContainer"
          chosen-class="onDragClass"
          drag-class="onDragging"
          :class="getPosition(idx, option.class)"
          group="activity"
          @end="checkDrop"
        >
          <div
            class="optionText"
            v-for="element in answers[idx]"
            :key="element.name"
          >
            <p>{{ element.name }}</p>
          </div>
        </draggable>
      </div>
      <div
        class="nextBtn button is-uppercase is-primary"
        ref="nextBtn"
        @click="goNext()"
      >
        <span>NEXT</span>
        <span class="rightArrow">
          <i class="far fa-arrow-alt-circle-right"></i>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";
import { shuffleArray } from "@/utils/utils.js";

export default {
  components: {
    draggable,
  },
  props: {
    questionItem: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      submitText: this.$i18n.t("submit"),
      enabled: true,
      positions: [1, 2, 3, 4],
      dropAns: [],
      answers: [],
      isCorrect: false,
      hasAnswered: null,
      hint: false,
      questionOutineClass: "asdasd",
    };
  },
  watch: {
    questionItem: function (val) {
      shuffleArray(this.positions);
      this.answers = this.options.map((item) => [item]);
    },
  },
  created() {
    shuffleArray(this.positions);
    this.answers = this.options.map((item) => [item]);
  },
  computed: {
    instruction() {
      return this.questionItem["instruction"];
    },
    question() {
      return this.questionItem["question"];
    },
    options() {
      return this.questionItem["options"];
    },
  },
  methods: {
    resetAnswers() {
      this.answers = this.options.map((item) => [item]);
    },
    checkDrop(evt) {
      let correctIcon = this.$refs["correctIcon"];
      let incorrectIcon = this.$refs["incorrectIcon"];
      let nextBtn = this.$refs["nextBtn"];

      if (evt.to !== undefined && evt.from !== undefined) {
        if (evt.from.dataset.type === evt.to.dataset.type) {
          this.resetAnswers();
        } else {
          this.enabled = false;
          nextBtn.style.display = "block";
          if (this.dropAns[0].isCorrect) {
            correctIcon.style.display = "flex";
            this.questionOutineClass = "correct-ques-answer";
            this.$emit("answer", { result: true, val: this.dropAns[0].name });
          } else {
            incorrectIcon.style.display = "flex";
            this.questionOutineClass = "incorrect-ques-answer";
            this.$emit("answer", { result: false, val: this.dropAns[0].name });
          }
          this.$refs["nextBtn"].style.display = "inline-flex";
        }
      }
    },

    goNext() {
      let correctIcon = this.$refs["correctIcon"];
      let incorrectIcon = this.$refs["incorrectIcon"];
      let nextBtn = this.$refs["nextBtn"];

      incorrectIcon.style.display = "none";
      correctIcon.style.display = "none";
      nextBtn.style.display = "none";

      this.enabled = true;
      this.dropAns = [];

      this.resetAnswers();
      this.$emit("next", true);
    },

    getPosition(idx, optClass) {
      const num = this.positions[idx];
      return "position-" + num;
    },

    correctlyDropped() {},
    getShape(shape) {
      switch (shape) {
        case "fill_blank":
          return "fill-blank-shape";
          break;
        case "circle":
          return "circle-shape";
          break;
        default:
          return "circle-shape";
      }
    },
    checkFillQuestion(shape) {
      switch (shape) {
        case "fill_blank":
          return true;
          break;
        case "circle":
          return false;
          break;
        default:
          return false;
      }
    },
    fillBlanks(question, option) {
      const optHtml =
        '<span style="border-bottom: 1px solid black;">' + option + "</span>";
      return question.replace("_____", optHtml);
    },
  },
};
</script>

<style scoped>
.dragdropGameWrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 500px;
  width: 566px;
  position: relative;
  border: 1px solid gray;
  border-radius: 10px;
  background-color: white;
}
.dragdropInstruction {
  font-size: 2rem;
  margin: 0.5rem 0;
  color: #1e4d63;
  text-align: left;
}
.optionContainer {
  position: relative;
  width: 7rem;
  height: 7rem;
  border-radius: 50%;
  overflow: hidden;
}
.optionText {
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: lightseagreen;
  display: flex;
  align-items: center;
  border-radius: 50%;
  justify-content: center;
  color: white;
  cursor: pointer;
}
.optionText p {
  text-align: center;
  width: 100%;
}
.onDragClass {
  width: 100%;
  height: 100%;
  opacity: 0.3;
  border-radius: 0;
}
.onDragClass > p {
  display: none;
}
.onDragging {
  color: yellow;
  border-radius: 50%;
}
.onDragging > p {
  display: block;
}
.disabledInput {
  pointer-events: none;
}
.questionContainer {
  position: relative;
  margin: 1.2em 0;
}
.questionStructure {
  background-color: lightgray;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 10px;
}
.correctCheckIcon,
.incorrectCheckIcon {
  display: none;
  position: absolute;
  justify-content: center;
  align-items: center;
  top: 0%;
  right: 0%;
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  background-color: green;
  color: white;
  z-index: 100;
}
.incorrectCheckIcon {
  background-color: red;
}
.circle-shape {
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
}
.fill-blank-shape {
  width: 500px;
  height: auto;
  padding: 30px 20px;
}
.selectedOption {
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 30px 20px;
}
.nextBtn {
  color: var(--green-secondary);
  top: 200px;
  left: 205px;
  display: none;
}
.centeredArrow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
}
.position-1 {
  position: absolute;
  right: 5%;
  left: auto;
  top: 50%;
}
.position-2 {
  position: absolute;
  right: 51.75%;
  left: auto;
  top: 50%;
}
.position-3 {
  position: absolute;
  left: 5%;
  top: 50%;
}
.position-4 {
  position: absolute;
  left: 51.75%;
  top: 50%;
}
.correct-ques-answer {
  background-color: lightgreen;
}
.incorrect-ques-answer {
  background-color: lightpink;
}
.instruction {
  width: 100%;
  padding: 2em;
}
.lesson {
  color: var(--green-secondary);
}
.rightArrow {
  padding-left: 0.5rem;
  padding-top: 0.1rem;
}
p {
  font-weight: bold;
}
</style>
