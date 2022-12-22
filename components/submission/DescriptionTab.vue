<template>
  <section class="py-6">
    <v-expansion-panels mandatory focusable hover>
      <v-card class="w-full">
        <v-card-title primary-title> Bug Description </v-card-title>
        <v-card-text>
          <v-expansion-panel class="elevation-2">
            <v-expansion-panel-header class="text-body-1 mb-2 uppercase">
              Details
            </v-expansion-panel-header>
            <v-expansion-panel-content
              class="content grey--text longform-content font-medium"
              :class="{
                'text--darken-3': !$vuetify.theme.dark,
                'text--lighten-3': $vuetify.theme.dark,
              }"
            >
              <p class="text-sm px-2" v-html="description"></p>
            </v-expansion-panel-content>
          </v-expansion-panel>
          <!--  -->
          <v-expansion-panel class="elevation-2">
            <v-expansion-panel-header class="text-body-1 mb-2 uppercase">
              Attachments
            </v-expansion-panel-header>
            <v-expansion-panel-content class="content grey--text text-caption">
              <template v-if="submissionAttachment.length">
                <span
                  v-for="(attachment, index) in submissionAttachment"
                  :key="`attach-${index}`"
                  class="flex mb-1.5"
                >
                  <a class="mr-1" :href="attachment" target="_blank">
                    <v-icon color="primary">mdi-download</v-icon>
                    <span class="underline">Attachment {{ index + 1 }}</span>
                  </a>
                </span>
              </template>
              <p v-else>No Attachments</p>
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-card-text>
      </v-card>
    </v-expansion-panels>
    <!-- <div class="px-3 py-6" v-html="description" />
    <hr /> -->
  </section>
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

<style lang="scss" scoped>
.heading {
  font-weight: 400 !important;
}
</style>
