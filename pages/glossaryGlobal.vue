<template>
  <div :class="$style.glossaryPage" class="container is-max-desktop">
    <h1 class="title is-1" :class="$style.mainTitle">Glossary</h1>
    <div v-for="chapter in getChapters" :key="chapter">
      <section  class="section  is-medium">
        <h2 class="title is-4">{{ chapter }}</h2>
        <div>
          <div v-for="word in getWords(chapter)" :key="word.selector">
            <h2 class="title is-6">{{ word.selector }}</h2>
            <div>
              <p>{{ getBaseWord(word) }}</p>
              <p>{{ getMeaning(word) }}</p>
            </div>
            <div v-if="!isGlossaryLangSame">
              <p>{{ getTranslatedWord(word) }}</p>
              <p>{{ getMeaningTranslated(word) }}</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import pollination from "@/assets/data/glossary/pollination.json";
import companionship from "@/assets/data/glossary/companionship.json";

export default {
  data() {
    return {
      all: {},
    };
  },
  created() {
    this.all = {
      pollination: pollination[this.$i18n.locale],
      compnanionship: companionship[this.$i18n.locale],
    };
  },
  computed: {
    getChapters() {
      return Object.keys(this.all);
    },
    isGlossaryLangSame() {
      return this.$i18n.locale === this.$store.state.lesson.vocabLocale;
    },
  },
  methods: {
    getWords(chapter) {
      let words = [];
      for (const [key, value] of Object.entries(this.all[chapter])) {
        words.push({ selector: key, desc: value });
      }
      return words;
    },
    getBaseWord(word) {
      return word.desc[this.$i18n.locale].word;
    },
    getMeaning(word) {
      return word.desc[this.$i18n.locale].meaning;
    },
    getTranslatedWord(word) {
      return word.desc[this.$store.state.lesson.vocabLocale].word;
    },
    getMeaningTranslated(word) {
      return word.desc[this.$store.state.lesson.vocabLocale].meaning;
    },
  },
};
</script>

<style module>
.glossaryPage{
    padding: 2rem;
}
.mainTitle{
    text-align: center;
}
</style>