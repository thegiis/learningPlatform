<template>
  <div>
    <iframe
      id="player"
      frameborder="0"
      allowfullscreen="1"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      title="YouTube video player"
      :width="playerWidth"
      :height="playerHeight"
      :src="`http://www.youtube.com/embed/${videoId}?autoplay=0&amp;playsinline=1&amp;enablejsapi=1&amp;origin=http%3A%2F%2Flocalhost%3A3000&amp;widgetid=1`"
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
  },
};
</script>
