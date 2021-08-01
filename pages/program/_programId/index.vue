<template>
  <main v-if="program">
    <nav>
      <v-breadcrumbs divider="»" :items="breadcrumbsItems" class="pa-0 py-4" />
    </nav>

    <article>
      <program-item-list-card :program="program" show-visibility />
    </article>

    <section class="d-md-flex justify-space-between items-center py-8">
      <v-btn color="primary" outlined small>
        <v-icon class="mr-4" small>mdi-star</v-icon>
        <span>Favorite</span>
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
        <submission-program-details
          :scope="program.scope"
          :description="program.description"
        />
      </v-tab-item>

      <v-tab-item class="pa-4">
        <div>Hello Papi</div>
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

export default {
  data() {
    return {
      page: 0,

      program: null,
      submissions: [],

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
    // if you are the next developer working on this , replace the api call below to fetch the program details alone from the end point
    const URL = `/get-programs?limit=15`
    // Make upload request to the API

    await this.$axios
      .$get(URL)
      .then((res) => {
        const mainProgram = res.data.docs.filter((program) => {
          return (
            program.title.toLowerCase().replace(/ /g, '-') ===
            this.$route.params.programId
          )
        })
        this.program = mainProgram[0]
      })
      .catch((error) => {
        this.$store.commit('notification/SHOW', {
          color: 'accent',
          icon: 'mdi-alert-outline',
          text: error.response
            ? error.response.data.message
            : 'Something occured. Please try again',
        })
      })
  },
  computed: {
    description() {
      const converter = new showdown.Converter()
      return converter.makeHtml(this.program.description)
    },
  },
}
</script>
