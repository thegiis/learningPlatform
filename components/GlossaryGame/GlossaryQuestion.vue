<template>
  <div class="dragdropGameWrapper">
    <h1 class="dragdropInstruction" :class="instruction.class">
      {{ instruction.text }}
    </h1>

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
          v-for="element in dropAns"
          :key="element.name"
        >
          <p>{{ element.name }}</p>
        </div>
      </draggable>
    </div>

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
    <div class="nextBtn" ref="nextBtn" @click="goNext()">
      <i class="fas fa-arrow-right centeredArrow"></i>
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
      positions: [1, 2, 3],
      dropAns: [],
      answers: [],
      isCorrect: false,
      hasAnswered: null,
      hint: false,
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
            this.$emit("answer", { result: true, val: this.dropAns[0].name });
          } else {
            incorrectIcon.style.display = "flex";
            this.$emit("answer", { result: false, val: this.dropAns[0].name });
          }
          this.$refs["nextBtn"].style.display = "block";
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
      return "circle-shape";
    },
  },
};
</script>

<style scoped>
.dragdropGameWrapper {
  display: flex;
  padding: 0.5rem;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 500px;
  position: relative;
}
.dragdropInstruction {
  font-size: 2rem;
  margin: 0.5rem 0;
  color: #1e4d63;
  text-align: center;
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
.onDragClass {
  width: 100%;
  height: 100%;
  opacity: 0.3;
}
.onDragClass > p {
  display: none;
}
.onDragging {
  color: red;
}
.onDragging > p {
  display: block;
}
.disabledInput {
  pointer-events: none;
}
.questionContainer {
  position: relative;
}
.questionStructure {
  background-color: lightgray;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
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
}
.incorrectCheckIcon {
  background-color: red;
}
.circle-shape {
  width: 10rem;
  height: 10rem;
  border-radius: 50%;
}
.selectedOption {
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: lightskyblue;
}
.nextBtn {
  display: none;
  position: absolute;
  cursor: pointer;
  z-index: 50;
  right: 0%;
  top: 50%;
  transform: translateY(-50%);
  border-radius: 50%;
  height: 3rem;
  width: 3rem;
  background-color: navy;
  color: white;
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
  right: 70%;
  left: auto;
  top: 40%;
}
.position-2 {
  position: absolute;
  right: 55%;
  left: auto;
  top: 65%;
}
.position-3 {
  position: absolute;
  left: 65%;
  top: 30%;
}
</style>
