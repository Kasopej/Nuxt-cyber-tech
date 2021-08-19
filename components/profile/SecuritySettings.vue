<template>
  <div class="px-4 pt-6 pb-5">
    <div v-if="!isTwoFactor">
      <v-row v-if="authInfo !== null" no-gutters>
        <v-col md="4">
          <v-img
            max-height="250"
            max-width="250"
            :src="authInfo.qrcode"
          ></v-img>
        </v-col>
        <v-col md="8">
          <div class="mt-2">
            <h2>GOOGLE 2FA PROFILE SETUP</h2>
            <ol>
              <li>
                Download Google Authenticator From either Play store or App
                store.
                <br />
                <a
                  href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&amp;hl=en"
                >
                  <img
                    class="img"
                    src="/img/google-play.png"
                    width="80"
                    height="30"
                /></a>
                <a
                  href="https://itunes.apple.com/us/app/google-authenticator/id388497605?mt=8"
                >
                  <img
                    class="img"
                    src="/img/app-store.png"
                    width="80"
                    height="30"
                /></a>
              </li>
              <li>
                Open up your Google Authenticator mobile app and scan the
                following QR barcode:
              </li>
              <li>
                If your 2FA mobile app does not support QR barcodes, enter in
                the following number: <code>{{ authInfo.secret }}</code>
              </li>
            </ol>
            <v-form ref="tokenForm">
              <v-text-field
                v-model.trim="form.token"
                block
                outlined
                :rules="[...rules.required]"
                label="Token"
              />
              <v-btn color="primary" block @click="verify()"
                >Enable 2Factor authentication</v-btn
              >
            </v-form>
          </div>
        </v-col>
      </v-row>
      <div v-else>
        <v-row>
          <v-col md="4">
            <v-skeleton-loader type="card"></v-skeleton-loader>
          </v-col>
          <v-col md="8">
            <v-skeleton-loader type="article"></v-skeleton-loader>
          </v-col>
        </v-row>
      </div>
    </div>

    <div v-else>
      <div class="d-flex justify-space-between align-center py-3">
        <div class="mr-2">
          <h4 class="">Two Factor Authentication</h4>
          <small class="grey--text">Disable two factor authentication</small>
        </div>

        <v-switch v-model="isTwoFactor" inset @change="disable()"></v-switch>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      authInfo: null,
      user: this.$store.state.auth.user,
      isTwoFactor: this.$store.state.auth.user.user.twoFactorAuth,
      form: {},
      rules: {
        required: [(value) => !!value || 'This Field Is Required'],
      },
    }
  },

  async fetch() {
    if (!this.isTwoFactor) {
      const uri = 'activate-2fa'
      await this.$axios
        .$post(uri, {})
        .then((res) => {
          this.authInfo = res
        })
        .catch((error) => {
          this.$store.commit('notification/SHOW', {
            color: 'accent',
            icon: 'mdi-alert-outline',
            text: error.response
              ? error.response.data.message
              : 'Oops! programme not found',
          })
        })
    }
  },

  methods: {
    async verify() {
      if (this.$refs.tokenForm.validate()) {
        const uri = '/verify-2fa'
        await this.$axios
          .$post(uri, this.form)
          .then((res) => {
            this.$store.commit('notification/SHOW', {
              icon: 'mdi-check',
              text: res.message,
            })

            this.$router.push('/account/logout')
          })
          .catch((error) => {
            this.$store.commit('notification/SHOW', {
              color: 'accent',
              icon: 'mdi-alert-outline',
              text: error.response
                ? error.response.data.message
                : 'Oops! programme not found',
            })
          })
      }
    },

    async disable() {
      const uri = '/disable-2fa'
      await this.$axios
        .$post(uri, {})
        .then((res) => {
          this.$store.commit('notification/SHOW', {
            icon: 'mdi-check',
            text: res.message,
          })
          this.$fetch()
          this.$store.commit('auth/SET_TWO_FACTOR_STATUS', false)
        })
        .catch((error) => {
          this.$store.commit('notification/SHOW', {
            color: 'accent',
            icon: 'mdi-alert-outline',
            text: error.response
              ? error.response.data.message
              : 'Oops! programme not found',
          })
        })
    },
  },
}
</script>

<style scoped>
.border {
  border: 1px solid #ccc;
}

img {
  vertical-align: middle;
  border-style: none;
}

ol {
  margin-top: 0;
  margin-bottom: 1rem;
}

code {
  font-size: 87.5%;
  color: #e83e8c !important;
  word-break: break-word;
}
</style>
