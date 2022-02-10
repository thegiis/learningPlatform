<template>
  <nuxt-link
    :to="{ name: prevPage.i18nRoute }"
    class="button is-uppercase is-primary"
    v-if="prevPage.type"
  >
    <span :class="$style.leftArrow"><i class="fas fa-angle-left"></i></span>
    <span v-if="prevPage.type === currPage.type">PREVIOUS</span>
    <span v-else>{{ prevPage.type }}</span>
  </nuxt-link>
</template>

<script>
export default {
  computed: {
    prevPage() {
      const currentLessonLang = this.$store.state.lesson.currentLessonLang;
      const currIdx = currentLessonLang.currentPage.id;

      let prevPage = {};
      if (currIdx > 0) {
        prevPage = currentLessonLang.pages[currIdx - 1];
      }
      return prevPage;
    },
    currPage() {
      const currentLessonLang = this.$store.state.lesson.currentLessonLang;
      const currIdx = currentLessonLang.currentPage.id;

      return currentLessonLang.pages[currIdx];
    },
  },
};
</script>

<style module>
.leftArrow {
  padding-right: 0.5rem;
  padding-top: 0.1rem;
}
</style>
