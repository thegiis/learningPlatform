<template>
  <div :class="$style.sidePanel">
    <div :class="$style.contentHeader">
      <div class="contentTitle">Table of Contents</div>
      <span @click="closePanel" :class="$style.closeButton"
        ><i class="fas fa-times"></i
      ></span>
    </div>
    <div :class="$style.linkContainer">
      <aside class="menu">
        <ul
          class="menu-list"
          v-for="(module, idx) in currentModules"
          :key="idx"
        >
          <li
            class="dropdown"
            :class="currentChapter(module.routes)"
            @click="handleDropDown($event.currentTarget)"
          >
            <div class="dropdown-trigger">
              <button
                :class="$style.customDropDownButton"
                aria-haspopup="true"
                aria-controls="dropdown-menu"
              >
                <span class="icon is-small">
                  <i class="fas fa-angle-right" aria-hidden="true"></i>
                </span>
                <span>{{ module.title }}</span>
              </button>
            </div>
            <div
              class="dropdown-menu"
              :class="$style.customMenu"
              id="dropdown-menu"
              role="menu"
            >
              <ul
                class="dropdown-content"
                :class="currentTopic(module.routes[idx])"
                v-for="(page, idx) in module.pageNames"
                :key="idx"
                @click="closePanel"
              >
                <nuxt-link :to="getLink(module.routes[idx])">
                  <div v-if="checkThumb(page)">
                    <VideoThumb :youtubeId="getVid(page)"> </VideoThumb>
                  </div>
                  <span v-else>{{ page }}</span>
                </nuxt-link>
              </ul>
            </div>
          </li>
        </ul>
      </aside>
    </div>
  </div>
</template>

<script>
import VideoThumb from "@/components/lessonComponents/VideoThumb.vue";

export default {
  components: {
    VideoThumb,
  },
  props: {
    modules: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      currentPage: this.$route.name.split("__")[0],
    };
  },
  created() {},
  computed: {
    currentModules() {
      const lang = this.$i18n.locale;
      return this.modules.map((x) => x[lang]);
    },
  },
  methods: {
    closePanel() {
      this.$emit("onClose", true);
    },
    handleDropDown(target) {
      target.classList.toggle("is-active");
    },
    getLink(route) {
      return { name: route + "___" + this.$i18n.locale };
    },
    currentChapter(pages) {
      if (pages.indexOf(this.currentPage) > -1) {
        return [
          this.$style.customDropDown,
          this.$style.activeChapter,
          "is-active",
        ];
      }
      return this.$style.customDropDown;
    },
    currentTopic(page) {
      if (page == this.currentPage) {
        return [this.$style.customDropDownContent, this.$style.activeTopic];
      }
      return this.$style.customDropDownContent;
    },
    checkThumb(page) {
      const splits = page.split("___");
      if (splits.length === 1) {
        return false;
      } else {
        return true;
      }
    },
    getVid(page) {
      // video id is in lessonmap as lesson name
      const splits = page.split("___");
      return splits[1];
    },
  },
};
</script>

<style module>
.sidePanel {
  position: absolute;
  top: 0%;
  height: 100vh;
  left: 0px;
  z-index: 5;
  padding: 0px;
  background-color: white;
  padding-bottom: 56px;
  width: 420px;
  transition: left 0.3s ease 0s;
  box-shadow: rgb(0 0 0 / 27%) 0px 4px 6px 2px;
  overflow-y: auto;
}
.closedPanel {
  left: -420px;
}
.contentHeader {
  width: 100%;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 1.5rem;
}
.closeButton {
  cursor: pointer;
}
.linkContainer {
  position: relative;
  padding: 1rem;
}
.customDropDown {
  display: flex;
  flex-direction: column;
}
.customMenu {
  position: relative;
}
.customDropDownContent {
  box-shadow: none;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
}
.customDropDownButton {
  cursor: pointer;
  border: none;
  font-size: 1.5rem;
  background-color: transparent;
  margin-bottom: 0.5rem;
}
.customDropDownButton:hover {
  color: blueviolet;
}
.activeChapter .customDropDownButton {
  color: palevioletred;
}
.activeTopic a {
  color: palevioletred;
}
</style>
<style scoped>
.is-active button .icon {
  transform: rotate(90deg);
}
</style>