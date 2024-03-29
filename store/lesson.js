export const state = () => ({
  glossary: {},
  selectors: [],
  currentWord: {},
  vocabLocale: "en",
  showVocab: false,
  vocabPosition: {},
  overVocab: false,
  currentVideoId: "",

  //{en: [{id: 'food', title: 'Food', videoId: '03434',
  //			 pages: [{ name: 'blah', route: 'blah', type: 'learn' }]
  //		 }],
  // np: [{id: 'food', title: 'Khan', videoId: '03434',
  //       pages: [{ name: 'blah', route: 'blah', type: 'learn' }]
  //     }]
  //}
  allLessons: {},
  modules: [],

  // {id: 'food', title: 'Food', videoId: '03434', currentPage:{id: 0, name: 'blah', route: 'blah', type: 'learn'}, pages: [{name: 'blah', route: 'blah', type: 'learn'}]}
  currentLessonLang: {},
});

export const mutations = {
  setGlossary(state, glossary) {
    state.glossary = glossary;
  },
  setSelectors(state, selectors) {
    state.selectors = selectors;
  },
  setCurrentWord(state, word) {
    state.currentWord = word;
  },
  setVocab(state) {
    state.showVocab = true;
  },
  resetVocab(state) {
    state.showVocab = false;
  },
  setOverVocab(state) {
    state.overVocab = true;
  },
  resetOverVocab(state) {
    state.overVocab = false;
  },
  toggleVocab(state) {
    state.showVocab = !state.showVocab;
  },
  setVocabLocale(state, local) {
    state.vocabLocale = local;
  },
  setVocabPosition(state, position) {
    state.vocabPosition = position;
  },
  setVideoId(state, id) {
    state.currentVideoId = id;
  },
  setAllLessons(state, allLessons) {
    state.allLessons = allLessons;
  },
  setCurrentLessonLang(state, currentLessonLang) {
    state.currentLessonLang = currentLessonLang;
  },
  setModules(state, modules) {
    state.modules = modules;
  },
};

export const actions = {
  setGlossary(context, payload) {
    let currentGlossary = payload.glossary[payload.locale];
    context.commit("setGlossary", currentGlossary);
    context.commit("setSelectors", Object.keys(currentGlossary));
  },
  setCurrentWord(context, word) {
    context.commit("setCurrentWord", word);
  },
  setVocabLocale(context, locale) {
    context.commit("setVocabLocale", locale);
  },
  setVocab(context) {
    context.commit("resetOverVocab");
    context.commit("setVocab");
  },
  resetVocab(context) {
    setTimeout(function () {
      if (!context.state.overVocab) {
        context.commit("resetVocab");
      }
    }, 300);
  },
  setOverVocab(context) {
    context.commit("setOverVocab");
  },
  resetOverVocab(context) {
    context.commit("resetOverVocab");
  },
  toggleVocab(context) {
    context.commit("toggleVocab");
  },
  setVocabPosition(context, position) {
    context.commit("setVocabPosition", position);
  },
  setVideoId(context, id) {
    context.commit("setVideoId", id);
  },
  setAllLessons(context, allLessons) {
    context.commit("setAllLessons", allLessons);
  },
  setCurrentLessonLang(context, currentLessonLang) {
    context.commit("setCurrentLessonLang", currentLessonLang);
  },
  setModules(context, modules) {
    context.commit("setModules", modules);
  },
};
