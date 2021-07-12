<template>
  <main>
    <div class="px-3 py-6" v-html="description" />
  </main>
</template>

<script>
import showdown from 'showdown'

export default {
  props: {
    submission: { type: Object, default: () => {} },
  },

  computed: {
    description() {
      const converter = new showdown.Converter()
      return converter.makeHtml(this.submission.description)
    },
  },
}
</script>
