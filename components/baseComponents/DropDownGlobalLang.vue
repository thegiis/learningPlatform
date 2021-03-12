<template>
  <div class="dropdown" :class="{ 'is-active': isActive }">
    <div class="select is-info">
      <select @change="setLocale($event)">
        <option 
          v-for="locale in availableLocales"
          :key="locale.code"
          class="dropdown-item"
          :class="currentClass(locale)">{{ locale.name }}</option>
      </select>
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
    setLocale(event) {
      const selectedLocale = this.$i18n.locales.filter((i) => i.name === event.target.value)[0].code;
      this.$i18n.setLocale(selectedLocale)
      this.$cookiz.set("lang", selectedLocale, {
        maxAge: 60 * 60 * 24 * 365 * 10,
      });
      this.dropdown();
    }
  },
};
</script>

<style scoped>
.lang-dropdown {
  margin-left: 0.5rem;
  text-transform: capitalize;
}
a.nuxt-link-exact-active {
  color: navy;
}
.dropdown-icon svg{
  fill: gray;
  width: 60%;
}
</style>