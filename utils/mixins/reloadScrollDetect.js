const scrollDetection = {
  data() {
    return {
      presentPage: 1,
      presentPath: 'null',
      shouldLoadMore: false,

      window: {
        width: 0,
        height: 0,
      },
    }
  },

  created() {
    this.shouldLoadMore = false
    window.addEventListener('scroll', this.onScroll)
    console.log(this.$route.fullPath)

    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },

  methods: {
    updatePageDetails(presentPage, presentPath) {
      this.presentPage = presentPage
      this.presentPath = presentPath
    },

    onScroll(e) {
      if (typeof window === 'undefined') return
      const top = window.pageYOffset || e.target.scrollTop || 0
      const windowSize = window.innerHeight + Math.ceil(window.pageYOffset)
      let tolerance

      if (this.window.width <= 425) {
        tolerance = 40
      } else tolerance = 30

      const bottom = windowSize + tolerance >= document.body.offsetHeight

      if (top || !bottom) {
        this.shouldLoadMore = false
      }

      // if (top > 100) {
      //   console.log('Page loads more as you approach bottom.')
      //   console.log(`Page ${this.presentPage}`)
      // }

      if (bottom && this.$route.fullPath === this.presentPath) {
        console.log('Preparing to load more')
        this.shouldLoadMore = true
      }
    },

    handleResize() {
      this.window.width = window.innerWidth
      this.window.height = window.innerHeight
    },

    deviceType() {
      const ua = navigator.userAgent
      if (
        /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
          ua
        )
      ) {
        return 'mobile'
      } else if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
        return 'tablet'
      } else return 'desktop'
    },
  },

  destroyed() {
    window.removeEventListener('scroll', this.onScroll)

    window.removeEventListener('resize', this.handleResize)
  },
}

export default scrollDetection
