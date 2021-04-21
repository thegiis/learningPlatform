<template>
  <div :class="$style.glossaryPage" class="container is-max-desktop">
    <nuxt-link 
          :to="{ name: 'glossaryGame___' + this.$i18n.locale }">Game</nuxt-link>
    <h1 class="title is-1" :class="$style.mainTitle">Glossary</h1>
    <div class="panel-block">
      <p class="control has-icons-left">
        <input
          class="input is-info"
          type="text"
          placeholder="Search"
          @input="handleSearch($event)"
        />
        <span class="icon is-left">
          <i class="fas fa-search" aria-hidden="true"></i>
        </span>
      </p>
    </div>
    <div v-for="chapter in getChapters" :key="chapter">
      <section class="section">
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

const chapterNames = ["Pollination", "Companionship"];
const chapterData = [pollination, companionship];

export default {
  data() {
    return {
      all: {},
      allWords: [],
      query: "", // store search keywords
      filtered: [], // store all matching words
      display: {},  // store words with meanings from filtered array
    };
  },
  created() {
    for (let i = 0; i < chapterData.length; i++) {
      this.allWords = [
        ...this.allWords,
        ...Object.keys(chapterData[i][this.$i18n.locale]),
      ];
      this.all = {
        ...this.all,
        ...{ [chapterNames[i]]: chapterData[i][this.$i18n.locale] },
      };
    }
    this.filtered = this.allWords;
    this.display = this.all;
  },
  computed: {
    getChapters() {
      return Object.keys(this.display);
    },
    isGlossaryLangSame() {
      return this.$i18n.locale === this.$store.state.lesson.vocabLocale;
    },
    matchedSearch() {},
  },
  methods: {
    getWords(chapter) {
      let words = [];
      for (const [key, value] of Object.entries(this.display[chapter])) {
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
    handleSearch(event) {
      this.query = event.target.value.toLowerCase().trim();
      if (this.query === "") {
        this.filtered = this.allWords;
        this.display = this.all;
      } else {
        this.filtered = [];
        for (let i = 0; i < this.allWords.length; i++) {
          if (this.allWords[i].toLowerCase().includes(this.query)) {
            this.filtered.push(this.allWords[i]);
          }
        }
        this.display = {};
        for (let i = 0; i < chapterNames.length; i++) {
          const tempWords = this.findWordInChapter(chapterNames[i]);
          this.display = { ...this.display, ...tempWords };
        }
      }
    },
    findWordInChapter(chapter) {
      const words = this.all[chapter];
      let output = {};
      for (const [key, value] of Object.entries(words)) {
        if (this.filtered.indexOf(key.toLowerCase()) != -1) {
          output = { ...output, ...{ [key]: value } };
        }
      }
      if (Object.keys(output).length) {
        return { [chapter]: output };
      }
      return {};
    },
  },
};
</script>

<style module>
.glossaryPage {
  padding: 2rem;
}
.mainTitle {
  text-align: center;
}
</style>