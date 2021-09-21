<template>
  <div>
    <article class="bg-img-vector">
      <div :class="$style.heading" class="flow" style="--flow-space: -0.5em">
        <div>Nature's</div>
        <div>Contributions</div>
        <div>To People</div>
      </div>
    </article>
    <div
      class="wrapper split-pair"
      data-variant="more-padding"
      :class="$style.paddingTopBottom"
    >
      <div :class="$style.subHeading" class="flow" style="--flow-space: -0.5em">
        <div>Plants and animals</div>
        <div>are part of nature, just like us</div>
      </div>
      <p :class="$style.byLine">
        Pick a Topic and watch how nature is an irreplaceable part of our
        lifeline.
      </p>
    </div>
    <div :class="$style.cardContainer" class="container is-wide-screen">
      <LessonCard
        v-for="lesson in lessons"
        :key="lesson.title"
        :filename="lesson.filename"
        :title="lesson.title"
        :description="lesson.description"
        :alt="lesson.title"
        :link="lesson.link"
      />
    </div>
  </div>
</template>

<script>
import LessonCard from "@/components/indexPage/LessonCard.vue";
export default {
  components: {
    LessonCard,
  },
  data() {
    const allLessons = this.$store.state.lesson.allLessons;
    return {
      lessons: [
        {
          title: this.$t("lesson4"),
          description: this.$t("description4"),
          filename: "index/air-quality.png",
          link: {
            name: allLessons[this.$i18n.locale][3].pages[0].i18nRoute,
          },
        },
        {
          title: this.$t("lesson3"),
          description: this.$t("description3"),
          filename: "index/pollination.png",
          link: { name: allLessons[this.$i18n.locale][2].pages[0].i18nRoute },
        },
        {
          title: this.$t("lesson1"),
          description: this.$t("description1"),
          filename: "index/food.png",
          link: { name: allLessons[this.$i18n.locale][0].pages[0].i18nRoute },
        },
        {
          title: this.$t("lesson2"),
          description: this.$t("description2"),
          filename: "index/inspiration.png",
          link: { name: allLessons[this.$i18n.locale][1].pages[0].i18nRoute },
        },
        {
          title: this.$t("lesson5"),
          description: this.$t("description5"),
          filename: "index/companionship.png",
          link: { name: allLessons[this.$i18n.locale][4].pages[0].i18nRoute },
        },
      ],
    };
  },
  created() {
    // to hide sidenav
    this.$store.dispatch("global/resetSideNavigation");
  },
  mounted() {
    // console.log(this.$i18n.messages)
  },
};
</script>

<style module lang="scss">
@import "@/assets/styles/config";
.cardContainer {
  position: relative;
  width: 100%;
  min-height: 80vh;
  margin: 0 auto;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
}
.heading {
  font-family: "Mortina";
  max-width: 75rem;
  font-size: 3em;
  padding-top: 20px;
  padding-left: 10px;
  padding-right: 10px;
  margin-left: auto;
  margin-right: auto;
  @include media-query("sm") {
    padding-top: 70px;
    padding-left: 80px;
  }
  @include media-query("md") {
    padding-top: 75px;
    padding-left: 250px;
  }
}
.subHeading {
  font-family: "Mortina";
  font-size: 2em;
  margin-left: auto;
  margin-right: auto;
}
.byLine {
  font-size: 1.1em;
  line-height: 1.2em;
  font-weight: bold;
  margin-left: auto;
  margin-right: auto;
  max-width: 18em;
}
.paddingTopBottom {
  padding-top: 50px;
  padding-bottom: 10px;
}
</style>
