export const strict = false

export const state = () => ({
  color: null,
  status: false,
  text: null,
  icon: null,
  timeout: 5000,
})

export const mutations = {
  async SHOW(state, payload) {
    state.text = payload.text || 'Something Occured!'
    state.icon = payload.icon || 'mdi-information-outline'
    state.color = payload.color || 'accent'
    state.timeout = payload.timeout || 5000
    state.status = true

    // Kill the snackbar after {timeout} seconds
    await new Promise((resolve) => setTimeout(resolve, state.timeout))
    this.commit('notification/CLOSE')
  },

  CLOSE(state) {
    state.text = null
    state.icon = null
    state.color = null
    state.status = false
    state.timeout = 5000
  },
}
