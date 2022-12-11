<template>
  <!-- <v-hover v-slot="{ hover }">
    <v-card
      class="d-flex align-center mt-6 mx-1 overflow-x-hidden"
      :class="hover ? 'secondary' : ''"
      @click="openDetails(submission)"
    >
      <v-img
        :src="submission.thumbnail || '/img/dummy.jpg'"
        :max-width="$vuetify.breakpoint.mobile ? '108px' : '150px'"
        class="rounded-0"
      />

      <section
        class="flex-grow-1 w-full d-flex flex-column justify-space-between pa-1 pa-md-2"
      >
        <div class="d-sm-flex justify-space-between text-capitalize text-small">
          <header
            class="body-2 font-weight-medium accent--text text-medium"
            v-text="submission.programId.title"
          />

          <aside class="text-no-wrap">
            <span
              class="primary--text text-caption text--darken-2 font-weight-bold py-md-2 px-sm-4 text-small"
              v-text="submission.actionstate"
            />

            <v-icon color="accent" :size="iconSize()">{{
              submission.visibility == 'Public' ? 'mdi-eye' : 'mdi-eye-off'
            }}</v-icon>
          </aside>
        </div>

        <div
          class="d-none d-sm-inline grey--text body-2 text--darken-2 text-no-wrap"
        >
          <v-icon :size="iconSize()" class="primary--text mr-2"
            >mdi-factory</v-icon
          >
          <span
            class="d-inline-block text-truncate text-wrap text-capitalize text-small"
            v-text="desiredLength(submission.title)"
          ></span>
        </div>

        <div class="text-no-wrap grey--text body-2 text--darken-2 text-small">
          <v-icon :size="iconSize()" class="primary--text mr-2">mdi-tag</v-icon>
          <span v-text="submission.bugtype" />
        </div>

        <div class="text-no-wrap grey--text body-2 text--darken-2 text-small">
          <v-icon :size="iconSize()" class="primary--text mr-2"
            >mdi-gift-outline</v-icon
          >
          <strong>$0</strong>
          <span>Per Vulnerability</span>
        </div>

        <div class="text-no-wrap grey--text body-2 text--darken-2 text-small">
          <v-icon :size="iconSize()" class="primary--text mr-2"
            >mdi-clock-outline</v-icon
          >
          <span v-text="new Date(submission.date).toLocaleDateString()" />
        </div>
      </section>
    </v-card>
  </v-hover> -->
  <v-col cols="12" sm="6">
    <v-hover>
      <template #default="{ hover }">
        <v-card
          class="submission-card cursor-pointer"
          :class="hover ? 'grey lighten-5' : ''"
          @click="openDetails(submission)"
        >
          <v-card-title primary-title class="flex">
            <!-- Should get program thumbnail from submission's program as this component should not know about programs, only submissions -->
            <v-avatar :src="program.thumbnail || '/img/dummy.jpg'">
              <img src="src" alt="alt" />
            </v-avatar>
            <span class="inline-block primary--text">{{
              submission.title
            }}</span>
          </v-card-title>
          <v-card-text class="submission-card-text">
            <div class="flex">
              <span>Status: {{ submission.actionstate }}</span>
              <div class="ml-auto flex severity-indicator-wrapper items-center">
                <v-progress-linear
                  class="mr-1"
                  :color="submissionSeverityColor"
                  background-color="grey lighten-2"
                  rounded
                  :value="submisionCVVPercentage"
                  height="8"
                ></v-progress-linear>
                Critical
              </div>
            </div>
            <span>Last Modified: {{ submissionDateFormatted }}</span>
          </v-card-text>
        </v-card>
      </template>
    </v-hover>
  </v-col>
</template>

<script>
import { mapGetters, mapState } from 'vuex'
import dayjs from 'dayjs'
export default {
  props: {
    hoverable: { type: Boolean, default: false },
    submission: { type: Object, default: () => {} },
  },
  data() {
    return {}
  },

  computed: {
    ...mapGetters('auth', ['profileImg']),
    ...mapState('program', { program: 'data' }),
    submissionDateFormatted() {
      return dayjs(this.submission.date).format('DD MMM YYYY - HH:mm')
    },
    submisionCVVPercentage() {
      return 10
    },
    submissionSeverityColor() {
      return `red darken-2`
    },
  },

  methods: {
    openDetails(submission) {
      this.$router.push(`/submission/${submission._id}/`)
    },

    desiredLength(text) {
      return text.slice(0, 35)
    },

    iconSize() {
      return this.$vuetify.breakpoint.mobile ? 12 : 16
    },
  },
}
</script>

<style lang="scss" scoped>
@media screen and (max-width: 425px) {
  .text-medium {
    font-size: 10px !important;
  }

  .text-small {
    font-size: 10px !important;
  }
}
.severity-indicator-wrapper {
  flex: 1 1 20%;
  max-width: 20%;
}
</style>
