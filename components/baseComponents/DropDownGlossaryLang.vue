<template>
  <div class="dropdown" :class="{ 'is-active': isActive }">
    <div class="select is-info">
      <select @change="setGlossaryLocale($event)">
        <option
          v-for="locale in availableLocales"
          :key="locale.code"
          class="dropdown-item"
          :class="currentClass(locale)"
        >
          {{ locale.name }}
        </option>
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
    currentLocale() {
      const temp = this.$i18n.locales.filter(
        (i) => i.code === this.$store.state.lesson.vocabLocale
      )[0];
      return temp.name;
    },
    availableLocales() {
      let current = [];
      let available = [];
      const currentLoc = this.$store.state.lesson.vocabLocale;
      this.$i18n.locales.forEach(function (locale) {
        if (locale.code === currentLoc) {
          current.push(locale);
        } else {
          available.push(locale);
        }
      });
      const all = current.concat(available);
      return all;
    },
  },
  created() {
    // console.log(this.$store.state.lesson.vocabLocale);
  },
  methods: {
    setGlossaryLocale(event) {
      const selectedLocale = this.$i18n.locales.filter(
        (i) => i.name === event.target.value
      )[0].code;

      this.$cookiz.set("glossaryLang", selectedLocale, {
        maxAge: 60 * 60 * 24 * 365 * 10,
        path: "/" + process.env.modalName,
      });
      this.$store.dispatch("lesson/setVocabLocale", selectedLocale);
      this.dropdown();
    },
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
  },
};
</script>

<style scoped>
.lang-dropdown {
  margin-left: 0.5rem;
  text-transform: capitalize;
}
</style>