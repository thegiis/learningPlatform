<template>
  <div :class="$style.videoThumb">
    <client-only>
      <vue-youtube-player
        :video-id="youtubeId"
        player-width="280"
        player-height="158"
      ></vue-youtube-player>
    </client-only>
  </div>
</template>

<script>
export default {
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
