<template>
  <main>
    <div class="px-3 py-6" v-html="description" />
    <hr />
    <div>
      <h3 class="mt-3">Download Attachment</h3>
      <div v-if="submissionAttachment.length > 0">
        <a
          v-for="(attachment, index) in submissionAttachment"
          :key="`attach-${index}`"
          class="d-flex flex-column"
          :href="attachment"
          target="_blank"
          >Download Attachment</a
        >
      </div>
      <div v-else>
        <p>No Attachments</p>
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
  computed: {
    description() {
      const converter = new showdown.Converter()
      return converter.makeHtml(this.submission.description)
    },
  },
  mounted() {
    console.log(this.submissionAttachment)
  },
}
</script>
