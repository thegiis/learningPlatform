<template>
  <div>
    <article class="bg-img-vector">
      <div :class="$style.heading" class="flow" style="--flow-space: -0.5em">
        <div>Nature's</div>
        <div>Contributions</div>
        <div>To People</div>
      </div>
    </article>
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
    return {
      lessons: [
        {
          title: this.$t("lesson1"),
          description: this.$t("description1"),
          filename: "index/food.png",
          link: { name: "pollination___" + this.$i18n.locale },
        },
        {
          title: this.$t("lesson2"),
          description: this.$t("description2"),
          filename: "index/inspiration.png",
          link: { name: "pollination___" + this.$i18n.locale },
        },
        {
          title: this.$t("lesson3"),
          description: this.$t("description3"),
          filename: "index/pollination.png",
          link: { name: "pollination___" + this.$i18n.locale },
        },
        {
          title: this.$t("lesson4"),
          description: this.$t("description4"),
          filename: "index/air-quality.png",
          link: { name: "regulation_of_air_quality___" + this.$i18n.locale },
        },
        {
          title: this.$t("lesson5"),
          description: this.$t("description5"),
          filename: "index/companionship.png",
          link: { name: "pollination___" + this.$i18n.locale },
        },
        {
          title: this.$t("lesson6"),
          description: this.$t("description6"),
          filename: "index/air-quality.png",
          link: { name: "pollination___" + this.$i18n.locale },
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
  justify-content: space-around;
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
</style>
