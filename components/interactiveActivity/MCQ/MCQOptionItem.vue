<template>
  <div :class="$style.optionItem">
    <input
      type="checkbox"
      :id="id"
      @change="handleChange(option)"
      :value="option.option"
      :checked="isSelected"
    />
    <label :for="id">{{ option.option }}</label>
  </div>
</template>

<script>
export default {
  name: 'MCQTextAnswer',
  props: {
    option: {
      type: Object,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    selectedOptions: {
      type: Array,
      required: true,
    },
  },
  computed: {
    isSelected() {
      if(this.selectedOptions.indexOf(this.option.option)!==-1){
        return true
      }
      return false
    },
  },
  methods: {
    handleChange(option) {
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
