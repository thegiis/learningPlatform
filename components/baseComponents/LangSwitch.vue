<template>
  <div class="languageBar">
    <nuxt-link
      v-for="locale in availableLocales"
      :key="locale.code"
      :class="currentClass(locale)"
      :to="switchLocalePath(locale.code)"
      >{{ locale.name }}</nuxt-link
    >
  </div>
</template>
<script>
export default {
  computed: {
    availableLocales() {
      // return this.$i18n.locales.filter((i) => i.code !== this.$i18n.locale);
      return this.$i18n.locales;
    },
  },
  methods: {
    currentClass(locale) {
      const curLocale = this.$i18n.locales.filter((i) => i.code == this.$i18n.locale)[0]
      if (locale.name == curLocale.name){
        return 'activeLink'
      } else {
        return 'normalLink'
      }
    }
  }
};
</script>

<style scoped>
.languageBar {
  display: flex;
  width: auto;
  padding: 1rem;
  color: darkcyan;
}
.languageBar a {
  font-size: 1.2rem;
  float: right;
  margin: 0 1rem;
  text-decoration: none;
}
.languageBar a:visited,
.languageBar a:link {
  color: green;
}
.activeLink{
  color: navy;
}
.languageBar a.nuxt-link-exact-active{
  color: navy;
}
</style>