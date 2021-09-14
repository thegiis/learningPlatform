<template>
  <div class="bg-white">
    <div
      class="wrapper split-pair"
      data-variant="more-padding"
      :class="$style.paddingTopBottom"
    >
      <a href="/">
        <img src="/img/earthschool.png" />
      </a>
      <nav class="navbar" role="navigation" aria-label="main navigation">
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
            <nuxt-link
              :to="{ name: 'index___' + this.$i18n.locale }"
              class="navbar-item"
            >
              {{ $t("chapters") }}
            </nuxt-link>
            <a @click="openGlossary()" class="navbar-item">{{
              $t("glossary")
            }}</a>
            <!-- <GlossaryLangSwitch class="navbar-item" /> -->
            <LangSwitch class="navbar-item" />
          </div>
        </div>
      </nav>
    </div>
  </div>
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
</style>
<style scoped>
a.nuxt-link-exact-active {
  color: #3273dc;
}
</style>
