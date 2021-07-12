<template>
  <v-expansion-panels>
    <v-expansion-panel v-for="(item, i) in 5" :key="i">
      <v-expansion-panel-header>
        Message from Zenith Bank {{ i }}
      </v-expansion-panel-header>
      <v-expansion-panel-content>
        <article>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </article>
        <footer class="grey--text text-right text-caption pt-3">
          {{ new Date().toLocaleString() }}
        </footer>
      </v-expansion-panel-content>
    </v-expansion-panel>
  </v-expansion-panels>
</template>
