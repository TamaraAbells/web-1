import currentUserGql from '../gql/currentUser.graphql'

export const state = () => ({
  currentUser: null,
  snackbarEnabled: false,
  snackbarMessage: '',
  snackbarSuccess: false,
  expandedCommentId: '',
  nav: false
})

export const mutations = {
  setCurrentUser(state, currentUser) {
    state.currentUser = currentUser
  },
  setExpandedCommentId(state, commentId) {
    state.expandedCommentId = commentId
  },
  setSnackbarEnabled(state, enabled) {
    state.snackbarEnabled = enabled
  },
  setSnackbarMessage(state, message) {
    state.snackbarMessage = message
  },
  setSnackbarSuccess(state, success) {
    state.snackbarSuccess = success
  },
  setAppearOffline(state, appearOffline) {
    state.currentUser.appearOffline = appearOffline
  },
  setNav(state, nav) {
    state.nav = nav
  }
}

export const actions = {
  async nuxtServerInit({ commit }, context) {
    try {
      const newrelic = await import('newrelic')
      newrelic.setTransactionName(context.route.matched[0].path)
    } catch {}

    if (!context.app.$apolloHelpers.getToken()) return
    const client = context.app.apolloProvider.defaultClient
    const { data } = await client.query({ query: currentUserGql })
    commit('setCurrentUser', data.currentUser)
    if (!data.currentUser) {
      await context.app.$apolloHelpers.onLogout()
    }
  },
  async fetchCurrentUser({ commit }) {
    if (!this.app.$apolloHelpers.getToken()) {
      commit('setCurrentUser', null)
      return
    }
    const client = this.app.apolloProvider.defaultClient
    const { data } = await client.query({
      query: currentUserGql,
      fetchPolicy: 'network-only'
    })
    commit('setCurrentUser', data.currentUser)
  },
  displaySnackbar({ commit }, { message, success = false }) {
    commit('setSnackbarMessage', message)
    commit('setSnackbarEnabled', true)
    commit('setSnackbarSuccess', success)
    setTimeout(() => {
      commit('setSnackbarEnabled', false)
    }, 2500)
  }
}
