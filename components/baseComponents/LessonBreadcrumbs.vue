<template>
  <nav
    class="breadcrumb has-dot-separator is-medium"
    :class="$style.breadcrumbContainer"
    aria-label="breadcrumbs"
  >
    <ul>
      <li>
        <nuxt-link :to="{ name: 'index___' + this.$i18n.locale }"
          >Home</nuxt-link
        >
      </li>
      <li
        v-for="(item, idx) in getParentLinks"
        :key="idx"
        :class="{ 'is-active': idx == pages.length - 1 }"
      >
        <nuxt-link :to="item" v-if="idx != pages.length - 1">
          <p>{{ pages[idx] }}</p>
        </nuxt-link>
        <nuxt-link to="" v-else
          ><p>{{ pages[idx] }}</p></nuxt-link
        >
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    pages: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      parents: this.$nuxt.$route.path.split("/"),
    };
  },
  created() {
    if (this.$i18n.availableLocales.indexOf(this.parents[1]) !== -1) {
      this.parents = this.parents.slice(2);
    } else {
      this.parents = this.parents.slice(1);
    }
  },
  computed: {
    getParentLinks() {
      let parLinks = [];
      let lang = this.$i18n.locale;
      this.parents.forEach(function (parent) {
        parLinks.push({ name: parent + "___" + lang });
      });
      return parLinks;
    },
  },
  methods: {},
};
</script>

<style module>
.breadcrumbContainer {
  width: 100%;
}
</style>
