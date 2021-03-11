<template>
  <div>
    <BaseNavigation />
    <div class="container is-widescreen" :class="$style.paddedContainer">
      <Nuxt />
    </div>
    <CardVocab v-if="$store.state.lesson.showVocab" />
  </div>
</template>

<script>
import BaseNavigation from "@/components/baseComponents/BaseNavigation.vue";
import CardVocab from "@/components/baseComponents/CardVocab.vue";

export default {
  components: {
    BaseNavigation,
    CardVocab,
  },
};
</script>

<style module>
.paddedContainer{
  position: relative;
}
</style>
