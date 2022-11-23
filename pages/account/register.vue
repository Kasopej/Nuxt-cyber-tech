<template>
  <v-form
    ref="signUpForm"
    v-model="valid"
    class="pa-8 col-12"
    @submit.prevent="signUp"
  >
    <nav class="text-center pb-4">
      Already have an account?
      <nuxt-link to="/account/login/">Sign In</nuxt-link>
    </nav>

    <header class="display-1 font-weight-bold text-center py-4">
      Create an account
    </header>

    <section>
      <v-text-field
        v-model="FORM.firstName"
        dense
        required
        outlined
        label="First Name"
        :rules="[...rules.name]"
      ></v-text-field>

      <v-text-field
        v-model="FORM.lastName"
        dense
        required
        outlined
        label="Last Name"
        :rules="[...rules.name]"
      ></v-text-field>

      <v-text-field
        v-model="FORM.username"
        dense
        required
        outlined
        label="userName"
        :rules="[...rules.name]"
      ></v-text-field>

      <v-text-field
        v-model="FORM.phoneNumber"
        dense
        required
        outlined
        label="Phone Number"
        placeholder="+2348123456789"
        :rules="[...rules.phone]"
      ></v-text-field>

      <v-text-field
        v-model="FORM.email"
        dense
        required
        outlined
        label="E-mail"
        placeholder="example@email.com"
        :rules="[...rules.email]"
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

      <v-btn
        large
        block
        color="primary"
        class="px-3 py-2"
        :disabled="formSubmitted"
        @click="signUp"
      >
        Sign Up
        <v-progress-circular
          v-if="formSubmitted"
          class="ml-5"
          :size="23"
          :width="2"
          indeterminate
          color="primary"
        ></v-progress-circular>
      </v-btn>
    </section>

    <div class="py-4">
      <v-checkbox v-model="FORM.acceptTerms">
        <template #label>
          <div>
            By clicking sign up, you hereby are in agreement with our
            <a href="https://www.teklabspace.com/terms-condition"
              >Terms &amp; Conditions</a
            >
            and
            <a href="https://www.teklabspace.com/code-of-conduct"
              >Code of conduct</a
            >
          </div>
        </template>
      </v-checkbox>
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
        acceptTerms: false,
      },

      valid: true,
      showPassword: false,
      showConfirmPassword: false,

      rules: {
        required: [(value) => !!value || 'This field is required'],
        name: [
          (v) => !!v || 'This field is required',
          (v) => (v && v.length <= 100) || 'Must be less than 100 characters',
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
          (v) => !!v || 'Email is required',
          (v) =>
            !v ||
            /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
            'E-mail must be valid',
        ],
        password: [
          (value) => {
            const pattern =
              /^(?=.*[a-z]){3,}(?=.*[A-Z]){2,}(?=.*[0-9]){2,}(?=.*[!@#$%^&*()--__=~`|'"{}+.]){1,}.{8,}$/
            return (
              pattern.test(value) ||
              'Min. 8 characters with at least one capital letter, a number and a special character.'
            )
          },
        ],
      },
    }
  },

  head: { title: 'Signup' },

  methods: {
    async signUp(e) {
      e.preventDefault()
      if (this.$refs.signUpForm.validate() && this.FORM.acceptTerms) {
        this.$nuxt.$loading.start()
        this.formSubmitted = true

        const URL = `/register`
        const PAYLOAD = this.FORM

        await this.$axios
          .post(URL, PAYLOAD)
          .then((response) => {
            this.formSubmitted = false
            this.$router.push('/account/confirm-email')
          })
          .catch((error) => {
            this.$store.dispatch('notification/failureSnackbar', error)
            this.formSubmitted = false
          })
          .finally(() => {
            this.$nuxt.$loading.finish()
          })
      }
    },
  },
}
</script>
