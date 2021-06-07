<template>
  <section :class="$style.nextSection" v-if="showNextSection">
    <div :class="$style.topicTitleDiv">
      <div :class="$style.topicTitle">
        <p :class="$style.nextSection" class="is-size-5">Next Section</p>
        <nuxt-link
          :to="{ name: getNextLink }"
          class="button is-uppercase is-primary"
        >
          <span>{{ getTopic }}</span>
          <span :class="$style.rightArrow"
            ><i class="fas fa-angle-right"></i
          ></span>
        </nuxt-link>
      </div>
    </div>
  </section>
</template>

<script>
import lessonMap from "@/assets/data/lessonsMap.json";
import { getModulesFromMap } from "@/utils/utils.js";

export default {
  data() {
    return {
      currentPage: this.$route.name.split("__")[0],
      nextLink: this.$route.name,
      nextTopic: "",
      showNextSection: false,
    };
  },
  created() {
    const lang = this.$i18n.locale;
    const modules = getModulesFromMap(lessonMap);
    const currentLangModules = modules.map((x) => x[lang]);
    let i = 0;

    while (i < currentLangModules.length) {
      const tempModule = currentLangModules[i];
      const pageIdx = tempModule.routes.indexOf(this.currentPage);
      const totalPages = tempModule.routes.length;
      if (pageIdx > -1) {
        if (pageIdx < totalPages) {
          this.nextLink =
            tempModule.routes[pageIdx + 1] + "___" + this.$i18n.locale;
          this.nextTopic = tempModule.pageNames[pageIdx + 1];
          this.showNextSection = true;
        }
      }
      i++;
    }
  },
  computed: {
    getTopic() {
      return this.nextTopic;
    },
    getNextLink() {
      return this.nextLink;
    },
  },
};
</script>

<style module>
.nextSection {
  margin-top: auto;
  margin-bottom: auto;
}
.topicIndicator {
  border-bottom: 1px solid darkgray;
  font-size: 1.2rem;
  padding: 0.5rem;
}
.topicTitleDiv {
  border: 1px solid darkgray;
  padding: 0.5rem;
  border-radius: 0.3rem;
}
.topicTitle {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.rightArrow {
  padding-left: 0.5rem;
  padding-top: 0.1rem;
}
</style>
