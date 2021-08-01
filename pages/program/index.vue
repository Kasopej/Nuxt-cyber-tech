<template>
  <main>
    <section v-if="$fetchState.pending">
      <v-skeleton-loader v-for="i in 3" :key="i" type="article" />
    </section>

    <section v-else-if="$fetchState.error">
      <partials-empty-data caption="An error occured" />
    </section>

    <section v-else-if="programs.length">
      <v-row no-gutters>
        <v-col
          v-for="program in programs"
          :key="program._id"
          md="6"
          @click="openDetails(program)"
        >
          <program-item-list-card :program="program" hoverable />
        </v-col>
      </v-row>
    </section>

    <section v-else>
      <partials-empty-data text="No Programs Found" />
    </section>

    <!-- TODO: Replace pagination with auto fetch on page scroll -->
    <!-- <div class="text-center py-8">
      <v-pagination
        v-model="pagination.page"
        :length="pagination.length"
      ></v-pagination>
    </div> -->
  </main>
</template>

<script>
export default {
  data() {
    return {
      pagination: { page: 0, length: 1 },

      programs: [],
    }
  },

  async fetch() {
    const URL = `/get-programs?limit=15`
    // Make upload request to the API
    await this.$axios
      .$get(URL, this.FORM)
      .then((res) => {
        this.programs = res.data.docs
        this.pagination.length = res.data.totalPages
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

  methods: {
    openDetails(program) {
      this.$store.commit('program/SAVE_DATA', program)
      // this.$router.push(`/program/00${program._id}/`)
      const NAMED_URL = program.title.toLowerCase().replace(/ /g, '-')

      this.$router.push({
        path: `/program/${NAMED_URL}`,
        params: {
          id: program,
        },
      })
    },
  },
}
</script>
