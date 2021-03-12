<template>
  <div class="container is-max-desktop" :class="$style.indexPage">
    <LessonBreadcrumbs :data="bcData" />
    <h1 :class="$style.title">{{ $t("title") }}</h1>
    <h2 :class="$style.contentsHeader">{{ $t("overview") }}</h2>
    <div :class="$style.lessonContent">
      <div :class="$style.contentItem" v-for="(page, idx) in pages" :key="idx">
        <div
          :class="$style.indexContainer"
          v-if="idx == pages.length - 1"
        ></div>
        <div
          :class="[$style.indexContainer, $style.indexContainerLine]"
          v-else
        ></div>

        <p :class="$style.index">{{ idx + "." }}</p>
        <nuxt-link :to="getLink(page)" :class="$style.sectionName">
          <p>
            {{ $t("pageNames")[idx] }}
          </p>
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
import data from "@/assets/data/pollination/index.json";
import LessonBreadcrumbs from "@/components/baseComponents/LessonBreadcrumbs.vue";

const msg = {
  en: data.en,
  np: data.np,
};

export default {
  components: {
    LessonBreadcrumbs,
  },
  i18n: {
    messages: msg,
  },
  data() {
    return {
      bcData: [{ name: this.$i18n.t("title"), link: { name: "pollination___" + this.$i18n.locale }}],
      title: data.title,
      pages: data.pages,
    };
  },
  created() {
    // console.log(this.$cookiz.get('lang'))
    console.log(this.$store.state.lesson.vocabLocale)
  },
  methods: {
    getLink(page) {
      const name = this.title + "-" + page + "___" + this.$i18n.locale;
      return { name: name };
    },
  },
};
</script>

<style module>
.indexPage {
  position: relative;
  padding: 2rem;
  background-color: #efefef;
}
.lessonContent {
  position: relative;
}
.title {
  font-size: 2.25rem;
  text-align: center;
  margin: 1rem;
  color: darkblue;
  text-decoration: underline;
}
.contentsHeader {
  font-weight: bold;
  font-size: 1.625rem;
  width: 100%;
  text-align: left;
  color: #22c688;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-bottom: 1px solid gray;
}
.contentItem {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  margin: 1rem;
}
.contentItem:hover .indexContainer {
  background-color: #22c688;
}
.contentItem:hover p {
  color: orange;
}
.indexContainer {
  position: relative;
  width: 32px;
  height: 32px;
  border: 2px solid#22C688;
  border-radius: 50%;
  margin-right: 0.5rem;
  transition: 0.2s linear;
}
.indexContainerLine:after {
  content: "";
  width: 1px;
  height: 1.5rem;
  background-color: #22c688;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  top: 100%;
}
.index {
  font-weight: bold;
  margin: 0 0.5rem;
  color: #22c688;
  font-size: 1.5rem;
}
.sectionName {
  margin: 0 0.5rem;
  color: #22c688;
  font-size: 1.4rem;
}
</style>
