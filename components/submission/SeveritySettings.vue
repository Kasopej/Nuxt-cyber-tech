<template>
  <v-col cols="12" md="4" class="px-4">
    <v-card class="px-4 py-8">
      <v-text-field block outlined label="CVE Id" />

      <div class="d-flex justify-center">
        <div class="accent text-center white--text rounded px-8 py-2 mx-1">
          <div>CVSS Score</div>
          <div class="font-weight-bold" v-text="ccvsScore.toFixed(1)" />
        </div>

        <div class="accent text-center white--text rounded px-8 py-2 mx-1">
          <div>Severity</div>
          <div class="font-weight-bold" v-text="severity" />
        </div>
      </div>

      <section v-if="!hideButtons">
        <header class="grey--text text--darken-1 text-center py-2">
          Please select the relevant vector of the vulnerability below.
        </header>

        <div class="py-2">
          <div class="subtitle-1 font-weight-medium">Attack Vector</div>
          <v-btn-toggle v-model="FORM.attackVector" color="primary" dense>
            <v-btn class="text-capitalize" small value="network">
              Network
            </v-btn>
            <v-btn class="text-capitalize" small value="adjacent">
              Adjacent
            </v-btn>
            <v-btn class="text-capitalize" small value="local"> Local </v-btn>
            <v-btn class="text-capitalize" small value="physical">
              Physical
            </v-btn>
          </v-btn-toggle>
        </div>
        <div class="d-flex py-2">
          <div class="pr-6">
            <div class="subtitle-1 font-weight-medium">Attack Complexity</div>
            <v-btn-toggle v-model="FORM.atackComplexity" color="primary" dense>
              <v-btn class="text-capitalize" small value="high"> High </v-btn>
              <v-btn class="text-capitalize" small value="low"> Low </v-btn>
            </v-btn-toggle>
          </div>
          <div>
            <div class="subtitle-1 font-weight-medium">Previledge Required</div>
            <v-btn-toggle
              v-model="FORM.previledgeRequired"
              color="primary"
              dense
            >
              <v-btn class="text-capitalize" small value="none"> None </v-btn>
              <v-btn class="text-capitalize" small value="high"> High </v-btn>
              <v-btn class="text-capitalize" small value="low"> Low </v-btn>
            </v-btn-toggle>
          </div>
        </div>
        <div class="d-flex py-2">
          <div class="pr-4">
            <div class="subtitle-1 font-weight-medium">User Interaction</div>
            <v-btn-toggle v-model="FORM.userInteraction" color="primary" dense>
              <v-btn class="text-capitalize" small value="none"> None </v-btn>
              <v-btn class="text-capitalize" small value="required">
                Required
              </v-btn>
            </v-btn-toggle>
          </div>
          <div>
            <div class="subtitle-1 font-weight-medium">Scope</div>
            <v-btn-toggle v-model="FORM.scope" color="primary" dense>
              <v-btn class="text-capitalize" small value="unchanged">
                Unchanged
              </v-btn>
              <v-btn class="text-capitalize" small value="changed">
                Changed
              </v-btn>
            </v-btn-toggle>
          </div>
        </div>
        <div class="d-flex py-2">
          <div class="pr-4">
            <div class="subtitle-1 font-weight-medium">Confidentiality</div>
            <v-btn-toggle v-model="FORM.confidentiality" color="primary" dense>
              <v-btn class="text-capitalize" small value="none"> None </v-btn>
              <v-btn class="text-capitalize" small value="high"> High </v-btn>
              <v-btn class="text-capitalize" small value="low"> Low </v-btn>
            </v-btn-toggle>
          </div>
          <div>
            <div class="subtitle-1 font-weight-medium">Integrity</div>
            <v-btn-toggle v-model="FORM.integrity" color="primary" dense>
              <v-btn class="text-capitalize" small value="none"> None </v-btn>
              <v-btn class="text-capitalize" small value="high"> High </v-btn>
              <v-btn class="text-capitalize" small value="low"> Low </v-btn>
            </v-btn-toggle>
          </div>
        </div>
        <div class="py-2">
          <div class="subtitle-1 font-weight-medium">Availability</div>
          <v-btn-toggle v-model="FORM.availability" color="primary" dense>
            <v-btn class="text-capitalize" small value="none"> None </v-btn>
            <v-btn class="text-capitalize" small value="high"> High </v-btn>
            <v-btn class="text-capitalize" small value="low"> Low </v-btn>
          </v-btn-toggle>
        </div>
      </section>

      <section v-if="!hideActions" class="py-4">
        <div class="subtitle-1 font-weight-medium">
          Quality Rating
          <v-badge
            v-if="FORM.qualityRating"
            inline
            color="primary"
            :content="FORM.qualityRating * 20"
          >
          </v-badge>
        </div>
        <v-rating
          v-model="FORM.qualityRating"
          color="accent"
          half-increments
          hover
          length="5"
          value="1.5"
        ></v-rating>
      </section>

      <section v-if="!hideActions" class="py-2">
        <v-autocomplete
          v-model="FORM.tags"
          :items="['tag 1', 'tag 2', 'tag 3']"
          small-chips
          label="Tags"
          multiple
          outlined
          dense
          chips
        ></v-autocomplete>
      </section>

      <v-row v-if="!hideActions" class="flex-sm-row-reverse">
        <v-col cols="12" sm="6">
          <v-btn color="primary" @click="saveChanges()">Save Changes</v-btn>
        </v-col>
        <v-col cols="12" sm="6">
          <v-btn text color="accent">Reset</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: {
    hideButtons: { type: Boolean, default: false },
    hideActions: { type: Boolean, default: false },
  },

  data() {
    return {
      ccvsScore: 0.0,
      severity: 'LOW',

      FORM: {
        attackVector: null,
        atackComplexity: null,
      },

      rewards: [
        { severtity: 'LOW', price: '50' },
        { severtity: 'MEDIUM', price: '500' },
        { severtity: 'HIGH', price: '1000' },
        { severtity: 'CRITICAL', price: '2500' },
      ],
    }
  },

  watch: {
    FORM: {
      handler(val) {
        let ccvsScore = 0

        // Attack Vector
        switch (val.attackVector) {
          case 'network':
            ccvsScore += 2.0
            break
          case 'adjacent':
            ccvsScore += 1.5
            break
          case 'local':
            ccvsScore += 1
            break
          case 'physical':
            ccvsScore += 0.5
            break
          default:
            break
        }

        // Attack complexity
        switch (val.atackComplexity) {
          case 'high':
            ccvsScore += 1
            break
          case 'low':
            ccvsScore += 0.5
            break
          default:
            break
        }

        // Attack Previledge
        switch (val.previledgeRequired) {
          case 'none':
            ccvsScore += 1.5
            break
          case 'high':
            ccvsScore += 1
            break
          case 'low':
            ccvsScore += 0.5
            break
          default:
            break
        }

        // User Interaction
        switch (val.userInteraction) {
          case 'required':
            ccvsScore += 1
            break
          case 'none':
            ccvsScore += 0.5
            break
          default:
            break
        }

        // User Scope
        switch (val.scope) {
          case 'unchanged':
            ccvsScore += 0.5
            break
          case 'changed':
            ccvsScore += 1
            break
          default:
            break
        }

        // Confidentiality
        switch (val.confidentiality) {
          case 'none':
            ccvsScore += 0
            break
          case 'high':
            ccvsScore += 1
            break
          case 'low':
            ccvsScore += 0.5
            break
          default:
            break
        }

        // Integrity
        switch (val.integrity) {
          case 'none':
            ccvsScore += 0
            break
          case 'high':
            ccvsScore += 1
            break
          case 'low':
            ccvsScore += 0.5
            break
          default:
            break
        }

        // Availability
        switch (val.availability) {
          case 'none':
            ccvsScore += 0
            break
          case 'high':
            ccvsScore += 1
            break
          case 'low':
            ccvsScore += 0.5
            break
          default:
            break
        }

        // Severity
        if (ccvsScore <= 2) this.severity = 'LOW'
        else if (ccvsScore >= 2.1 && ccvsScore <= 4) this.severity = 'MEDIUM'
        else if (ccvsScore >= 4.1 && ccvsScore <= 6) this.severity = 'HIGH'
        else this.severity = 'CRITICAL'

        this.ccvsScore = ccvsScore
      },
      deep: true,
    },
  },

  methods: {
    saveChanges() {
      this.$store.dispatch(
        'notification/warningSnackbar',
        'Feature not available at the moment'
      )
    },
  },
}
</script>
