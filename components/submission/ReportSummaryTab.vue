<template>
  <main class="px-3 py-6">
    <v-row>
      <v-col cols="12" md="8">
        <v-row>
          <v-col class="font-weight-medium" cols="3">ACTION STATE</v-col>
          <v-col class="text-capitalize">{{ submission.actionstate }}</v-col>
        </v-row>
        <v-row>
          <v-col class="font-weight-medium" cols="3">SCOPE</v-col>
          <v-col class="text-lowercase">{{ submission.scope }}</v-col>
        </v-row>
        <v-row>
          <v-col class="font-weight-medium" cols="3">REPORTED BY</v-col>
          <v-col>
            <nuxt-link
              :to="`/user/${submission.hunterId}/`"
              class="primary--text"
              >{{ submission.hunterName || submission.hunterId }}</nuxt-link
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col class="font-weight-medium" cols="3">Reported TO</v-col>
          <v-col>
            <nuxt-link
              :to="`/program/${submission.reportedto}/`"
              class="primary--text"
              >{{ submission.reportedto.comapny }}</nuxt-link
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col class="font-weight-medium" cols="3">REPORTED AT</v-col>
          <v-col>{{ new Date(submission.reportedat).toLocaleString() }}</v-col>
        </v-row>
        <v-row>
          <v-col class="font-weight-medium" cols="3">REFERENCES</v-col>
          <v-col>{{ submission.reference }}</v-col>
        </v-row>
        <v-row>
          <v-col class="font-weight-medium" cols="3">ASSIGNED TO</v-col>
          <v-col>{{ submission.assignedTo || 'Not defined' }}</v-col>
        </v-row>
        <v-row>
          <v-col class="font-weight-medium" cols="3">BUG TYPE</v-col>
          <v-col>{{ submission.bugtype }}</v-col>
        </v-row>
        <v-row>
          <v-col class="font-weight-medium" cols="3">PARTICIPANTS</v-col>
          <v-col>Name-of-participating-Hackers (Add participant)</v-col>
        </v-row>
        <v-row>
          <v-col class="font-weight-medium" cols="3">NOTIFICATIONS</v-col>
          <v-col>{{ submission.notification }}</v-col>
        </v-row>
        <v-row>
          <v-col class="font-weight-medium" cols="3">VISIBILITY</v-col>
          <v-col>{{ submission.visibility }}</v-col>
        </v-row>
        <v-row>
          <v-col class="font-weight-medium" cols="3">REWARD GRID</v-col>
          <v-col>
            <div class="d-flex justify-space-around py-1">
              <div
                v-for="reward in rewards"
                :key="reward.severtity"
                class="text-center mx-2"
              >
                <div class="grey--text darken-3 pb-2">
                  {{ reward.severtity }}
                </div>
                <div>
                  <v-btn color="secondary" class="primary--text"
                    >$ {{ reward.price }}</v-btn
                  >
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>

      <submission-severity-settings hide-actions hide-buttons />
    </v-row>
  </main>
</template>

<script>
export default {
  props: {
    submission: { type: Object, default: () => {} },
  },

  data() {
    return {
      rewards: [
        { severtity: 'LOW', price: '0' },
        { severtity: 'MEDIUM', price: '0' },
        { severtity: 'HIGH', price: '0' },
        { severtity: 'CRITICAL', price: '0' },
      ],
    }
  },
  created() {
    console.log(this.submission)
  },
}
</script>
