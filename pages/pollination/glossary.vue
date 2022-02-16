<template>
  <LessonIndex>
    <div class="wrapper" data-variant="more-padding">
      <div class="split-pair">
        <div></div>
        <DropDownGlossaryLang />
      </div>
      <div :class="$style.meaningSectionAllLetters">
        <div
          :class="$style.meaningItem"
          v-for="(value, name) in currentGlossary"
          :key="name"
        >
          <div>
            <p :class="$style.meaningWord">{{ value[curLocale].word }}</p>
            <p>- {{ value[curLocale].meaning }}</p>
          </div>
          <div v-if="!isGlossaryLangSame">
            <p :class="$style.meaningWord">
              {{ value[$store.state.lesson.vocabLocale].word }}
            </p>
            <p>- {{ value[$store.state.lesson.vocabLocale].meaning }}</p>
          </div>
          <div :class="$style.horizontalRule">&nbsp;</div>
        </div>
      </div>
    </div>
  </LessonIndex>
</template>

<script>
import glossary from "@/assets/data/glossary/pollination.json";

import DropDownGlossaryLang from "@/components/baseComponents/DropDownGlossaryLang2.vue";

export default {
  components: {
    DropDownGlossaryLang,
  },
  data() {
    return {
      currentGlossary: {},
      curLocale: "",
    };
  },
  created() {
    this.curLocale = this.$i18n.locale;
    this.currentGlossary = glossary[this.curLocale];
  },
  computed: {
    isGlossaryLangSame() {
      return this.$i18n.locale === this.$store.state.lesson.vocabLocale;
    },
  },
};
</script>

<style module lang="scss">
@import "@/assets/styles/config";

.meaningSection {
  width: 100%;
  margin-left: 1rem;
  &AllLetters {
    margin: 2rem 1rem;
  }
}
.meaningItem {
  padding: 0.5rem 0.5rem 0.5rem 0rem;
}
.meaningWord {
  font-weight: bold;
}
.horizontalRule {
  width: 100%;
  background-color: gray;
  margin-top: 1rem;
  height: 1px;
  opacity: 0.5;
}
.meaningItem:last-child .horizontalRule {
  height: 0px;
}
</style>
