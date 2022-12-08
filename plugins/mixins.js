import Vue from 'vue'

const proxyWindow = {
  get innerWidth() {
    return window.innerWidth
  },
}

console.log({ proxyWindow })
Vue.mixin({
  data() {
    return {
      proxyWindow,
    }
  },
  computed: {
    mobileView() {
      return this.proxyWindow.innerWidth < 960
    },
  },
})
