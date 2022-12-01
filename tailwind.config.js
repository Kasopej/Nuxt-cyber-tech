/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.js',
    './nuxt.config.ts',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#c504da',
        accent: '#6921b6',
      },
      boxShadow: {
        'inner-full':
          'inset 2px 2px 2px 0.3px rgb(0 0 0 / 0.05), inset -2px -2px 2px 0.3px rgb(0 0 0 / 0.05)',
      },
    },
  },
  plugins: [],
}
