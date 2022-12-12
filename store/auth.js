export const strict = false

export const state = () => ({
  user: null || {},
  loggedIn: false,
  userAuthData: null,
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

  // Save 2FA data
  KEEP_TFA(state, payload) {
    state.userAuthData = payload
  },

  // change 2FA status this is work around since no api
  // for fetching user info
  SET_TWO_FACTOR_STATUS(state, payload) {
    state.user.user.twoFactorAuth = payload
  },

  // change user profile picture from the user state
  CHANGE_USER_PIC(state, payload) {
    state.user.user.profile[0].image = payload
  },

  // Log user in
  UPDATE_USER_DATA(state, payload) {
    state.user.phone = payload.phone
    state.user.user = payload.emailAddress
    state.user.lastName = payload.lastName
    state.user.firstName = payload.firstName
  },
  UPDATE_USER_PROFILE(state, payload) {
    state.user.user.profile[0] = { ...state.user.user.profile[0], ...payload }
  },

  // Log User out
  LOG_USER_OUT(state) {
    state.user = null
    state.loggedIn = false
  },
}

export const getters = {
  profileImg(state) {
    return state.user.user.profile[0].img
  },
}
