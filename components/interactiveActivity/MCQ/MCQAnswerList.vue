<template>
  <div :class="$style.answerDiv">
    <div
      :class="$style.optionItem"
      v-for="(option, idx) in options"
      :key="option.option"
    >
      <MCQOptionItem2
        :id="'opt' + idx"
        :option="option"
        :idx="idx + 1"
        :selectedOptions="selectedOptions"
        :correctOptions="correctOptions"
        :answered="answered"
        @select="handleSelect(option)"
      />
    </div>
  </div>
</template>

<script>
import MCQOptionItem2 from "@/components/interactiveActivity/MCQ/MCQOptionItem2.vue";

export default {
  name: "MCQAnswerList",
  components: {
    MCQOptionItem2,
  },
  props: {
    options: {
      type: Array,
      required: true,
    },
    multiChoice: {
      type: Boolean,
      default: false,
    },
    selectedOptions: {
      type: Array,
      required: true,
    },
    correctOptions: {
      type: Array,
      required: true,
    },
    answered: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    isSelected() {},
  },
  methods: {
    handleSelect(option) {
      this.$emit("select", option.option);
    },
  },
};
</script>

<style module>
.answerDiv {
  position: relative;
  width: 100%;
  margin: 0.5rem;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
}
.optionItem {
  position: relative;
  width: 100%;
  height: auto;
}
</style>
