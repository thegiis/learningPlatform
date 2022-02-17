<template>
  <LessonIndex>
    <div class="wrapper" data-variant="more-padding">
      <h2 class="title2">{{ getText("p1text1") }}</h2>
      <div class="description">
        <BaseText :textdata="getText('p1text2')" :highlight="true" />
        <BaseText :textdata="getText('p1text3')" :highlight="true" />
        <BaseText :textdata="getText('p1text4')" :highlight="true" />
      </div>
      <img
        src="/img/pollination/beePollination.jpg"
        class="lesson-image"
        alt=""
      />
      <h2 class="title2">{{ getText("p1text5") }}</h2>
      <div class="description">
        <BaseText :textdata="getText('p1text6')" :highlight="true" />
        <BaseText :textdata="getText('p1text7')" :highlight="true" />
        <BaseText :textdata="getText('p1text8')" :highlight="true" />
        <BaseText :textdata="getText('p1text9')" :highlight="true" />
        <BaseText :textdata="getText('p1text10')" :highlight="true" />
      </div>
      <figure>
        <img :src="getText('p1image2src')" alt="" />
        <figcaption>{{ getText("p1image2caption") }}</figcaption>
      </figure>
      <div class="description">
        <BaseText :textdata="getText('p1text11')" :highlight="true" />
        <BaseText :textdata="getText('p1text12')" :highlight="true" />
        <BaseText :textdata="getText('p1text13')" :highlight="true" />
        <BaseText :textdata="getText('p1text14')" :highlight="true" />
      </div>
      <figure>
        <img :src="getText('p1image3src')" alt="" />
        <figcaption>{{ getText("p1image3caption") }}</figcaption>
      </figure>
      <div class="description">
        <BaseText :textdata="getText('p1text15')" :highlight="true" />
      </div>
      <figure>
        <img :src="getText('p1image4src')" alt="" />
        <figcaption>{{ getText("p1image4caption") }}</figcaption>
      </figure>
      <div class="description">
        <BaseText :textdata="getText('p1text16')" :highlight="true" />
      </div>
      <figure>
        <img :src="getText('p1image5src')" alt="" />
        <figcaption>{{ getText("p1image5caption") }}</figcaption>
      </figure>
      <div class="description">
        <BaseText :textdata="getText('p1text17')" :highlight="true" />
        <BaseText :textdata="getText('p1text18')" :highlight="true" />
      </div>
      <figure>
        <img :src="getText('p1image6src')" alt="" />
        <figcaption>{{ getText("p1image6caption") }}</figcaption>
      </figure>
      <div class="description">
        <BaseText :textdata="getText('p1text19')" :highlight="true" />
        <BaseText :textdata="getText('p1text20')" :highlight="true" />
        <BaseText
          :textdata="getText('p1text21')"
          :highlight="true"
          class="default-explainer"
        />
      </div>
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
