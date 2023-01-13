<template>
  <main class="py-8">
    <section class="pb-8">
      <label class="pt-8">
        <v-avatar style="background: #f2f2f2" size="250">
          <v-img :src="USER.user.profile[0].image" class="rounded" />
        </v-avatar>
        <div
          class="d-block grey--text text-center text-caption pt-3 cursor-pointer"
          style="width: 250px"
        >
          {{ labelText }}
        </div>
        <input
          class="d-none"
          type="file"
          name="myImage"
          accept="image/*"
          @change="uploadPhoto($event.target.files[0])"
        />
      </label>
    </section>

    <v-tabs grow class="elevation-2 py-4">
      <v-tab>
        <v-icon class="mr-3">mdi-account</v-icon>
        <span class="text-capitalize">Profile</span>
      </v-tab>
      <v-tab>
        <v-icon class="mr-3">mdi-tools</v-icon>
        <span class="text-capitalize">Skills</span>
      </v-tab>
      <v-tab>
        <v-icon class="mr-3">mdi-gift-outline</v-icon>
        <span class="text-capitalize">Payment</span>
      </v-tab>
      <v-tab>
        <v-icon class="mr-3">mdi-security</v-icon>
        <span class="text-capitalize">Security</span>
      </v-tab>

      <v-tab-item class="py-8">
        <profile-account-settings />
      </v-tab-item>
      <v-tab-item class="py-8">
        <profile-skills-settings />
      </v-tab-item>
      <v-tab-item class="py-8">
        <profile-payment-settings />
      </v-tab-item>
      <v-tab-item class="py-8">
        <profile-security-settings />
      </v-tab-item>
    </v-tabs>
  </main>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      labelText: 'Click to change',
      FORM: { readOnly: true, company: {}, representative: {}, billing: {} },

      profileEditTab: 0,
      FILE: null,
      blob: '',
      USER_PIC: null,
    }
  },
  computed: {
    ...mapState('auth', { USER: 'user' }),
  },

  methods: {
    async uploadPhoto(file) {
      const URL = '/update-profile-picture'
      const payload = new FormData()
      payload.append('file', file)

      await this.$axios
        .$patcdh(URL, payload)
        .then((response) => {
          this.$store.commit('notification/SHOW', {
            icon: 'mdi-check',
            text: 'Picture changed Successfully',
          })

          this.labelText = 'Click to change'
          this.$store.commit('auth/CHANGE_USER_PIC', response.data)
        })
        .catch((error) => {
          this.$store.commit('notification/SHOW', {
            color: 'accent',
            icon: 'mdi-alert-outline',
            text: error.response
              ? error.response.message
              : "Sorry, that didn't work. Please try again",
          })
        })
        .finally(() => {
          this.$nuxt.$loading.finish()
        })
    },
  },
}
</script>
