<template>
  <div :class="$style.quizSection" class="container is-max-desktop">
    <LessonBreadcrumbs :pages="bcData" />
    <div :class="$style.quizWrapper">
      <section class="column is-11-mobile is-6-desktop" :class="$style.bgWhite">
        <h1 :class="$style.quizTitle">{{ $t("quizTime") }}</h1>
        <QuestionList :questionList="quizData" />
      </section>
      <!-- <LessonPrevButton :navlink="prevLink" /> -->
    </div>
  </div>
</template>

<script>
import enData from "@/assets/data/regulation_of_air_quality/quiz/quiz_en.json";
import npData from "@/assets/data/regulation_of_air_quality/quiz/quiz_np.json";
import data from "@/assets/data/pollination/index.json";

import QuestionList from "@/components/interactiveActivity/QuestionList.vue";
import LessonPrevButton from "@/components/lessonComponents/LessonPrevButton.vue";
import LessonBreadcrumbs from "@/components/lessonComponents/LessonBreadcrumbs.vue";

const msg = {
  en: enData,
  np: npData,
};

export default {
  components: {
    QuestionList,
    LessonBreadcrumbs,
    LessonPrevButton,
  },
  head() {
    return {
      title: "Quiz",
    };
  },
  data() {
    return {
      bcData: [
        data[this.$i18n.locale]["title"],
        data[this.$i18n.locale]["pageNames"][1],
      ],
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
.quizSection {
  padding: 2rem;
  background-color: #f8f9fa;
}
.quizTitle {
  font-size: 2.5rem;
  color: #1e4d63;
  text-align: center;
}
.quizWrapper {
  display: flex;
  justify-content: center;
}
.bgWhite {
  background-color: white;
}
</style>
