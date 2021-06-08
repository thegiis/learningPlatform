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
import { getVideoIdFromRoute } from "@/utils/utils.js";

export default {
  components: {
    LessonNextButton,
    YoutubeIframe,
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
