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
import { getVocabPosition, isObjectEmpty } from "@/utils/utils.js";

export default {
  computed: {
    getSelector() {
      const currWord = this.$store.state.lesson.currentWord[this.$i18n.locale];
      if (!isObjectEmpty(currWord)) {
        return currWord.word;
      }
      return " ";
    },

    getMeaning() {
      const currWord = this.$store.state.lesson.currentWord[this.$i18n.locale];
      if (!isObjectEmpty(currWord)) {
        return currWord.meaning;
      }
      return " ";
    },

    getTranslation() {
      const currWord = this.$store.state.lesson.currentWord;
      if (!isObjectEmpty(currWord)) {
        return currWord[this.$store.state.lesson.vocabLocale].word;
      }
      return " ";
    },

    getTranslatedMeaning() {
      const currWord = this.$store.state.lesson.currentWord;
      if (!isObjectEmpty(currWord)) {
        return currWord[this.$store.state.lesson.vocabLocale].meaning;
      }
      return " ";
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
      console.log(position);
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
  position: fixed;
  max-width: 600px;
  min-width: 250px;
  width: auto;
  border-radius: 2rem;
  background-color: lightcyan;
  padding: 2rem;
  font-size: 1.2rem;
  color: navy;
  text-align: center;
  z-index: 900;
}
.vocab-selector {
  border-bottom: 1px solid blue;
}
</style>