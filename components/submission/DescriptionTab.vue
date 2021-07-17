<template>
  <main>
    <div class="px-3 py-6" v-html="description" />
    <hr />
    <div>
      <h3 class="mt-3">Download Attachment</h3>
      <div>
        <a
          v-for="(attachment, index) in submissionAttachment"
          :href="attachment"
          :key="`attach-${index}`"
          target="_blank"
          >Download Attachment</a
        >
      </div>
    </div>
  </main>
</template>

<script>
import showdown from 'showdown'

export default {
  props: {
    submission: { type: Object, default: () => {} },
    submissionAttachment: {
      required: false,
      type: [Array, Object],
    },
  },
  mounted() {
    console.log(this.submissionAttachment)
  },
  computed: {
    description() {
      const converter = new showdown.Converter()
      return converter.makeHtml(this.submission.description)
    },
  },
}
</script>
