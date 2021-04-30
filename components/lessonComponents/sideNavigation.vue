<template>
  <div
    class="topBanner"
    :class="{ sticky: hasScrolled }"
    ref="sideNavbar"
    v-if="insideLesson"
  >
    <div :class="$style.expandContent">
      <i class="fas fa-clipboard-list" @click="openPanel()"></i>
      <p :class="$style.hoverText">Table of Contents</p>
    </div>
    <sideNavigationList
      :modules="modules"
      class="stickyPanel"
      :class="panelClass()"
      @onClose="closePanel()"
      :key = sideNavkey
    />
  </div>
</template>

<script>
import lessonMap from "@/assets/data/lessonsMap.json";
import sideNavigationList from "@/components/lessonComponents/sideNavigationList.vue";
import {getPageNamesFromMap, getModulesFromMap} from "@/utils/utils.js"

export default {
  components: {
    sideNavigationList,
  },
  data() {
    return {
      hasScrolled: false,
      stickyVal: 0,
      pages: [],
      modules: [],
      showPanel: false,
      sideNavkey: 0
    };
  },
  created() {
    this.pages = getPageNamesFromMap(lessonMap)
    this.modules = getModulesFromMap(lessonMap)
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);
    if (this.insideLesson) {
      this.stickyVal = this.$refs["sideNavbar"].offsetTop;
    }
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  watch: {
    // to close menu on changing routes
    $route: function (val) {
      this.showPanel = false
      this.$emit('openNav', false)
      this.sideNavkey += 1
    },
  },
  computed: {
    insideLesson() {
      const currentRouteName = this.$route.name.split("__")[0];
      if (this.pages.indexOf(currentRouteName) > -1) {
        return true;
      }
      return false;
    },
  },

  methods: {
    handleScroll() {
      if (window.pageYOffset >= this.stickyVal) {
        this.hasScrolled = true;
        this.$emit("sticky", true);
      } else {
        this.hasScrolled = false;
        this.$emit("sticky", false);
      }
    },
    openPanel() {
      this.showPanel = true;
      this.$emit('openNav', true)
    },
    closePanel() {
      this.showPanel = false;
      this.$emit('openNav', false)
    },
    panelClass() {
      if (this.showPanel) {
        return "openPanel";
      } else {
        return "closePanel";
      }
    },
  },
};
</script>

<style scoped>
.topBanner {
  position: relative;
  width: 100%;
  background-color: darkslategray;
  height: 60px;
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
<style module>
.expandContent {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  cursor: pointer;
  font-size: 25px;
  padding: 0.5rem 1rem;
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