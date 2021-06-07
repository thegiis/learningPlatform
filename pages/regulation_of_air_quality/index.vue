<template>
  <div class="container is-max-desktop indexPage">
    <LessonBreadcrumbs />
    <div class="videoContainer">
      <YoutubeIframe :video-id="videoID" class="videoPlayer" />
      <!--<youtube :video-id="videoID" class="videoPlayer"></youtube>-->
    </div>
    <LessonNextButton />
  </div>
</template>

<script>
import LessonNextButton from "@/components/lessonComponents/LessonNextButton.vue";
import YoutubeIframe from "@/components/lessonComponents/YoutubeIframe.vue";

export default {
  components: {
    LessonNextButton,
    YoutubeIframe,
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
