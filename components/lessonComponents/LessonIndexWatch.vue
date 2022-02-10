<template>
  <LessonIndex>
    <div class="videoContainer">
      <YoutubeIframe
        :video-id="currentLessonLang.videoId"
        class="videoPlayer"
        player-width="900"
        player-height="506.25"
      />
    </div>
  </LessonIndex>
</template>
<script>
import YoutubeIframe from "@/components/lessonComponents/YoutubeIframe.vue";
export default {
  components: {
    YoutubeIframe,
  },
  data() {
    return {
      currentLessonLang: this.$store.state.lesson.currentLessonLang,
    };
  },
};
</script>
