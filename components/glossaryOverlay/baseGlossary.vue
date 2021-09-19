<template>
  <div :class="$style.glossaryContainer">
    <div :class="$style.glossaryBG"></div>
    <div :class="$style.glossaryModal" class="container is-max-desktop">
      <div :class="$style.closeBtn" @click="closeGlossary()">
        <i class="fas fa-times"></i>
      </div>
      <div class="split-pair">
        <div></div>
        <DropDownGlossaryLang />
      </div>
      <div class="split-pair">
        <h4 class="lesson" :class="$style.mainTitle">Glossary</h4>
        <div class="panel-block" :class="$style.paddingRightZero">
          <p class="control has-icons-left">
            <input
              class="input is-info"
              :class="$style.rounded"
              type="text"
              placeholder="Search"
              @input="handleSearch($event)"
            />
            <span class="icon is-left">
              <i class="fas fa-search" aria-hidden="true"></i>
            </span>
          </p>
        </div>
      </div>
      <div :class="$style.albhapeticalSearch">
        <span
          v-for="(letter, idx) in alphabets"
          :key="letter"
          :class="getLetterClass(idx)"
          @click="filterWords(letter, idx)"
        >
          {{ letter }}
        </span>
      </div>
      <hr :class="$style.hardRule" />
      <section class="section" :class="$style.glossaryContent">
        <div :class="$style.wordList">
          <div
            v-for="word in getWords()"
            :key="word.selector"
            :class="$style.wordItem"
            @click="setCurrentWord(word)"
          >
            {{ getWordTitle(word) }}
          </div>
        </div>

        <div :class="$style.meaningSection" v-if="currentWord">
          <div :class="$style.meaningItem">
            <div>
              <h2 :class="$style.meaningTitle">{{ getBaseWord }}</h2>
              <p>{{ getMeaning }}</p>
            </div>
            <div v-if="!isGlossaryLangSame">
              <p>{{ getTranslatedWord }}</p>
              <p>{{ getMeaningTranslated }}</p>
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
import air_quality from "@/assets/data/glossary/regulation_of_air_quality.json";
import DropDownGlossaryLang from "@/components/baseComponents/DropDownGlossaryLang2.vue";

const chapterData = [air_quality];

export default {
  components: {
    DropDownGlossaryLang,
  },
  data() {
    return {
      all: {},
      allWords: [],
      query: "", // store search keywords
      filtered: [], // store all matching words
      display: {}, // store words with meanings from filtered array
      alphabets: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(""),
      activeLetterIdx: null,
      currentWord: null,
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
        ...chapterData[i][this.$i18n.locale],
      };
    }
    this.filtered = this.allWords;
    this.display = this.all;
    this.currentWord = this.display[Object.keys(this.display)[0]];
  },
  computed: {
    getChapters() {
      if (this.currentWord) {
        return Object.keys(this.display);
      }
    },
    isGlossaryLangSame() {
      if (this.currentWord) {
        return this.$i18n.locale === this.$store.state.lesson.vocabLocale;
      }
    },
    matchedSearch() {},
    getBaseWord() {
      if (this.currentWord) {
        return this.currentWord[this.$i18n.locale].word;
      }
    },
    getMeaning() {
      if (this.currentWord) {
        return this.currentWord[this.$i18n.locale].meaning;
      }
    },
    getTranslatedWord() {
      if (this.currentWord) {
        return this.currentWord[this.$store.state.lesson.vocabLocale].word;
      }
    },
    getMeaningTranslated() {
      if (this.currentWord) {
        return this.currentWord[this.$store.state.lesson.vocabLocale].meaning;
      }
    },
  },
  methods: {
    getWords() {
      let words = [];
      for (const [key, value] of Object.entries(this.display)) {
        words.push({ selector: key, desc: value });
      }
      return words;
    },
    getWordTitle(word) {
      return word.desc[this.$i18n.locale].word;
    },
    getLetterClass(idx) {
      if (idx === this.activeLetterIdx) {
        return [this.$style.activeLetterSearch, this.$style.letterSearch];
      }
      return this.$style.letterSearch;
    },
    setCurrentWord(word) {
      this.currentWord = word.desc;
    },
    filterWords(letter, idx) {
      this.activeLetterIdx = idx;
      this.filtered = [];
      for (let i = 0; i < this.allWords.length; i++) {
        if (this.allWords[i].toLowerCase().startsWith(letter.toLowerCase())) {
          this.filtered.push(this.allWords[i]);
        }
      }
      this.display = this.findAllWords();
      this.currentWord = this.display[Object.keys(this.display)[0]];
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
        this.display = this.findAllWords();
        this.currentWord = this.display[Object.keys(this.display)[0]];
        this.activeLetterIdx = null;
      }
    },
    findAllWords() {
      const words = this.all;
      let output = {};
      for (const [key, value] of Object.entries(words)) {
        if (this.filtered.indexOf(key.toLowerCase()) != -1) {
          output = { ...output, ...{ [key]: value } };
        }
      }
      return output;
    },
    closeGlossary() {
      this.$emit("closeGlossary", true);
    },
  },
};
</script>

<style module>
.glossaryContainer {
  z-index: 1600;
  position: fixed;
  width: 100vw;
  height: 100vh;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.glossaryBG {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background-color: black;
  opacity: 0.7;
}
.glossaryModal {
  position: relative;
  z-index: 10;
  padding: 2rem;
  height: calc(100vh - 100px);
  margin-top: 50px;
  background-color: white;
  border: 1px solid black;
  border-radius: 1rem;
  width: 100%;
  overflow: hidden;
}
.closeBtn {
  position: absolute;
  z-index: 10;
  font-size: 1.5rem;
  top: 2%;
  right: 2%;
  cursor: pointer;
}
.closeBtn:hover {
  color: red;
}
.titleBar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.mainTitle {
  text-align: center;
}
.albhapeticalSearch {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
}
.letterSearch {
  padding: 0 0.25rem;
  font-size: 1.3rem;
  cursor: pointer;
}
.activeLetterSearch {
  color: darkcyan;
}
.letterSearch:hover {
  color: blueviolet;
}
.glossaryContent {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 1rem 0;
  overflow-y: auto;
}
.wordList {
  margin-right: 1rem;
  min-width: 300px;
}
.wordItem {
  padding: 0.5rem;
  background-color: var(--green-secondary);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid var(--green-secondary);
  margin: 0.25rem 0rem;
  cursor: pointer;
}
.wordItem:hover {
  filter: brightness(125%);
}
.meaningSection {
  margin: 1rem;
  width: 100%;
}
.meaningItem {
  padding: 0.5rem;
  border: 1px solid black;
}
.meaningTitle {
  font-size: 1.3rem;
  font-weight: bold;
}
.rounded {
  border-radius: 20px;
}
.paddingRightZero {
  padding-right: 0em;
}
.hardRule {
  margin: 1rem 0;
  background-color: black;
}
.glossWord {
  color: white;
}
</style>
