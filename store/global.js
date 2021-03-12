export const state = () => ({
    isFirstVisit: true
})

export const mutations = {
    setIsFirstVisit(state, bool) {
        state.isFirstVisit = bool
    },
}

export const actions = {
    setIsFirstVisit(context, bool) {
        context.commit('setIsFirstVisit', bool)
    }
}