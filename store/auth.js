export const strict = false

export const state = () => ({
  user: null || {},
  loggedIn: false,
})

export const mutations = {
  // Save accessToken
  SAVE_TOKEN(state, payload) {
    state.token = payload
  },

  // Log user in
  LOG_USER_IN(state, payload) {
    state.user = payload
    state.loggedIn = true
  },

  // Log user in
  UPDATE_USER_DATA(state, payload) {
    state.user.phone = payload.phone
    state.user.user = payload.emailAddress
    state.user.lastName = payload.lastName
    state.user.firstName = payload.firstName
  },

  // Log User out
  LOG_USER_OUT(state) {
    state.user = null
    state.loggedIn = false
  },
}
