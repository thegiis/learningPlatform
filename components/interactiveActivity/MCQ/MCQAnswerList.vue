<template>
  <div :class="$style.answerDiv">
    <div
      :class="$style.optionItem"
      v-for="(option, idx) in options"
      :key="option.option"
    >
      <MCQOptionItem
        :id="'opt' + idx"
        :option="option"
        :selectedOptions="selectedOptions"
        @select="handleSelect(option)"
      />
    </div>
  </div>
</template>

<script>
import MCQOptionItem from '@/components/interactiveActivity/MCQ/MCQOptionItem.vue'

export default {
  name: 'MCQAnswerList',
  components: {
    MCQOptionItem,
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
  },
  computed: {
    isSelected() {},
  },
  methods: {
    handleSelect(option) {
      this.$emit('select', option.option)
    },
  },
}
</script>

<style module>
.answerDiv {
  position: relative;
  padding: 2rem;
  width: 100%;
  margin: 0.5rem;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
}
</style>
