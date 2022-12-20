<template>
  <main class="pa-4">
    <section class="d-flex flex-column flex-sm-row align-center">
      <v-btn
        text
        x-large
        :class="FORM.payment.paymentType == 'bank' ? 'secondary' : 'white'"
        class="text-center pa-4 elevation-1 rounded accent--text subtitle-1 mr-8 mb-8"
        @click="changePaymentType('bank')"
      >
        <v-icon large color="accent" class="mr-sm-4">mdi-bank</v-icon>
        <span class="font-weight-bold">Bank Transfer</span>
      </v-btn>

      <v-btn
        text
        x-large
        :class="FORM.payment.paymentType == 'paypal' ? 'secondary' : 'white'"
        class="d-flex align-center text-center pa-4 elevation-1 rounded accent--text subtitle-1 mr-8 mb-8"
        @click="changePaymentType('paypal')"
      >
        <img src="/img/pay-pal.svg" alt="paypal" />
      </v-btn>
    </section>

    <v-form ref="formBillingInfo">
      <v-row v-if="FORM.payment.paymentType == 'paypal'">
        <v-col cols="12" sm="6" class="py-1">
          <v-text-field
            v-model.trim="FORM.payment.email"
            placeholder="Paypal E-mail Address"
            :rules="[...rules.email]"
            label="E-mail Address"
            outlined
            block
          />
        </v-col>
      </v-row>

      <v-row v-else>
        <v-col cols="12" sm="6" class="py-1">
          <v-autocomplete
            v-model.trim="FORM.payment.bank.country"
            :rules="[...rules.required]"
            :items="countries"
            label="Country"
            outlined
            block
          />
        </v-col>

        <v-col cols="12" sm="6" class="py-1">
          <v-autocomplete
            v-model.trim="FORM.payment.bank.currency"
            :item-text="(item) => `(${item.symbol}) ${item.name}`"
            :rules="[...rules.required]"
            :items="currencies"
            label="Currency"
            item-value="cc"
            outlined
            block
          />
        </v-col>

        <v-col cols="12" sm="6" class="py-1">
          <v-text-field
            v-model.trim="FORM.payment.bank.swift"
            placeholder="Bank Identifier Code"
            :rules="[...rules.required]"
            label="SWIFT / BIC"
            outlined
            block
          />
        </v-col>

        <v-col cols="12" sm="6" class="py-1">
          <v-text-field
            v-model.trim="FORM.payment.bank.accountNumber"
            :rules="[...rules.required]"
            placeholder="NUBAN / IBAN"
            label="Account Number"
            outlined
            block
          />
        </v-col>

        <v-col cols="12" sm="6" class="py-1">
          <v-text-field
            v-model.trim="FORM.payment.bank.accountName"
            :rules="[...rules.required]"
            label="Account Name"
            outlined
            block
          />
        </v-col>

        <v-col cols="12" sm="6" class="py-1">
          <v-file-input
            :value="newIdCard"
            :label="
              idCard
                ? `ID Card already uploaded: ${idCardSlug}`
                : `Valid ID card (Government Issued)`
            "
            :hint="idCard ? '' : 'Upload size under 5MB. (Image format only)'"
            accept="image/*"
            truncate-length="15"
            :disabled="idCard"
            persistent-hint
            show-size
            outlined
            block
            @change="updateIdCard"
          />
          <small
            v-if="idCard"
            class="text-center relative bottom-6 inline-block w-full text-green-700"
          >
            <a :href="idCard" target="_blank">View uploaded ID</a>
          </small>
        </v-col>
      </v-row>

      <div>
        <v-btn color="primary" large @click="updateProfile()">
          Save Changes
        </v-btn>
      </div>
    </v-form>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import countriesJSON from '~/assets/json/countries.json'
import currenciesJSON from '~/assets/json/currencies.json'

export default {
  data() {
    return {
      countries: countriesJSON,
      currencies: currenciesJSON,
      idCard: null,
      newIdCard: null,
      FORM: { payment: { bank: {}, paymentType: 'bank' } },

      rules: {
        required: [(value) => !!value || 'This Field Is Required'],
        name: [
          (v) => !!v || 'Name is required',
          (v) =>
            (v && v.length <= 100) || 'Name must be less than 100 characters',
        ],
        phone: [
          (v) => !!v || 'Phone number is required',
          (v) =>
            !v ||
            /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm.test(
              v
            ) ||
            'Invalid Phone number',
        ],
        email: [
          (v) => !!v || 'E-mail is required',
          (v) =>
            !v ||
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
            'E-mail must be valid',
        ],
      },
    }
  },

  computed: {
    ...mapState('auth', { USER: 'user' }),
    idCardSlug() {
      if (!this.idCard) return
      return this.idCard.slice(this.idCard.indexOf('validId/') + 8)
    },
  },
  created() {
    this.FORM.payment = {
      ...this.FORM.payment,
      ...JSON.parse(JSON.stringify(this.USER.user.payment[0])),
    }
    delete this.FORM.payment.validId
    if (this.USER.user.payment[0].validId.endsWith('/')) {
      this.USER.user.payment[0].validId =
        this.USER.user.payment[0].validId.slice(
          0,
          this.USER.user.payment[0].validId.length - 1
        )
    }
    this.idCard = this.USER.user.payment[0].validId
  },

  methods: {
    changePaymentType(val) {
      this.FORM.payment.paymentType = val
    },

    async updateProfile() {
      if (this.$refs.formBillingInfo.validate()) {
        this.$nuxt.$loading.start()

        const PAYLOAD = { ...this.FORM }
        if (PAYLOAD.payment.paymentType === 'paypal') {
          PAYLOAD.payment.bank = {}
        } else {
          PAYLOAD.payment.email = ''
        }

        const URL = `/update-profile`
        // Make upload request to the API
        await this.$axios
          .$patch(URL, PAYLOAD)
          .then((res) => {
            this.$store.commit('auth/UPDATE_USER_PAYMENT', res.data.payment[0])
            this.$store.dispatch(
              'notification/successSnackbar',
              'Payment updated'
            )
          })
          .catch((error) => {
            this.$store.dispatch('notification/failureSnackbar', error)
          })
          .finally(() => {
            this.$nuxt.$loading.finish()
          })
      }
    },
    async updateIdCard(file) {
      if (this.idCard) return
      const URL = `/payment-idcard`
      const formData = new FormData()
      formData.append('file', file)
      // Make upload request to the API
      await this.$axios
        .$put(URL, formData)
        .then(() => {
          this.$store.dispatch(
            'notification/successSnackbar',
            'Payment ID updated'
          )
        })
        .catch((error) => {
          this.$store.dispatch('notification/failureSnackbar', error)
        })
        .finally(() => {
          this.$nuxt.$loading.finish()
        })
    },
  },
}
</script>
