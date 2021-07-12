<template>
  <main>
    <section v-html="DESCRIPTION" />
  </main>
</template>

<script>
import showdown from 'showdown'

export default {
  props: {
    description: { type: String, default: null },
  },

  computed: {
    DESCRIPTION() {
      const converter = new showdown.Converter()
      return converter.makeHtml(this.description)
    },
  },
}
</script>
