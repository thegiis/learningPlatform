<template>
  <LessonIndex>
    <div class="wrapper" data-variant="more-padding">
      <div class="description">
        <BaseText :textdata="getText('p3text2')" :highlight="true" />
        <BaseText :textdata="getText('p3text3')" :highlight="true" />
        <BaseText :textdata="getText('p3text4')" :highlight="true" />
        <BaseText :textdata="getText('p3text5')" :highlight="true" />
        <BaseText :textdata="getText('p3text6')" :highlight="true" />
        <BaseText :textdata="getText('p3text7')" :highlight="true" />
        <BaseText :textdata="getText('p3text8')" :highlight="true" />
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
