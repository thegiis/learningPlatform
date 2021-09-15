<template>
  <section :class="$style.nextSection">
    <div class="wrapper split-pair" data-variant="more-padding">
      <div>
        <!--<LessonPrevButton />-->
      </div>
      <div>
        <LessonNextButton />
      </div>
    </div>
  </section>
</template>

<style module>
.nextSection {
  margin-top: 1em;
  margin-bottom: 2em;
}
</style>
