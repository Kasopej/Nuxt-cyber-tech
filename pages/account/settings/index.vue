<template>
  <main class="py-8">
    <section class="pb-8">
      <label class="pt-8">
        <v-avatar size="250">
          <v-img :src="USER_PIC" class="rounded" />
        </v-avatar>
        <div
          class="d-block grey--text text-center text-caption pt-3"
          style="width: 250px"
        >
          {{ labelText }}
        </div>
        <v-file-input
          v-model="FILE"
          class="d-none"
          type="file"
          name="myImage"
          accept=".jpg, .jpeg, .png"
          @change="uploadPhoto"
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
export default {
  data() {
    return {
      labelText: 'Click to change',
      FORM: { readOnly: true, company: {}, representative: {}, billing: {} },

      profileEditTab: 0,
      FILE: null,
      FILE_BLOB: null,

      USER: this.$store.state.auth.user,
      USER_PIC:
        this.$store.state.auth.user.user.profile[0].image || '/img/dummy.jpg',

      // currentImage: undefined,
      // previewImage: undefined,
      // progress: 0,
      // message: '',
      // imageInfos: [],
      // selectedFile: null,
    }
  },

  methods: {
    async uploadPhoto(event) {
      if (this.FILE) {
        this.labelText = 'Please wait...'

        // Convert photo to base64 format (i.e data url) for preview
        // the image is from the user object from the login endpoint
        // once the user details api is provided that will be used
        const formData = new FormData()
        formData.append('file', this.FILE)
        formData.append('userId', this.USER.id)
        this.USER_PIC = URL.createObjectURL(this.FILE)

        const endpoint = '/update-profile-picture'
        await this.$axios
          .$patch(endpoint, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          })
          .then((response) => {
            this.$store.commit('notification/SHOW', {
              icon: 'mdi-check',
              text: 'Picture changed Successfully',
            })

            this.labelText = 'Click to change'
            this.$store.commit(
              'auth/CHANGE_USER_PIC',
              response.data.profile[0].image
            )
          })
          .catch((error) => {
            this.USER_PIC = this.USER.user.profile[0].image
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
