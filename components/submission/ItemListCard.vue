<template>
  <v-hover v-slot="{ hover }">
    <v-card
      class="d-flex align-center mt-6 overflow-x-hidden"
      :class="hover ? 'secondary' : ''"
      @click="openDetails(submission)"
    >
      <v-img
        :src="submission.thumbnail || '/img/dummy.jpg'"
        :max-width="$vuetify.breakpoint.mobile ? '108px' : '150px'"
        class="rounded-0"
        cover
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
  </v-hover>
</template>

<script>
export default {
  props: {
    hoverable: { type: Boolean, default: false },
    submission: { type: Object, default: () => {} },
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

<style scoped>
@media screen and (max-width: 425px) {
  .text-medium {
    font-size: 10px !important;
  }

  .text-small {
    font-size: 10px !important;
  }
}
</style>
