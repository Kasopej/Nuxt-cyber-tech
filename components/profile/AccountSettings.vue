<template>
  <main class="pa-4">
    <v-form ref="formBillingInfo">
      <v-row>
        <v-col cols="12" sm="6" class="py-1">
          <v-text-field
            v-model="FORM.profile.firstname"
            block
            outlined
            label="First Name"
            :rules="[...rules.name]"
          />
        </v-col>
        <v-col cols="12" sm="6" class="py-1">
          <v-text-field
            v-model="FORM.profile.lastname"
            block
            outlined
            label="Last Name"
            :rules="[...rules.name]"
          />
        </v-col>

        <v-col cols="12" sm="6" class="py-1">
          <v-row no-gutters>
            <v-col cols="4" class="py-1 pl-0 pr-1">
              <v-autocomplete
                v-model="FORM.profile.phoneNumber.countryCode"
                :item-text="(item) => `${item.flag} +${item.dial_code}`"
                :rules="[...rules.required]"
                :items="countryCodes"
                item-value="dial_code"
                label="Dial Code"
                class="pa-0"
                outlined
              ></v-autocomplete>
            </v-col>

            <v-col cols="8" class="py-1 pl-0 pr-1">
              <v-text-field
                v-model="FORM.profile.phoneNumber.phoneNumber"
                :rules="[...rules.phone]"
                placeholder="08012345603"
                label="Phone Number"
                type="number"
                outlined
                block
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="12" sm="6" class="py-1">
          <v-text-field
            v-model="FORM.profile.email"
            :rules="[...rules.email]"
            label="Email"
            type="email"
            outlined
            block
          />
        </v-col>

        <v-col cols="12" sm="6" class="py-1">
          <v-autocomplete
            v-model="FORM.profile.language"
            :rules="[...rules.required]"
            :items="languages"
            item-value="code"
            item-text="name"
            label="Languages"
            outlined
            block
          />
        </v-col>

        <v-col cols="12" sm="6" class="py-1">
          <v-autocomplete
            v-model="FORM.profile.country"
            :rules="[...rules.required]"
            :items="countries"
            label="Country"
            outlined
            block
          />
        </v-col>

        <v-col cols="12" sm="6" class="py-1">
          <v-text-field
            v-model.trim="FORM.profile.city"
            :rules="[...rules.required]"
            placeholder="Lagos"
            label="City"
            outlined
            block
          />
        </v-col>

        <v-col cols="12" sm="6" class="py-1">
          <v-text-field
            v-model.trim="FORM.profile.address"
            block
            outlined
            :rules="[...rules.required]"
            placeholder="123, Ikorodu Road"
            label="Address"
          />
        </v-col>

        <v-col cols="12" sm="6" class="py-1">
          <v-text-field
            v-model.trim="FORM.profile.postalCode"
            placeholder="optional"
            label="Postal Code"
            outlined
            block
          />
        </v-col>

        <v-col cols="12" sm="6" class="py-1">
          <v-text-field
            v-model.trim="FORM.profile.twitterHandle"
            placeholder="@twitterhande"
            label="Twitter Handle"
            outlined
            block
          />
        </v-col>

        <v-col cols="12" sm="6" class="py-1">
          <v-text-field
            v-model.trim="FORM.profile.linkedin"
            placeholder=" https://linkedin.com/company/teklabspace"
            label="Linkedin"
            outlined
            block
          />
        </v-col>

        <v-col cols="12" sm="6" class="py-1">
          <v-text-field
            v-model.trim="FORM.profile.website"
            placeholder="https://www.example.com"
            label="Website"
            outlined
            block
          />
        </v-col>

        <v-col cols="12" sm="6" class="py-1">
          <v-textarea
            v-model.trim="FORM.profile.biography"
            placeholder="Introduce yourself, include some notable achievements and your hobbies."
            label="Bio"
            outlined
            block
          />
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
import countriesJSON from '~/assets/json/countries.json'
import languagesJSON from '~/assets/json/languages.json'
import countryCodesJSON from '~/assets/json/countryCodes.json'

export default {
  data() {
    return {
      countries: countriesJSON,
      countryCodes: countryCodesJSON,
      languages: languagesJSON,

      FORM: { profile: { phoneNumber: {}, language: 'en' } },
      USER: this.$store.state.auth.user.user,

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

  created() {
    this.FORM.profile = { ...this.FORM.profile, ...this.USER.profile[0] }
  },

  methods: {
    async updateProfile() {
      if (this.$refs.formBillingInfo.validate()) {
        this.$nuxt.$loading.start()

        const URL = `/update-profile`
        // Make upload request to the API
        await this.$axios
          .$patch(URL, this.FORM)
          .then(() => {
            this.$store.commit('notification/SHOW', {
              icon: 'mdi-check',
              text: 'Profile Updated Successfully',
            })
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
