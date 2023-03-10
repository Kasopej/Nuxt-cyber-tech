export const strict = false

export const state = () => ({
  data: {},
  fluid: false,
  payload: {},
  pageLimit: 16,
})

export const mutations = {
  SAVE_PAYLOAD(state, payload) {
    state.payload = payload
  },

  SAVE_DATA(state, payload) {
    state.data = payload
  },
  changeFluidState(state, bool) {
    state.fluid = bool
  },
}
