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

      <v-btn
        color="primary"
        :to="`/program/${program.title
          .toLowerCase()
          .replace(/ /g, '-')}/report/`"
      >
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
        <section v-if="submissions.length && !submissionsLoading">
          <article v-for="submission in submissions" :key="submission._id">
            <submission-item-list-card :submission="submission" />
          </article>
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
          v-model="page"
          :length="6"
          @input="getSubmissions"
        ></partials-pagination>
      </v-tab-item>

      <v-tab-item class="px-4 py-8">
        <program-hall-of-fame :program-id="11119" />
      </v-tab-item>
    </v-tabs>
  </main>
</template>

<script>
import showdown from 'showdown'
import ProgramItemBase from '~/components/program/ProgramItemBase'
const submissions = [
  {
    title: 'Bug Injection DDOS',
    programId: {
      title: 'hello',
    },
    bugtype: 'buggyyyy!',
    actionstate: 'pending',
    date: new Date().toDateString(),
  },
]

export default {
  extends: ProgramItemBase,
  data() {
    return {
      page: 1,
      program: null,
      submissions,
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
    // rename to disable fetch for now as API is down
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
          `get-submissions?program=${this.$route.params.programId}&page=${this.page}`
        )
        .then((res) => {
          this.submissions = res.data
        })
        .catch((err) => {
          console.log({ err })
        })
        .finally(() => (this.submissionsLoading = false))
    },
  },
}
</script>
