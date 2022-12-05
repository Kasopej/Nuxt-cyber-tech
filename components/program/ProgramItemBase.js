import debounce from '~/utils/debounce'
const toggleFavoriteDebounced = debounce(toggleFavorite, 400)
function toggleFavorite() {
  this.programFavorited = !this.programFavorited
}

export default {
  computed: {
    favoriteIcon() {
      return this.programFavorited ? 'mdi-heart' : 'mdi-heart-outline'
    },
  },
  methods: {
    toggleFavorite: toggleFavoriteDebounced,
  },
}
