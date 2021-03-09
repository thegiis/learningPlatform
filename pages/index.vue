<template>
  <div class="container">
    <div>
      <h1 class="title">
        {{ $t("topic") }}
      </h1>
      <lesson />
    </div>
  </div>
</template>

<script>
import lesson from "@/components/lesson.vue"
export default {
  components: {
    lesson
  },
  mounted() {
    // console.log(this.$i18n.messages)
  },
};
</script>

<style  scoped>
.container {
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.ttt {
  height: 900px;
  background-color: wheat;
}

.title {
  font-family: "Quicksand", "Source Sans Pro", -apple-system, BlinkMacSystemFont,
    "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
  display: block;
  font-size: 2.5rem;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
</style>
