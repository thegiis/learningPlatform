<template>
  <p>
    <template v-for="word in words">
      <span
        v-if="word.hasVocab"
        class="default-vocab-word"
        :class="getClass(word.isHighlight)"
        @mouseover="onOver(word.vocab, $event)"
        ref="vocabItem"
        v-bind:key="word"
        >{{ word.text }}
        <!--@mouseleave="onLeave()"-->
      </span>
      <span v-else :class="getClass(word.isHighlight)" v-bind:key="word">{{ word.text }}</span>
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
          selectors.forEach(function (selector) {
            // find the selector in string
            const textData = word["text"];
            const temp = textData.toLowerCase();
            const idx = temp.indexOf(selector);
            if (idx != -1) {
              // check last character if it is punctuation or some other alphanumeric
              const lastIdx = idx + selector.length;
              const lastChar = temp[lastIdx];
              const isNotWord = !isAlphaNumeric(lastChar);
              if (isNotWord) {
                // glossary split here
                let firstWord = { ...word };
                let vocabWord = { ...word };
                let lastWord = { ...word };

                const firstPart = textData.slice(0, idx);
                const vocabPart = textData.slice(idx, lastIdx);
                const lastPart = textData.slice(lastIdx);

                firstWord["text"] = firstPart;
                vocabWord["text"] = vocabPart;
                vocabWord["hasVocab"] = true;
                vocabWord["vocab"] = tempVocab[selector];
                lastWord["text"] = lastPart;

                newWord = [firstWord, vocabWord, lastWord];
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
    onOver(data, event) {
      // get word position and decide where vocab card shows up
      const vocabItem = this.$refs.vocabItem[0];
      const rect = vocabItem.getBoundingClientRect();
      this.$store.dispatch("lesson/toggleVocab");
      this.$store.dispatch("lesson/setCurrentWord", data);
      this.$store.dispatch("lesson/setVocabPosition", rect);
    },
    onLeave() {
      this.$store.dispatch("lesson/toggleVocab");
    },
  },
};
</script>
