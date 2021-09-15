<template>
  <div>
    <div class="wrapper" data-variant="more-padding">
      <h1 class="lesson">
        {{ currentLessonLang.currentPage.type.toUpperCase() }}
      </h1>
      <h4 class="lesson">Nature's contributions to people</h4>
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
