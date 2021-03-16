<template>
  <div :class="$style.optionItemContainer" @click="handleChange(option)">
    <div :class="isSelected">
      <p class="optionIndex">{{ idx }}</p>
      <p>
        {{ option.option }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "MCQTextAnswer",
  props: {
    option: {
      type: Object,
      required: true,
    },
    id: {
      type: String,
      required: true,
    },
    idx: {
      type: Number,
      required: false,
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
    isSelected() {
      if (this.selectedOptions.indexOf(this.option.option) !== -1) {
        console.log(this.answered);
        if (this.answered) {
          if (this.correctOptions.indexOf(this.option.option) !== -1) {
            return ["optionMCQDiv", "optionMCQcorrect"];
          } else {
            return ["optionMCQDiv", "optionMCQincorrect"];
          }
        } else {
          return ["optionMCQDiv", "optionMCQSelected"];
        }
      }
      return ["optionMCQDiv"];
    },
  },
  methods: {
    handleChange(option) {
      this.$emit("select", option.option);
    },
  },
};
</script>

<style module>
.optionItemContainer {
  position: relative;
  padding: 1rem;
  width: 100%;
  margin: 0.5rem;
  display: flex;
  justify-content: space-around;
  flex-direction: column;
  align-items: center;
}
</style>
<style scoped>
.optionMCQDiv {
  position: relative;
  width: 100%;
  height: 100%;
  padding: 1rem;
  background-color: #e4f7f1;
  border: 2px solid black;
  border-color: transparent;
  cursor: pointer;
}
.optionMCQDiv:hover {
  background-color: #def8f7;
}
.optionMCQSelected {
  border-color: #4dccc4;
}
.optionMCQcorrect {
  background-color: #e1eab8;
  color: #509c59;
  border-color: #509c59;
}
.optionMCQincorrect {
  background-color: #ffedf1;
  color: #d9491a;
  border-color: #d9491a;
}
.optionIndex {
  float: left;
  font-weight: bold;
  color: gray;
  margin-right: 1rem;
}
</style>
