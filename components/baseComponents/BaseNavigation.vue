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
        <nuxt-link
          :to="{ name: 'glossaryGlobal___' + this.$i18n.locale }"
          class="navbar-item"
          >Glossary</nuxt-link
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
