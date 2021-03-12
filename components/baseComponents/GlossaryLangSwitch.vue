<template>
  <div class="dropdown" :class="{ 'is-active': isActive }">
    <div class="dropdown-trigger">
      <button
        class="button glossary-lang-switch"
        aria-haspopup="true"
        aria-controls="dropdown-menu6"
        @click="dropdown()"
      >
        <span class="icon is-small">
          <svg id="icon-glossary" viewBox="0 0 512 512">
            <path
              d="M483.3,175.6v-80A37.2,37.2,0,0,0,466,64.1L431.8,42.3V10a10,10,0,0,0-10-10H304.9a10,10,0,0,0,0,20H411.8V389H109.2V20H217a10,10,0,0,0,0-20H90.2C51.8,0,28.7,32.3,28.7,68c0,14.4.2,349.8.1,379.1C28.6,481.7,54.2,512,90.2,512H421.8a10,10,0,0,0,10-10V377.9L466,356.1a37.3,37.3,0,0,0,17.3-31.5v-80A37.2,37.2,0,0,0,466,213.1l-4.7-3,4.7-3a37.2,37.2,0,0,0,17.3-31.5ZM88.3,389a61.9,61.9,0,0,0-39.5,16.1V68c0-24.5,13.4-47.3,40.4-48V389Zm1.9,103c-22.8,0-41.8-19.3-41.4-42.1A41.6,41.6,0,0,1,90.2,409H411.8v32.9H99.2a10,10,0,0,0,0,20H411.8V492ZM463.3,324.6a17.1,17.1,0,0,1-8.1,14.6l-23.4,15V228.9l10.9-6.9,12.5,7.9a17.2,17.2,0,0,1,8.1,14.7Zm0-149a17.1,17.1,0,0,1-8.1,14.6l-23.4,15V66l23.4,15a17.1,17.1,0,0,1,8.1,14.6Z"
            />
            <path
              d="M159.9,178.6l4.8-12.6h32.8l4.7,12.5a10.2,10.2,0,0,0,12.9,5.9,10,10,0,0,0,5.8-12.9L192.2,95.3,192,95a11.6,11.6,0,0,0-10.8-7.3h0A11.8,11.8,0,0,0,170.3,95v.3l-29,76.1a10,10,0,1,0,18.7,7.2Zm21.2-55.8,8.8,23.2H172.3Z"
            />
            <path
              d="M309.2,179.8a9.9,9.9,0,0,0,8.7,5.2h51.6a10,10,0,0,0,0-20H336.4l40.3-61.8a10.1,10.1,0,0,0,.4-10.2,10,10,0,0,0-8.8-5.3H319.5a10,10,0,0,0,0,20h30.3l-40.2,61.8A10,10,0,0,0,309.2,179.8Z"
            />
            <path
              d="M246.2,146.4H286a10,10,0,0,0,0-20H246.2a10,10,0,0,0,0,20Z"
            />
            <path
              d="M140.5,278a45.2,45.2,0,0,0,45.1,45.1H334.4a45.1,45.1,0,1,0,0-90.1H185.6a45.2,45.2,0,0,0-45.1,45Zm219,0a25.1,25.1,0,0,1-25.1,25.1H185.6a25.1,25.1,0,1,1,0-50.1H334.4A25.1,25.1,0,0,1,359.5,278Z"
            />
            <path
              d="M252,13.8a10,10,0,0,0,18.9-1.1c2.4-8.6-7.2-15.8-14.8-11.3A10.2,10.2,0,0,0,252,13.8Z"
            />
          </svg>
        </span>
        <span class="lang-dropdown">{{ currentLocale }}</span>
      </button>
    </div>
    <div class="dropdown-menu" id="dropdown-menu6" role="menu">
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
      this.$cookiz.set("glossaryLang", locale);
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
  margin-left: 0.5rem;
  color: orange;
  text-transform: uppercase;
}
a.nuxt-link-exact-active {
  color: navy;
}
.glossary-lang-switch {
  min-width: 8rem;
}
</style>