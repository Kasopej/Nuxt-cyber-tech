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
  <v-main>
    <v-card raised hover class="mb-6 no-cursor">
      <v-card-title primary-title>
        <v-icon color="primary" x-large left>mdi-shield-account</v-icon>
        Your Programs and Submissions</v-card-title
      >
      <v-card-text class="d-flex">
        <v-col cols="4" class="d-flex align-start">
          <v-icon color="accent" left>mdi-shield-lock</v-icon>
          <div class="cursor" @click="() => $router.push('/program')">
            <h3 class="fit-content">Private Programs</h3>
            <span class="fit-content mx-auto text-h3">{{ 10 }}</span>
          </div>
        </v-col>
        <v-col cols="4" class="d-flex align-start">
          <v-icon color="accent" left>mdi-shield-link-variant</v-icon>
          <div class="cursor" @click="() => $router.push('/submission')">
            <h3 class="fit-content">Submissions</h3>
            <span class="fit-content mx-auto text-h3">{{ 10 }}</span>
          </div>
        </v-col>
      </v-card-text>
    </v-card>
    <v-card raised hover class="mb-6 no-cursor">
      <v-card-title primary-title>
        <v-icon color="primary" x-large left>mdi-podium-gold</v-icon>
        Your Ranking</v-card-title
      >
      <v-card-text class="d-flex">
        <v-col cols="4" class="d-flex align-start">
          <v-icon color="accent" left>mdi-star-box</v-icon>
          <div class="cursor">
            <h3 class="fit-content">Points Earned</h3>
            <span class="fit-content mx-auto text-h3">{{ 10 }}</span>
          </div>
        </v-col>
        <v-col cols="4" class="d-flex align-start">
          <v-icon color="accent" left>mdi-seal</v-icon>
          <div class="cursor">
            <h3 class="fit-content">Badges</h3>
            <span class="fit-content mx-auto text-h3">{{ 10 }}</span>
          </div>
        </v-col>
      </v-card-text>
    </v-card>
    <v-card raised hover class="mb-6 no-cursor">
      <v-card-title primary-title>
        <v-icon color="primary" x-large left>mdi-currency-usd</v-icon>
        Your Bounty</v-card-title
      >
      <v-card-text class="d-flex">
        <v-col cols="4" class="d-flex align-start">
          <div class="ml-7 cursor">
            <h3 class="fit-content text-h3">$1,000</h3>
          </div>
        </v-col>
      </v-card-text>
    </v-card>
  </v-main>
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
