<template>
  <div>
    <iframe
      id="player"
      frameborder="0"
      allowfullscreen="1"
      class="box-shadow-glow"
      :class="youtubeSizing"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      title="YouTube video player"
      :width="playerWidth"
      :height="playerHeight"
      :src="`https://www.youtube.com/embed/${videoId}?autoplay=0&amp;playsinline=1&amp;enablejsapi=1&amp;widgetid=1`"
    ></iframe>
  </div>
</template>

<script>
export default {
  props: {
    videoId: {
      type: String,
      default: () => "M7lc1UVf-VE",
    },
    playerWidth: {
      type: String,
      default: "640",
    },
    playerHeight: {
      type: String,
      default: "360",
    },
    youtubeSizing: {
      type: String,
      default: "",
    },
  },
};
</script>
