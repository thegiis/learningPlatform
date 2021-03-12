<template>
  <div class="modal" :class="$style.LangSelectContainer" v-if="display">
    <div class="modal-background"></div>
    <div class="modal-content" :class="$style.modalContainer">
      <h1 class="title is-2">Language Selection</h1>
      <div :class="$style.globalLang">
        <p>Select the language you want to learn in</p>
        <DropDownGlobalLang />
      </div>
      <div :class="$style.vocabLang">
        <p>Select the language to show in glossary</p>
        <DropDownGlossaryLang />
      </div>
      <button class="button" :class="$style.saveBtn" aria-label="save" @click="save()">
        Save
      </button>
    </div>
  </div>
</template>

<script>
import DropDownGlobalLang from "@/components/baseComponents/DropDownGlobalLang.vue";
import DropDownGlossaryLang from "@/components/baseComponents/DropDownGlossaryLang.vue";
export default {
  components: {
    DropDownGlobalLang,
    DropDownGlossaryLang
  },
  computed:{
    display() {
      return this.$store.state.global.isFirstVisit
    }
  },
  methods: {
    save(){
      this.$cookiz.set("lang", this.$i18n.locale, {
        maxAge: 60 * 60 * 24 * 365 * 10,
      });
      this.$cookiz.set("glossaryLang", this.$store.state.lesson.vocabLocale, {
        maxAge: 60 * 60 * 24 * 365 * 10,
      });
      this.$store.dispatch("global/setIsFirstVisit", false);
    }
  },
};
</script>

<style module>
.LangSelectContainer {
  display: block;
  z-index: 1500;
}
.modalContainer {
  position: fixed;
  top: 40%;
  left: 50%;
  background-color: #f4f4f4;
  transform: translate(-50%, -50%);
  padding: 2rem;
  padding-top: 4rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.globalLang,
.vocabLang {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}
.globalLang > *,
.vocabLang > * {
  margin: 0.5rem;
}
.saveBtn {
  margin-top: 2rem;
  background-color: #26ae90;
  padding: 0.5rem 2rem;
  border-radius: 1rem;
  font-size: 1.2rem;
  color: white;
}
.saveBtn:hover {
  filter: brightness(80%);
  color: white;
}
</style>