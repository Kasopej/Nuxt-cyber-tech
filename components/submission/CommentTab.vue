<template>
  <main class="px-3 py-6">
    <section v-if="$fetchState.pending">
      <v-skeleton-loader v-for="i in 3" :key="i" type="article" />
    </section>

    <section v-else-if="$fetchState.error">
      <partials-empty-data caption="An error occured" />
    </section>

    <section v-else-if="!comments.length">
      <partials-empty-data caption="No comments for this submission" />
    </section>

    <section v-else>
      <div v-for="comment in comments" :key="comment._id" class="d-flex pb-4">
        <v-card class="flex-grow-1 pa-3 rounded-tr-xl rounded-bl-xl">
          <header class="d-sm-flex justify-space-between flex-grow-1">
            <section class="d-flex align-center">
              <v-avatar color="secondary" size="32">
                <v-icon color="primary" size="28">{{
                  comment.accounttype == 'company'
                    ? 'mdi-factory'
                    : 'mdi-account-circle'
                }}</v-icon>
              </v-avatar>
              <div
                class="subtitle-1 primary--text font-weight-bold ml-2"
                v-text="comment.accountId"
              />
            </section>

            <time
              class="grey--text font-weight-medium"
              v-text="new Date(comment.createdAt).toLocaleString()"
            />
          </header>

          <article class="py-4" v-html="convertCommentHTML(comment.comment)" />

          <footer class="text-right">
            <span
              class="accent--text font-weight-medium"
              v-text="comment.status"
            />
            <v-icon small class="ml-2" color="accent">{{
              comment.type == 'Public' ? 'mdi-eye' : 'mdi-eye-off'
            }}</v-icon>
          </footer>
        </v-card>
      </div>
    </section>

    <v-form ref="commentForm">
      <div class="accent--text headline font-weight-bold py-4">
        Post A Respone
      </div>

      <v-card class="pa-4" elevation="3">
        <div>
          <v-btn
            small
            :outlined="!!commentPreview"
            color="accent"
            @click="commentPreview = null"
            >Write
            <v-icon small class="ml-2">mdi-fountain-pen-tip</v-icon></v-btn
          >
          <v-btn
            small
            :outlined="!commentPreview"
            color="accent"
            class="my-2 mx-md-3"
            @click="commentPreview = convertCommentHTML(FORM.comment)"
            >Preview <v-icon small class="ml-2">mdi-eye</v-icon></v-btn
          >
        </div>

        <div
          v-if="commentPreview"
          class="elevation-2 rounded px-2 py-4"
          v-html="commentPreview"
        />
        <v-textarea v-else v-model="FORM.comment" else outlined hide-details />

        <div class="pb-4">
          <small class="grey--text darken-2"
            >Styling with MarkDown is supported</small
          >
        </div>

        <v-btn color="primary" @click="postComment()">Post Response</v-btn>
      </v-card>
    </v-form>
  </main>
</template>

<script>
import showdown from 'showdown'

export default {
  data() {
    return {
      FORM: {},
      comments: [],
      commentPreview: null,
    }
  },

  async fetch() {
    const URLL = `/get-comments/${this.$route.params.submissionId}`
    // Make upload request to the API
    await this.$axios
      .$get(URLL, this.FORM)
      .then((res) => {
        this.comments = res.data.docs
      })
      .catch((error) => {
        this.$store.commit('notification/SHOW', {
          color: 'accent',
          icon: 'mdi-alert-outline',
          text: error.response
            ? error.response.data.message
            : "Sorry, that didn't work. Please try again",
        })
      })
  },

  methods: {
    convertCommentHTML(val) {
      const converter = new showdown.Converter()
      return converter.makeHtml(val)
    },

    async postComment() {
      if (this.$refs.commentForm.validate()) {
        this.$nuxt.$loading.start()

        const URLL = `/create-comment/${this.$route.params.submissionId}`
        // Make upload request to the API
        await this.$axios
          .$post(URLL, this.FORM)
          .then(() => {
            this.FORM = {}
            this.commentPreview = null

            this.$store.commit('notification/SHOW', {
              icon: 'mdi-check',
              text: 'Comment Submitted Successfully',
            })

            this.$fetch()
          })
          .catch((error) => {
            this.$store.commit('notification/SHOW', {
              color: 'accent',
              icon: 'mdi-alert-outline',
              text: error.response
                ? error.response.data.message
                : "Sorry, that didn't work. Please try again",
            })
          })
          .finally(() => {
            this.$nuxt.$loading.finish()
          })
      }
    },
  },
}
</script>
