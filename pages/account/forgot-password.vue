<template>
  <v-stepper v-model="step" class="elevation-0">
    <header class="headline font-weight-bold text-center py-4">
      Forgot Password
    </header>

    <v-stepper-items>
      <v-stepper-content step="1">
        <v-form
          ref="form1"
          v-model="valid"
          class="pa-8 col-12"
          lazy-validation
          @submit.prevent="sendEmail"
        >
          <div class="text-center pb-4">
            Enter your email and we’ll send you a link to reset your password
          </div>

          <div>
            <v-text-field
              v-model="FORM.email"
              dense
              outlined
              :rules="[...rules.required]"
              label="E-mail"
              required
            ></v-text-field>

            <v-btn block color="primary" type="submit" @click="sendEmail">
              Reset password
            </v-btn>
          </div>

          <div class="text-center py-4">
            <nuxt-link
              to="/account/login/"
              class="font-weight-bold accent--text"
            >
              Or click here to login
            </nuxt-link>
          </div>
        </v-form>
      </v-stepper-content>

      <v-stepper-content step="2">
        <v-form ref="form2" v-model="valid" class="pa-8 col-12" lazy-validation>
          <div class="text-center font-weight-bold pb-4">
            A password reset link has been sent to your E-mail. <br />
            Kindly check your inbox
          </div>

          <div class="d-none">
            <v-text-field
              v-model="FORM.token"
              dense
              outlined
              :rules="[...rules.required]"
              label="OTP"
              required
              placeholder="000000"
            ></v-text-field>

            <v-text-field
              v-model="FORM.password"
              dense
              required
              outlined
              password
              label="Password"
              :rules="[...rules.password]"
              :type="showPassword ? 'text' : 'password'"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showPassword = !showPassword"
            ></v-text-field>

            <v-text-field
              v-model="FORM.confirmPassword"
              dense
              required
              outlined
              password
              label="Confirm Password"
              :rules="[
                ...(value) =>
                  value === FORM.password ||
                  'The password confirmation does not match.',
              ]"
              :type="showConfirmPassword ? 'text' : 'password'"
              :append-icon="showConfirmPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="showConfirmPassword = !showConfirmPassword"
            ></v-text-field>

            <v-btn block color="primary" @click="resetPassword">
              Reset password
            </v-btn>
          </div>

          <div class="text-center d-none py-4">
            <nuxt-link
              to="/account/login/"
              class="font-weight-bold accent--text"
            >
              Or click here to login
            </nuxt-link>
          </div>
        </v-form>
        <nav class="text-center pb-4">
          Already have an account?
          <nuxt-link to="/account/login/">Sign In</nuxt-link>
        </nav>
      </v-stepper-content>
    </v-stepper-items>
  </v-stepper>
</template>

<script>
export default {
  layout: 'account',
  middleware: 'guest',

  data() {
    return {
      step: 1,

      FORM: {
        password: null,
        email: null,
      },

      valid: true,
      showPassword: false,
      showConfirmPassword: false,

      rules: {
        required: [(value) => !!value || 'This field is required'],
        email: [
          (v) => !!v || 'Company Email is required',
          (v) =>
            !v ||
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
            'E-mail must be valid',
        ],
        password: [
          (value) => {
            const pattern = /^(?=.*[a-z]){3,}(?=.*[A-Z]){2,}(?=.*[0-9]){2,}(?=.*[!@#$%^&*()--__=~`|'"{}+.]){1,}.{8,}$/
            return (
              pattern.test(value) ||
              'Min. 8 characters with at least one capital letter, a number and a special character.'
            )
          },
        ],
      },
    }
  },

  head: { title: 'Reset Password' },

  methods: {
    async sendEmail(e) {
      e.preventDefault()
      if (this.$refs.form1.validate()) {
        this.$nuxt.$loading.start()

        const URL = `/reset-password`
        const PAYLOAD = {
          email: this.FORM.email,
        }
        await this.$axios
          .post(URL, PAYLOAD)
          .then((response) => {
            this.step = 2
          })
          .catch((error) => {
            this.$store.commit('notification/SHOW', {
              color: 'accent',
              text: error.response
                ? error.response.data.message
                : "Sorry, that didn't work. Please try again",
            })
          })
          .finally(() => {
            this.$nuxt.$loading.finish()
          })
      }
    },

    async resetPassword() {
      if (this.$refs.form2.validate()) {
        this.$nuxt.$loading.start()

        const URL = `/reset-password`
        const PAYLOAD = this.FORM

        await this.$axios
          .post(URL, PAYLOAD)
          .then((response) => {
            this.$router.replace('/')
          })
          .catch((error) => {
            this.$store.commit('notification/SHOW', {
              color: 'accent',
              icon: 'mdi-alert-outline',
              text: error.response
                ? error.response.data.message
                : "Sorry, that didn't work. Please try again",
            })
          })
          .finally(() => {
            this.$nuxt.$loading.finish()
          })
      }
    },
  },
}
</script>
