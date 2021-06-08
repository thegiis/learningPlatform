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
import { getVideoId } from "@/utils/utils.js";

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
    const lang = this.$i18n.locale;
    let currentPage = this.$route.name.split("__")[0];

    //this.videoID = this.$store.state.lesson.currentVideoId;
    this.videoID = getVideoId(currentPage, lang);
  },
  methods: {
    getLink(page) {
      const name = this.title + "-" + page + "___" + this.$i18n.locale;
      return { name: name };
    },
  },
};
</script>
