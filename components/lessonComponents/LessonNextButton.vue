<template>
  <nuxt-link
    :to="{ name: getNextLink }"
    class="button is-uppercase is-primary"
    v-if="nextLink"
  >
    <span>Learn</span>
    <span :class="$style.rightArrow"><i class="fas fa-angle-right"></i></span>
  </nuxt-link>
</template>

<script>
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
    const modules = this.$store.state.lesson.modules;
    const currentLangModules = modules.map((x) => x[lang]);
    let i = 0;

    while (i < currentLangModules.length) {
      const tempModule = currentLangModules[i];
      const pageIdx = tempModule.routes.indexOf(this.currentPage);
      const totalPages = tempModule.routes.length;
      if (pageIdx > -1) {
        if (pageIdx < totalPages) {
          if (tempModule.routes[pageIdx + 1]) {
            this.nextLink =
              tempModule.routes[pageIdx + 1] + "___" + this.$i18n.locale;
            this.nextTopic = tempModule.pageNames[pageIdx + 1];
            this.showNextSection = true;
          } else {
            this.nextLink = undefined;
            this.nextTopic = undefined;
            this.showNextSection = false;
          }
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
.rightArrow {
  padding-left: 0.5rem;
  padding-top: 0.1rem;
}
</style>
