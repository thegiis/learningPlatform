<template>
  <footer>
    <div class="green-primary">
      <div class="footer_wrapper">
        <div class="footer_text">
          <h2>Trees are like</h2>
          <h2>giant air purifiers.</h2>
          <h2>Let's save them!</h2>
          <p>
          Learn how you can make a difference and contribute to creating a healthy and sustainable planet.
          </p>
        </div>
        <div class="footer_img">
          <img src="/img/tree.png" />
        </div>
      </div>
    </div>
    <div class="green-secondary-border">
      <div
        class="wrapper split-pair"
        :class="[$style.paddingTopBottom, $style.logosWidth, $style.alignTop]"
      >
        <div>
          <p :class="$style.byTitle">Developed By</p>
          <img src="/img/GIIS.png" :class="$style.margins" />
        </div>
        <div>
          <p :class="$style.byTitle">Financial Support</p>
          <img src="/img/NEA.png" :class="$style.margins" />
          <p :class="$style.disclaimer">
            NEA is not responsible for the content of the website
          </p>
        </div>
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
.byTitle {
  font-size: 1.2rem;
}
.disclaimer {
  font-size: 0.8rem;
}
.alignTop {
  align-items: flex-start;
}
.margins {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
</style>
