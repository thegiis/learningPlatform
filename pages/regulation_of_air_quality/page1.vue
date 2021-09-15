<template>
  <LessonIndex>
    <div class="wrapper" data-variant="more-padding">
      <div :class="$style.description">
        <BaseText :textdata="getText('p1text2')" :highlight="true" />
        <BaseText :textdata="getText('p1text3')" :highlight="true" />
        <BaseText :textdata="getText('p1text4')" :highlight="true" />
        <BaseText :textdata="getText('p1text5')" :highlight="true" />
        <BaseText :textdata="getText('p1text6')" :highlight="true" />
        <BaseText :textdata="getText('p1text7')" :highlight="true" />
        <BaseText :textdata="getText('p1text8')" :highlight="true" />
        <BaseText :textdata="getText('p1text9')" :highlight="true" />
        <BaseText :textdata="getText('p1text10')" :highlight="true" />
        <BaseText :textdata="getText('p1text11')" :highlight="true" />
      </div>
      <h2 :class="$style.title2">{{ getText("p1text12") }}</h2>
      <div :class="$style.description">
        <BaseText :textdata="getText('p1text12')" :highlight="true" />
        <BaseText :textdata="getText('p1text13')" :highlight="true" />
        <BaseText :textdata="getText('p1text14')" :highlight="true" />
        <BaseText :textdata="getText('p1text15')" :highlight="true" />
      </div>

      <h2 :class="$style.title2">{{ getText("p1text16") }}</h2>
      <div :class="$style.description">
        <BaseText :textdata="getText('p1text17')" :highlight="true" />
        <BaseText :textdata="getText('p1text18')" :highlight="true" />
        <BaseText :textdata="getText('p1text19')" :highlight="true" />
        <BaseText :textdata="getText('p1text20')" :highlight="true" />
      </div>
      <div :class="$style.imgContainer">
        <img src="@/assets/images/regulation_of_air_quality/img1.JPG" alt="" />
      </div>
      <div :class="$style.description">
        <BaseText :textdata="getText('p1text21')" :highlight="true" />
        <BaseText :textdata="getText('p1text22')" :highlight="true" />
        <BaseText :textdata="getText('p1text23')" :highlight="true" />
        <BaseText :textdata="getText('p1text24')" :highlight="true" />
        <BaseText :textdata="getText('p1text25')" :highlight="true" />
      </div>
    </div>
  </LessonIndex>
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
