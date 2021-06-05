<template>
  <div class="vocab-container" @mouseover="onOver()" @mouseleave="onLeave()">
    <h2 class="vocab-selector">{{ getSelector }}</h2>
    <div class="meaningDIv">
      <p>{{ getMeaning }}</p>
      <template v-if="!isSameLocale"
        ><p>{{ getTranslation }}</p>
        <p>{{ getTranslatedMeaning }}</p>
      </template>
    </div>
    <GlossaryLangSwitchHover />
  </div>
</template>

<script>
import { getVocabPosition, isObjectEmpty } from "@/utils/utils.js";
import GlossaryLangSwitchHover from "@/components/baseComponents/GlossaryLangSwitchHover.vue";

export default {
  components: {
    GlossaryLangSwitchHover,
  },
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
      // console.log(position);
      this.$el.style["left"] = position.left;
      this.$el.style["top"] = position.top;
      this.$el.style["transform"] = position.transform;
      this.$el.style["right"] = position.right;
      this.$el.style["bottom"] = position.bottom;
    },

    //hover function
    onOver() {
      this.$store.dispatch("lesson/setOverVocab");
    },
    onLeave() {
      this.$store.dispatch("lesson/resetOverVocab");
      this.$store.dispatch("lesson/resetVocab");
    },
  },
};
</script>

<style scoped>
.vocab-container {
  position: fixed;
  max-width: 600px;
  min-width: 300px;
  width: auto;
  border-radius: 2rem;
  background-color: white;
  padding-top: 1rem;
  padding-bottom: 0;
  font-size: 1.2rem;
  color: black;
  text-align: center;
  z-index: 900;
  border: 2px solid orange;
  /* overflow: hidden; */
}
.meaningDIv{
  padding: 0rem 0.75rem;
}
.vocab-selector {
  padding: 0.25rem;
  border-bottom: 1px solid black;
  margin-bottom: 0.5rem;
}
</style>