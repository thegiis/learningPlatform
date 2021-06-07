<template>
  <div :class="$style.videoThumb">
    <youtube
      :video-id="youtubeId"
      player-width="280"
      player-height="158"
    ></youtube>
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
