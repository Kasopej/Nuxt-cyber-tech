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
        <v-col v-for="submission in submissions" :key="submission._id" md="6">
          <submission-item-list-card :submission="submission" />
        </v-col>
      </v-row>
    </section>

    <section v-else>
      <partials-empty-data caption="No Submissions Found" />
    </section>

    <footer class="text-center py-8">
      <v-pagination
        v-model="pagination.page"
        :length="pagination.length"
      ></v-pagination>
    </footer>
  </main>
</template>

<script>
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
      pagination: { page: 0, length: 1 },

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
  },
}
</script>
