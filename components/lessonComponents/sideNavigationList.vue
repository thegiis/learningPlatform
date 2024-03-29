<template>
  <div :class="$style.sidePanel">
    <div :class="$style.contentHeader">
      <div class="subtitle is-4 text-primary" :id="$style.toc">Table of Contents</div>
      <span @click="closePanel" :class="$style.closeButton">
        <i class="fas fa-times" :class="$style.iconFont"></i>
      </span>
    </div>
    <div :class="$style.linkContainer">
      <aside class="menu">
        <ul
          class="menu-list"
          v-for="(module, idx) in currentModules"
          :key="idx"
        >
        
          <li class="dropdown" :class="currentChapter(module.routes)">
            <div class="dropdown-trigger">
              <button
                :class="$style.customDropDownButton"
                aria-haspopup="true"
                aria-controls="dropdown-menu"
              >
                <span class="subtitle is-5 nav_subtitle">{{ module.title }}</span>
              </button>
            </div>
            <div
              class="dropdown-menu"
              :class="$style.customMenu"
              id="dropdown-menu"
              role="menu"
            >
              <ul
                class="dropdown-item"
                :id="currentTopic(module.routes[idx])"
                v-for="(page, idx) in module.pageNames"
                :key="idx"
                @click="closePanel"
              >
                <nuxt-link :to="getLink(module.routes[idx])">
                  <div v-if="checkThumb(page)">
                    <VideoThumb :youtubeId="getVid(page)"> </VideoThumb>
                  </div>
                  <span class="nav_subtitle2" v-else
                    ><hr class="dropdown-divider" />
                    {{ page }}</span>
                </nuxt-link>
              </ul>
              <ul
                class="dropdown-item"
                :id="currentTopic('glossary')"
                @click="closePanel"
              >
                <nuxt-link :to="getGlossaryLink()">
                  <span class="nav_subtitle2">
                    <hr class="dropdown-divider" />
                    Glossary</span
                  >
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
      const currentLesson = [this.$store.state.lesson.currentLessonLang];
      return currentLesson;
    },
    currRoute() {
      if (this.$route.name.split("-")[1]) {
        return this.$route.name.split("-")[1].split("___")[0];
      }
      return "index";
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
    getGlossaryLink() {
      return {
        name:
          this.currentPage.split("-")[0] + "-glossary___" + this.$i18n.locale,
      };
    },
    currentChapter(pages) {
      if (
        pages.indexOf(this.currentPage) > -1 ||
        this.currRoute === "glossary"
      ) {
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
        return this.$style.customDropDownContentActiveTopic;
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
  width: auto;
  transition: left 0.3s ease 0s;
  box-shadow: rgb(0 0 0 / 27%) 0px 4px 6px 2px;
  overflow-y: auto;
}
.closedPanel {
  left: -420px;
}
.contentHeader {
  width: 100%;
  padding: 0.5rem;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  font-size: 1.5rem;
}
.closeButton {
  cursor: pointer;
  position: relative;
  right: 3px;
  top: -3px;
}
.linkContainer {
  position: relative;
}
.customDropDown {
  display: flex;
  flex-direction: column;
}
.customMenu {
  position: relative;
}
.customMenu:last-child {
  margin-bottom: 1rem;
}
#customDropDownContent,
#customDropDownContentActiveTopic {
  box-shadow: none;
  padding-top: 0.2rem;
  padding-bottom: 0.2rem;
  border-left: 0px;
  margin: 0px;
}
#customDropDownContent a,
#customDropDownContentActiveTopic a {
  margin: 0px;
  padding-top: 0px;
  padding-bottom: 0px;
}
#customDropDownContentActiveTopic a {
  color: var(--green-secondary);
}
.customDropDownButton {
  cursor: pointer;
  border: none;
  font-size: 1rem;
  background-color: transparent;
  margin-bottom: 0.5rem;
}
.customDropDownButton:hover {
  color: blueviolet;
}
.activeChapter .customDropDownButton {
  color: var(--green-secondary);
}
.iconFont {
  font-size: 1rem;
}
.angleIcon {
  padding-top: 0.1rem;
}
#toc {
  margin-bottom: 0px;
}
</style>
<style scoped>
.is-active button .icon {
  transform: rotate(90deg);
}
</style>
