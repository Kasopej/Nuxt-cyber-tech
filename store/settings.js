export const strict = false

export const state = () => ({
  drawer: false,
  darkMode: false,
})

export const mutations = {
  TOGGLE_DRAWER_STATE(state) {
    state.drawer = !state.drawer
  },

  TOGGLE_DARK_MODE(state, vuetify) {
    state.darkMode = !state.darkMode
  },
}
