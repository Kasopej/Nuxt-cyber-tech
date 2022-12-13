<template>
  <main class="px-3 py-6 text-caption text-sm-body-2 text-md-body-1">
    <v-row>
      <v-col cols="12" md="8">
        <v-row>
          <v-col
            class="pl-2 py-1 py-sm-2 py-md-3 font-weight-medium"
            cols="12"
            sm="3"
          >
            REPORT SUMMARY
          </v-col>

          <v-col
            class="pl-2 py-1 py-sm-2 py-md-3 text-capitalize"
            cols="12"
            sm="3"
          >
          </v-col>
        </v-row>
        <v-row>
          <v-col
            class="pl-2 py-1 py-sm-2 py-md-3 font-weight-medium"
            cols="12"
            sm="3"
          >
            ACTION STATE
          </v-col>

          <v-col
            class="pl-2 py-1 py-sm-2 py-md-3 text-capitalize"
            cols="12"
            sm="3"
          >
            {{ submission.actionstate }}
          </v-col>
        </v-row>
        <v-row>
          <v-col
            class="pl-2 py-1 py-sm-2 py-md-3 font-weight-medium"
            cols="12"
            sm="3"
          >
            SCOPE
          </v-col>
          <v-col class="pl-2 py-1 py-sm-2 py-md-3 text-lowercase">{{
            submission.scope
          }}</v-col>
        </v-row>
        <v-row>
          <v-col
            class="pl-2 py-1 py-sm-2 py-md-3 font-weight-medium"
            cols="12"
            sm="3"
          >
            REPORTED BY
          </v-col>
          <v-col class="pl-2 py-1 py-sm-2 py-md-3">
            <nuxt-link
              :to="`/user/${submission.hunterId._id}/`"
              class="primary--text"
              >{{ submission.hunterId.profile[0].username }}</nuxt-link
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col
            class="pl-2 py-1 py-sm-2 py-md-3 font-weight-medium"
            cols="12"
            sm="3"
          >
            REPORTED TO
          </v-col>
          <v-col class="pl-2 py-1 py-sm-2 py-md-3">
            <nuxt-link
              :to="`/program/${submission.reportedto}/`"
              class="primary--text"
              >{{ submission.reportedto }}</nuxt-link
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col
            class="pl-2 py-1 py-sm-2 py-md-3 font-weight-medium"
            cols="12"
            sm="3"
          >
            REPORTED AT
          </v-col>
          <v-col class="pl-2 py-1 py-sm-2 py-md-3">
            {{ new Date(submission.reportedat).toLocaleString() }}
          </v-col>
        </v-row>
        <v-row>
          <v-col
            class="pl-2 py-1 py-sm-2 py-md-3 font-weight-medium"
            cols="12"
            sm="3"
          >
            REFERENCES
          </v-col>
          <v-col class="pl-2 py-1 py-sm-2 py-md-3">
            {{ submission.reference }}
          </v-col>
        </v-row>
        <v-row>
          <v-col
            class="pl-2 py-1 py-sm-2 py-md-3 font-weight-medium"
            cols="12"
            sm="3"
          >
            ASSIGNED TO
          </v-col>
          <v-col class="pl-2 py-1 py-sm-2 py-md-3">
            {{ submission.assignedTo || 'Not defined' }}
          </v-col>
        </v-row>
        <v-row>
          <v-col
            class="pl-2 py-1 py-sm-2 py-md-3 font-weight-medium"
            cols="12"
            sm="3"
          >
            BUG TYPE
          </v-col>
          <v-col class="pl-2 py-1 py-sm-2 py-md-3">
            {{ submission.bugtype }}
          </v-col>
        </v-row>
        <v-row>
          <v-col
            class="pl-2 py-1 py-sm-2 py-md-3 font-weight-medium"
            cols="12"
            sm="3"
          >
            PARTICIPANTS
          </v-col>
          <v-col class="pl-2 py-1 py-sm-2 py-md-3">
            Name-of-participating-Hackers (Add participant)
          </v-col>
        </v-row>
        <v-row>
          <v-col
            class="pl-2 py-1 py-sm-2 py-md-3 font-weight-medium"
            cols="12"
            sm="3"
          >
            NOTIFICATIONS
          </v-col>
          <v-col class="pl-2 py-1 py-sm-2 py-md-3">
            {{ submission.notification }}
          </v-col>
        </v-row>
        <v-row>
          <v-col
            class="pl-2 py-1 py-sm-2 py-md-3 font-weight-medium"
            cols="12"
            sm="3"
          >
            VISIBILITY
          </v-col>
          <v-col class="pl-2 py-1 py-sm-2 py-md-3">
            {{ submission.visibility }}
          </v-col>
        </v-row>
        <v-row>
          <v-col
            class="pl-2 py-1 py-sm-2 py-md-3 font-weight-medium"
            cols="12"
            sm="3"
          >
            REWARD GRID
          </v-col>
          <v-col class="pl-2 py-1 py-sm-2 py-md-3">
            <div class="d-flex justify-space-around">
              <div
                v-for="reward in rewards"
                :key="reward.severtity"
                class="text-center mx-1 mx-sm-2"
              >
                <div class="grey--text darken-3">
                  {{ reward.severtity }}
                </div>
                <div>
                  <v-btn color="secondary" class="primary--text">
                    ${{ reward.price }}
                  </v-btn>
                </div>
              </div>
            </div>
          </v-col>
        </v-row>
      </v-col>

      <submission-severity-settings
        :severity="submission.severity"
        :cveid="submission.cveid"
        hide-actions
        hide-buttons
      />
    </v-row>
  </main>
</template>

<script>
import showdown from 'showdown'

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

  methods: {
    convertCommentHTML(val) {
      const converter = new showdown.Converter()
      return converter.makeHtml(val)
    },
  },
}
</script>
