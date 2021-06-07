<template>
  <div class="container is-max-desktop">
    <LessonBreadcrumbs />
    <h2 :class="$style.title2">{{ getText("p2text2") }}</h2>
    <div :class="$style.description">
      <BaseText :textdata="getText('p2text3')" :highlight="true" />
      <BaseText :textdata="getText('p2text4')" :highlight="true" />
      <BaseText :textdata="getText('p2text5')" :highlight="true" />
      <BaseText :textdata="getText('p2text6')" :highlight="true" />
      <BaseText :textdata="getText('p2text7')" :highlight="true" />
    </div>
    <h2 :class="$style.title2">{{ getText("p2text8") }}</h2>
    <div :class="$style.description">
      <BaseText :textdata="getText('p2text9')" :highlight="true" />
      <BaseText :textdata="getText('p2text10')" :highlight="true" />
    </div>

    <div :class="$style.imgContainer">
      <img src="@/assets/images/regulation_of_air_quality/img2.png" alt="" />
    </div>

    <h2 :class="$style.title2">{{ getText("p2text11") }}</h2>
    <div :class="$style.description">
      <BaseText :textdata="getText('p2text12')" :highlight="true" />
      <BaseText :textdata="getText('p2text13')" :highlight="true" />
    </div>
    <LessonNextButton />
  </div>
</template>

<script>
import enData from "@/assets/data/regulation_of_air_quality/en.json";
import npData from "@/assets/data/regulation_of_air_quality/np.json";
import glossary from "@/assets/data/glossary/regulation_of_air_quality.json";

import BaseText from "@/components/baseComponents/BaseText.vue";
import LessonBreadcrumbs from "@/components/lessonComponents/LessonBreadcrumbs.vue";
import LessonNextButton from "@/components/lessonComponents/LessonNextButton.vue";

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
  i18n: {
    messages: msg,
  },
  created() {
    const curLocale = this.$i18n.locale;
    this.$store.dispatch("lesson/setGlossary", {
      glossary: glossary,
      locale: curLocale,
    });
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
  position: relative;
}

.title {
  font-size: 2.25rem;
  text-align: left;
  margin: 1rem 0;
  color: black;
  text-decoration: underline;
}
.title2 {
  font-size: 2rem;
  text-align: left;
  margin: 1rem 0;
  color: #555;
}

.description {
  font-size: 1.2rem;
  line-height: 2rem;
  text-align: left;
}
.description p {
  margin: 1rem 0;
}

.imgContainer {
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  padding: 2rem;
  width: 100%;
}
.imgContainer img {
  position: relative;
  margin: 0 1rem;
  width: 100%;
  max-width: 1280px;
}
.testClass {
  color: red;
}
</style>
