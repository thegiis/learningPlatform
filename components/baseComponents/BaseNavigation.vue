<template>
  <nav
    class="navbar"
    role="navigation"
    aria-label="main navigation"
    :class="$style.titleBar"
  >
    <div class="navbar-brand">
      <nuxt-link :to="{ name: 'index___' + this.$i18n.locale }"
        ><h1 :class="$style.title">{{ $t("topic") }}</h1></nuxt-link
      >

      <a
        role="button"
        class="navbar-burger"
        aria-label="menu"
        aria-expanded="false"
        data-target="navigationMenu"
        @click="navBurger"
        ref="navBurger"
      >
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
    </div>

    <div id="navigationMenu" class="navbar-menu" ref="navMenu">
      <div class="navbar-end">
        <div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link"> {{ $t("modules") }} </a>

          <div class="navbar-dropdown">
            <nuxt-link
              v-for="lesson in lessons"
              :key="lesson.title"
              :to="lesson.link"
              class="navbar-item"
              >{{ lesson.title }}</nuxt-link
            >
          </div>
        </div>
        <nuxt-link
          :to="{ name: 'glossaryGlobal___' + this.$i18n.locale }"
          class="navbar-item"
          >{{ $t("glossary") }}</nuxt-link
        >
        <GlossaryLangSwitch class="navbar-item" />
        <LangSwitch class="navbar-item" />
      </div>
    </div>
  </nav>
</template>

<script>
import LangSwitch from "@/components/baseComponents/LangSwitch.vue";
import GlossaryLangSwitch from "@/components/baseComponents/GlossaryLangSwitch.vue";
export default {
  components: {
    LangSwitch,
    GlossaryLangSwitch,
  },
  computed: {
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
    navBurger() {
      const navIcon = this.$refs.navBurger;
      const navMenu = this.$refs.navMenu;
      navIcon.classList.toggle("is-active");
      navMenu.classList.toggle("is-active");
    },
  },
};
</script>

<style module>
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

.titleBar {
  box-shadow: 0px 5px 12px 0px rgb(0 0 0 / 7%);
}

.title {
  font-size: 2rem;
  padding-left: 2rem;
  color: #10247c;
  font-family: "Poppins", sans-serif;
  text-transform: uppercase;
  font-weight: normal;
}
</style>
<style scoped>
a.nuxt-link-exact-active {
  background-color: #fafafa;
  color: #3273dc;
}
</style>
