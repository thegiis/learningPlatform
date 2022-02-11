<template>
  <LessonIndex>
    <div class="videoContainer">
      <YoutubeIframe
        :video-id="currentLessonLang.videoId"
        class="videoPlayer"
        youtubeSizing="youtube-size-large"
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
