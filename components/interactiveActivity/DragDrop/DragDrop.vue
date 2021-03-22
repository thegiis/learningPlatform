<template>
  <div class="dragdropquizWrapper">
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
        <h1 class="title is-5">{{ dropContainer.label }}</h1>
        <div
          class="card dndItem"
          v-for="element in ansList[idx]"
          :key="element.name"
        >
          {{ element.name }}
        </div>
      </draggable>
    </div>

    <button
      class="button is-primary dndSubmitBtn"
      :class="getSubmitClass"
      @click="checkAns"
      :disabled="!isSelected"
    >
      {{ submitText }}
    </button>
    <HintInterface
      :display="showHint"
      hintText="this is hint"
      @close="closeHint()"
    />
    <HintIcon @open="openHint()" />
  </div>
</template>

<script>
import draggable from "vuedraggable";
import HintInterface from "@/components/interactiveActivity/HintInterface.vue";
import HintIcon from "@/components/interactiveActivity/HintIcon.vue";

export default {
  components: {
    draggable,
    HintInterface,
    HintIcon,
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
      submitText: this.$i18n.t("submit"),
      enabled: true,
      questionList: this.itemList.list,
      ansList: this.dropList.map((item) => item.list),
      dropMap: this.dropList.map((item) => item.name),
      isCorrect: false,
      correctlyAnswered: null,
      hint: false,
    };
  },
  created() {
    // console.log(this.dropMap)
  },
  computed: {
    showHint() {
      return this.hint;
    },
    isSelected() {
      let hasDropped = false;
      this.dropList.forEach(function (list) {
        if (list.length != 0) {
          hasDropped = true;
        }
      });
      return hasDropped;
    },

    getSubmitClass() {
      if (this.correctlyAnswered == null) {
        return "";
      } else if (this.correctlyAnswered == true) {
        return "submit-correct-answer";
      } else {
        return "submit-incorrect-answer";
      }
    },
  },
  methods: {
    checkDrop({ added, removed }) {
      if (added || removed) {
        this.correctlyDropped();
      }
    },
    correctlyDropped() {
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
        // this.enabled = false;
      }
    },
    checkAns() {
      this.correctlyDropped();
      if (this.correctlyAnswered === null) {
        if (this.isCorrect) {
          this.submitText = this.$i18n.t("next");
          this.correctlyAnswered = true;
          this.$emit("answer", true);
        } else {
          this.submitText = this.$i18n.t("tryagain");
          this.correctlyAnswered = false;
          this.$emit("answer", false);
        }
      } else if (this.correctlyAnswered === true) {
        this.$emit("goNext", true);
        this.correctlyAnswered = null;
        this.submitText = this.$i18n.t("submit");
      } else {
        this.correctlyAnswered = null;
        this.submitText = this.$i18n.t("submit");
      }
    },
    openHint() {
      this.hint = true;
    },
    closeHint() {
      this.hint = false;
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
.dndSubmitBtn {
  width: auto;
  margin: 1rem auto;
}
.submit-correct-answer {
  background-color: #b8d34f;
}
.submit-correct-answer:hover {
  background-color: #84c251;
}
.submit-incorrect-answer {
  background-color: indianred;
}
.submit-incorrect-answer:hover {
  background-color: #ff918e;
}
.disabledInput {
  pointer-events: none;
}
</style>
