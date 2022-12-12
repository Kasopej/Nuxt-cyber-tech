<template>
  <main class="pa-4">
    <v-form ref="formSkillsInfo">
      <div class="py-1">
        <v-text-field
          v-model="FORM.skills.intrests"
          block
          outlined
          label="Skills And Intrests"
          :rules="[...rules.required]"
        />
      </div>

      <header cols="12" class="subtitle-1 grey--text text--darken-3 pb-4">
        Get matched to suitable programs based on your skills
      </header>

      <v-row>
        <v-col cols="12" sm="6" class="py-1">
          <v-switch
            v-model="FORM.skills.apiTesting"
            label="API Testing"
          ></v-switch>
        </v-col>

        <v-col cols="12" sm="6" class="py-1">
          <v-switch
            v-model="FORM.skills.bugBounty"
            label="Bug Bounty"
          ></v-switch>
        </v-col>

        <v-col cols="12" sm="6" class="py-1">
          <v-switch
            v-model="FORM.skills.codeReview"
            label="Code Review"
          ></v-switch>
        </v-col>

        <v-col cols="12" sm="6" class="py-1">
          <v-switch
            v-model="FORM.skills.cryptography"
            label="Cryptography"
          ></v-switch>
        </v-col>

        <v-col cols="12" sm="6" class="py-1">
          <v-switch
            v-model="FORM.skills.desktopApplicationTesting"
            label="Desktop Application Testing"
          ></v-switch>
        </v-col>

        <v-col cols="12" sm="6" class="py-1">
          <v-switch
            v-model="FORM.skills.mobileApplicationTesting"
            label="Mobile Application Testing"
          ></v-switch>
        </v-col>

        <v-col cols="12" sm="6" class="py-1">
          <v-switch
            v-model="FORM.skills.iot"
            label="Internet Of Things"
          ></v-switch>
        </v-col>

        <v-col cols="12" sm="6" class="py-1">
          <v-switch
            v-model="FORM.skills.penetrationTesting"
            label="Penetration Testing"
          ></v-switch>
        </v-col>

        <v-col cols="12" sm="6" class="py-1">
          <v-switch
            v-model="FORM.skills.websiteTesting"
            label="Website Testing"
          ></v-switch>
        </v-col>
      </v-row>

      <div class="py-4">
        <v-btn color="primary" large @click="updateProfile()">
          Save Changes
        </v-btn>
      </div>
    </v-form>
  </main>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
      FORM: { skills: {} },

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
  },

  created() {
    this.FORM.skills = {
      ...this.FORM.skills.skills,
      ...this.USER.user.skills[0],
    }
  },

  methods: {
    async updateProfile() {
      if (this.$refs.formSkillsInfo.validate()) {
        this.$nuxt.$loading.start()

        const URL = `/update-profile`
        // Make upload request to the API
        await this.$axios
          .$patch(URL, this.FORM)
          .then((res) => {
            this.$store.commit('auth/UPDATE_USER_SKILLS', res.data.skills[0])
            this.$store.dispatch(
              'notification/successSnackbar',
              'Skills updated'
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
  },
}
</script>
