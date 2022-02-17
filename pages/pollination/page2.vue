<template>
  <LessonIndex>
    <div class="wrapper" data-variant="more-padding">
      <h2 class="title2-no-top-margin">{{ getText("p2text1") }}</h2>
      <h2 class="title2">{{ getText("p2text2") }}</h2>
      <div class="description">
        <BaseText :textdata="getText('p2text3')" :highlight="true" />
        <BaseText :textdata="getText('p2text4')" :highlight="true" />
        <BaseText :textdata="getText('p2text5')" :highlight="true" />
        <ol>
          <li>
            <BaseText :textdata="getText('p2text6')" :highlight="true" />
          </li>
          <li>
            <BaseText :textdata="getText('p2text7')" :highlight="true" />
          </li>
          <li>
            <BaseText :textdata="getText('p2text8')" :highlight="true" />
          </li>
          <li>
            <BaseText :textdata="getText('p2text9')" :highlight="true" />
          </li>
          <li>
            <BaseText :textdata="getText('p2text10')" :highlight="true" />
          </li>
          <li>
            <BaseText :textdata="getText('p2text11')" :highlight="true" />
          </li>
          <li>
            <BaseText :textdata="getText('p2text12')" :highlight="true" />
          </li>
          <li>
            <BaseText :textdata="getText('p2text13')" :highlight="true" />
          </li>
        </ol>
        <BaseText :textdata="getText('p2text14')" :highlight="true" />
      </div>
      <h2 class="title2">{{ getText("p2text15") }}</h2>
      <div class="description">
        <BaseText :textdata="getText('p2text16')" :highlight="true" />
        <BaseText :textdata="getText('p2text17')" :highlight="true" />
        <ul>
          <li>
            <BaseText :textdata="getText('p2text18')" :highlight="true" />
          </li>
          <li>
            <BaseText :textdata="getText('p2text19')" :highlight="true" />
          </li>
          <li>
            <BaseText :textdata="getText('p2text20')" :highlight="true" />
          </li>
          <li>
            <BaseText :textdata="getText('p2text21')" :highlight="true" />
          </li>
        </ul>
      </div>

      <h2 class="title2">{{ getText("p2text22") }}</h2>
      <div class="description">
        <BaseText :textdata="getText('p2text23')" :highlight="true" />
        <BaseText :textdata="getText('p2text24')" :highlight="true" />
        <BaseText :textdata="getText('p2text25')" :highlight="true" />
        <BaseText :textdata="getText('p2text26')" :highlight="true" />
        <BaseText :textdata="getText('p2text27')" :highlight="true" />
        <BaseText :textdata="getText('p2text28')" :highlight="true" />
      </div>

      <h2 class="title2">{{ getText("p2text29") }}</h2>
      <div class="description">
        <BaseText :textdata="getText('p2text30')" :highlight="true" />
        <BaseText :textdata="getText('p2text31')" :highlight="true" />
        <BaseText :textdata="getText('p2text32')" :highlight="true" />
        <BaseText :textdata="getText('p2text33')" :highlight="true" />
        <BaseText :textdata="getText('p2text34')" :highlight="true" />
      </div>
      <figure>
        <img :src="getText('p2image1src')" alt="" />
        <figcaption>{{ getText("p2image1caption") }}</figcaption>
      </figure>
    </div>
  </LessonIndex>
</template>

<script>
import enData from "@/assets/data/pollination/en.json";
import npData from "@/assets/data/pollination/np.json";
import glossary from "@/assets/data/glossary/pollination.json";

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
