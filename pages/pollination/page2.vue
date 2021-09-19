<template>
  <LessonIndex>
    <div class="wrapper" data-variant="more-padding">
      <h2 :class="$style.title2">We need Pollinators</h2>
      <h2 :class="$style.title2">Pollinators providing us food</h2>
      <div :class="$style.description">
        <p>
          Pollinator animals such as bees, birds, bats, butterflies, and flies
          are responsible for pollination of 75% of food crops we eat.
        </p>
        <p>
          Pollinated crops include those that provide fruit, vegetables, seeds,
          nuts and oils. Many of these are important sources of vitamins and
          minerals.
        </p>
        <p>List of the species pollinated by bees and other animals</p>
        <ol>
          <li>
            Fruits: Apple, Mango, Avocado, Kiwi, Strawberry, Papaya, watermelon,
            orange , grapefruit, Coconut, Cantaloupe, Plum, Cherry, Peach,
            Guava, Pomegranate, Grape
          </li>
          <li>Nuts: Cashew, Chestnut, Almond, Macadamia</li>
          <li>Berries: Raspberry, Blackberry, Blueberry</li>
          <li>
            Vegetables: Cauliflower, Cabbage, Broccoli, Onion, Potato, Turnip,
            Chilli pepper, red pepper, pumpkin, groud, zucchini, Squash, Carrot,
            Eggplant, Tomato
          </li>
          <li>
            Legumes: Pigeon pea, Cajan pea, beans, Kidney bean, green bean
          </li>
          <li>Oil: Canola, Mustard, Flex, palm oil</li>
          <li>Grains: Buckwheat</li>
          <li>Fibers: Cotton,linen made from flax</li>
        </ol>
        <p>
          Currently, the pollination services provided by the insects and other
          pollinators are free. However, scientists have estimated the values of
          pollination services in monetary terms. In 2020, the estimated cost of
          pollinator services ranges from $195-387 billion annually.
        </p>
      </div>
      <h2 :class="$style.title2">Pollinators in crisis</h2>
      <div :class="$style.description">
        <p>
          In recent times, there is a widespread decline in insect pollinators
          worldwide. Many pollinators, particularly bees and butterflies, are
          being driven toward extinction by diverse pressures, many of them
          human-made. We are seeing entire bee colonies dying away at an
          alarming rate.
        </p>
        <p>There are several causes of declines:</p>
        <p>
          Habitat loss is one of the major culprits responsible for pollinator
          decline and impacts on their health. There is loss of abundance and
          diversity of flowers and decline in suitable habitat for them to build
          nets due to agricultural expansion and other human activities.
        </p>
        <p>
          Exposure to pesticides: Pesticides are chemical compounds that are
          used to kill pests, including insects, rodents, fungi and weeds. But
          they are also harmful to pollinator insects such as bees. Pesticide
          groups such as Pyrethroids are particularly harmful to bees. Some bees
          die when they feed on these pesticides. They can also take the
          pesticides along with pollen in to their hives, which accumulate over
          time and eventually cause entire colonies to die.
        </p>
        <p>
          Infection by parasites and pathogens, many of them accidentally spread
          by the actions of humans.
        </p>
        <p>
          Climate change is also affecting the quantity and quality of floral
          resources for pollinators. There is increase in drought frequency
          which cause plants to produce fewer flowers with less nectar.
        </p>
      </div>
      <h2 :class="$style.title2">World without pollinators</h2>
      <div :class="$style.description">
        <p>
          If pollinator animals such as bees become extinct, there would be
          major rippling effects throughout ecosystems. We may lose all the
          plants that bees pollinate and all of the animals that eat those
          plants in the food chain.
        </p>
        <p>It will also dramatically disrupt human food systems.</p>
        <p>
          While many plants such as cereal grains such as rice, wheat and
          soybean are wind-pollinated and are therefore unaffected by decline in
          pollinator populations, many fruits and vegetables, however, are
          insect-pollinated and could not be grown at such a large scale, or so
          cheaply, without them.
        </p>
        <p>
          There are artificial pollination techniques using humans and machines
          to do the work of animal pollinators. Hand-pollination by humans is
          being used in some farms where bees are unavailable. But it is
          incredibly labor-intensive and expensive.
        </p>
        <p>
          Robotic bees are also being developed that are tiny drones with
          cameras and sensors and fly flowers to flowers like bees. This is
          again very expensive and not accessible to everyone.
        </p>
        <p>
          ven if we are able to have artificial means for pollination, we cannot
          let bees and other pollinators die from our human actions. They are
          part of nature just like us and have an important role to maintain the
          ecosystem.
        </p>
      </div>
      <h2 :class="$style.title2">Saving pollinators</h2>
      <div :class="$style.description">
        <p>
          There is a lot we can do to save bees and other pollinator insects.
          First of all, we need to reduce our use of pesticides and ban the
          harmful pesticides that kill pollinators.
        </p>
        <p>
          We should protect wild and native habitat of the pollinators. In our
          landscapes, we can plant diverse plants making sure something is
          blooming each season.
        </p>
        <p>
          Even in our homes and communities, we can do many things to save them.
        </p>
        <p>
          We can create gardens that are safe for the bees. We can plant
          pollinator-friendly blooming plants without any use of pesticides. We
          can make such gardens in your backyard, windowsills, balconies and
          also roadsides. We can also let patches of land to grow wild letting
          grasses and wildflowers grow and make great nesting and feeding sites
          for bees.
        </p>
        <p>
          Planting trees is also important. When a tree blooms, it supplies
          hundreds and thousands of flowers for bees and other pollinators.
        </p>
      </div>
    </div>
  </LessonIndex>
</template>

<script>
import enData from "@/assets/data/pollination/en.json";
import npData from "@/assets/data/pollination/np.json";
import glossary from "@/assets/data/glossary/pollination.json";

import BaseText from "@/components/baseComponents/BaseText.vue";
import LessonBreadcrumbs from "@/components/lessonComponents/LessonBreadcrumbs.vue";
import LessonNextButton from "@/components/lessonComponents/LessonNextButton.vue";

const msg = {
  en: enData,
  np: npData,
};

export default {
  components: {
    BaseText,
    LessonBreadcrumbs,
    LessonNextButton,
  },
  i18n: {
    messages: msg,
  },
  created() {
    const curLocale = this.$i18n.locale;
    this.$store.dispatch("lesson/setGlossary", {
      glossary: glossary,
      locale: curLocale,
    });
  },
  methods: {
    getText(id) {
      id = "data." + id;
      return this.$i18n.t(id);
    },
  },
};
</script>

<style module>
.lesson {
  padding: 2rem;
  /* background-color: #efefef; */
  position: relative;
}
.nextButton {
  position: relative;
  left: 90%;
  margin: 0.5rem;
}
.title {
  font-size: 2.25rem;
  text-align: center;
  margin: 1rem;
  color: darkblue;
  text-decoration: underline;
}
.imgContainer {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  height: 300px;
}
.imgContainer img {
  position: relative;
  margin: 0 1rem;
  height: 100%;
}
.description {
  font-size: 1.2rem;
  line-height: 2rem;
  text-align: left;
}
.testClass {
  color: red;
}
.description p {
  margin: 1rem 0;
}
.title2 {
  font-size: 2rem;
  text-align: left;
  margin: 1rem 0;
  color: #555;
}
</style>
<style scoped>
li {
  margin: 1rem 0;
  font-family: "Quicksand";
  padding: 0;
  font-size: 1.2rem;
  line-height: 2rem;
  text-align: left;
  color: black;
  font-weight: 400;
}
</style>
