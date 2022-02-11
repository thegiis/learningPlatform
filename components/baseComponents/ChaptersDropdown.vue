<template>
  <div class="dropdown" :class="{ 'is-active': isActive }">
    <nuxt-link
      :to="{ name: 'index___' + this.$i18n.locale }"
      class="navbar-item"
    >
      {{ $t("chapters") }}
    </nuxt-link>
    <div class="dropdown-trigger">
      <button
        class="button ovalButton"
        :class="{ 'is-active': isActive }"
        aria-haspopup="true"
        aria-controls="dropdown-menu6"
        @click="dropdown()"
      >
        <img :src="currentImage" />
      </button>
    </div>
    <div class="dropdown-menu" id="dropdown-menu6" role="menu">
      <div class="dropdown-content">
        <nuxt-link
          @click.native="setLocale(locale.code)"
          v-for="locale in availableLocales"
          :key="locale.code"
          class="dropdown-item"
          :class="currentClass(locale)"
          :to="switchLocalePath(locale.code)"
          >{{ locale.name }}</nuxt-link
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
    availableLocales() {
      // return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale);
      return this.$i18n.locales;
    },
    currentImage() {
      if (this.$i18n.locale === "en") {
        return "/img/english.png";
      } else if (this.$i18n.locale === "np") {
        return "/img/nepali.png";
      } else {
        return "/img/english.png";
      }
    },
    lessons() {
      return [
        {
          title: this.$t("lesson1"),
          link: { name: "pollination___" + this.$i18n.locale },
        },
        {
          title: this.$t("lesson2"),
          link: { name: "pollination___" + this.$i18n.locale },
        },
        {
          title: this.$t("lesson3"),
          link: { name: "pollination___" + this.$i18n.locale },
        },
        {
          title: this.$t("lesson4"),
          link: { name: "pollination___" + this.$i18n.locale },
        },
        {
          title: this.$t("lesson5"),
          link: { name: "pollination___" + this.$i18n.locale },
        },
        {
          title: this.$t("lesson6"),
          link: { name: "pollination___" + this.$i18n.locale },
        },
      ];
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
    setLocale(locale) {
      this.dropdown();
      this.$cookiz.set("lang", locale, {
        maxAge: 60 * 60 * 24 * 365 * 10,
        path: "/" + process.env.modalName,
      });
    },
  },
};
</script>
<style scoped>
#icon-language {
  fill: orange;
}
.lang-dropdown {
  margin-left: 0.5rem;
  color: orange;
  text-transform: uppercase;
}
a.nuxt-link-exact-active {
  color: var(--green-secondary);
}
</style>
