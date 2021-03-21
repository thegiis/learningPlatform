<template>
  <div class="dragdropquizWrapper">
    <h2 class="title is-4" v-if="isCorrect">Congrats</h2>
    <h1 class="dragdropTitle" :class="instruction.class">
      {{ instruction.text }}
    </h1>

    <draggable
      :disabled="!enabled"
      :list="questionList"
      class="questionList"
      :class="itemList.class"
      group="activity"
      ref="questionList"
      @change="checkDrop"
    >
      <div
        class="card dndItem"
        v-for="element in questionList"
        :key="element.name"
      >
        {{ element.name }}
      </div>
    </draggable>

    <div class="dragdropAnsDiv">
      <draggable
        v-for="(dropContainer, idx) in dropList"
        :key="idx"
        :disabled="!enabled"
        :list="ansList[idx]"
        :data-name="dropContainer.name"
        :ref="dropContainer.name"
        class="dropContainer"
        :class="dropContainer.class"
        group="activity"
        @change="checkDrop"
      >
        <div
          class="card dndItem"
          v-for="element in ansList[idx]"
          :key="element.name"
        >
          {{ element.name }}
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
import draggable from "vuedraggable";

export default {
  components: {
    draggable,
  },
  props: {
    instruction: {
      type: Object,
      required: true,
    },
    itemList: {
      // for list of items to be dropped
      type: Object,
      required: true,
    },
    dropList: {
      // containers for dropping items
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      enabled: true,
      questionList: this.itemList.list,
      ansList: this.dropList.map((item) => item.list),
      dropMap: this.dropList.map((item) => item.name),
      isCorrect: false,
    };
  },
  created() {
    // console.log(this.dropMap)
  },
  methods: {
    checkDrop({ added, removed }) {
      if (added || removed) {
        let allCorrect = true;
        for (let i = 0; i < this.questionList.length; i++) {
          if (this.questionList[i].drop !== "questionList") {
            allCorrect = false;
          }
        }
        for (let i = 0; i < this.ansList.length; i++) {
          const drop = this.dropMap[i];
          this.ansList[i].forEach(function (ans) {
            if (ans.drop !== drop) {
              allCorrect = false;
            }
          });
        }
        if (allCorrect) {
          this.isCorrect = allCorrect;
          this.enabled = false;
        }
      }
    },
  },
};
</script>

<style scoped>
.dragdropquizWrapper {
  display: flex;
  flex-direction: column;
  min-height: 70vh;
  width: 100%;
}
.dragdropTitle {
  font-size: 2.5rem;
  color: #1e4d63;
  text-align: center;
}
.questionList {
  display: flex;
  padding: 1rem;
  cursor: pointer;
  min-height: 8vh;
  align-items: center;
}
.dndItem {
  margin: 0.25rem 0.5rem;
  padding: 0.5rem;
}
.dragdropAnsDiv {
  display: flex;
  align-items: center;
  justify-content: center;
}
.dropContainer {
  background-color: lightsalmon;
  min-height: 200px;
  margin: 0.25rem;
  padding: 0.25rem;
  width: 45%;
}
</style>
