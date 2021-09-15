<template>
  <div class="green-primary">
    <div
      class="wrapper"
      data-variant="more-padding"
      :class="$style.paddingTopBottom"
    >
      <div class="tiles" data-variant="two-per-row">
        <div class="bg-white">
          <h2 class="lesson" :class="$style.h2">Learn</h2>
          <div :class="$style.listContainer">
            <ol class="flow" :class="$style.list" style="--flow-space: 0.5rem">
              <li>
                Air Pollution
                <ul>
                  <li>Nature and man made pollution</li>
                  <li>Nature and man made pollution</li>
                  <li>Nature and man made pollution</li>
                </ul>
              </li>
              <li>
                Effects of Air Pollution
                <ul>
                  <li>Nature and man made pollution</li>
                  <li>Nature and man made pollution</li>
                  <li>Nature and man made pollution</li>
                </ul>
              </li>
              <li>Nature as regulations of Air Quality</li>
            </ol>
          </div>
        </div>
        <div class="bg-white"></div>
      </div>
    </div>
  </div>
</template>
<style module lang="scss">
.paddingTopBottom {
  padding-top: 2em;
  padding-bottom: 2em;
}
.h2 {
  border: 0 solid;
  border-bottom-width: 1px;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-top: 1rem;
  padding-bottom: 0;
  line-height: 1.1;
}
.listContainer {
  padding-left: 0.63rem;
  padding-right: 0.63rem;
  padding-top: 0.63rem;
  padding-bottom: 1.25rem;
}

.list {
  list-style-type: upper-roman;
  list-style-position: outside;
  margin: 1em 2em;
  > li {
    padding-left: 0.5em;
    > ul {
      list-style-type: "→";
      list-style-position: outside;
      margin-left: -0.5em;
      > li {
        padding-left: 0.5em;
      }
    }
  }
}
</style>
