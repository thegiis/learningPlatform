<template>
  <div :class="$style.quizSection" class="container is-max-desktop">
    <LessonBreadcrumbs :pages="bcData" />
    <div :class="$style.quizWrapper">
      <section class="column is-11-mobile is-6-desktop" :class="$style.bgWhite">
        <h1 :class="$style.quizTitle">Drag and Drop</h1>
        <draggable
          :disabled="!enabled"
          :list="list"
          class="questionList"
          group="activity"
          @change="checkDrop"
        >
          <div class="card dndItem" v-for="element in list" :key="element.name">
            {{ element.name }}
          </div>
        </draggable>
        <div class="ansDiv">
          <draggable
            :disabled="!enabled"
            :list="redlist"
            class="redList"
            group="activity"
            @change="checkDrop"
          >
            <div
              class="card dndItem"
              v-for="element in redlist"
              :key="element.name"
            >
              {{ element.name }}
            </div>
          </draggable>
          <draggable
            :disabled="!enabled"
            :list="bluelist"
            class="blueList"
            group="activity"
            @change="checkDrop"
          >
            <div
              class="card dndItem"
              v-for="element in bluelist"
              :key="element.name"
            >
              {{ element.name }}
            </div>
          </draggable>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import enData from "@/assets/data/pollination/quiz/quiz_en.json";
import npData from "@/assets/data/pollination/quiz/quiz_np.json";
import data from "@/assets/data/pollination/index.json";
import draggable from "vuedraggable";

import LessonBreadcrumbs from "@/components/baseComponents/LessonBreadcrumbs.vue";

const msg = {
  en: enData,
  np: npData,
};

export default {
  components: {
    LessonBreadcrumbs,
    draggable,
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
      enabled: true,
      list: [
        { name: "red 1", id: 0, drop: "red" },
        { name: "red 2", id: 1, drop: "red" },
        { name: "blue 1", id: 2, drop: "blue" },
        { name: "blue 2", id: 3, drop: "blue" },
      ],
      redlist: [],
      bluelist: [],
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
  methods: {
    checkDrop({ added, removed }) {
      console.log(added, removed);
    },
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
  min-height: 70vh;
}
.bgWhite {
  background-color: white;
}
</style>

<style scoped>
.questionList {
  display: flex;
  padding: 1rem;
  cursor: pointer;
  min-height: 8vh;
  align-items: center;
}
.dndItem {
  margin: 0.25rem 0.5rem;
  padding: 0.5rem;
}
.ansDiv {
  display: flex;
  align-items: center;
  justify-content: center;
}
.redList {
  background-color: lightsalmon;
  min-height: 200px;
  margin: 0.25rem;
  padding: 0.25rem;
  width: 45%;
}
.blueList {
  background-color: lightskyblue;
  min-height: 200px;
  margin: 0.25rem;
  padding: 0.25rem;
  width: 45%;
}
</style>
