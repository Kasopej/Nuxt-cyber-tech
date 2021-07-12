<template>
  <v-row class="py-4">
    <v-col cols="12" md="6">
      <v-card class="px- pb-8">
        <v-tabs grow>
          <v-tab>
            <v-icon class="mr-3">mdi-gift-outline</v-icon>
            <span class="text-capitalize">Rewards</span>
          </v-tab>
          <v-tab>
            <v-icon class="mr-3">mdi-comment-text-multiple-outline</v-icon>
            <span class="text-capitalize">Messages</span>
          </v-tab>

          <v-tab-item>
            <dashboard-rewards />
          </v-tab-item>

          <v-tab-item>
            <dashboard-messages />
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-col>

    <v-col cols="12" md="6">
      <dashboard-announcement />
    </v-col>
  </v-row>
</template>

<script>
export default {}
</script>
