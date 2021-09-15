<template>
  <nuxt-link
    :to="{ name: nextPage.i18nRoute }"
    class="button is-uppercase is-primary"
    v-if="nextPage.type"
  >
    <span>{{ nextPage.type }}</span>
    <span :class="$style.rightArrow"><i class="fas fa-angle-right"></i></span>
  </nuxt-link>
</template>

<script>
export default {
  computed: {
    nextPage() {
      const currentLessonLang = this.$store.state.lesson.currentLessonLang;
      const currIdx = currentLessonLang.currentPage.id;

      let nextPage = {};
      if (currIdx < currentLessonLang.pages.length - 1) {
        nextPage = currentLessonLang.pages[currIdx + 1];
      }
      return nextPage;
    },
  },
};
</script>

<style module>
.rightArrow {
  padding-left: 0.5rem;
  padding-top: 0.1rem;
}
</style>
