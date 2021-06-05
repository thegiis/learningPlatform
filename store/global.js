export const state = () => ({
    isFirstVisit: true,
    hasSideNavigation: true
})

export const mutations = {
    setIsFirstVisit(state, bool) {
        state.isFirstVisit = bool
    },
    setSideNavigation(state) {
        state.hasSideNavigation = true
    },
    resetSideNavigation(state) {
        state.hasSideNavigation = false
    },
}

export const actions = {
    setIsFirstVisit(context, bool) {
        context.commit('setIsFirstVisit', bool)
    },
    setSideNavigation(context) {
        context.commit('setSideNavigation')
    },
    resetSideNavigation(context) {
        context.commit('resetSideNavigation')
    },
}