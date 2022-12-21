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
          <div class="mx-auto flex justify-center text-center">
            <input
              type="search"
              class="py-4 px-6 bg-primary text-white search-bar border-solid border rounded-lg border-primary"
              style="width: 70%"
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
      <section v-else-if="$fetchState.error" class="text-center py-12">
        <partials-empty-data caption="An error occured" />
      </section>
      <v-card v-else class="row mx-auto">
        <v-col v-for="program in programs" :key="program._id" cols="12" md="4">
          <program-item-list-card :program="program" hoverable />
        </v-col>
      </v-card>

      <partials-pagination
        v-model="pagination.page"
        :length="pagination.length"
        :page-limit="pageLimit"
        @input="getPrograms"
      ></partials-pagination>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      pagination: { page: 1, length: 1 },
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
        this.sortPrograms(this.sortBy)
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
    ...mapState('program', ['pageLimit']),
  },
  watch: {
    filterOptions(val) {
      this.filtersSet = true
      this.$fetch()
    },
    sortBy(val) {
      this.sortPrograms(val)
    },
  },
  created() {
    this.$store.commit('program/changeFluidState', true)
  },
  destroyed() {
    this.$store.commit('program/changeFluidState', false)
  },
  methods: {
    getPrograms() {
      this.$fetch()
    },
    sortPrograms(val) {
      if (val === 'newest') {
        this.programs.sort((a, b) => {
          return (
            new Date(a.updatedAt).valueOf() - new Date(b.updatedAt).valueOf()
          )
        })
      } else if (val === 'oldest') {
        this.programs.sort((a, b) => {
          return (
            new Date(b.updatedAt).valueOf() - new Date(a.updatedAt).valueOf()
          )
        })
      }
    },
    clickSelect() {
      document.getElementById('v-select-sorting').click()
    },
  },
}
</script>

<style lang="scss" scoped>
.sort-programs {
  display: inline-block !important;
}
.v-overlay__content {
  width: 80%;
}
</style>
