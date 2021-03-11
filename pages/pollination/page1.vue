<template>
  <div class="container is-max-desktop" :class="$style.lesson">
    <LessonBreadcrumbs :data="bcData" />
    <h1 :class="$style.title">{{ $t("title") }}</h1>
    <div :class="$style.imgContainer">
      <img src="@/assets/images/pollination/flower1.png" alt="" />
      <img src="@/assets/images/pollination/flower2.png" alt="" />
    </div>
    <div :class="$style.description">
      <BaseText :textdata="getText('text1')" :highlight="true" />
      <BaseText :textdata="getText('text2')" :highlight="true" />
      <BaseText :textdata="getText('text3')" :highlight="true" />
      <BaseText :textdata="getText('text4')" :highlight="true" />
      <BaseText :textdata="getText('text5')" :highlight="true" />
      <BaseText :textdata="getText('text6')" :highlight="true" />
      <BaseText
        :textdata="getText('text7')"
        :highlight="true"
        :highlightClass="$style.testClass"
      />
    </div>
    <LessonNextButton :navlink="nextLink" />
  </div>
</template>

<script>
import enData from "@/assets/data/pollination/en.json";
import npData from "@/assets/data/pollination/np.json";
import data from "@/assets/data/pollination/index.json";
import Glossary from "@/assets/data/pollination/glossary/glossary.json";

import BaseText from "@/components/baseComponents/BaseText.vue";
import LessonBreadcrumbs from "@/components/baseComponents/LessonBreadcrumbs.vue";
import LessonNextButton from "@/components/baseComponents/LessonNextButton.vue";

const msg = {
  en: enData,
  np: npData,
};

export default {
  components: {
    BaseText,
    LessonBreadcrumbs,
    LessonNextButton,
  },
  data() {
    return {
      bcData: [
        {
          name: data[this.$i18n.locale]["title"],
          link: { name: "pollination___" + this.$i18n.locale },
        },
        {
          name: data[this.$i18n.locale]["pageNames"][0],
          link: { name: "pollination-page1___" + this.$i18n.locale },
        },
      ],
    };
  },
  i18n: {
    messages: msg,
  },
  created() {
    this.$store.dispatch("lesson/setGlossary", Glossary);
  },
  computed: {
    nextLink() {
      return { name: "pollination-quiz___" + this.$i18n.locale };
    },
  },
  methods: {
    getText(id) {
      id = "data." + id;
      return this.$i18n.t(id);
    },
  },
};
</script>

<style module>
.lesson {
  padding: 2rem;
  background-color: #efefef;
  position: relative;
}
.nextButton {
  position: relative;
  left: 90%;
  margin: 0.5rem;
}
.title {
  font-size: 2.25rem;
  text-align: center;
  margin: 1rem;
  color: darkblue;
  text-decoration: underline;
}
.imgContainer {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  height: 300px;
}
.imgContainer img {
  position: relative;
  margin: 0 1rem;
  height: 100%;
}
.description {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 1.2rem;
  line-height: 2rem;
  text-align: center;
}
.testClass {
  color: red;
}
</style>
