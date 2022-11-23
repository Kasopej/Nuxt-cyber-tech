<template>
  <v-form
    ref="form"
    v-model="valid"
    class="pa-8 col-12"
    lazy-validation
    @submit.prevent="login()"
  >
    <div class="text-center pb-4">
      Don’t have an account?
      <nuxt-link to="/account/register/">Sign Up</nuxt-link>
    </div>

    <header class="headline font-weight-bold text-center py-4">
      Welcome Back!!!
    </header>

    <v-form ref="loginForm" @submit.prevent="login">
      <v-text-field
        v-model="FORM.email"
        dense
        outlined
        :rules="[...rules.required]"
        label="E-mail"
        required
      ></v-text-field>

      <v-text-field
        v-model="FORM.password"
        dense
        required
        outlined
        password
        label="Password"
        :rules="[...rules.required]"
        :type="showPassword ? 'text' : 'password'"
        :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
        @click:append="showPassword = !showPassword"
      ></v-text-field>

      <v-btn
        large
        block
        color="primary"
        class="px-3 py-2"
        :disabled="formSubmitted"
        @click="login"
      >
        Sign in
        <v-progress-circular
          v-if="formSubmitted"
          class="ml-5"
          :size="23"
          :width="2"
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-btn>
    </v-form>

    <div class="d-flex align-center justify-space-between py-4">
      <v-checkbox v-model="FORM.persistent" label="Remember me"></v-checkbox>
      <nuxt-link to="/account/forgot-password/">Forgot Password?</nuxt-link>
    </div>
  </v-form>
</template>

<script>
export default {
  layout: 'account',
  middleware: 'guest',

  data() {
    return {
      formSubmitted: false,
      FORM: {
        email: null,
        password: null,
        persistent: true,
      },

      valid: true,
      showPassword: false,

      rules: {
        required: (value) => !!value || 'Required.',
      },
    }
  },

  head: { title: 'Sign in' },

  methods: {
    async login(e) {
      e.preventDefault()
      if (this.$refs.loginForm.validate()) {
        this.$nuxt.$loading.start()
        this.formSubmitted = true

        const URL = `/login`
        const PAYLOAD = this.FORM

        await this.$axios
          .post(URL, PAYLOAD)
          .then((response) => {
            this.formSubmitted = false

            if (response.data.twoFactorAuth) {
              this.$store.commit('auth/KEEP_TFA', response.data)
              this.$router.replace('/account/verify-twofa')
            } else if (!response.data.twoFactorAuth) {
              this.$store.commit('auth/LOG_USER_IN', response.data)
              this.$router.replace('/')
            }
          })
          .catch((error) => {
            this.formSubmitted = false
            this.$store.dispatch('notification/failureSnackbar', error)
          })
          .finally(() => {
            this.$nuxt.$loading.finish()
          })
      }
    },
  },
}
</script>
