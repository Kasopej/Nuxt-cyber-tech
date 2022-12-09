<template>
  <main>
    <v-expansion-panels v-model="panel" mandatory hover>
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

      <!-- Out of scope -->
      <v-expansion-panel>
        <v-expansion-panel-header class="header text-body-1 mb-1">
          Out of scope
        </v-expansion-panel-header>
        <v-expansion-panel-content class="content grey--text text-caption">
          <section v-for="(scope, index) in outOfScopeItems" :key="index">
            <h4 class="text-primary">{{ scope.title }}</h4>
            <p>{{ scope.info.join(', ') }}</p>
          </section>
        </v-expansion-panel-content>
      </v-expansion-panel>

      <!-- Reward -->
      <v-expansion-panel>
        <v-expansion-panel-header class="header text-body-1 mb-1">
          Reward
        </v-expansion-panel-header>
        <v-expansion-panel-content class="content text-caption">
          <v-btn
            v-for="(val, key) in program.rewardGrid"
            :key="key"
            :color="rewardColors[key]"
            class="mr-1"
            >{{ `${key}: $${val}` }}</v-btn
          >
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
      rewardColors: {
        critical: 'red',
        high: 'yellow',
        medium: 'brown',
        low: 'green',
      },
    }
  },

  computed: {
    DESCRIPTION() {
      const converter = new showdown.Converter()
      return converter.makeHtml(this.program.description)
    },

    scopeItems() {
      return [
        {
          title: 'Web Application',
          info: this.webAppToArray(this.program.scope),
        },

        {
          title: 'Web API',
          info: this.webApiToArray(this.program.scope),
        },

        {
          title: 'Android Application',
          info: this.androidAppToArray(this.program.scope),
        },

        {
          title: 'Store ID',
          info: this.storeIdToArray(this.program.scope),
        },
      ]
    },
    outOfScopeItems() {
      return [
        {
          title: 'Web Application',
          info: this.webAppToArray(this.program.outofscope),
        },

        {
          title: 'Web API',
          info: this.webApiToArray(this.program.outofscope),
        },

        {
          title: 'Android Application',
          info: this.androidAppToArray(this.program.outofscope),
        },

        {
          title: 'Store ID',
          info: this.storeIdToArray(this.program.outofscope),
        },
      ]
    },
  },

  created() {
    // get array of indexes (keys) to define panels that should be open
    this.panel = 0
    // this.panel = [...Array(this.scopeItems.length)]
  },

  methods: {
    webAppToArray(scope) {
      return scope.map((key) => key.webApplication)
    },

    webApiToArray(scope) {
      return scope.map((key) => key.api)
    },

    androidAppToArray(scope) {
      return scope.map((key) => key.androidApp)
    },

    storeIdToArray(scope) {
      return scope.map((key) => key.playstoreId)
    },
  },
}
</script>
