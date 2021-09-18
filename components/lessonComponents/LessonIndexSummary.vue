<template>
  <div>
    <div
      class="wrapper"
      :class="$style.bannerSpacing"
      data-variant="more-padding"
    >
      <h1 class="lesson">COMING SOON</h1>
      <h4 class="lesson" :class="$style.h4">
        Nature's contributions to people
      </h4>
      <h3 class="lesson">{{ currentLessonLang.title.toUpperCase() }}</h3>
    </div>
    <div class="videoContainer videoPlayer">
      <img
        :src="summaryImage"
        width="640"
        height="360"
        class="videoPlayer box-shadow-glow"
        alt=""
      />
    </div>
    <div class="green-primary">
      <div
        class="wrapper"
        data-variant="more-padding"
        :class="$style.paddingTopBottom"
      >
        <div class="tiles" data-variant="two-per-row">
          <div class="bg-white">
            <h2 class="lesson" :class="$style.h2">SUMMARY</h2>
            <div :class="$style.watchTitle">
              <h3 class="lesson">{{ summary }}</h3>
              <br />
              <h3 class="lesson">→</h3>
              <img src="img/watch.png" :class="$style.thumbImg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentLessonLang: this.$store.state.lesson.currentLessonLang,
    };
  },
  props: {
    summaryImage: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
  },
};
</script>

<style module lang="scss">
.h4 {
  margin-top: 8px;
  margin-bottom: 4px;
}
.bannerSpacing {
  margin-bottom: 40px;
}
.paddingTopBottom {
  padding-top: 2em;
  padding-bottom: 2em;
}
.h2 {
  border: 0 solid;
  border-bottom-width: 1px;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 1rem;
  padding-bottom: 0;
  line-height: 1.1;
}
.watchTitle {
  padding: 1rem;
}
.thumbImg {
  margin-left: auto;
}
</style>
