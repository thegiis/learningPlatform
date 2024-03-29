<template>
  <div class="dragdropquizWrapper">
    <h3 class="lesson" :class="instruction.class">
      {{ instruction.text }}
    </h3>
    <div class="instructions" v-if="instructions">
      <p>
        {{ instructions }}
      </p>
    </div>

    <div class="dragdropAnsDiv">
      <div
        v-for="(dropContainer, idx) in dropList"
        :key="idx"
        class="dropDiv"
        :style="getHeightStyle()"
      >
        <label class="sub-question"
          >{{ dropContainer.label }} <span class="sub-question-dot"></span
        ></label>
        <draggable
          :disabled="!enabled"
          :list="ansList[idx]"
          :data-name="dropContainer.name"
          :ref="dropContainer.name"
          :id="'drop-' + dropContainer.name"
          class="dropContainer"
          :class="allClasses()"
          group="activity"
          @change="checkDrop"
          :move="checkMove"
          :style="getTopStyle()"
        >
          <div
            class="card dndItem"
            :class="getClass(element)"
            v-for="element in ansList[idx]"
            :key="element.id"
            :style="`height:${questionHeight}px`"
          >
            {{ element.name }}
          </div>
          <div
            class="card dndItem"
            v-for="index in maxNum(idx)"
            :key="index + 1000"
            style="color: white"
            :style="`height:${questionHeight}px`"
          >
            A
          </div>
        </draggable>
      </div>
    </div>

    <button
      class="button is-primary dndSubmitBtn"
      :class="getSubmitClass"
      @click="checkAns"
      :disabled="!isSelected"
    >
      {{ submitText }}
    </button>
    <div class="spacer-25"></div>
    <h5 class="title">CLICK AND DRAG THE CORRECT ABOVE</h5>
    <draggable
      :disabled="!enabled"
      :list="questionList"
      class="questionList"
      group="activity"
      ref="questionList"
      @change="handleExtraDrop"
      :move="checkMove"
    >
      <div
        class="card dndItem"
        data-variant="options"
        v-for="element in questionList"
        :key="element.id"
        :style="`height:${questionHeight}px`"
      >
        {{ element.name }}
      </div>
    </draggable>
    <!--     
    <HintInterface
      :display="showHint"
      hintText="this is hint"
      @close="closeHint()"
    />
    <HintIcon @open="openHint()" /> -->
  </div>
</template>

<script>
import draggable from "vuedraggable";
import HintInterface from "@/components/interactiveActivity/HintInterface.vue";
import HintIcon from "@/components/interactiveActivity/HintIcon.vue";

import { shuffleArray } from "@/utils/utils.js";

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
    instructions: {
      type: String,
      required: false,
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
    answerNums: {
      type: Number,
      required: true,
    },
    questionNumber: {
      type: String,
      required: false,
      default: 2,
    },
    questionHeight: {
      type: String,
      required: false,
      default: 100,
    },
  },
  data() {
    return {
      submitText: this.$i18n.t("submit"),
      enabled: true,
      allQuestions: shuffleArray(this.itemList.list),
      questionList: [],
      ansList: this.dropList.map((item) => item.list),
      dropMap: this.dropList.map((item) => item.name),
      isCorrect: false,
      correctlyAnswered: null,
      isChecked: false,
      hint: false,
      usedIds: [],
      dropCount: 0,
      showQuestions: 9,
    };
  },
  created() {
    // console.log(this.dropMap)
    // let ansObj = this.dropList.reduce((obj, item) => {
    //   return {
    //     ...obj,
    //     [item["name"]]: item["list"],
    //   };
    // }, {});
    // console.log(ansObj)
    this.showQuestions =
      this.allQuestions.length > this.showQuestions
        ? this.showQuestions
        : this.allQuestions.length;
    this.allQuestions = shuffleArray(this.itemList.list);
    this.questionList = this.allQuestions.slice(0, this.showQuestions);
    this.dropCount = this.showQuestions;
    this.usedIds = this.questionList.map((item) => item.id);
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
    checkDrop(evt) {
      // console.log(evt);
      // if (added || removed) {
      //   // this.correctlyDropped();
      // }
    },
    allClasses(anotherClass) {
      return 46.8 * this.answerNums + "px " + anotherClass;
    },
    maxNum(idx) {
      return (
        this.answerNums - (this.ansList[idx] ? this.ansList[idx].length : 0)
      );
    },
    checkMove(evt) {
      // reference https://github.com/SortableJS/Vue.Draggable/issues/347
      // const dropId = evt.to.id;
      const dropName = evt.to.dataset.name;
      const listIdx = this.dropMap.indexOf(dropName);
      const currList = this.ansList[listIdx];
      if (currList.length >= this.answerNums) {
        return false;
      }
      return true;
    },
    handleExtraDrop({ added, removed }) {
      const lenArr = this.questionList.length;
      if (added) {
        if (lenArr > this.showQuestions) {
          const lastId = this.questionList[lenArr - 1].id;
          const lastIndex = this.usedIds.indexOf(lastId);
          if (lastIndex > -1) {
            this.usedIds.splice(lastIndex, 1);
            this.questionList = this.questionList.filter(
              (item) => item.id !== lastId
            );
          }
          this.dropCount -= 1;
        }
      }
      if (removed) {
        this.updateQuestionList();
      }
    },
    correctlyDropped() {
      let allCorrect = true;

      //check if questionList is empty or all ansList are to capacity
      if (this.questionList.length !== 0) {
        for (let i = 0; i < this.ansList.length; i++) {
          if (this.ansList[i].length < this.answerNums) {
            allCorrect = false;
            break;
          }
        }
      }

      for (let i = 0; i < this.ansList.length; i++) {
        const drop = this.dropMap[i];
        const names = this.ansList[i].map(function (item) {
          return item["name"];
        });
        // console.log(names)
        this.ansList[i].forEach(function (ans) {
          if (ans.drop.indexOf(drop) !== -1) {
            ans.correct = true;
          } else {
            ans.correct = false;
            allCorrect = false;
          }
        });
      }
      if (allCorrect) {
        this.isCorrect = allCorrect;
        // this.enabled = false;
      }
    },
    getClass(element) {
      if (this.isChecked) {
        if (element.correct === false) {
          return "incorrectDrop";
        } else {
          return "";
        }
      }
    },

    checkAns() {
      this.correctlyDropped();
      this.isChecked = true;
      if (this.correctlyAnswered === null) {
        this.enabled = false;
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
        this.isChecked = false;
        this.enabled = true;
        this.submitText = this.$i18n.t("submit");

        for (let i = 0; i < this.ansList.length; i++) {
          let curAnsList = this.ansList[i];
          let newAnsList = [];
          for (let j = 0; j < curAnsList.length; j++) {
            if (!curAnsList[j].correct) {
              // first reset the answer
              curAnsList[j].correct = null;
              // remove wrong answer from usedIds
              const notUsedID = this.usedIds.indexOf(curAnsList[j].id);
              this.usedIds.splice(notUsedID, 1);
              // reduce the dropcount
              this.dropCount--;
            } else {
              newAnsList.push(curAnsList[j]);
            }
          }
          this.ansList[i] = newAnsList;
        }
      }
      this.updateQuestionList();
    },
    openHint() {
      this.hint = true;
    },
    closeHint() {
      this.hint = false;
    },
    updateQuestionList() {
      while (
        this.questionList.length < this.showQuestions &&
        this.usedIds.length < this.allQuestions.length
      ) {
        const totalLen = this.allQuestions.length - 1;
        if (this.dropCount <= totalLen) {
          let randIdx = Math.floor(Math.random() * (totalLen - 0 + 1));
          while (this.usedIds.indexOf(randIdx) !== -1) {
            randIdx = Math.floor(Math.random() * (totalLen - 0 + 1));
          }
          const newItem = this.allQuestions.filter(
            (item) => item.id === randIdx
          )[0];
          this.questionList.push(newItem);
          this.usedIds.push(randIdx);
          this.dropCount += 1;
        }
      }
    },
    getHeightStyle() {
      let calcHeight =
        parseInt(this.questionHeight) * (parseInt(this.questionNumber) + 2);
      return "height: " + calcHeight + "px";
    },
    getTopStyle() {
      let calcHeight = parseInt(this.questionHeight) * 1.5;
      return "top: " + calcHeight + "px";
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
  cursor: pointer;
  min-height: 8vh;
  align-items: stretch;
  align-content: space-between;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 16.5px;
}
.questionList > * {
  width: 32%;
}
.dndItem:last-child {
  margin-bottom: 0;
}
.dndItem {
  padding: 0.5rem;
  border: 2px solid var(--green-primary);
  border-radius: 0;
  height: 100px;
  overflow-y: scroll;
  font-family: var(--font-family-secondary);
  font-size: 16px;
  text-align: left;
  vertical-align: middle;
  margin-bottom: -2px;
}
.dndItem[data-variant="options"] {
  border-width: 0px;
  background-color: #fafafa;
}
.dragdropAnsDiv {
  display: flex;
  align-items: stretch;
  justify-content: center;
}
.dropDiv {
  margin: 0.25rem;
  width: 100%;
  height: 360px;
  position: relative;
}
.dropContainer {
  position: absolute;
  top: 150px;
  width: 100%;
  cursor: pointer;
  overflow: hidden;
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
.incorrectDrop {
  background-color: red;
}
.instructions {
  border: 1px solid var(--green-secondary);
  border-radius: 4px;
  padding: 1em;
  margin: 1em;
}
.button.is-primary:focus,
.button.is-primary.is-focused {
  color: black;
  border-color: var(--green-secondary);
}
h4.lesson {
  color: var(--green-secondary);
}
h1.title {
  height: 50px;
}
</style>
