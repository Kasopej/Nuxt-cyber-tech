import debounce from '~/utils/debounce'
const toggleFavoriteDebounced = debounce(toggleFavorite, 400)
function toggleFavorite() {
  this.$axios
    .$post(`addfavourite/${this.program._id}`)
    .then(() => (this.programFavorited = true))
}

export default {
  data() {
    return {
      programFavorited: false,
    }
  },
  computed: {
    favoriteIcon() {
      return this.programFavorited ? 'mdi-heart' : 'mdi-heart-outline'
    },
  },
  methods: {
    toggleFavorite: toggleFavoriteDebounced,
  },
}
