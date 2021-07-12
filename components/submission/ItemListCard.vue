<template>
  <v-hover v-slot="{ hover }">
    <v-card
      class="d-flex align-center mt-6 overflow-x-hidden"
      :class="hover ? 'secondary' : ''"
      @click="openDetails(submission)"
    >
      <v-img
        src="/img/dummy.jpg"
        width="250"
        height="200"
        :max-width="$vuetify.breakpoint.mobile ? '100px' : '250px'"
        cover
      />

      <section
        style="min-height: 200px"
        class="flex-grow-1 fill-height w-full d-flex flex-column justify-space-between pa-2 pa-md-4"
      >
        <div class="d-sm-flex justify-space-between text-capitalize">
          <header
            class="subtitle-1 font-weight-medium accent--text"
            v-text="submission.programId.title"
          />

          <aside class="text-no-wrap">
            <span
              class="primary--text text-caption text--darken-2 font-weight-bold py-2 px-sm-4 py-sm-0"
              v-text="submission.actionstate"
            />

            <v-icon color="accent">{{
              submission.visibility == 'Public' ? 'mdi-eye' : 'mdi-eye-off'
            }}</v-icon>
          </aside>
        </div>

        <div class="d-none d-sm-inline grey--text text--darken-2 text-no-wrap">
          <v-icon small class="primary--text mr-2">mdi-factory</v-icon>
          <span class="text-capitalize" v-text="submission.title" />
        </div>

        <div class="pb-1 text-no-wrap grey--text text--darken-2">
          <v-icon small class="primary--text mr-2">mdi-tag</v-icon>
          <span v-text="submission.bugtype" />
        </div>
        <div class="pb-1 text-no-wrap grey--text text--darken-2">
          <v-icon small class="primary--text mr-2">mdi-gift-outline</v-icon>
          <strong>$0</strong>
          <span>Per Vulnerability</span>
        </div>
        <div class="text-no-wrap grey--text text--darken-2">
          <v-icon small class="primary--text mr-2">mdi-clock-outline</v-icon>
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
  },
}
</script>
