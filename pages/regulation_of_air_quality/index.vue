<template>
  <div class="container is-max-desktop" :class="$style.indexPage">
    <h1 class="subtitle is-4">{{ $t("lesson4") }}</h1>
    <div :class="$style.videoContianer">
      <client-only>
        <vue-youtube-player :video-id="videoID"></vue-youtube-player>
      </client-only>
    </div>
    <LessonNextButton />
  </div>
</template>

<script>
import LessonNextButton from "@/components/lessonComponents/LessonNextButton.vue";

export default {
  components: {
    LessonNextButton,
  },
  data() {
    return {
      videoID: "5a_2T6Mo7-k",
    };
  },
  created() {
    // console.log(this.$cookiz.get('lang'))
    console.log(this.$store.state.lesson.vocabLocale);
  },
  methods: {
    getLink(page) {
      const name = this.title + "-" + page + "___" + this.$i18n.locale;
      return { name: name };
    },
  },
};
</script>

<style module>
.indexPage {
  position: relative;
  padding: 2rem;
  background-color: #efefef;
  width: 100%;
  min-height: calc(100vh - 4rem);
}
.title {
  font-size: 2.25rem;
  text-align: left;
  margin: 1rem;
  color: black;
  text-decoration: underline;
}
.videoContianer {
  margin: 1rem;
}
</style>
