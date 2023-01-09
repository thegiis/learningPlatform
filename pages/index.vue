<template>
  <div>
    <div class="main_banner">
      <div :class="" class="banner_content" style="--flow-space: -0.5em">
          <h2>Nature's</h2>
          <h2>Contributions</h2>
          <h2>To People</h2>
        </div>
      <img style="width:100%" src="/img/earthschoool-banner.jpg" />
        
    </div>
    <div
      class="wrapper_container"
   
    >
      <div :class="$style.subHeading" class="flow" style="--flow-space: -0.5em">
        <div>We are getting more</div>
        <div>than what we know</div>
      </div>
      <p :class="$style.byLine">
        Pick a Topic and watch how nature is an irreplaceable part of our
        lifeline.
      </p>
    </div>
    <div class="wrapper_container is-wide-screen lesson_container">
      <LessonCard
        v-for="lesson in lessons"
        :lesson="lesson"
        :key="lesson.title"
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
          bgColor: "background: #37b955",
          description: this.$t("description4"),
          filename: "lesson_cards/pollution.jpg",
          link: {
            name: allLessons[this.$i18n.locale][3].pages[0].i18nRoute,
          },
          boxShadow:"box-shadow: 0px -20px 79px 23px #37b955;"
        },
        {
          title: this.$t("lesson3"),
          description: this.$t("description3"),
          filename: "lesson_cards/pollination.jpg",
          link: { name: allLessons[this.$i18n.locale][2].pages[0].i18nRoute },
          bgColor: "background: #8db850",
          boxShadow:"box-shadow: 0px -20px 79px 23px #8db850;"

        },
         {
          title: this.$t("lesson2"),
          description: this.$t("description2"),
          filename: "lesson_cards/inspiration.jpg",
          link: { name: allLessons[this.$i18n.locale][1].pages[0].i18nRoute },
          bgColor: "background: #4f7840",
          boxShadow:"box-shadow: 0px -20px 79px 23px #4f7840;"
        },
        {
          title: this.$t("lesson1"),
          description: this.$t("description1"),
          filename: "lesson_cards/food.jpg",
          link: { name: allLessons[this.$i18n.locale][0].pages[0].i18nRoute },
          bgColor: "background: #a18442",
          boxShadow:"box-shadow: 0px -20px 79px 23px #a18442;"
        },
       
        // {
        //   title: this.$t("lesson5"),
        //   description: this.$t("description5"),
        //   filename: "index/companionship.png",
        //   link: { name: allLessons[this.$i18n.locale][4].pages[0].i18nRoute },
        // },
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
  grid-gap:7px;
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
