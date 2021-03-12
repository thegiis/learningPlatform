<template>
  <div :class="$style.titleBar">
    <div :class="$style.titleDiv">
      <nuxt-link :to="{ name: 'index___' + this.$i18n.locale }"
        ><h1 :class="$style.title">{{ $t("topic") }}</h1></nuxt-link
      >
    </div>
    <div :class="$style.rightIcons">
      <GlossaryLangSwitch />
      <LangSwitch />
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
};
</script>

<style module>
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");

.titleBar {
  width: 100%;
  padding: 0.5rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  box-shadow: 0px 5px 12px 0px rgb(0 0 0 / 7%);
}

.titleDiv {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-right: 2rem;
}

.titleDiv a {
  text-decoration: none;
}
.title {
  font-size: 2rem;
  color: #10247c;
  font-family: "Poppins", sans-serif;
  text-transform: uppercase;
  font-weight: normal;
}
.rightIcons{
  position: relative;
}
</style>
