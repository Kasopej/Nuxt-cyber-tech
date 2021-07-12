<template>
  <v-form
    @submit.prevent="updatePassword"
    ref="passwordreset"
    v-model="valid"
    class="pa-8 col-12"
    lazy-validation
  >
    <nav class="text-center pb-4">
      Already have an account?
      <nuxt-link to="/account/login/">Sign In</nuxt-link>
    </nav>
    <header class="headline font-weight-bold text-center pb-4">
      Update Password
    </header>

    <v-form ref="loginForm">
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

      <v-btn block color="primary mt-4" @click="updatePassword">
        Update Password</v-btn
      >
    </v-form>

    <div class="d-flex align-center justify-space-between py-4">
      <!--      <v-checkbox v-model="FORM.persistent" label="Remember me"></v-checkbox>-->
      <!--      <nuxt-link to="/account/forgot-password/">Forgot Password?</nuxt-link>-->
    </div>
  </v-form>
</template>

<script>
export default {
  name: 'PasswordReset',
  layout: 'account',
  middleware: 'guest',
  data() {
    return {
      FORM: {
        password: null,
        confirmPassword: null,
      },

      valid: true,
      showPassword: false,
      showConfirmPassword: false,

      rules: {
        required: [(value) => !!value || 'This field is required'],
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
  methods: {
    async updatePassword(e) {
      e.preventDefault()
      if (this.$refs.passwordreset.validate()) {
        this.$nuxt.$loading.start()

        const URL = `/complete-reset-password`
        const PAYLOAD = {
          userId: this.$route.params.user,
          token: this.$route.params.token,
          password: this.FORM.password,
        }

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

<style scoped></style>
