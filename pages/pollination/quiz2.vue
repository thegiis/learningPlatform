<template>
  <LessonIndex>
    <div class="wrapper" data-variant="more-padding">
      <div :class="$style.quizContainer">
        <section class="column" :class="$style.bgWhite">
          <DragDropList
            :questionList="quizData"
            :instructionClass="$style.instruction"
            :questionClass="$style.questionClass"
            :dropClasses="[$style.redDrop, $style.blueDrop]"
            :instructions="instructions"
            :answerNums="answerNums"
            questionNumber="5"
            questionHeight="50"
          />
        </section>
      </div>
    </div>
  </LessonIndex>
</template>

<script>
import enData from "@/assets/data/pollination/dragdropquiz/quiz_en.json";
import npData from "@/assets/data/pollination/dragdropquiz/quiz_np.json";
import data from "@/assets/data/pollination/index.json";

import LessonBreadcrumbs from "@/components/lessonComponents/LessonBreadcrumbs.vue";
import DragDropList from "@/components/interactiveActivity/DragDrop/DragDropList.vue";

const msg = {
  en: enData,
  np: npData,
};

export default {
  components: {
    LessonBreadcrumbs,
    DragDropList,
  },
  head() {
    return {
      title: "Drag & Drop",
    };
  },
  data() {
    return {
      bcData: [
        data[this.$i18n.locale]["title"],
        data[this.$i18n.locale]["pageNames"][1],
      ],
      instructions:
        "Please select five plants pollinated by each of these animals and drop them in the corresponding box. Please note that some plants are pollinated by only a specific animal and some plants can be pollinated by multiple animals.",
      answerNums: 5,
    };
  },
  computed: {
    quizData() {
      return this.$i18n.messages[this.$i18n.locale].questions;
    },
    prevLink() {
      return { name: "pollination-page1___" + this.$i18n.locale };
    },
  },
  i18n: {
    messages: msg,
  },
};
</script>

<style module>
.quizContainer {
  display: flex;
  justify-content: center;
  width: 100%;
}
.bgWhite {
  display: flex;
  justify-content: center;
  background-color: white;
  width: 90%;
}
.quizSection {
  padding: 2rem;
  background-color: #f8f9fa;
}
.instruction {
  color: navy;
}
.questionClass {
  display: flex;
  padding: 1rem;
  cursor: pointer;
  min-height: 8vh;
  align-items: center;
}
.redDrop {
  background-color: lightpink !important;
}
.blueDrop {
  background-color: skyblue !important;
}
</style>
