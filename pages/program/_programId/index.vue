<template>
  <div v-if="$fetchState.pending" class="flex">
    <v-col cols="12">
      <v-skeleton-loader type="article" elevation="3"></v-skeleton-loader>
    </v-col>
  </div>
  <main v-else>
    <nav>
      <v-breadcrumbs divider="»" :items="breadcrumbsItems" class="pa-0 py-4" />
    </nav>

    <section class="d-flex justify-space-between items-center py-8">
      <v-btn color="primary" outlined small @click="toggleFavorite">
        <v-icon color="primary" class="mr-4" small>{{ favoriteIcon }}</v-icon>
        <span>{{ favoriteText }}</span>
      </v-btn>

      <v-btn color="primary" :to="`${$route.path}/report/`">
        Submit Report
      </v-btn>
    </section>

    <h1 class="mb-3 p-2 text-h4 w-fit">{{ program.title }}</h1>

    <v-tabs v-model="currentTab" grow>
      <v-tab>
        <v-icon class="mr-3">mdi-book-information-variant</v-icon>
        <span class="text-capitalize">Program Details</span>
      </v-tab>

      <v-tab>
        <v-icon class="mr-3">mdi-format-list-checkbox</v-icon>
        <span class="text-capitalize">Submissions</span>
      </v-tab>

      <v-tab>
        <v-icon class="mr-3">mdi-billboard</v-icon>
        <span class="text-capitalize">Hall Of Fame</span>
      </v-tab>

      <v-tab-item class="px-4 py-8">
        <program-details :program="program" />
      </v-tab-item>

      <v-tab-item class="pa-4">
        <section
          v-if="submissions.length && !submissionsLoading"
          class="d-flex flex-wrap"
        >
          <submission-item-list-card
            v-for="submission in submissions"
            :key="submission._id"
            :submission="submission"
          />
        </section>

        <section v-else-if="submissionsLoading" class="flex">
          <v-col v-for="n in 2" :key="n" cols="12" sm="6">
            <v-skeleton-loader
              type="card-heading, text"
              elevation="3"
            ></v-skeleton-loader>
          </v-col>
        </section>
        <section v-else>
          <partials-empty-data caption="No Submissions Found" />
        </section>

        <partials-pagination
          v-model="pagination.page"
          :length="pagination.length"
          :page-limit="pageLimit"
          @input="getSubmissions"
        ></partials-pagination>
      </v-tab-item>

      <v-tab-item class="px-4 py-8">
        <program-hall-of-fame :program-id="$route.params.programId" />
      </v-tab-item>
    </v-tabs>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import showdown from 'showdown'
import ProgramItemBase from '~/components/program/ProgramItemBase'

const severityRank = {
  low: 1,
  medium: 2,
  high: 3,
  critical: 4,
}

export default {
  extends: ProgramItemBase,
  data() {
    return {
      pagination: { page: 1, length: 1 },
      program: null,
      submissions: [],
      submissionsLoading: false,
      currentTab: 0,
      breadcrumbsItems: [
        {
          text: 'Dashboard',
          disabled: false,
          to: '/',
        },
        {
          exact: true,
          text: 'Programs',
          to: '/program/',
        },
        { disabled: true, text: 'Program Details' },
      ],
    }
  },
  async fetch() {
    const URL = `/get-program/${this.$route.params.programId}`
    // Make upload request to the API

    await this.$axios
      .$get(URL)
      .then((res) => {
        this.program = res.data
      })
      .catch((error) => {
        this.$store.dispatch('notification/failureSnackbar', error)
      })
  },

  computed: {
    ...mapState('program', ['pageLimit']),
    description() {
      const converter = new showdown.Converter()
      return converter.makeHtml(this.program.description)
    },
    favoriteText() {
      return this.programFavorited ? 'Favourite' : 'Add to favourites'
    },
  },
  watch: {
    currentTab(val) {
      if (val === 1) {
        if (this.submissions.length) return
        this.getSubmissions()
      }
    },
  },
  methods: {
    getSubmissions() {
      this.submissionsLoading = true
      this.$axios
        .$get(
          `/getSubmissionsByProgramIdHunter/${this.$route.params.programId}?page=${this.pagination.page}&limit=${this.$store.state.program.pageLimit}`
        )
        .then((res) => {
          this.submissions = res.data.docs.sort(
            (a, b) =>
              severityRank[a.severity.toLowerCase()] -
              severityRank[b.severity.toLowerCase()]
          )
          this.pagination.length = res.data.totalPages
        })
        .catch((err) => {
          console.log({ err })
        })
        .finally(() => (this.submissionsLoading = false))
    },
  },
}
</script>
