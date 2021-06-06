<template>
  <div :class="$style.scoreSection">
    <p :class="$style.scoreIndicator">
      <span :class="$style.scoreIndicatorText">Score</span>
      <span :class="$style.currentScore">{{ scoreDisplay }}</span>
    </p>
    <div :class="$style.progressDotsContainer">
      <span
        v-for="idx in totalQuestions"
        :key="idx"
        :class="$style.progressDot"
      >
        <span :class="getClass(idx - 1)"></span>
      </span>
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
  },
  data() {
    return {
      totalQuestions: this.answers.length,
    };
  },
  computed: {
    currentScore() {
      return this.answers.filter((x) => x == true).length;
    },
    scoreDisplay() {
      if (this.currentScore !== 0) {
        return this.currentScore + "/" + this.totalQuestions;
      }
      return "-";
    },
  },
  methods: {
    getClass(idx) {
      let retClass = [];
      if (this.answers[idx] === false) {
        retClass.push(this.$style.incorrectDot);
      }
      if (this.answers[idx] === true) {
        retClass.push(this.$style.correctDot);
      }
      if ((idx + 1) % 5 !== 0) {
        retClass.push(this.$style.progressDotCommon);
      } else {
        retClass.push(this.$style.progressDotCommon);
      }
      return retClass;
    },
  },
};
</script>

<style module>
.scoreSection {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
}
.scoreIndicator {
  color: gray;
  font-size: 1rem;
  margin: 0.5rem;
}
.currentScore {
  color: black;
  margin: 0.5rem;
  font-weight: bold;
  font-size: 1.25rem;
}
.progressDotsContainer {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-around;
}
.progressDot {
  position: relative;
  display: inline-block;
}
.progressDotCommon {
  display: inline-block;
  position: relative;
  width: 0.5rem;
  height: 0.5rem;
  background-color: #888;
  border-radius: 50%;
  margin: 0.25rem;
}
.correctDot {
  background-color: lime;
}
.incorrectDot {
  background-color: red;
}
.progressDotSpecial {
  display: inline-block;
  position: relative;
  width: 1.5rem;
  height: 1.5rem;
  background-color: #888;
  border-radius: 50%;
  margin: 0.25rem;
}
</style>