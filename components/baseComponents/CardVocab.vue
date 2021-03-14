<template>
  <div class="vocab-container">
    <h2 class="vocab-selector">{{ getSelector }}</h2>
    <p>{{ getMeaning }}</p>
    <template v-if="!isSameLocale"
      ><p>{{ getTranslation }}</p>
      <p>{{ getTranslatedMeaning }}</p>
    </template>
  </div>
</template>

<script>
import { getVocabPosition } from "@/utils/utils.js";

export default {
  computed: {
    getSelector() {
      return this.$store.state.lesson.currentWord[this.$i18n.locale].word;
    },

    getMeaning() {
      return this.$store.state.lesson.currentWord[this.$i18n.locale].meaning;
    },

    getTranslation() {
      return this.$store.state.lesson.currentWord[
        this.$store.state.lesson.vocabLocale
      ].word;
    },

    getTranslatedMeaning() {
      return this.$store.state.lesson.currentWord[
        this.$store.state.lesson.vocabLocale
      ].meaning;
    },
    isSameLocale() {
      if (this.$i18n.locale !== this.$store.state.lesson.vocabLocale) {
        return false;
      }
      return true;
    },
  },
  mounted() {
    this.setPosition();
  },
  methods: {
    setPosition() {
      const position = getVocabPosition(this.$store.state.lesson.vocabPosition);
      this.$el.style["left"] = position.left;
      this.$el.style["top"] = position.top;
      this.$el.style["transform"] = position.transform;
      this.$el.style["right"] = position.right;
      this.$el.style["bottom"] = position.bottom;
    },
  },
};
</script>

<style scoped>
.vocab-container {
  position: absolute;
  max-width: 600px;
  min-width: 250px;
  width: auto;
  border-radius: 2rem;
  background-color: lightcyan;
  padding: 2rem;
  font-size: 1.2rem;
  color: navy;
  text-align: center;
  z-index: 1000;
}
.vocab-selector {
  border-bottom: 1px solid blue;
}
</style>