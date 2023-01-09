<template>
  <nuxt-link :to="lesson.link"  :class="">
    <div class="card custom_card">
      <div class="card-header" style="position:relative">
       <img
          :src="require(`@/assets/images/${lesson.filename}`)"
          :alt="lesson.alt"
          class="thumbImg"
        />
        <p class="card_header_text">{{ lesson.title }}</p>
      </div>
      <div class="card" :style="lesson.boxShadow">
        <div class="card_body_inner" :style="lesson.bgColor"  >
            <span>Watch <i class="fa fa-play-circle"></i></span>
        </div>
      </div>
    </div>
     <!-- <div class="card-image">
      <figure class="image is-4by3">
        <img
          :src="require(`@/assets/images/${filename}`)"
          :alt="alt"
          class="thumbImg"
        />
      </figure>
    </div>
    <div class="card-content" :class="$style.cardContentModifier">
      <div class="media">
        <div class="media-content">
          <p class="title is-4 has-text-centered">{{ title }}</p>
        </div>
      </div>
    </div>-->
  </nuxt-link>
</template>

<script>
export default {
  props: {
    // filename: {
    //   required: true,
    //   type: String,
    // },
    // alt: {
    //   required: false,
    //   type: String,
    // },
    // title: {
    //   required: true,
    //   type: String,
    // },
    // bgcolor: {
    //   required: true,
    //   type: String,
    // },
    // description: {
    //   required: true,
    //   type: String,
    // },
    // link: {
    //   required: true,
    //   type: Object,
    // },
    lesson:{
      required: true,
      type: Object,
    }
    
  },
};
</script>

<style module>
.cardContainer {
  position: relative;
  width: 300px;
  height: 300px;
  margin: 1.5rem;
  transition: 0.2s linear;
}
.cardContainer:hover {
  transform: scale(1.05);
}
.cardImg {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.cardImg img {
  width: auto !important;
  height: 240px;
  margin: 0;
}
.cardTitle {
  text-align: center;
  overflow-y: hidden;
}
.cardDesc {
  text-align: center;
}
.cardContentModifier {
  padding-top: 0px;
}
</style>
