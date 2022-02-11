<template>
  <div class="dropdown" :class="{ 'is-active': isActive }">
    <div class="dropdown-trigger">
      <button
        class="nav-link-button navbar-item"
        :class="{ 'is-active': isActive }"
        aria-haspopup="true"
        aria-controls="dropdown-menu6"
        @click="dropdown()"
      >
        {{ $t("chapters") }}
      </button>
    </div>
    <div class="dropdown-menu" id="dropdown-menu6" role="menu">
      <div class="dropdown-content">
        <nuxt-link
          @click.native="dropdown()"
          v-for="lesson in lessons"
          :key="lesson.title"
          class="dropdown-item"
          :to="lesson.link"
        >
          {{ lesson.title }}
        </nuxt-link>
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
          title: this.$t("lesson4"),
          link: { name: "regulation_of_air_quality___" + this.$i18n.locale },
        },
        {
          title: this.$t("lesson3"),
          link: { name: "pollination___" + this.$i18n.locale },
        },
        {
          title: this.$t("lesson1"),
          link: { name: "food___" + this.$i18n.locale },
        },
        {
          title: this.$t("lesson2"),
          link: { name: "inspiration_and_learning___" + this.$i18n.locale },
        },
        {
          title: this.$t("lesson5"),
          link: { name: "companionship___" + this.$i18n.locale },
        },
      ];
    },
  },
  methods: {
    dropdown() {
      this.isActive = !this.isActive;
    },
  },
};
</script>
<style scoped>
a.nuxt-link-exact-active {
  color: var(--green-secondary);
}
</style>
