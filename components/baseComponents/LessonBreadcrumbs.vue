<template>
  <nav
    class="breadcrumb has-dot-separator is-large"
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
        v-for="(item, idx) in data"
        :key="idx"
        :class="{ 'is-active': idx == data.length - 1 }"
      >
        <nuxt-link :to="item.link" v-if="idx != data.length - 1">
          <p>{{ item.name }}</p>
        </nuxt-link>
        <nuxt-link to="" v-else
          ><p>{{ item.name }}</p></nuxt-link
        >
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
  },
  created() {
    console.log(this.data[0].link);
  },
  data() {
    return {};
  },
  methods: {
    getLink(page) {
      const name = this.title + "-" + page + "___" + this.$i18n.locale;
      return { name: name };
    },
    getText(id) {
      return this.fulldata[this.$i18n.locale][id];
    },
  },
};
</script>

<style module>
.breadcrumbContainer {
  width: 100%;
}
</style>
