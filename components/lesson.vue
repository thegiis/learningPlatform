<template>
  <div class="container">
    <div>
      <h2 class="title">
        {{ $t("title") }}
      </h2>
      <BaseText
        :textdata="getText('text3')"
        :highlight="true"
      />
      <BaseText
        :textdata="getText('text2')"
        :highlight="true"
        :highlightClass="$style.testClass"
      />
    </div>
  </div>
</template>

<script>
import enData from "@/assets/data/pollution/en.json";
import npData from "@/assets/data/pollution/np.json";
import enGlossary from "@/assets/data/pollution/glossary/glossary.json";

import BaseText from "@/components/baseComponents/BaseText.vue";

const msg = {
  en: enData,
  np: npData,
};

export default {
  components: {
    BaseText,
  },
  i18n: {
    messages: msg,
  },
  created() {
    this.$store.dispatch("lesson/setGlossary", enGlossary);
  },
  methods: {
    getText(id) {
      id = "data." + id;
      return this.$i18n.t(id);
    },
  },
};
</script>

<style scoped>
.container {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background-color: wheat;
}
</style>

<style module>
.testClass {
  color: red;
}
</style>