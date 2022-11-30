<template>
  <!-- <v-row class="py-4">
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
      <dashboard-announcement v-if="notificationState" />
    </v-col>
  </v-row> -->
  <v-card raised hover>
    <v-card-title primary-title>
      <v-icon color="primary" x-large left>mdi-shield-account</v-icon>
      Your Programs and Submissions</v-card-title
    >
    <v-card-text class="d-flex">
      <v-col cols="4" class="d-flex align-start">
        <v-icon color="primary" left>mdi-shield-lock</v-icon>
        <div>
          <h3 class="fit-content">Private Programs</h3>
          <span class="fit-content mx-auto text-h3">{{ 10 }}</span>
        </div>
      </v-col>
      <v-col cols="4" class="d-flex align-start">
        <v-icon color="primary" left>mdi-shield-link-variant</v-icon>
        <div>
          <h3 class="fit-content">Submissions</h3>
          <span class="fit-content mx-auto text-h3">{{ 10 }}</span>
        </div>
      </v-col>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  computed: {
    notificationState() {
      return this.$store.state.notification.showNotification
    },
  },
}
</script>
