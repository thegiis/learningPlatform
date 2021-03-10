<template>
  <div :class="$style.cardContainer">
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
          link: { name: "pollination-page1___" + this.$i18n.locale },
        },
        {
          title: this.$t("lesson2"),
          description: this.$t("description2"),
          filename: "index/hiking.png",
          link: { name: "pollination-page1___" + this.$i18n.locale },
        },
        {
          title: this.$t("lesson3"),
          description: this.$t("description3"),
          filename: "index/pollination.png",
          link: { name: "pollination-page1___" + this.$i18n.locale },
        },
        {
          title: this.$t("lesson4"),
          description: this.$t("description4"),
          filename: "index/pollution.jpg",
          link: { name: "pollination-page1___" + this.$i18n.locale },
        },
        {
          title: this.$t("lesson5"),
          description: this.$t("description5"),
          filename: "index/companion.jpg",
          link: { name: "pollination-page1___" + this.$i18n.locale },
        },
        {
          title: this.$t("lesson6"),
          description: this.$t("description6"),
          filename: "index/jump.svg",
          link: { name: "pollination-page1___" + this.$i18n.locale },
        },
      ],
    };
  },
  mounted() {
    // console.log(this.$i18n.messages)
  },
};
</script>

<style  module>
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
</style>
