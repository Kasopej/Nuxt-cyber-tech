<template>
  <main v-if="program">
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

    <v-tabs grow>
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
        <section v-if="submissions.length">
          <article v-for="submission in submissions" :key="submission._id">
            <submission-item-list-card :submission="submission" />
          </article>
        </section>

        <section v-else>
          <partials-empty-data caption="No Submissions Found" />
        </section>

        <nav class="text-center py-8">
          <v-pagination v-model="page" :length="6"></v-pagination>
        </nav>
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
    date: new Date().toISOString(),
  },
]

export default {
  extends: ProgramItemBase,
  data() {
    return {
      page: 0,
      program: null,
      submissions,
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
}
</script>
