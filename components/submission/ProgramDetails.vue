<template>
  <main>
    <v-expansion-panels v-model="panel" mandatory>
      <v-expansion-panel>
        <v-expansion-panel-header class="header text-body-1 mb-1">
          Scope
        </v-expansion-panel-header>
        <v-expansion-panel-content class="content grey--text text-caption">
          <section v-for="(scope, index) in scopeItems" :key="index">
            <h4 class="text-primary">{{ scope.title }}</h4>
            <p>{{ scope.info.join(', ') }}</p>
          </section>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!-- Main Details -->
      <v-expansion-panel>
        <v-expansion-panel-header class="header text-body-1 mb-1">
          Policy
        </v-expansion-panel-header>
        <v-expansion-panel-content class="content text-caption">
          <section class="mt-4" v-html="DESCRIPTION" />
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>

    <!-- A bad way to customize is by modifyinh Vuetify "_typography.sass" file as it will affect the whole project -->
  </main>
</template>

<script>
import showdown from 'showdown'

export default {
  props: {
    program: {
      type: Object,
      required: true,
    },
  },

  data() {
    return {
      panel: [],
    }
  },

  computed: {
    DESCRIPTION() {
      const converter = new showdown.Converter()
      return converter.makeHtml(this.program.description)
    },

    webApp() {
      return this.program.scope.map((key) => key.webApplication)
    },

    webApi() {
      return this.program.scope.map((key) => key.api)
    },

    androidApp() {
      return this.program.scope.map((key) => key.androidApp)
    },

    storeId() {
      return this.program.scope.map((key) => key.playstoreId)
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
    // get array of indexes (keys) to define panels that should be open
    this.panel = 0
    // this.panel = [...Array(this.scopeItems.length)]
  },
}
</script>
