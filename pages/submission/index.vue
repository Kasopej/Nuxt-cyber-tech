<template>
  <main>
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

    <section v-else-if="submissions.length" class="d-flex flex-wrap">
      <submission-item-list-card
        v-for="submission in submissions"
        :key="submission._id"
        :submission="submission"
      />
    </section>

    <section v-else>
      <partials-empty-data caption="No Submissions Found" />
    </section>

    <div class="text-center mt-8">
      <v-btn
        v-if="pagination.page < pagination.length"
        color="primary"
        elevation="2"
        :loading="loadingMore"
        small
        rounded
        @click="loadMoreSubmissions"
      >
        Add More
      </v-btn>
    </div>

    <p v-if="loadingMore" class="text-center mt-4">Adding to list...</p>
  </main>
</template>

<script>
const severityRank = {
  low: 1,
  medium: 2,
  high: 3,
  critical: 4,
}
export default {
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

      loadingMore: false,
    }
  },

  async fetch() {
    const URL = `/get-all-submissions/${this.status}?page=${this.pagination.page}&limit=${this.$store.state.program.pageLimit}`
    await this.$axios
      .$get(URL, this.FORM)
      .then((res) => {
        this.submissions = res.data.docs.sort(
          (a, b) =>
            severityRank[a.severity.toLowerCase()] -
            severityRank[b.severity.toLowerCase()]
        )
        this.pagination.length = res.data.totalPages
      })
      .catch((error) => {
        this.$store.dispatch('notification/failureSnackbar', error)
      })
  },

  methods: {
    changeFilter(filter) {
      this.status = filter
      this.$fetch()
    },

    async loadMoreSubmissions() {
      this.loadingMore = true
      ++this.pagination.page

      const URL = `/get-all-submissions/${this.status}?page=${this.pagination.page}&limit=${this.$store.state.program.pageLimit}`

      try {
        const response = await this.$axios.$get(URL, this.FORM)

        this.loadingMore = false
        this.submissions.push(...response.data.docs)
      } catch (error) {
        --this.pagination.page
        this.loadingMore = false
        this.$store.dispatch('notification/failureSnackbar', error)
      }
    },
  },
}
</script>
