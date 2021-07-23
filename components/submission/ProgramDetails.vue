<template>
  <main>
    <h3 class="mb-5 title">Scopes</h3>
    <v-row class="flex-grow-1">
      <v-col cols="12" md="3">
        <v-text-field
          block
          outlined
          disabled
          label="Web Application"
          placeholder="https://example.com"
        />
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field
          block
          outlined
          disabled
          label="API"
          placeholder="https://api.example.com/docs"
        />
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field
          block
          outlined
          disabled
          label="Android App"
          placeholder="com.example.google"
        />
      </v-col>
      <v-col cols="12" md="3">
        <v-text-field
          block
          disabled
          outlined
          label="IOS Playstore"
          placeholder="123456"
        />
      </v-col>
    </v-row>

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
