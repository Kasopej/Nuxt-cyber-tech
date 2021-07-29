<template>
  <main class="py-8">
    <section class="pb-8">
      <label class="pt-8">
        <v-avatar size="250">
          <v-img
            :src="FILE_BLOB || USER.image || '/img/dummy.jpg'"
            class="rounded"
            cover
          />
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
          accept="image/jpeg, image/png"
          @change="uploadPhoto()"
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
    }
  },

  methods: {
    async uploadPhoto() {
      if (this.FILE) {
        this.labelText = 'Please wait...'

        // Convert photo to base64 format (i.e data url)
        // const formData = new FormData()
        // formData.append('file', this.FILE)
        // formData.append('userId', this.USER.id)
        this.FILE_BLOB = URL.createObjectURL(this.FILE)

        try {
          const response = await this.$axios.$post('/update-profile-picture', {
            formData: this.FILE_BLOB,
          })
          console.log(response)
        } catch (error) {
          console.error(error)
        }
      }
    },
  },
}
</script>
