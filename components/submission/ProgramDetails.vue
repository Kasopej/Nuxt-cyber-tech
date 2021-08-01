<template>
  <main>
    <h2 class="mb-2 font-weight-bold">Scopes</h2>

    <v-expansion-panels v-model="panel" multiple>
      <v-expansion-panel v-for="item in scopeItems" :key="item.title">
        <v-expansion-panel-header class="header primary--text text-body-2">
          {{ item.title }}
        </v-expansion-panel-header>
        <v-expansion-panel-content class="content grey--text text-caption">
          {{ item.info.join(', ') }}
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <!-- A bad way to customize is by modifyinh Vuetify "_typography.sass" file as it will affect the whole project -->
    <section class="mt-4" v-html="DESCRIPTION" />
  </main>
</template>

<script>
import showdown from 'showdown'

export default {
  props: {
    scope: {
      type: [Array, Object],
      required: true,
    },
    description: { type: String, default: null },
  },

  data() {
    return {
      panel: [],
    }
  },

  computed: {
    DESCRIPTION() {
      const converter = new showdown.Converter()
      return converter.makeHtml(this.description)
    },

    webApp() {
      return this.scope.map((key) => key.webApplication)
    },

    webApi() {
      return this.scope.map((key) => key.api)
    },

    androidApp() {
      return this.scope.map((key) => key.androidApp)
    },

    storeId() {
      return this.scope.map((key) => key.playstoreId)
    },

    scopeItems() {
      return [
        {
          title: 'Web Application',
          info: this.webApp,
        },

        {
          title: 'Web API',
          info: this.webApi,
        },

        {
          title: 'Android Application',
          info: this.androidApp,
        },

        {
          title: 'Store ID',
          info: this.storeId,
        },
      ]
    },
  },

  created() {
    this.panel = [...Array(this.scopeItems.length).keys()].map((k, i) => i)
  },
}
</script>
