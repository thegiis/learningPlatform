<template>
  <div class="green-primary">
    <div
      class="wrapper"
      data-variant="more-padding"
      :class="$style.paddingTopBottom"
    >
      <div class="tiles" data-variant="two-per-row">
        <div class="bg-white" v-if="currentPageType !== 'watch'">
          <h2 class="lesson" :class="$style.h2">Watch</h2>
          <nuxt-link :to="{ name: watchPageUrl }">
            <div :class="$style.watchTitle">
              <h3 class="lesson">WATCH THE</h3>
              <h3 class="lesson">ANIMATED</h3>
              <h3 class="lesson">SERIES</h3>
              <br />
              <h3 class="lesson">→</h3>
              <img src="img/watch.png" :class="$style.thumbImg" />
            </div>
          </nuxt-link>
        </div>
        <div class="bg-white" v-if="currentPageType !== 'learn'">
          <h2 class="lesson" :class="$style.h2">Learn</h2>
          <div :class="$style.listContainer">
            <ol class="flow" :class="$style.list" style="--flow-space: 0.5rem">
              <li
                v-for="(page, idx) in currentChapterLearnPages"
                :key="idx"
                class="font-secondary font-weight-bold"
              >
                <nuxt-link :to="{ name: page.i18nRoute }">
                  {{ page.name }}
                </nuxt-link>
              </li>
            </ol>
          </div>
        </div>
        <div class="bg-white" v-if="currentPageType !== 'quiz'">
          <h2 class="lesson" :class="$style.h2">Quiz</h2>
          <div :class="$style.listContainer">
            <ol class="flow" :class="$style.list" style="--flow-space: 0.5rem">
              <li
                v-for="(page, idx) in currentChapterQuizPages"
                :key="idx"
                class="font-secondary font-weight-bold"
              >
                <nuxt-link :to="{ name: page.i18nRoute }">
                  {{ page.name }}
                </nuxt-link>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentChapterLearnPages:
        this.$store.state.lesson.currentLessonLang.pages.filter(
          (page) => page.type === "learn"
        ),
      currentChapterQuizPages:
        this.$store.state.lesson.currentLessonLang.pages.filter(
          (page) => page.type === "quiz"
        ),
      currentChapterWatchPages:
        this.$store.state.lesson.currentLessonLang.pages.filter(
          (page) => page.type === "watch"
        ),
      currentPageType:
        this.$store.state.lesson.currentLessonLang.currentPage.type,
      watchPageUrl:
        this.$store.state.lesson.currentLessonLang.pages[0].i18nRoute,
    };
  },
};
</script>
<style module lang="scss">
.paddingTopBottom {
  padding-top: 2em;
  padding-bottom: 2em;
}
.h2 {
  border: 0 solid;
  border-bottom-width: 1px;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 1rem;
  padding-bottom: 0;
  line-height: 1.1;
}
.listContainer {
  padding-left: 0.63rem;
  padding-right: 0.63rem;
  padding-top: 0.63rem;
  padding-bottom: 1.25rem;
}

.list {
  list-style-type: upper-roman;
  list-style-position: outside;
  margin: 1em 2em;
  > li {
    padding-left: 0.5em;
    > a {
      color: black;
    }
    > ul {
      list-style-type: "→";
      list-style-position: outside;
      margin-left: -0.5em;
      > li {
        padding-left: 0.5em;
      }
    }
  }
}
.watchTitle {
  padding: 1rem;
}
.thumbImg {
  margin-left: auto;
  margin-top: -100px;
}
</style>
