<template>
  <footer>
    <div class="green-primary">
      <div class="wrapper split-pair" :class="$style.paddingTop">
        <div :class="$style.footing" class="flow" style="--flow-space: -0.5em">
          <div>Trees are like</div>
          <div>giant air purifiers.</div>
          <div>Let's save them!</div>
        </div>
        <img src="/img/trees-message.png" :class="$style.imgRight" />
      </div>
    </div>
    <div class="green-secondary green-secondary-border">
      <div
        class="wrapper split-pair"
        :class="[$style.paddingTopBottom, $style.logosWidth]"
      >
        <img src="/img/GIIS.png" />
        <img src="/img/NEA.png" />
        <img src="/img/ipbes.png" />
      </div>
    </div>
  </footer>
</template>

<style module lang="scss">
@import "@/assets/styles/config";
.footing {
  font-family: "Mortina";
  color: white;
  font-size: 2.5em;
  margin-left: auto;
  margin-right: auto;
  @include media-query("md") {
    padding-top: 10px;
  }
}
.imgRight {
  height: 200px;
  margin-left: auto;
  @include media-query("sm") {
    height: 300px;
  }
}
.paddingTop {
  padding-top: 2em;
}
.paddingTopBottom {
  padding-top: 50px;
  padding-bottom: 50px;
}
.logosWidth {
  max-width: 50rem;
}
</style>
