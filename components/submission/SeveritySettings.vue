<template>
  <v-col cols="12" md="4" class="px-4">
    <v-card class="px-4 py-8">
      <v-text-field block readonly outlined label="CVE Id" :value="cveid" />

      <div class="d-flex justify-center">
        <div
          v-if="!hideButtons"
          class="accent text-center white--text rounded px-8 py-2 mx-1"
        >
          <div>CVE Score</div>
          <div class="font-weight-bold" v-text="cveScore.toFixed(1)" />
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
        <small v-if="!validationState" class="red--text">
          Please select severity parameters
        </small>
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
          <v-btn color="primary">Save Changes</v-btn>
        </v-col>
        <v-col cols="12" sm="6">
          <v-btn text color="accent">Reset</v-btn>
        </v-col>
      </v-row>
    </v-card>
  </v-col>
</template>

<script>
import { mapState } from 'vuex'

export default {
  model: {
    event: 'cveid-compute',
    prop: 'cveid',
  },
  props: {
    hideButtons: { type: Boolean, default: false },
    hideActions: { type: Boolean, default: false },
    cveid: { type: String },
    cveScore: { type: Number },
    severity: { type: String },
    validationState: { type: Boolean, default: false },
  },

  data() {
    return {
      valuesHaveBeenComputed: false,
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
  computed: {
    ...mapState('program', { program: 'data' }),
    cveScoreComputed: {
      set(val) {
        this.$emit('cve-score-compute', val)
      },
      get() {
        return this.cveScore
      },
    },
    severityComputed: {
      set(val) {
        this.$emit('severity-compute', val)
      },
      get() {
        return this.severity
      },
    },
  },

  watch: {
    FORM: {
      handler(val) {
        let cveScore = 0

        // Attack Vector
        switch (val.attackVector) {
          case 'network':
            cveScore += 2.0
            break
          case 'adjacent':
            cveScore += 1.5
            break
          case 'local':
            cveScore += 1
            break
          case 'physical':
            cveScore += 0.5
            break
          default:
            break
        }

        // Attack complexity
        switch (val.atackComplexity) {
          case 'high':
            cveScore += 1
            break
          case 'low':
            cveScore += 0.5
            break
          default:
            break
        }

        // Attack Previledge
        switch (val.previledgeRequired) {
          case 'none':
            cveScore += 1.5
            break
          case 'high':
            cveScore += 1
            break
          case 'low':
            cveScore += 0.5
            break
          default:
            break
        }

        // User Interaction
        switch (val.userInteraction) {
          case 'required':
            cveScore += 1
            break
          case 'none':
            cveScore += 0.5
            break
          default:
            break
        }

        // User Scope
        switch (val.scope) {
          case 'unchanged':
            cveScore += 0.5
            break
          case 'changed':
            cveScore += 1
            break
          default:
            break
        }

        // Confidentiality
        switch (val.confidentiality) {
          case 'none':
            cveScore += 0
            break
          case 'high':
            cveScore += 1
            break
          case 'low':
            cveScore += 0.5
            break
          default:
            break
        }

        // Integrity
        switch (val.integrity) {
          case 'none':
            cveScore += 0
            break
          case 'high':
            cveScore += 1
            break
          case 'low':
            cveScore += 0.5
            break
          default:
            break
        }

        // Availability
        switch (val.availability) {
          case 'none':
            cveScore += 0
            break
          case 'high':
            cveScore += 1
            break
          case 'low':
            cveScore += 0.5
            break
          default:
            break
        }

        // Severity
        if (cveScore <= 2) this.severityComputed = 'LOW'
        else if (cveScore >= 2.1 && cveScore <= 4)
          this.severityComputed = 'MEDIUM'
        else if (cveScore >= 4.1 && cveScore <= 6)
          this.severityComputed = 'HIGH'
        else this.severityComputed = 'CRITICAL'

        this.cveScoreComputed = cveScore
        this.valuesHaveBeenComputed = true
        this.validate()
      },
      deep: true,
    },
  },

  methods: {
    validate() {
      this.$emit(
        'validation',
        !!(this.cveScoreComputed && this.severityComputed)
      )
    },
  },
}
</script>
