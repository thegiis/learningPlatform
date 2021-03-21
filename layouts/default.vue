<template>
  <div>
    <BaseNavigation />
    <div class="container is-widescreen" :class="$style.paddedContainer">
      <Nuxt />
    </div>
    <CardVocab v-if="$store.state.lesson.showVocab" />
    <ModalLangSelect />
  </div>
</template>

<script>
import BaseNavigation from "@/components/baseComponents/BaseNavigation.vue";
import CardVocab from "@/components/baseComponents/CardVocab.vue";
import ModalLangSelect from "@/components/baseComponents/ModalLangSelect.vue";

export default {
  components: {
    BaseNavigation,
    CardVocab,
    ModalLangSelect,
  },
  created() {
    const storedLocale = this.$cookiz.get("lang");
    const storedGlossaryLocale = this.$cookiz.get("glossaryLang");
    
    if(storedGlossaryLocale !== undefined){
      this.$store.dispatch("lesson/setVocabLocale", storedGlossaryLocale);
    }
    if(storedLocale !== undefined){
      this.$i18n.setLocale(storedLocale);
    }
    if (storedLocale !== undefined && storedGlossaryLocale !== undefined) {
      this.$store.dispatch("global/setIsFirstVisit", false);
    }
  },
};
</script>

<style module>
.paddedContainer {
  position: relative;
}
</style>
