<template>
  <div>
    <div class="wrapper" data-variant="more-padding">
      <h1 class="lesson">WATCH</h1>
      <h4 class="lesson">Nature's contributions to people</h4>
      <h3 class="lesson">BAANU'S LETTER: REGULATION OF AIR QUALITY</h3>
    </div>
    <div class="videoContainer">
      <YoutubeIframe :video-id="videoID" class="videoPlayer" />
    </div>
    <LessonNextButton />
    <div class="green-primary">
      <div
        class="wrapper"
        data-variant="more-padding"
        :class="$style.paddingTopBottom"
      >
        <div class="tiles" data-variant="two-per-row">
          <div class="bg-white">
            <h2 class="lesson" :class="$style.h2">Read</h2>
            <div :class="$style.listContainer">
              <ol
                class="flow"
                :class="$style.list"
                style="--flow-space: 0.5rem"
              >
                <li>
                  Air Pollution
                  <ul>
                    <li>Nature and man made pollution</li>
                    <li>Nature and man made pollution</li>
                    <li>Nature and man made pollution</li>
                  </ul>
                </li>
                <li>
                  Effects of Air Pollution
                  <ul>
                    <li>Nature and man made pollution</li>
                    <li>Nature and man made pollution</li>
                    <li>Nature and man made pollution</li>
                  </ul>
                </li>
                <li>Nature as regulations of Air Quality</li>
              </ol>
            </div>
          </div>
          <div class="bg-white"></div>
        </div>
      </div>
    </div>
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
<style module lang="scss">
.paddingTopBottom {
  padding-top: 2em;
  padding-bottom: 2em;
}
.h2 {
  border: 0 solid;
  border-bottom-width: 1px;
  padding-left: 0.63rem;
  padding-right: 0.63rem;
  padding-top: 0.63rem;
  padding-bottom: 0.63rem;
}
.listContainer {
  padding-left: 0.63rem;
  padding-right: 0.63rem;
  padding-top: 0.63rem;
  padding-bottom: 1.25rem;
}

.list {
  list-style-type: upper-roman;
  list-style-position: outside;
  margin: 1em 2em;
  > li {
    padding-left: 0.5em;
    > ul {
      list-style-type: "→";
      list-style-position: outside;
      margin-left: -0.5em;
      > li {
        padding-left: 0.5em;
      }
    }
  }
}
</style>
