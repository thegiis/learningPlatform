<template>
  <nav
    class="breadcrumb has-succeeds-separator is-medium"
    :class="$style.breadcrumbContainer"
    aria-label="breadcrumbs"
  >
    <ul>
      <li>
        <nuxt-link :to="{ name: 'index___' + this.$i18n.locale }"
          >Home</nuxt-link
        >
      </li>
      <li>
        <nuxt-link :to="{ name: parent.route}"
          >{{parent.title}}</nuxt-link
        >
      </li>
      <li class='is-active'>
        <nuxt-link :to="{ name: $route.name}" aria-current="page"
          >{{current}}</nuxt-link
        >
      </li>
    </ul>
  </nav>
</template>

<script>
import lessonMap from "@/assets/data/lessonsMap.json";
import { getModulesFromMap } from "@/utils/utils.js";

export default {
  data() {
    return {
      modules: [],
      currentPage: this.$route.name.split("__")[0],
      currentLangModules: [],
      parent: {},
      current: "",
    };
  },
  created() {
    const lang = this.$i18n.locale;
    this.modules = getModulesFromMap(lessonMap);
    this.currentLangModules = this.modules.map((x) => x[lang]);
    let i = 0;

    while (i < this.currentLangModules.length) {
      const tempModule = this.currentLangModules[i];
      const pageIdx = tempModule.routes.indexOf(this.currentPage);
      if (pageIdx > -1) {
        const parentRoute =
          this.currentPage.split("-")[0] + "___" + this.$i18n.locale;
        this.parent = { title: tempModule.title, route: parentRoute };
        this.current = tempModule.pageNames[pageIdx];
      }
      i++;
    }
  },
};
</script>

<style module>
.breadcrumbContainer {
  width: 100%;
}
</style>
