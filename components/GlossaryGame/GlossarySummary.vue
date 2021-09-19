<template>
  <div class="summaryContainer">
    <div :class="$style.topSection">
      <p :class="$style.scoreIndicator">
        <span :class="$style.scoreIndicatorText">SCORE</span>
        <span :class="$style.currentScore">{{ scoreDisplay }}</span>
      </p>
      <div :class="$style.dotsContainer">
        <div
          v-for="(ans, idx) in answers"
          :key="idx"
          :class="$style.progressDot"
        >
          <div :class="getClass(ans, idx)" data-idx="idx" @click="jumpTo(idx)">
            <div :class="$style.dotIconContainer">
              <i class="fas fa-check" v-if="ans"></i>
              <i class="fas fa-times" v-else></i>
            </div>
          </div>
        </div>
      </div>

      <p :class="$style.questionIdx">
        <span :class="$style.questionIdxText">QUESTION</span>
        <span :class="$style.currentIdx">{{ questionIdx + 1 }}</span>
      </p>
    </div>
    <div :class="$style.summarySection">
      <h4 class="quesInstruction lesson" :class="instruction.class">
        {{ instruction.text }}
      </h4>

      <div class="questionContainer">
        <div class="questionStructure" :class="getShape(question.shape)">
          <p>
            {{ question.text }}
          </p>
        </div>
      </div>
      <div class="optionContainer">
        <div v-for="option in options" :key="option.name">
          <div
            class="optionItem"
            :class="{
              correctOption: option.isCorrect,
              incorrectOption: checkUserAns(option.isCorrect, option.name),
            }"
          >
            <p>{{ option.name }}</p>
            <div class="correctCheckIcon" v-if="option.isCorrect">
              <i class="fas fa-check"></i>
            </div>
            <div
              class="incorrectCheckIcon"
              v-if="checkUserAns(option.isCorrect, option.name)"
            >
              <i class="fas fa-times"></i>
            </div>
          </div>
        </div>
      </div>
      <div class="wrapper split-pair width-100">
        <div
          :class="$style.prevBtn"
          class="button is-primary is-uppercase"
          ref="prevButton"
          @click="goPrev()"
        >
          <span>PREVIOUS</span>
          <span class="leftArrow">
            <i class="far fa-arrow-alt-circle-left"></i>
          </span>
        </div>
        <div
          :class="$style.nextBtn"
          class="button is-primary is-uppercase"
          ref="nextButton"
          @click="goNext()"
        >
          <span>NEXT</span>
          <span class="rightArrow">
            <i class="far fa-arrow-alt-circle-right"></i>
          </span>
        </div>
      </div>

      <div :class="$style.playAgain" @click="playAgain()">
        <p>PLAY AGAIN</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    answers: {
      type: Array,
      required: true,
    },
    questionList: {
      type: Array,
      required: true,
    },
    userAnswers: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      totalQuestions: this.answers.length,
      questionIdx: 0,
      correctAnswers: this.questionList.map(
        (x) => x.options.filter((y) => y.isCorrect)[0].name
      ),
    };
  },
  created() {
    // console.log(this.correctAnswers);
  },
  mounted() {
    // console.log(this.correctAnswers);
    // console.log(this.userAnswers);
    console.log(this.$refs);
    this.checkNavigation();
  },
  computed: {
    currentScore() {
      return this.answers.filter((x) => x == true).length;
    },
    scoreDisplay() {
      return this.currentScore + "/" + this.totalQuestions;
    },
    instruction() {
      return this.questionList[this.questionIdx]["instruction"];
    },
    question() {
      return this.questionList[this.questionIdx]["question"];
    },
    options() {
      return this.questionList[this.questionIdx]["options"];
    },
  },
  methods: {
    getClass(val, idx) {
      let retClass = [];
      retClass.push(this.$style.ansDot);
      if (val == false) {
        retClass.push(this.$style.incorrectDot);
      } else {
        retClass.push(this.$style.correctDot);
      }
      if (idx == this.questionIdx) {
        retClass.push(this.$style.currentAns);
      }
      return retClass;
    },
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
    checkUserAns(isCorrect, val) {
      // return false if answer is correct or answered value is correct
      const userAns = this.userAnswers[this.questionIdx];
      const correctAns = this.correctAnswers[this.questionIdx];
      if (isCorrect) {
        return false;
      } else if (val == userAns) {
        return true;
      }
      return false;
    },
    jumpTo(idx) {
      this.questionIdx = idx;
      this.checkNavigation();
    },
    goNext() {
      this.questionIdx += 1;
      this.checkNavigation();
    },
    goPrev() {
      this.questionIdx -= 1;
      this.checkNavigation();
    },
    checkNavigation() {
      let nextBtn = this.$refs["nextButton"];
      let prevBtn = this.$refs["prevButton"];
      if (this.questionIdx == 0) {
        prevBtn.style.display = "none";
      } else {
        prevBtn.style.display = "inline-flex";
      }
      if (this.questionIdx == this.totalQuestions - 1) {
        nextBtn.style.display = "none";
      } else {
        nextBtn.style.display = "inline-flex";
      }
    },
    playAgain() {
      this.$emit("repeat", true);
    },
  },
};
</script>

<style module>
.topSection {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex-direction: row;
  padding: 0.5rem;
}
.scoreIndicator,
.questionIdx {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: gray;
  font-size: 1rem;
  margin: 0.5rem;
}
.currentScore,
.currentIdx {
  color: black;
  margin: 0.5rem;
  font-weight: bold;
  font-size: 1.25rem;
}
.dotsContainer {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-around;
}
.progressDot {
  position: relative;
  cursor: pointer;
  display: inline-block;
}
.ansDot {
  border: 2px solid var(--green-secondary);
  display: inline-block;
  position: relative;
  width: 1.5rem;
  height: 1.5rem;
  background-color: #888;
  border-radius: 50%;
  margin: 0.25rem;
  color: white;
}
.currentAns {
  width: 2rem;
  height: 2rem;
}
.dotIconContainer {
  display: flex;
  width: 100%;
  height: 100%;
  position: relative;
  align-items: center;
  justify-content: center;
}
.correctDot {
  background-color: white;
}
.incorrectDot {
  background-color: white;
  border-color: red;
}
.summarySection {
  display: flex;
  align-items: center;
  flex-direction: column;
}

.nextBtn,
.prevBtn {
  color: var(--green-secondary);
}
.nextBtn:hover,
.prevBtn:hover {
  opacity: 0.8;
  transform: translateY(-50%) scale(1.1);
}

.centeredArrow {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
}
.playAgain {
  position: absolute;
  cursor: pointer;
  bottom: -3em;
  border-radius: 1rem;
  padding: 0.5rem 1.5rem;
  border: 2px solid var(--green-secondary);
  font-size: 1.5rem;
  transition: 0.3s;
}
.playAgain:hover {
  background-color: lightsteelblue;
  color: white;
}
</style>

<style scoped>
.quesInstruction {
  color: var(--green-secondary);
}
.questionStructure {
  position: relative;
  background-color: lightgray;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 10px;
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
  margin: 1.2em 0 0 0;
}
.optionContainer {
  position: relative;
  margin: 1rem;
}
.optionItem {
  position: relative;
  padding: 0.25rem 1rem;
  border: 1px solid gray;
  border-radius: 1rem;
  margin: 0.5rem;
  text-align: center;
}
.correctOption {
  background-color: lightsteelblue;
  border: 2px solid darkgreen;
}
.incorrectOption {
  background-color: lightpink;
  border: 2px solid red;
}
.correctCheckIcon,
.incorrectCheckIcon {
  position: absolute;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 0%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  width: 1.5rem;
  height: 1.5rem;
  background-color: green;
  color: white;
}
.incorrectCheckIcon {
  background-color: red;
}
.summaryContainer {
  height: 500px;
  width: 566px;
  border: 1px solid gray;
  border-radius: 10px;
  background-color: white;
  position: relative;
}
.fa-times {
  color: red;
}
p {
  font-weight: bold;
}
.width-100 {
  width: 100%;
  position: absolute;
  bottom: 1em;
}
.leftArrow,
.rightArrow {
  padding-left: 0.5rem;
  padding-top: 0.1rem;
}
</style>
