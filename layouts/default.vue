<template>
  <div>
    <BaseNavigation @openGlossary="openGlossary()"/>
    <SideNavigation @sticky="handleSticky" @openNav="handleOpen" />
    <div
      class="container is-widescreen"
      :class="$style.paddedContainer"
      ref="mainContainer"
    >
      <div :class="containerClass"></div>
      <Nuxt />
      <BaseGlossary v-if="showGlossary" @closeGlossary="closeGlossary()"/>
    </div>
    <CardVocab v-if="$store.state.lesson.showVocab" />
    <ModalLangSelect />
  </div>
</template>

<script>
import BaseNavigation from "@/components/baseComponents/BaseNavigation.vue";
import CardVocab from "@/components/baseComponents/CardVocab.vue";
import SideNavigation from "@/components/lessonComponents/sideNavigation.vue";
import BaseGlossary from "@/components/glossaryOverlay/baseGlossary.vue";
import ModalLangSelect from "@/components/baseComponents/ModalLangSelect.vue";

export default {
  components: {
    BaseNavigation,
    CardVocab,
    SideNavigation,
    BaseGlossary,
    ModalLangSelect
  },
  data() {
    return {
      showNav: false,
      showGlossary: false
    };
  },
  created() {
    const storedLocale = this.$cookiz.get("lang");
    const storedGlossaryLocale = this.$cookiz.get("glossaryLang");

    if (storedGlossaryLocale !== undefined) {
      this.$store.dispatch("lesson/setVocabLocale", storedGlossaryLocale);
    }
    if (storedLocale !== undefined) {
      this.$i18n.setLocale(storedLocale);
    }
    if (storedLocale !== undefined && storedGlossaryLocale !== undefined) {
      this.$store.dispatch("global/setIsFirstVisit", false);
    }
  },
  computed: {
    containerClass() {
      if (this.showNav) {
        return this.$style.navOpenContainer;
      }
      return this.$style.navOpenContainerClosed;
    },
  },
  methods: {
    handleSticky(val) {
      //to handle sticky navbar for contents
      const mainContainer = this.$refs["mainContainer"];
      if (val) {
        mainContainer.style.paddingTop = "60px";
      } else {
        mainContainer.style.paddingTop = "0";
      }
    },
    handleOpen(val) {
      this.showNav = val;
    },
    closeGlossary(){
      this.showGlossary = false
    },
    openGlossary(){
      this.showGlossary = true
    }
  },
};
</script>

<style module>
.paddedContainer {
  position: relative;
  display: flex;
  flex-direction: row;
  padding-top: 0;
}
.navOpenContainer {
  position: relative;
  height: 100vh;
  width: 420px;
  animation: growWidth 0.2s linear forwards;
}
@keyframes growWidth {
  from {
    width: 0px;
  }
}
.navOpenContainerClosed {
  position: relative;
  height: 100vh;
  width: 420px;
  animation: shrinkWidth 0.2s linear forwards;
}
@keyframes shrinkWidth {
  to {
    width: 0px;
  }
}
</style>
