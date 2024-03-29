<template>
  <p>
    <template v-for="(word, index) in words">
      <span
        v-if="word.hasVocab"
        class="default-vocab-word"
        :class="getClass(word.isHighlight)"
        @mouseover="onOver(word.vocab, index)"
        @mouseleave="onLeave()"
        :ref="'vocabItem-'+index"
        v-bind:key="index"
        >{{ word.text }}
      </span>
      <span v-else :class="getClass(word.isHighlight)" v-bind:key="index" v-html="word.text"></span>
    </template>
  </p>
</template>

<script>
import { isAlphaNumeric } from "@/utils/utils.js";

export default {
  props: {
    textdata: {
      type: String,
      required: true,
    },
    highlight: {
      type: Boolean,
      default: false,
    },
    highlightClass: {
      type: String,
      default: "default-text-highlight",
    },
    vocab: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      words: [],
      vocabDict: this.$store.state.lesson.glossary,
    };
  },

  created() {
    this.words = this.appendVocab();
  },

  methods: {
    //function to split textdata for datahighlight
    splitHighlight() {
      if (this.highlight) {
        const words = this.textdata.split(/[#@]/);
        let word_obj = [];
        words.forEach(function (word, idx) {
          let text = {
            text: word,
            isHighlight: false,
            hasVocab: false,
            vocab: null,
          };
          if (idx % 2) text["isHighlight"] = true;
          if (word !== "") word_obj.push(text);
        });
        return word_obj;
      }
      return [
        {
          text: this.textdata,
          isHighlight: false,
          hasVocab: false,
          vocab: null,
        },
      ];
    },

    // function to append Vocab
    appendVocab() {
      this.words = this.splitHighlight();
      if (this.vocab) {
        let vocabWords = [];
        const tempVocab = this.vocabDict;
        const selectors = this.$store.state.lesson.selectors;
        this.words.forEach(function (word) {
          let newWord = [word];
          let hasMultipleVocab = false;
          selectors.forEach(function (selector) {
            // find the selector in string
            const textData = word["text"];
            const temp = textData.toLowerCase();
            let idx = temp.indexOf(selector);
            // console.log(selector, idx);
            if (idx != -1) {
              // check last character if it is punctuation or some other alphanumeric
              let lastIdx = idx + selector.length;
              const lastChar = temp[lastIdx];
              const isNotWord = !isAlphaNumeric(lastChar);
              if (isNotWord) {
                // glossary split here
                let firstWord = { ...word };
                let vocabWord = { ...word };
                let lastWord = { ...word };

                // check if there are multiple vocabs
                if (hasMultipleVocab) {
                  const remText = newWord[newWord.length - 1]["text"];
                  idx = remText.indexOf(selector);
                  lastIdx = idx + selector.length;
                  const firstPart = remText.slice(0, idx);
                  const vocabPart = remText.slice(idx, lastIdx);
                  const lastPart = remText.slice(lastIdx);

                  firstWord["text"] = firstPart;
                  vocabWord["text"] = vocabPart;
                  vocabWord["hasVocab"] = true;
                  vocabWord["vocab"] = tempVocab[selector];
                  lastWord["text"] = lastPart;

                  newWord.pop();
                  newWord = newWord.concat([firstWord, vocabWord, lastWord]);
                } else {
                  const firstPart = textData.slice(0, idx);
                  const vocabPart = textData.slice(idx, lastIdx);
                  const lastPart = textData.slice(lastIdx);

                  firstWord["text"] = firstPart;
                  vocabWord["text"] = vocabPart;
                  vocabWord["hasVocab"] = true;
                  vocabWord["vocab"] = tempVocab[selector];
                  lastWord["text"] = lastPart;

                  newWord = [firstWord, vocabWord, lastWord];
                  hasMultipleVocab = true;
                }
                // console.log(newWord);
              }
            }
          });

          vocabWords = vocabWords.concat(newWord);
        });
        return vocabWords;
      }
      return this.words;
    },

    // function to apply class to our text component
    getClass(isHighlight) {
      if (isHighlight) return this.highlightClass;
      return "";
    },

    //hover function
    onOver(data, index) {
      // get word position and decide where vocab card shows up
      const vocabItem = this.$refs['vocabItem-'+index][0];
      const rect = vocabItem.getBoundingClientRect();
      this.$store.dispatch("lesson/setVocab");
      this.$store.dispatch("lesson/setCurrentWord", data);
      this.$store.dispatch("lesson/setVocabPosition", rect);
    },
    onLeave() {
      this.$store.dispatch("lesson/resetVocab");
    },
  },
};
</script>
