<template>
  <v-row>
    <v-col v-if="!mobileView" cols="2" class="d-flex">
      <v-card
        class="no-flex-stretch program-filter-menu border border-solid border-primary"
        color="white"
      >
        <v-card-title class="d-flex">
          <v-icon color="primary"> mdi-filter </v-icon>
          <span class="text-primary text-base cursor ml-auto">clear all</span>
        </v-card-title>
        <v-card-text class="mt-4 program-filter-menu-body">
          <p class="fit-content text-sm mb-0 text-black">Visibilty</p>
          <v-checkbox
            id="public-visibility-check"
            color="black"
            class="my-1 visibility-check"
            dense
          >
            <template #default>
              <input type="checkbox" name="" />
            </template>
            <template #label>
              <label for="public-visibility-check" class="text-black text-sm"
                >Public</label
              >
            </template>
          </v-checkbox>
          <v-checkbox
            id="public-visibility-check"
            color="black"
            class="my-1 visibility-check"
            dense
          >
            <template #default>
              <input type="checkbox" name="" />
            </template>
            <template #label>
              <label for="private-visibility-check" class="text-black text-sm"
                >Private</label
              >
            </template>
          </v-checkbox>
          <!--  -->
          <p class="fit-content text-sm mb-0 text-black">Type</p>
          <v-checkbox color="black" class="my-1 type-check" dense>
            <template #default>
              <input type="checkbox" name="" />
            </template>
            <template #label>
              <label class="text-black text-sm">Compliance</label>
            </template>
          </v-checkbox>
          <v-checkbox color="black" class="my-1 type-check" dense>
            <template #default>
              <input type="checkbox" name="" />
            </template>
            <template #label>
              <label class="text-black text-sm">Vulnerability</label>
            </template>
          </v-checkbox>
        </v-card-text>
      </v-card>
    </v-col>
    <div v-if="mobileView">
      <v-overlay :value="overlay">
        <v-card
          class="no-flex-stretch program-filter-menu border border-solid border-primary"
          color="white"
        >
          <v-card-title class="d-flex">
            <v-icon color="primary"> mdi-filter </v-icon>
            <span class="text-primary text-base cursor ml-auto">clear all</span>
          </v-card-title>
          <v-card-text class="mt-4 program-filter-menu-body">
            <p class="fit-content text-sm mb-0 text-black">Visibilty</p>
            <v-checkbox
              id="public-visibility-check"
              color="black"
              class="my-1 visibility-check"
              dense
            >
              <template #default>
                <input type="checkbox" name="" />
              </template>
              <template #label>
                <label for="public-visibility-check" class="text-black text-sm"
                  >Public</label
                >
              </template>
            </v-checkbox>
            <v-checkbox
              id="public-visibility-check"
              color="black"
              class="my-1 visibility-check"
              dense
            >
              <template #default>
                <input type="checkbox" name="" />
              </template>
              <template #label>
                <label for="private-visibility-check" class="text-black text-sm"
                  >Private</label
                >
              </template>
            </v-checkbox>
            <!--  -->
            <p class="fit-content text-sm mb-0 text-black">Type</p>
            <v-checkbox color="black" class="my-1 type-check" dense>
              <template #default>
                <input type="checkbox" name="" />
              </template>
              <template #label>
                <label class="text-black text-sm">Compliance</label>
              </template>
            </v-checkbox>
            <v-checkbox color="black" class="my-1 type-check" dense>
              <template #default>
                <input type="checkbox" name="" />
              </template>
              <template #label>
                <label class="text-black text-sm">Vulnerability</label>
              </template>
            </v-checkbox>
          </v-card-text>
        </v-card>
      </v-overlay>
    </div>
    <v-col :cols="mobileView ? 12 : 10" class="px-4">
      <header class="d-flex mb-6">
        <v-col cols="12">
          <div class="mx-auto text-center">
            <input
              type="search"
              class="py-4 px-6 bg-primary text-white search-bar border-solid border rounded-lg border-primary"
              style="width: 70%"
              placeholder="Search programs"
            />
            <v-icon class="relative right-12 cursor" color="white" x-large
              >mdi-magnify</v-icon
            >
            <v-btn color="success" @click="overlay = !overlay">text</v-btn>
          </div>
        </v-col>
      </header>
      <div class="d-flex px-2">
        <p class="inline-block">{{ programs.length }} programs found</p>
        <v-select
          id="v-select-sorting"
          :items="['newest', 'oldest']"
          :value="'newest'"
          class="fit-content ml-auto"
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
      <v-card v-else class="row">
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
    }
  },

  async fetch() {
    const URL = `/get-programs?page=${this.pagination.page}&limit=${this.$store.state.program.pageLimit}`
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
.program-filter-menu {
  min-height: 80vh;
  flex-basis: 100%;
  max-width: 100%;
  &.v-card {
  }
  .program-filter-menu-body {
    .mdi-checkbox-blank-outline {
      color: black;
    }
    .v-messages {
      min-height: fit-content;
    }
  }
}
</style>
