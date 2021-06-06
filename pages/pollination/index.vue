<template>
  <div class="container is-max-desktop indexPage">
    <LessonBreadcrumbs />
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
    this.videoID = this.$store.state.lesson.currentVideoId;
  },
  methods: {
    getLink(page) {
      const name = this.title + "-" + page + "___" + this.$i18n.locale;
      return { name: name };
    },
  },
};
</script>
