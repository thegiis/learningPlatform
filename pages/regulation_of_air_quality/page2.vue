<template>
  <LessonIndex>
    <div class="wrapper" data-variant="more-padding">
      <h2 class="title2">{{ getText("p2text2") }}</h2>
      <div class="description">
        <BaseText :textdata="getText('p2text3')" :highlight="true" />
        <BaseText :textdata="getText('p2text4')" :highlight="true" />
        <BaseText :textdata="getText('p2text5')" :highlight="true" />
        <BaseText :textdata="getText('p2text6')" :highlight="true" />
        <BaseText :textdata="getText('p2text7')" :highlight="true" />
      </div>
      <h2 class="title2">{{ getText("p2text8") }}</h2>
      <div class="description">
        <BaseText :textdata="getText('p2text9')" :highlight="true" />
        <BaseText :textdata="getText('p2text10')" :highlight="true" />
      </div>
      <h2 class="title2">{{ getText("p2text11") }}</h2>
      <div class="description">
        <BaseText :textdata="getText('p2text12')" :highlight="true" />
        <BaseText :textdata="getText('p2text13')" :highlight="true" />
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
