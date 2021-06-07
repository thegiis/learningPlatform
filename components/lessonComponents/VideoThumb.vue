<template>
  <div :class="$style.videoThumb">
    <YoutubeIframe
      :video-id="youtubeId"
      player-width="280"
      player-height="158"
    ></YoutubeIframe>
  </div>
</template>

<script>
import YoutubeIframe from "@/components/lessonComponents/YoutubeIframe.vue";

export default {
  components: {
    YoutubeIframe,
  },
  props: {
    youtubeId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      vid: "5a_2T6Mo7-k",
    };
  },
};
</script>

<style module>
.videoThumb {
  margin: 0;
}
</style>
