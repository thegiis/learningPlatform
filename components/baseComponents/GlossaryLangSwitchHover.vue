<template>
  <div class="dropdown hover-drop-down" :class="{ 'is-active': isActive }">
    <div class="dropdown-trigger">
      <button
        class="button glossary-lang-switch"
        aria-haspopup="true"
        aria-controls="dropdown-menu6"
        @click="dropdown()"
      >
        <span class="lang-dropdown">{{ $t("selectTranslation") }}</span>

        <span class="icon is-small">
          <i class="fas fa-chevron-down"></i>
        </span>
      </button>
    </div>
    <div class="dropdown-menu custom-menu" id="dropdown-menu6" role="menu">
      <div class="dropdown-content">
        <a
          @click="setGlossaryLocale(locale.code)"
          v-for="locale in availableLocales"
          :key="locale.code"
          class="dropdown-item"
          :class="currentClass(locale)"
          >{{ locale.name }}</a
        >
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isActive: false,
    };
  },
  computed: {
    currentLocale() {
      const temp = this.$i18n.locales.filter(
        (i) => i.code === this.$store.state.lesson.vocabLocale
      )[0];
      return temp.name;
    },
    availableLocales() {
      // return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale);
      return this.$i18n.locales;
    },
  },
  methods: {
    dropdown() {
      this.isActive = !this.isActive;
    },
    currentClass(locale) {
      const curLocale = this.$i18n.locales.filter(
        (i) => i.code == this.$i18n.locale
      )[0];
      if (locale.name == curLocale.name) {
        return "activeLink";
      } else {
        return "normalLink";
      }
    },
    // change locale for vocab in store as well
    setGlossaryLocale(locale) {
      this.$cookiz.set("glossaryLang", locale, {
        maxAge: 60 * 60 * 24 * 365 * 10,
        path: "/",
      });
      this.$store.dispatch("lesson/setVocabLocale", locale);
      this.dropdown();
    },
  },
};
</script>

<style scoped>
#icon-glossary {
  fill: orange;
}
.lang-dropdown {
  position: relative;
  text-align: center;
  margin-left: 0.5rem;
}
a.nuxt-link-exact-active {
  color: navy;
}
.glossary-lang-switch {
  position: relative;
  background-color: lightgray;
  padding: 0.2rem 0.5rem;
  width: 100%;
  font-size: 1rem;
  min-width: 8rem;
  border: none;
  color: black;
  cursor: pointer;
  border-bottom-left-radius: 2rem;
  border-bottom-right-radius: 2rem;
}
.hover-drop-down {
  position: relative;
  margin-top: 1rem;
  margin-bottom: 0;
  border: none;
  width: 100%;
}
.hover-drop-down .dropdown-trigger {
  position: relative;
  width: 100%;
}
.custom-menu {
  left: 50%;
  transform: translateX(-50%);
  border: 2px solid orange;
  border-radius: 1rem;
  background-color: white;
  overflow: hidden;
}
</style>