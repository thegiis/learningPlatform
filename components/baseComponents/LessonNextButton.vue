<template>
  <button class="" :class="$style.nextButton" @click="goNext()">
    <svg viewBox="0 0 448 448">
      <path
        fill="#FFF"
        d="M438.7,209.5l-416-192A16,16,0,0,0,3.2,41.6L140,224,3.2,406.4A16.1,16.1,0,0,0,16,432a15.6,15.6,0,0,0,6.7-1.5l416-192a16,16,0,0,0,0-29Z"
      />
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
  right: 2rem;
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
    left: 20%;
    top: 50%;
    transform: translateY(-50%);
    width: 60%;
}
</style>