<template>
  <div>
    <GlossaryScore :class="$style.scoreSection" :answers="answers" />
    <div :class="$style.questionIndicator">
      <p :class="$style.questionIndicatorText">QUESTION</p>
      <p :class="$style.questionLeft">{{ current + 1 }} / {{ total }}</p>
    </div>
  </div>
</template>

<script>
import GlossaryScore from "@/components/GlossaryGame/GlossaryScore.vue";
export default {
  components: {
    GlossaryScore,
  },
  props: {
    answers: {
      type: Array,
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
  computed: {
    remainingQuestions() {
      return this.answers.filter((x) => x == 0).length;
    },
  },
};
</script>

<style module>
.scoreSection {
  width: 85%;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
}

.questionIndicator {
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.questionIndicatorText {
  color: gray;
  font-size: 1rem;
  margin: 0.5rem;
}
.questionLeft {
  color: black;
  margin: 0.5rem;
  font-weight: bold;
  font-size: 1.25rem;
}
</style>
<style scoped>
p {
  margin: 0;
}
</style>
