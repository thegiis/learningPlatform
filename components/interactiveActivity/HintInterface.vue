<template>
  <div
    class="column is-12-mobile is-4-desktop"
    :class="$style.hintContainer"
    v-if="display"
  >
    <div :class="$style.headerContainer">
      <h1 :class="$style.headerTitle" class="title is-5">Hint</h1>
      <i
        :class="$style.closeHint"
        class="fa fa-times fa-2x"
        aria-hidden="true"
        @click="closeHint"
      ></i>
    </div>
    <div :class="$style.hintBody">
      <p>{{ hintText }}</p>
    </div>
    <div :class="$style.hintFooter">
      <p :class="$style.gotIt" @click="closeHint">{{ $t("close") }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    hintText: {
      type: String,
      required: false,
    },
    display: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    closeHint() {
      this.$emit("close");
    },
  },
};
</script>

<style module>
.hintContainer {
  position: fixed;
  z-index: 100;
  height: 100vh;
  background-color: white;
  top: 0;
  left: 0;
  padding: 0;
}
.headerContainer {
  width: 100%;
  background-color: lightsteelblue;
  padding: 1rem;
  height: 8vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.headerTitle {
  color: darkblue;
  margin-bottom: 0 !important;
  padding: 0;
}
.closeHint {
  color: darkblue;
  cursor: pointer;
}
.hintBody {
  position: relative;
  padding: 1rem;
}
.hintFooter {
  position: absolute;
  bottom: 0%;
  left: 0%;
  width: 100%;
  height: 8vh;
}
.gotIt {
  float: right;
  margin-right: 1rem;
  color: teal;
  font-size: 1.4rem;
  cursor: pointer;
  font-weight: bold;
}
</style>