<template>
  <v-card
    class="no-flex-stretch filter-menu border border-solid border-primary"
    :color="!$vuetify.theme.dark ? 'white' : 'grey lighten-1'"
  >
    <v-icon
      v-if="mobileView || showBackBtn"
      class="px-4 pt-2"
      color="primary"
      @click="toggleOverlay"
      >mdi-arrow-left</v-icon
    >
    <v-card-title class="d-flex">
      <v-icon color="primary"> mdi-filter </v-icon>
      <span class="text-primary text-base cursor ml-auto" @click="clearFilters"
        >clear all</span
      >
    </v-card-title>
    <v-card-text class="mt-4 filter-menu-body overflow-y-auto">
      <div
        v-for="(groupEntry, groupEntryIndex) in filterOptionsEntries"
        :key="groupEntryIndex"
      >
        <slot
          v-if="groupEntry[0].includes('_slot')"
          name="filterInput"
          :filterEntry="groupEntry"
        ></slot>
        <template v-else>
          <p class="fit-content text-sm mb-0 text-black">{{ groupEntry[0] }}</p>
          <v-checkbox
            v-for="(itemEntry, itemEntryIndex) in Object.entries(groupEntry[1])"
            :id="`filter-input-${itemEntryIndex}`"
            :key="itemEntryIndex"
            v-model="groupEntry[1][itemEntry[0]]"
            color="black"
            class="my-1"
            dense
            @change="(evt) => update(groupEntry[0], itemEntry[0], evt)"
          >
            <template #default>
              <input type="checkbox" name="" />
            </template>
            <template #label>
              <label
                :for="`filter-input-${itemEntryIndex}`"
                class="text-black text-sm"
                >{{ itemEntry[0] }}</label
              >
            </template>
          </v-checkbox>
        </template>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  model: {
    event: 'filter',
    prop: 'filterOptions',
  },
  props: {
    filterOptions: {
      type: Object,
      default: () => ({}),
    },
    showBackBtn: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      clear: true,
    }
  },
  computed: {
    filterOptionsEntries() {
      return Object.entries(this.filterOptions)
    },
    localFilterOptions() {
      return { ...this.filterOptions }
    },
  },
  methods: {
    update(groupLabel, itemLabel, newValue) {
      this.localFilterOptions[groupLabel][itemLabel] = newValue
      this.clear = false
      this.$emit('filter', this.localFilterOptions)
    },
    toggleOverlay() {
      this.$emit('toggle-overlay')
    },
    clearFilters() {
      if (this.clear) return
      this.filterOptionsEntries.forEach((groupEntry) => {
        Object.entries(groupEntry[1]).forEach((itemEntry) => {
          this.localFilterOptions[groupEntry[0]][itemEntry[0]] = null
        })
      })
      this.clear = true
      this.$emit('filter', this.localFilterOptions)
    },
  },
}
</script>

<style lang="scss" scoped></style>
