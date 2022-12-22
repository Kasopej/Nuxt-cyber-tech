<template>
  <main class="px-3 py-6 text-caption text-sm-body-2 text-md-body-1">
    <v-row>
      <v-col cols="12" md="8">
        <v-card>
          <v-card-title class="mb-3" primary-title>
            <v-row>
              <v-col
                class="pl-2 py-1 py-sm-2 py-md-3 font-weight-medium"
                cols="12"
              >
                REPORT SUMMARY
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <v-row
              v-for="(
                summaryFieldDescriptor, key
              ) in SubmissionSummaryFieldsObj"
              :key="key"
            >
              <v-col
                class="pl-2 -mb-4 font-weight-medium text-uppercase"
                cols="12"
                sm="3"
              >
                {{ convertUnderscoredStringToSpaced(key) }}
              </v-col>
              <v-col class="pl-2 py-1 py-sm-3">
                <a
                  v-if="summaryFieldDescriptor.type == 'link'"
                  :href="summaryFieldDescriptor.href"
                  >{{ displayField(summaryFieldDescriptor) }}</a
                >
                <span v-else-if="summaryFieldDescriptor.name === 'visibility'">
                  {{ displayField(summaryFieldDescriptor) }}
                  <v-icon color="primary" class="-mt-0.5">{{
                    visibilityIcon
                  }}</v-icon>
                </span>
                <span v-else>{{ displayField(summaryFieldDescriptor) }}</span>
              </v-col>
            </v-row>
            <v-row>
              <v-col class="pl-2 -mb-4 font-weight-medium" cols="12" sm="3">
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
                      <v-btn
                        :color="
                          submission.severity == reward.severtity
                            ? 'accent'
                            : 'secondary'
                        "
                        :class="
                          submission.severity == reward.severtity
                            ? 'white--text'
                            : 'primary--text'
                        "
                      >
                        ${{ reward.price }}
                      </v-btn>
                    </div>
                  </div>
                </div>
              </v-col>
            </v-row>
          </v-card-text>
        </v-card>
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
import { getCompoundField } from '~/plugins/utils'

const SubmissionSummaryFieldsObj = {
  action_state: { name: 'actionstate' },
  scope: { name: 'scope' },
  reported_by: { name: 'hunterId.profile.username', type: 'link', href: '' },
  reported_to: { name: 'reportedto', type: 'link', href: '' },
  reported_at: { name: 'reportedat', type: 'date' },
  reference: { name: 'reference' },
  assigned_to: { name: 'assignedTo', fallback: 'No Assignee' },
  bugtype: { name: 'bugtype' },
  participants: {
    name: 'participants',
    fallback: 'Name-of-participating-Hackers',
  },
  visibility: { name: 'visibility' },
}

export default {
  mixins: [{ methods: { getCompoundField } }],
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
      SubmissionSummaryFieldsObj,
    }
  },
  computed: {
    visibilityIcon() {
      return this.submission.visibility === 'Public' ? 'mdi-eye' : 'mdi-eye-off'
    },
  },
  methods: {
    convertCommentHTML(val) {
      const converter = new showdown.Converter()
      return converter.makeHtml(val)
    },
    convertUnderscoredStringToSpaced(string = '') {
      return string.split('_').join(' ')
    },
    displayField(fieldDescriptor = {}, obj = this.submission) {
      if (!this.getCompoundField(obj, fieldDescriptor.name))
        return fieldDescriptor.fallback
      if (fieldDescriptor.type === 'date')
        return new Date(
          this.getCompoundField(obj, fieldDescriptor.name)
        ).toLocaleString()
      if (fieldDescriptor.type === 'link') {
        if (fieldDescriptor.name === 'reportedto') {
          fieldDescriptor.href = `/program/${obj.programId}`
        }
        if (fieldDescriptor.name === 'hunterId.profile.username') {
          fieldDescriptor.href = `/user/${this.getCompoundField(
            obj,
            fieldDescriptor.name
          )}`
        }
      }
      return this.getCompoundField(obj, fieldDescriptor.name)
    },
  },
}
</script>
