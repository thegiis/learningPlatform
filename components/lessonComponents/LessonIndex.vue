<template>
  <div>
    <div
      class="wrapper"
      :class="$style.bannerSpacing"
      data-variant="more-padding"
    >
      <h1 class="lesson">
        {{ currentLessonLang.currentPage.type.toUpperCase() }}
      </h1>
      <h4 class="lesson" :class="$style.h4">
        Nature's contributions to people
      </h4>
      <h3 class="lesson">{{ currentLessonLang.title.toUpperCase() }}</h3>
    </div>
    <slot></slot>
    <LessonNextButton />
    <LessonMoreTopics />
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentLessonLang: this.$store.state.lesson.currentLessonLang,
    };
  },
};
</script>
<style module>
.h4 {
  margin-top: 8px;
  margin-bottom: 4px;
}
.bannerSpacing {
  margin-bottom: 40px;
}
</style>
