<template>
  <v-row>
    <!-- Filter menu bar - smaller screens version -->
    <div v-if="mobileView">
      <v-overlay :value="overlay">
        <v-row>
          <v-col cols="12" class="d-flex">
            <PartialsFilterMenuBar
              v-model="filterOptions"
              @toggle-overlay="overlay = !overlay"
            ></PartialsFilterMenuBar>
          </v-col>
        </v-row>
      </v-overlay>
    </div>
    <!-- Filter menu bar - larger screens version -->
    <v-col v-else cols="2" class="d-flex">
      <PartialsFilterMenuBar v-model="filterOptions"></PartialsFilterMenuBar>
    </v-col>
    <v-col :cols="mobileView ? 12 : 10" class="px-4">
      <header class="d-flex mb-0 mb-md-6">
        <v-col cols="12">
          <div class="mx-auto text-center">
            <input
              type="search"
              class="py-4 px-6 bg-primary text-white search-bar border-solid border rounded-lg border-primary"
              style="width: 70%; margin: 0 15%"
              placeholder="Search programs"
            />
            <v-icon class="relative right-12 cursor" color="white" x-large
              >mdi-magnify</v-icon
            >
          </div>
        </v-col>
      </header>
      <div class="d-flex px-2">
        <p class="inline-block col-6">
          {{ programs.length }} programs found
          <v-icon v-if="mobileView" @click="overlay = !overlay"
            >mdi-filter</v-icon
          >
        </p>
        <v-select
          id="v-select-sorting"
          v-model="sortBy"
          :items="['newest', 'oldest']"
          class="fit-content ml-auto mt-2 col-6"
          dense
        >
          <template #prepend>
            <v-icon @click="clickSelect">mdi-sort</v-icon>
          </template>
        </v-select>
      </div>
      <v-card v-if="$fetchState.pending" class="row">
        <v-col v-for="i in 3" :key="i" cols="12" md="4">
          <v-skeleton-loader
            type="table-heading, list-item-two-line, image, table-tfoot"
            elevation="3"
          ></v-skeleton-loader>
        </v-col>
      </v-card>
      <v-card v-else class="row justify-center mx-auto">
        <v-col v-for="program in programs" :key="program._id" cols="12" md="4">
          <program-item-list-card :program="program" hoverable />
        </v-col>
      </v-card>
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
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      pagination: { page: 1, length: 0 },
      programs: [],
      loadingMore: false,
      overlay: false,
      filtersSet: false,
      filterOptions: {
        visibility: {
          public: false,
          private: false,
        },
        type: {
          compliance: false,
        },
      },
      sortBy: null,
    }
  },

  async fetch() {
    const URL =
      `/get-programs?page=${this.pagination.page}&limit=${this.$store.state.program.pageLimit}` +
      this.filterURLEncoded
    await this.$axios
      .$get(URL)
      .then((res) => {
        this.programs = res.data.docs
        this.pagination.length = res.data.totalPages
      })
      .catch((error) => {
        this.$store.dispatch('notification/failureSnackbar', error)
      })
  },
  computed: {
    filterURLEncoded() {
      if (!this.filtersSet) return ''
      return `&type=${
        this.filterOptions.type.compliance ? 'compliance' : ''
      }&visibility=${this.filterOptions.visibility.private ? 'private,' : ''}${
        this.filterOptions.visibility.public ? 'public' : ''
      }`
    },
  },
  watch: {
    filterOptions(val) {
      this.filtersSet = true
      console.log({ val })
      this.$fetch()
    },
    sortBy(val) {
      console.log({ val })
      this.$fetch()
    },
  },
  created() {
    this.$store.commit('program/changeFluidState', true)
  },
  methods: {
    async loadMorePrograms() {
      this.loadingMore = true
      ++this.pagination.page

      const URL = `/get-programs?page=${this.pagination.page}&limit=${this.$store.state.program.pageLimit}`

      try {
        const response = await this.$axios.$get(URL)

        this.loadingMore = false
        this.programs.push(...response.data.docs)
      } catch (e) {
        --this.pagination.page
        this.loadingMore = false
        this.$store.dispatch('notification/failureSnackbar', e)
      }
    },
    clickSelect() {
      document.getElementById('v-select-sorting').click()
    },
  },
}
</script>

<style lang="scss">
.sort-programs {
  display: inline-block !important;
}
.v-overlay__content {
  width: 80%;
}
</style>
