import Vue from 'vue'

Vue.mixin({
  computed: {
    mobileView() {
      return this.$vuetify.breakpoint.width < 960
    },
  },
})
