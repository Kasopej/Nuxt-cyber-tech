<template>
  <section class="py-12 text-center">
    <v-img src="/img/no-data.svg" max-height="420" contain />
    <div
      class="subtitle-1 text-center accent--text font-weight-bold py-8"
      v-html="caption"
    />
  </section>
</template>

<script>
export default {
  props: {
    caption: {
      type: String,
      default: 'Nothing Found',
    },
  },
}
</script>
