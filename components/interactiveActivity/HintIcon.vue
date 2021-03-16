<template>
  <img src="@/assets/images/icons/hint.svg" alt="" :class="$style.hintIcon" @click="showHint()" />
</template>
<script>
export default {
    methods:{
        showHint(){
            this.$emit('open')
        }
    }
}
</script>
<style module>
.hintIcon {
  cursor: pointer;
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  left: auto;
  width: 4rem;
  z-index: 99;
}
@media only screen and (min-width: 768px) {
  .hintIcon {
    right: auto;
    left: 1rem;
  }
}
</style>