<template>
  <LessonIndex>
    <div class="wrapper" data-variant="more-padding">
      <div :class="$style.description">
        <p>
          Trees play a crucial role to maintain clean air and improve human
          health. Living close to trees makes human beings healthier and
          happier. However, human activities are leading to destruction of
          natural vegetation.
        </p>
        <p>
          As human population and human consumption are increasing, we need more
          lands to grow food, and build cities and roads. To fulfill our needs,
          we are cutting down trees and destroying forests. We are cutting down
          trees to derive raw materials for our industries and are converting
          forests to farms. It is estimated that about 10 million square km of
          forest have been lost since the beginning of the 20th century.
          Deforestation has negatively impacted our environment and health as it
          reduces the potential to absorb carbon dioxide and other pollutants
          from the atmosphere.
        </p>
        <p>
          To protect forests, we need to address the root causes of
          deforestation. We need to reduce our consumption and find sustainable
          ways of growing our foods, building our cities and manufacturing
          products. Forests can also be restored, through planting trees in
          cleared areas or simply allowing the forest ecosystem to regenerate
          over time.
        </p>
        <p>
          In urban areas where air pollution tends to be worse, we should find
          ways to protect existing trees and plant more trees.
        </p>
        <p>
          We should create more green spaces by creating parks, lining roads
          with trees and creating urban forests. By planting different variety
          of trees, we can attract, bees, birds and small insects that help to
          maintain healthy ecosystem.
        </p>
        <p>
          Such green spaces reduce global warming, reduce air pollution, reduce
          urban heat, and provide attractive and calming setting for living and
          recreation.
        </p>
      </div>
      <img
        src="/img/regulation_of_air_quality/urbanGreen.jpg"
        class="videoPlayer box-shadow-glow"
        width="640"
        alt=""
      />
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
