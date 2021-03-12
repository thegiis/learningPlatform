<template>
  <div class="dropdown" :class="{ 'is-active': isActive }">
    <div class="dropdown-trigger">
      <button
        class="button"
        aria-haspopup="true"
        aria-controls="dropdown-menu6"
        @click="dropdown()"
      >
        <span class="lang-dropdown">{{ currentLocale }}</span>
        <span class="icon is-small dropdown-icon">
          <svg viewBox="0 0 451.8 451.8">
            <path
              d="M225.9,354.7a31.2,31.2,0,0,1-22.3-9.3L9.3,151.2A31.6,31.6,0,0,1,54,106.4L225.9,278.3,397.8,106.4a31.7,31.7,0,1,1,44.8,44.8L248.3,345.4A31.6,31.6,0,0,1,225.9,354.7Z"
            />
          </svg>
        </span>
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
    currentLocale(){
      const temp = this.$i18n.locales.filter((i) => i.code === this.$i18n.locale)[0]
      return temp.name
    },
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
    setLocale(locale) {
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