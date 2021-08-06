<template>
  <main class="py-8">
    <section class="pb-8">
      <label class="pt-8">
        <v-avatar size="250">
          <v-img
            :src="USER.user.profile[0].image || '/img/dummy.jpg'"
            class="rounded"
          />
        </v-avatar>
        <div
          class="d-block grey--text text-center text-caption pt-3"
          style="width: 250px"
        >
          {{ labelText }}
        </div>
        <v-file-input
          class="d-none"
          accept="image/jpeg, image/png"
          @change="selectImage"
        />
      </label>
    </section>

    <div v-if="progress">
      <v-progress-linear
        v-model="progress"
        color="light-blue"
        height="25"
        reactive
        class="my-2"
      >
        <strong>{{ progress }} %</strong>
      </v-progress-linear>
    </div>

    <v-alert v-if="message" border="left" color="blue-grey" dark class="my-2">
      {{ message }}
    </v-alert>

    <!-- <div v-if="previewImage">
      <div>
        <img class="preview my-3" :src="previewImage" alt="" />
      </div>
    </div> -->

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

      currentImage: undefined,
      previewImage: undefined,

      progress: 0,
      message: '',

      imageInfos: [],

      selectedFile: null,
    }
  },

  methods: {
    // async uploadPhoto() {
    uploadPhoto() {
      if (this.FILE) {
        this.labelText = 'Please wait...'

        // Convert photo to base64 format (i.e data url)
        // const formData = new FormData()
        // formData.append('file', this.FILE)
        // formData.append('userId', this.USER.id)
        this.FILE_BLOB = URL.createObjectURL(this.FILE)

        // try {
        //   const response = await this.$axios.post('/update-profile-picture', {
        //     formData: this.FILE_BLOB,
        //   })
        //   console.log(response)
        // } catch (error) {
        //   console.error(error)
        // }
      }
    },

    selectImage(image) {
      this.currentImage = image
      this.previewImage = URL.createObjectURL(this.currentImage) // same as using "target.files[0]"
      this.progress = 0
      this.message = ''
      this.updateProfilePicture()
    },

    // onFileChanged(event) {
    //   this.selectedFile = event.target.files[0]
    // },

    async updateProfilePicture() {
      if (this.currentImage) {
        // FIXME: Seems not working well on local machine (firefox)
        // TODO: Uncomment sections below to use JSON to replace formData for more browsers support
        console.log(
          'Current Image: ',
          this.currentImage,
          'Preview Image: ',
          this.previewImage
        )

        const config = {
          headers: {
            // 'Content-Type': 'multipart/form-data',
            'Content-Type': this.currentImage.type,
          },
        }

        const formData = new FormData()
        formData.append(
          // 'profile[0].image',
          'image',
          this.currentImage,
          this.currentImage.name
        )
        console.log(this.currentImage.name)
        // formData.append('image', this.currentImage)
        // formData.append('image', this.previewImage)
        console.log(
          'Is currentImage of type Blob: ',
          this.currentImage instanceof Blob
        )
        console.log(
          'Is previewImage of type Blob: ',
          this.previewImage instanceof Blob
        )

        try {
          this.labelText = 'Please wait, uploading...'
          console.log('Trying...')

          const response = await this.$axios.post(
            // await this.$axios.post(
            '/update-profile-picture',
            formData,
            // this.currentImage,
            // this.previewImage,
            config
            // // { timeout: 20000 },
            // {
            //   onUploadProgress: (progressEvent) => {
            //     console.log(progressEvent.loaded / progressEvent.total)
            //     return progressEvent.loaded / progressEvent
            //   },
            // }
          )

          console.log(response)
          console.log('Success')
          this.labelText = 'Click to change'
        } catch (e) {
          alert('Hello')
          console.log(e)
          console.log('Failure')
          console.log(e.code, e.message)
          this.labelText = 'Click to change'

          if (e.code || e.message) {
            this.$store.dispatch('notification/failureSnackbar', e)
          } else {
            this.$store.dispatch(
              'notification/warningSnackbar',
              'Something seems not working appropriately.'
            )
          }
        }
      }
    },
  },
}
</script>
