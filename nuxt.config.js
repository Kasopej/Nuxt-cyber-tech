import colors from 'vuetify/es5/util/colors'
// import 'assets/styles/custom.css'

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: "%s - TekLabspace Hunter's Portal",
    title: "TekLabspace Hunter's Portal",
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content:
          'width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no',
      },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Open+Sans',
      },
    ],
  },

  loading: {
    color: '#6921b6',
    failedColor: 'red',
    continuous: true,
  },

  loadingIndicator: {
    name: 'rotating-plane',
    color: '#c504da',
    background: '#f9eded',
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/styles/custom.css'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [{ src: '~/plugins/axios' }, { src: '~/plugins/global_mixins' }],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
    '@nuxt/postcss8',
  ],

  eslint: {
    fix: true,
  },

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
    [
      'nuxt-vuex-localstorage',
      {
        localStorage: ['auth', 'localStorage', 'settings'],
      },
    ],
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    timeout: 60000,
  },

  // PWA module configuration: https://go.nuxtjs.dev/pwa
  pwa: {
    manifest: {
      lang: 'en',
    },
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    customVariables: ['~/assets/styles/variables.scss'],
    treeShake: true,
    theme: {
      dark: false,
      themes: {
        light: {
          primary: '#c504da',
          accent: '#6921b6',
          secondary: '#f9eded',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: '#10b988',
        },
        dark: {
          primary: '#f7bdfe',
          accent: '#f3ebfb',
        },
      },
    },
  },

  publicRuntimeConfig: {
    axios: { baseURL: process.env.BASEURL },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    // https://stackoverflow.com/questions/67350359/nuxt-js-fresh-install-of-nuxt-2-14-6-contains-babel-loose-option-warnings
    babel: {
      plugins: [['@babel/plugin-proposal-private-methods', { loose: true }]],
    },
    postcss: {
      plugins: {
        tailwindcss: {},
        autoprefixer: {},
      },
    },
  },

  generate: {
    fallback: true,
  },
}
