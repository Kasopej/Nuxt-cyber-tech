<template>
  <nav class="text-center py-8">
    <v-pagination
      v-model="localPage"
      v-bind="$attrs"
      v-on="$listeners"
    ></v-pagination>
    <span>
      Per Page:
      <select
        id="pagination-limit"
        v-model="localPageLimit"
        name="pagination-limit"
        class="border border-solid border-gray-400 cursor-pointer"
      >
        <option v-for="n in [5, 10, 20]" :key="n" :value="n">
          {{ n }}
        </option>
      </select>
    </span>
  </nav>
</template>

<script>
export default {
  model: {
    prop: 'page',
    event: 'page-change',
  },
  props: {
    page: {
      type: Number,
      default: 0,
    },
    pageLimit: {
      type: Number,
      default: 5,
    },
  },
  computed: {
    localPage: {
      get() {
        return this.page
      },
      set(val) {
        this.$emit('page-change', val)
      },
    },
    localPageLimit: {
      get() {
        return this.pageLimit
      },
      set(val) {
        this.$emit('page-limit-change', val)
      },
    },
  },
}
</script>

<style lang="scss" scoped></style>
