<template>
  <main>
    <nav>
      <v-breadcrumbs divider="»" :items="breadcrumbsItems" class="pa-0 py-4" />
    </nav>

    <section v-if="$fetchState.pending">
      <v-skeleton-loader v-for="i in 3" :key="i" type="article" />
    </section>

    <section v-else-if="$fetchState.error" class="text-center py-12">
      <partials-empty-data caption="An error occured" />
    </section>

    <section v-else-if="submission">
      <v-tabs>
        <v-tab>Report Summary</v-tab>
        <v-tab>Bug Description</v-tab>
        <v-tab>Comments</v-tab>

        <v-tab-item>
          <submission-report-summary-tab :submission="submission" />
        </v-tab-item>
        <v-tab-item>
          <submission-description-tab
            :submission-attachment="submissionAttachment"
            :submission="submission"
          />
        </v-tab-item>
        <v-tab-item> <submission-comment-tab /> </v-tab-item>
      </v-tabs>
    </section>
  </main>
</template>

<script>
export default {
  layout: 'submission',
  data() {
    return {
      tab: 0,
      submission: null,
      submissionAttachment: [],
      // submission: this.$store.state.submission.data,

      breadcrumbsItems: [
        {
          text: 'Dashboard',
          disabled: false,
          to: '/',
        },
        {
          exact: true,
          text: 'Submissions',
          to: '/submission/',
        },
        { disabled: true, text: 'Submissions Details' },
      ],
    }
  },
  async fetch() {
    const URL = `/get-submission/${this.$route.params.submissionId}`
    const attachmentURL = `/get-submission-attachments/${this.$route.params.submissionId}`
    // Make upload request to the API
    await this.$axios
      .$get(URL)
      .then((res) => {
        this.submission = res.data
      })
      .catch((error) => {
        this.$store.dispatch('notification/failureSnackbar', error)
      })
    await this.$axios
      .$get(attachmentURL)
      .then((res) => {
        this.submissionAttachment = res.data
      })
      .catch((error) => {
        this.$store.dispatch('notification/failureSnackbar', error)
      })
  },
}
</script>
