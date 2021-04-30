<template>
  <button class="" :class="$style.nextButton" @click="goNext()">
    <svg viewBox="0 0 448 448">
      <path fill="#FFF" d="M1.5,217.2a16.1,16.1,0,0,0,7.8,21.3l416,192a15.6,15.6,0,0,0,16-1.6,16.1,16.1,0,0,0,3.5-22.5L308,224,444.8,41.6a16,16,0,0,0-19.5-24.1l-416,192A16.2,16.2,0,0,0,1.5,217.2Z"/>
    </svg>
  </button>
</template>
<script>
export default {
  props: {
    navlink: {
      type: Object,
      required: true,
    },
  },
  methods: {
    goNext() {
      this.$router.push(this.navlink);
    },
  },
};
</script>

<style module>
.nextButton {
  position: fixed;
  left: 2rem;
  width: 40px;
  height: 40px;
  top: 50%;
  transform: translateY(-50%);
  background-color: turquoise;
  font-weight: bold;
  font-size: 2rem;
  border-radius: 50%;
  z-index: 100;
  transition: 0.2s linear;
  cursor: pointer;
}
.nextButton:hover{
    filter: brightness(120%);
  transform: translateY(-50%) scale(1.1);
}
.nextButton svg{
    position: absolute;
    right: 20%;
    top: 50%;
    transform: translateY(-50%);
    width: 60%;
}
</style>