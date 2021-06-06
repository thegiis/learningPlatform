<template>
  <div class="container is-max-desktop" :class="$style.indexPage">
    <h1 class="subtitle is-4 is-uppercase has-text-centered">
      {{ $t("lesson4") }}
    </h1>
    <div :class="$style.videoContainer">
      <client-only>
        <vue-youtube-player
          :video-id="videoID"
          :class="$style.videoPlayer"
        ></vue-youtube-player>
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
.videoContainer {
  display: flex;
}
.videoPlayer {
  margin-left: auto;
  margin-right: auto;
}
</style>
