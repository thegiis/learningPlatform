<template>
  <div class="bg-white">
    <div
      class="wrapper split-pair"
      :class="$style.paddingTopBottom"
    >
      <nuxt-link :to="{ name: 'index___' + this.$i18n.locale }">
        <img src="/img/earthschool.png" />
      </nuxt-link>
      <nav
        class="navbar z-index-topmost"
        role="navigation"
        aria-label="main navigation"
      >
        <div class="navbar-brand">
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
          <div class="navbar-end" :class="$style.navStyle">
            <ChaptersDropdown class="navbar-item" />
            <a href="#" class="navbar-item" :class="$style.divider">|</a>
            <a @click="openGlossary()" class="navbar-item">{{
              $t("glossary")
            }}</a>
            <!-- <GlossaryLangSwitch class="navbar-item" /> -->
             <!-- <LangSwitch class="navbar-item" />-->
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
import LangSwitch from "@/components/baseComponents/LangSwitch.vue";
import GlossaryLangSwitch from "@/components/baseComponents/GlossaryLangSwitch.vue";
import ChaptersDropdown from "@/components/baseComponents/ChaptersDropdown.vue";
export default {
  components: {
    LangSwitch,
    GlossaryLangSwitch,
    ChaptersDropdown,
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
    openGlossary() {
      this.$emit("openGlossary", true);
    },
  },
};
</script>

<style module>
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

.title {
  font-size: 2rem;
  padding-left: 2rem;
  color: #10247c;
  font-family: "Poppins", sans-serif;
  text-transform: uppercase;
  font-weight: normal;
}
.paddingTopBottom {
  padding-top: 40px;
  padding-bottom: 40px;
}
.navStyle {
  font-family: "Mortina";
}
.divider {
  padding-left: 0rem;
  padding-right: 0rem;
}
@media screen and (max-width: 1023px) {
  .divider {
    display: none;
  }
}
</style>
<style scoped>
a.nuxt-link-exact-active {
  color: var(--green-secondary);
}
</style>
