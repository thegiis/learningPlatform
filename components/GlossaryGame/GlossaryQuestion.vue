<template>
  <div class="dragdropGameWrapper">
    <div class="instruction">
      <h1 class="lesson">Q. {{ current + 1 }} / {{ total }}</h1>
      <h3 class="lesson">{{ question.text }}</h3>
      <div
        v-for="(option, idx) in options"
        :key="idx"
        :class="getPosition(idx, option.class)"
      >
        <label
          class="radio-container"
          v-for="element in answers[idx]"
          :key="element.name"
        >
          {{ element.name }}
          <input
            type="radio"
            :id="idx"
            name="answer"
            :value="element.name"
            @click="radioClicked"
          />
          <span class="checkmark"></span>
        </label>
      </div>
      <div
        class="nextBtn button is-uppercase is-primary"
        ref="nextBtn"
        @click="goNext()"
      >
        <span class="color-primary">SUBMIT</span>
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
    current: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
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
      currentSelection: {},
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
    console.dir(this.options);
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
    radioClicked(evt) {
      this.$refs["nextBtn"].style.display = "inline-flex";
      this.currentSelection.id = evt.target.id;
      this.currentSelection.name = evt.target.value;
    },
    checkDrop() {
      if (this.options[this.currentSelection.id].isCorrect) {
        this.$emit("answer", { result: true, val: this.currentSelection.name });
      } else {
        this.$emit("answer", {
          result: false,
          val: this.currentSelection.name,
        });
      }
    },

    goNext() {
      this.checkDrop();
      this.enabled = true;
      this.dropAns = [];

      this.resetAnswers();
      this.$emit("next", true);
      this.$refs["nextBtn"].style.display = "none";
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
  position: absolute;
  bottom: 5%;
  left: 42.504%;
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
  left: 5%;
  top: 50%;
}
.position-2 {
  position: absolute;
  left: 5%;
  top: 57.5%;
}
.position-3 {
  position: absolute;
  left: 5%;
  top: 65%;
}
.position-4 {
  position: absolute;
  left: 5%;
  top: 72.5%;
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
.rightArrow {
  padding-left: 0.5rem;
  padding-top: 0.1rem;
}
p {
  font-weight: bold;
}
h3.lesson {
  padding-top: 25px;
}
</style>
