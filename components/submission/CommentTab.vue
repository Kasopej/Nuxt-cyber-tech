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
      <div
        v-for="comment in comments"
        :key="comment._id"
        class="comment d-flex"
      >
        <SubmissionCommentCardImage
          v-if="comment.hunterId"
          :name="comment.hunterId.profile[0].username"
          :user-type="comment.accountType"
          :image="comment.hunterId.profile[0].image"
        />

        <SubmissionCommentCardImage
          v-else
          :name="comment.accountId.company[0].name"
          :user-type="comment.accountType"
          :image="comment.accountId.company[0].image"
        />

        <v-card class="flex-grow-1 pa-3" elevation="0" outlined>
          <header class="d-sm-flex justify-space-between flex-grow-1">
            <div class="comment__info body-2 text-small">
              <span class="action">Comment by</span>
              <a
                v-if="comment.hunterId"
                href="http://"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ comment.hunterId.profile[0].username }}
              </a>
              <a
                v-else
                href="http://"
                target="_blank"
                rel="noopener noreferrer"
              >
                {{ comment.accountId.company[0].name }}
              </a>
            </div>

            <time class="grey--text body-2 text-small">
              {{ customDate(comment.createdAt) }}
              <span>({{ new Date(comment.createdAt).toLocaleString() }})</span>
            </time>
          </header>

          <article
            class="py-4 body-1 text-medium"
            v-html="convertCommentHTML(comment.comment)"
          ></article>

          <footer class="text-right">
            <span
              class="accent--text text-caption font-weight-medium"
              v-text="comment.status"
            ></span>
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
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'
// import 'assets/styles/custom.css'

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
        this.$store.dispatch('notification/failureSnackbar', error)
      })
  },

  created() {
    dayjs.extend(relativeTime)
    dayjs.extend(localizedFormat)
  },

  methods: {
    sortedComment() {
      return this.comments.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
      // return this.comments.sort((a, b) => (a.updatedAt > b.updatedAt ? 1 : -1))
    },

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

            this.$store.dispatch(
              'notification/successSnackbar',
              'Comment submitted'
            )

            this.$fetch()
          })
          .catch((error) => {
            this.$store.dispatch('notification/failureSnackbar', error)
          })
          .finally(() => {
            this.$nuxt.$loading.finish()
          })
      }
    },

    customDate(date) {
      if (!date) {
        return null
      }
      if (dayjs(date).fromNow().includes('year')) {
        return `on ${dayjs(date).format('D MMM YYYY')}`
      }
      const fromNowMonth = dayjs(date).fromNow().includes('month')
      const currentYear = new Date().getFullYear()
      const isThisYear = parseInt(String(date).slice(0, 4), 10) === currentYear
      if (fromNowMonth && isThisYear) {
        return `on ${dayjs(date).format('D MMM')}`
      }
      return dayjs(date).fromNow()
    },

    // checkResponse(option1, option2) {
    //   comment.accounttype == 'company'
    //   if()
    // },
  },
}
</script>

<style scoped>
.comment:not(:last-child) {
  position: relative;
  margin-bottom: 10px;
}

.comment:not(:last-child)::before {
  position: absolute;
  top: 26px;
  left: 20px;
  content: '';
  width: 0;
  height: calc(100% + 10px);
  border-left: 2px solid #f9eded;
}

.comment__info a {
  text-decoration: none;
}

.comment__info a:hover {
  text-decoration: underline;
}

time span {
  font-size: 10px;
}
</style>
