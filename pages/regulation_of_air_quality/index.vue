<template>
  <div class="container is-max-desktop indexPage">
    <h1 class="subtitle is-4 is-uppercase has-text-centered">
      {{ $t("lesson4") }}
    </h1>
    <div class="videoContainer">
      <client-only>
        <vue-youtube-player
          :video-id="videoID"
          class="videoPlayer"
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
