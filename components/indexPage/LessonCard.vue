<template>
  <nuxt-link :to="link" class="card" :class="$style.cardContainer">
    <div class="card-image" :class="$style.cardImg">
      <img :src="require(`@/assets/images/${filename}`)" :alt="alt" />
    </div>
    <div class="card-content">
      <div class="media">
        <div class="media-content" :class="$style.cardTitle">
          <p class="title is-4">{{ title }}</p>
        </div>
      </div>
      <div class="content"  :class="$style.cardDesc">
        {{ description }}
      </div>
    </div>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    filename: {
      required: true,
      type: String,
    },
    alt: {
      required: false,
      type: String,
    },
    title: {
      required: true,
      type: String,
    },
    description: {
      required: true,
      type: String,
    },
    link: {
      required: true,
      type: Object,
    },
  },
};
</script>

<style module>
.cardContainer {
  position: relative;
  max-width: 400px;
  margin: 1.5rem;
  transition: 0.2s linear;
}
.cardContainer:hover{
    transform: scale(1.05);
}
.cardImg{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}
.cardImg img {
  width: auto!important;
  height: 240px;
  margin: 0;
}
.cardTitle{
    text-align: center;
    overflow-y: hidden;
}
.cardDesc{
    text-align: center;
}
</style>
