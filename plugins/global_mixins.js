import Vue from 'vue'

Vue.mixin({
  computed: {
    mobileView() {
      return this.$vuetify.breakpoint.width < 960
    },
  },
  methods: {
    fakeAPI(passedResolve, passedReject, shouldPass = true) {
      return new Promise((resolve, reject) => {
        console.log('running promise')
        setTimeout(() => {
          console.log('resolving promise')
          resolve(passedResolve())
        }, 1000)
        if (!shouldPass)
          setTimeout(() => {
            console.log('rejecting promise')
            reject(passedReject())
          }, 500)
      })
    },
  },
})
