<template>
  <div
    class="topBanner"
    :class="{ sticky: hasScrolled }"
    ref="sideNavbar"
    :key="navkey"
    v-if="checkSideNav"
  >
    <div :class="$style.expandContent">
      <i class="fas fa-bars" @click="openPanel()"></i>
      <p :class="$style.hoverText">Table of Contents</p>
    </div>
    <sideNavigationList
      :modules="modules"
      class="stickyPanel"
      :class="panelClass()"
      @onClose="closePanel()"
      :key="sideNavkey"
    />
  </div>
</template>

<script>
import lessonMap from "@/assets/data/lessonsMap.json";
import sideNavigationList from "@/components/lessonComponents/sideNavigationList.vue";
import {
  getPageNamesFromMap,
  getModulesFromMap,
  getLessonsFromModules,
} from "@/utils/utils.js";

export default {
  components: {
    sideNavigationList,
  },
  data() {
    return {
      hasScrolled: false,
      stickyVal: 148, //height of top navbar
      pages: [],
      modules: [],
      showPanel: false,
      sideNavkey: 0,
      navkey: 0,
    };
  },
  created() {
    this.pages = getPageNamesFromMap(lessonMap);
    this.modules =
      this.$store.state.lesson.modules.length === 0
        ? getModulesFromMap(lessonMap)
        : this.$store.state.lesson.modules;

    const lang = this.$i18n.locale;
    const currentModules = this.modules.map((x) => x[lang]);
    const currentPage = this.$route.name.split("__")[0];
    for (let i = 0; i < currentModules.length; i++) {
      const currModule = currentModules[i];
      const pages = currModule.routes;
      const pageIdx = pages.indexOf(currentPage);
      if (pageIdx > -1) {
        const videoTag = currentModules[i].pageNames[0];
        const currentVideoId = videoTag.split("___")[1];
        this.$store.dispatch("lesson/setVideoId", currentVideoId);
      }
    }
    const allLessons = getLessonsFromModules(this.modules);
    this.$store.dispatch("lesson/setAllLessons", allLessons);
    this.$store.dispatch("lesson/setModules", this.modules);
    this.setCurrentPageToState();
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    // if (this.insideLesson) {
    //   this.stickyVal = this.$refs["sideNavbar"].offsetTop;
    // }
  },
  updated() {
    this.setCurrentPageToState();
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  watch: {
    // to close menu on changing routes
    $route(to, from) {
      const path = to.path;
      const fromPath = from.path;
      if (path === "/") {
        this.$store.dispatch("global/resetSideNavigation");
      } else {
        this.$store.dispatch("global/setSideNavigation");
      }

      const toSplits = path.split("/");
      const fromSplits = fromPath.split("/");

      if (toSplits.length > fromSplits.length && path !== "/") {
        //this.showPanel = true;
        //this.$emit("openNav", true);
        this.sideNavkey += 1;
      } else {
        this.showPanel = false;
        this.$emit("openNav", false);
        this.sideNavkey += 1;
      }
    },
  },
  computed: {
    checkSideNav() {
      return this.$store.state.global.hasSideNavigation;
    },
  },

  methods: {
    handleScroll() {
      if (this.checkSideNav) {
        // console.log(window.pageYOffset, this.stickyVal);
        if (window.pageYOffset >= this.stickyVal) {
          this.hasScrolled = true;
          this.$emit("sticky", true);
        } else {
          this.hasScrolled = false;
          this.$emit("sticky", false);
        }
      }
    },
    openPanel() {
      this.showPanel = true;
      this.$emit("openNav", true);
    },
    closePanel() {
      this.showPanel = false;
      this.$emit("openNav", false);
    },
    panelClass() {
      if (this.showPanel) {
        return "openPanel";
      } else {
        return "closePanel";
      }
    },
    setCurrentPageToState() {
      const langPages = this.$store.state.lesson.allLessons[this.$i18n.locale];
      let currUrl = this.$route.name.split("-")[0].split("___")[0];
      let currChapter = {};

      if (currUrl === "index") {
        currUrl = langPages[0].id;
      }
      for (let i = 0; i < langPages.length; i++) {
        if (langPages[i].id === currUrl) {
          currChapter = { ...langPages[i] };
          break;
        }
      }
      let currentPage = {};
      for (let i = 0; i < currChapter.pages.length; i++) {
        if (currChapter.pages[i].i18nRoute === this.$route.name) {
          currentPage = { ...currChapter.pages[i], id: i };
          break;
        }
      }
      currChapter.currentPage = currentPage;
      this.$store.dispatch("lesson/setCurrentLessonLang", currChapter);
    },
  },
};
</script>

<style scoped>
.topBanner {
  position: relative;
  width: 100%;
  height: 40px;
  z-index: 1000;
}
.sticky {
  position: fixed;
  top: 0;
  width: 100%;
}
.sticky .stickyPanel {
  padding-bottom: 0;
}
.openPanel {
  left: 0px;
}
.closePanel {
  left: -420px;
}
</style>
<style module lang="scss">
@import "@/assets/styles/config";

.expandContent {
  position: relative;
  top: 61px;
  transform: translateY(-50%);
  color: black;
  cursor: pointer;
  font-size: 25px;
  padding: 0 0.25rem;
  max-width: 75rem;
  margin-left: auto;
  margin-right: auto;
  @include media-query("lg") {
    padding-left: 100px;
    padding-right: 100px;
  }
}
.expandContent:hover .hoverText {
  display: block;
}
.hoverText {
  display: none;
  position: absolute;
  top: 100%;
  font-size: 1.2rem;
  color: white;
  opacity: 0.8;
  background-color: dimgray;
  padding: 0.25rem 1rem;
  border-radius: 0.25rem;
}
</style>
