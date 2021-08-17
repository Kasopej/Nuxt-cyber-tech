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
          cols="12"
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

    <div class="text-center mt-8">
      <v-btn
        v-if="pagination.page < pagination.length"
        color="primary"
        elevation="2"
        :loading="loadingMore"
        small
        rounded
        @click="loadMorePrograms"
      >
        Add More
      </v-btn>
    </div>

    <p v-if="loadingMore" class="text-center mt-4">Adding to list...</p>
  </main>
</template>

<script>
export default {
  data() {
    return {
      pagination: { page: 1, length: 0 },

      programs: [],

      loadingMore: false,
    }
  },

  async fetch() {
    const URL = `/get-programs?page=${this.pagination.page}&limit=${this.$store.state.program.pageLimit}`
    await this.$axios
      .$get(URL, this.FORM)
      .then((res) => {
        this.programs = res.data.docs
        this.pagination.length = res.data.totalPages
      })
      .catch((error) => {
        this.$store.dispatch('notification/failureSnackbar', error)
      })
  },

  methods: {
    async loadMorePrograms() {
      this.loadingMore = true
      ++this.pagination.page

      const URL = `/get-programs?page=${this.pagination.page}&limit=${this.$store.state.program.pageLimit}`

      try {
        const response = await this.$axios.$get(URL, this.FORM)

        this.loadingMore = false
        this.programs.push(...response.data.docs)
      } catch (e) {
        --this.pagination.page
        this.loadingMore = false
        this.$store.dispatch('notification/failureSnackbar', e)
      }
    },

    openDetails(program) {
      this.$store.commit('program/SAVE_DATA', program)
      // this.$router.push(`/program/00${program._id}/`)
      const NAMED_URL = program.title.toLowerCase().replace(/ /g, '-')

      this.$router.push({
        // path: `/program/${program._id}`,
        path: `/program/${NAMED_URL}`,
        params: {
          id: program,
        },
      })
    },
  },
}
</script>
