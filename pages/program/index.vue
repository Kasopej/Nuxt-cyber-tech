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
import scrollDetection from '@/utils/mixins/reloadScrollDetect'

export default {
  mixins: [scrollDetection],

  data() {
    return {
      pagination: { page: 1, length: 0 },

      programs: [],
    }
  },

  async fetch() {
    const URL = `/get-programs?limit=${this.$store.state.program.pageLimit}`
    // Make upload request to the API
    await this.$axios
      .$get(URL, this.FORM)
      .then((res) => {
        this.programs = res.data.docs
        this.pagination.length = res.data.totalPages
        this.pagination.page++
      })
      .catch((error) => {
        this.$store.dispatch('notification/failureSnackbar', error)
      })
  },

  watch: {
    shouldLoadMore(newState, oldState) {
      if (oldState === false) {
        this.loadMorePrograms()
      }

      if (newState === true) {
        console.log('I am loading more')
      }
    },
  },

  created() {
    this.updatePageDetails(this.pagination.page, '/program/')
  },

  methods: {
    async loadMorePrograms() {
      if (this.pagination.page < this.pagination.length) {
        const URL = `/get-programs?page=${this.pagination.page}&limit=${this.$store.state.program.pageLimit}`

        try {
          const response = await this.$axios.$get(URL, this.FORM)

          this.programs.push(response.data.docs)
          this.pagination.page++
        } catch (e) {
          this.$store.dispatch('notification/failureSnackbar', e)
        }
      } else
        this.$store.dispatch(
          'notification/warningSnackbar',
          'Nothing to load more'
        )
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
