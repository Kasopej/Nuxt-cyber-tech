<template>
  <main>
    <nav>
      <v-breadcrumbs divider="»" :items="breadcrumbsItems" class="pa-0 py-4" />
    </nav>

    <header class="py-4">
      <v-btn
        v-for="filter in filters"
        :key="filter"
        color="accent"
        :outlined="status != filter"
        class="text-capitalize text-caption pa-1 pa-md-2 mr-1 mr-md-2 mb-2"
        @click="changeFilter(filter)"
      >
        {{ filter }}
      </v-btn>
    </header>

    <section v-if="$fetchState.pending">
      <v-skeleton-loader v-for="i in 3" :key="i" type="article" />
    </section>

    <section v-else-if="$fetchState.error" class="text-center py-12">
      <partials-empty-data caption="An error occured" />
    </section>

    <section v-else-if="submissions.length">
      <v-row no-gutters>
        <v-col
          v-for="submission in submissions"
          :key="submission._id"
          cols="12"
          md="6"
        >
          <submission-item-list-card :submission="submission" />
        </v-col>
      </v-row>
    </section>

    <section v-else>
      <partials-empty-data caption="No Submissions Found" />
    </section>
  </main>
</template>

<script>
import scrollDetection from '@/utils/mixins/reloadScrollDetect'

export default {
  mixins: [scrollDetection],

  data() {
    return {
      status: 'all',
      filters: [
        'all',
        'pending',
        'accepted',
        'rejected',
        'duplicate',
        'collaboration',
        'invitation',
      ],

      submissions: [],
      pagination: { page: 1, length: 0 },

      breadcrumbsItems: [
        {
          text: 'Dashboard',
          disabled: false,
          to: '/',
        },
        { disabled: true, text: 'Leader board' },
      ],
    }
  },

  async fetch() {
    const URL = `/get-all-submissions/${this.status}` // ?page={page}&limit={limit}
    // Make upload request to the API
    await this.$axios
      .$get(URL, this.FORM)
      .then((res) => {
        this.submissions = res.data.docs
        this.pagination.length = res.data.totalPages
        this.pagination.pages++
      })
      .catch((error) => {
        this.$store.dispatch('notification/failureSnackbar', error)
      })
  },

  watch: {
    shouldLoadMore(newState, oldState) {
      if (oldState === false) {
        this.loadMoreSubmissions()
      }

      if (newState === true) {
        console.log('I am loading more')
      }
    },
  },

  created() {
    this.updatePageDetails(this.pagination.page, '/submission/')
  },

  methods: {
    changeFilter(filter) {
      this.status = filter
      this.$fetch()
    },

    async loadMoreSubmissions() {
      if (this.pagination.page < this.pagination.length) {
        const URL = `/get-all-submissions/${this.status}?page=${this.pagination.page}&limit=${this.$store.state.program.pageLimit}`

        try {
          const response = await this.$axios.$get(URL, this.FORM)

          this.submissions.push(response.data.docs)
          this.pagination.page++
        } catch (e) {
          this.$store.dispatch('notification/failureSnackbar', e)
        }
      } else
        this.$store.dispatch(
          'notification/warningSnackbar',
          'Nothing to load more'
        )
    },
  },
}
</script>
