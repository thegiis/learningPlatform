<template>
  <div>
    <div class="wrapper" data-variant="more-padding">
      <h1 class="lesson">WATCH</h1>
      <h4 class="lesson">Nature's contributions to people</h4>
      <h3 class="lesson">BAANU'S LETTER: REGULATION OF AIR QUALITY</h3>
    </div>
    <div class="videoContainer">
      <YoutubeIframe :video-id="videoID" class="videoPlayer" />
    </div>
    <LessonNextButton />
    <LessonMoreTopics />
  </div>
</template>

<script>
import LessonNextButton from "@/components/lessonComponents/LessonNextButton.vue";
import YoutubeIframe from "@/components/lessonComponents/YoutubeIframe.vue";
import { getVideoIdFromRoute } from "@/utils/utils.js";
import LessonMoreTopics from "@/components/lessonComponents/LessonMoreTopics.vue";

export default {
  components: {
    LessonNextButton,
    YoutubeIframe,
    LessonMoreTopics,
  },
  data() {
    return {
      videoID: "",
    };
  },
  created() {
    this.videoID = getVideoIdFromRoute(this.$route, this.$i18n.locale);
    //this.videoID = this.$store.state.lesson.currentVideoId;
  },
  methods: {
    getLink(page) {
      const name = this.title + "-" + page + "___" + this.$i18n.locale;
      return { name: name };
    },
  },
};
</script>
