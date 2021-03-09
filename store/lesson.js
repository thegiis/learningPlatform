export const state = () => ({
    glossary: {},
    selectors: [],
    currentWord: {},
    showVocab: false,
    vocabPosition: {}
})

export const mutations = {
    setGlossary(state, glossary) {
        state.glossary = glossary
    },
    setSelectors(state, selectors) {
        state.selectors = selectors
    },
    setCurrentWord(state, word) {
        state.currentWord = word
    },
    toggleVocab(state) {
        state.showVocab = !state.showVocab
    },
    setVocabPosition(state, position) {
        state.vocabPosition = position
    }
}

export const actions = {
    setGlossary(context, glossary) {
        context.commit('setGlossary', glossary)
        context.commit('setSelectors', Object.keys(glossary))
    },
    setCurrentWord(context, word) {
        context.commit('setCurrentWord', word)
    },
    toggleVocab(context) {
        context.commit('toggleVocab')
    },
    setVocabPosition(context, position) {
        context.commit('setVocabPosition', position)
    }
}