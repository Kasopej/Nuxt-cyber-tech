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
      <v-timeline dense align-top>
        <v-timeline-item v-for="comment in sortedComments" :key="comment._id">
          <template #icon>
            <v-avatar>
              <img
                :src="
                  comment.hunterId
                    ? comment.hunterId.profile[0].image ?? '/img/dummy.jpg'
                    : comment.accountId.company[0].image ?? '/img/dummy.jpg'
                "
              />
            </v-avatar>
          </template>
          <v-card>
            <v-card-title
              class="flex px-3 py-2 text-body-2 secondary lighten-8"
            >
              <v-tooltip top nudge-bottom="20" class="px-1 py-1">
                <template #activator="{ on, attrs }">
                  <span v-bind="attrs" v-on="on">{{
                    comment.hunterId
                      ? comment.hunterId.profile[0].username
                      : comment.accountId.company[0].name
                  }}</span>
                </template>
                <span class="text-xs">100 points</span>
              </v-tooltip>
              <v-chip dense class="ml-1 px-2 py-1" small>{{
                comment.accountType
              }}</v-chip>
              <div class="ml-auto fit-content flex">
                Commented on
                {{ new Date(comment.createdAt).toDateString() }}
                <v-icon color="primary" class="-mt-0.5 ml-1">{{
                  visibilityIcon(comment)
                }}</v-icon>
              </div>
            </v-card-title>
            <v-card-text class="px-3 py-3">
              <article v-html="convertCommentHTML(comment.comment)"></article>
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </section>

    <div class="text-center mt-8">
      <v-btn
        v-if="pagination.page < pagination.length"
        color="primary"
        elevation="2"
        :loading="loadingMore"
        small
        rounded
        @click="loadMoreComments"
      >
        Add More
      </v-btn>
    </div>

    <p v-if="loadingMore" class="text-end mt-4">Adding to list...</p>

    <v-form ref="commentForm">
      <div class="accent--text headline font-weight-bold py-4">
        Post A Response
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
        <article class="flex">
          <v-avatar size="50" class="col-1 py-0 px-0">
            <img src="/img/dummy.jpg" alt="user profile image" />
          </v-avatar>
          <div class="col-11 py-0 px-1">
            <div
              v-if="commentPreview"
              class="elevation-2 relative comment-preview rounded px-2 py-4"
              v-html="commentPreview"
            />
            <v-textarea
              v-else
              v-model="FORM.comment"
              else
              outlined
              hide-details
            />

            <div class="pb-4">
              <small class="grey--text darken-2"
                >Styling with MarkDown is supported</small
              >
            </div>

            <v-btn
              color="primary"
              :disabled="!FORM.comment.length || formSubmitting"
              @click="postComment"
              >Post Response
              <v-progress-circular
                v-if="formSubmitting"
                class="ml-3"
                :size="23"
                :width="2"
                indeterminate
                color="primary"
              ></v-progress-circular>
            </v-btn>
          </div>
        </article>
      </v-card>
    </v-form>
  </main>
</template>

<script>
import showdown from 'showdown'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import relativeTime from 'dayjs/plugin/relativeTime'

export default {
  data() {
    return {
      tab: 0,
      FORM: {
        comment: '',
      },
      comments: [],
      commentPreview: null,
      formSubmitting: false,
      pagination: { page: 1, length: 0 },
      loadingMore: false,
    }
  },

  async fetch() {
    const URLL = `/get-comments/${this.$route.params.submissionId}?page=${this.pagination.page}&limit=${this.$store.state.program.pageLimit}`

    await this.$axios
      .$get(URLL, this.FORM)
      .then((res) => {
        this.comments = res.data.docs
        this.pagination.length = res.data.totalPages
      })
      .catch((error) => {
        this.$store.dispatch('notification/failureSnackbar', error)
      })
  },

  computed: {
    sortedComments() {
      return new Array(...this.comments).sort((a, b) => {
        return new Date(a.createdAt) < new Date(b.createdAt)
      })
    },
  },

  created() {
    dayjs.extend(relativeTime)
    dayjs.extend(localizedFormat)
  },

  methods: {
    async loadMoreComments() {
      this.loadingMore = true
      ++this.pagination.page

      const URL = `/get-comments/${this.$route.params.submissionId}?page=${this.pagination.page}&limit=${this.$store.state.program.pageLimit}`

      try {
        const response = await this.$axios.$get(URL, this.FORM)
        this.comments.push(...response.data.docs)
      } catch (e) {
        --this.pagination.page
        this.$store.dispatch('notification/failureSnackbar', e)
      }
      this.loadingMore = false
    },

    sortedComment() {
      return this.comments.sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
    },

    convertCommentHTML(val) {
      const converter = new showdown.Converter()
      return converter.makeHtml(val)
    },

    async postComment() {
      if (this.formSubmitting) return
      if (this.$refs.commentForm.validate()) {
        this.$nuxt.$loading.start()
        this.formSubmitting = true

        const URL = `/create-comment/${this.$route.params.submissionId}`
        // Make upload request to the API
        await this.$axios
          .$post(URL, this.FORM)
          .then(() => {
            this.FORM = {
              comment: '',
            }

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
            this.formSubmitting = false
          })
      }
    },

    visibilityIcon(comment) {
      return comment.type === 'Public' ? 'mdi-eye' : 'mdi-eye-off'
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
.comment-preview::before {
  content: '';
  transform: rotate(45deg);
  position: absolute;
  left: -5px;
  padding: 5px;
  background-color: white;
  top: 10px;
  box-shadow: -1px 1px 1px 0 rgba(0, 0, 0, 0.4);
}

time span {
  font-size: 10px;
}

.v-card::before {
  background-color: inherit;
}
</style>
