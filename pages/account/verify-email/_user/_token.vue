<template>
  <section class="col-12">
    <div class="text-center font-weight-bold w-full pl-6 pb-4">
      Your account has been verified
    </div>
    <div class="text-center py-4">
      <nuxt-link to="/account/login/" class="font-weight-bold accent--text">
        click here to login
      </nuxt-link>
    </div>
  </section>
</template>

<script>
export default {
  name: 'ActivateEmail',
  layout: 'account',
  middleware: 'guest',
  async asyncData({ params, app, store }) {
    const PAYLOAD = {
      userId: params.user,
      token: params.token,
    }

    const URL = `/activate/${PAYLOAD.userId}/${PAYLOAD.token}`

    await app.$axios
      .post(URL, PAYLOAD)
      .then((response) => {
        app.$router.push('/account/login')
      })
      .catch((error) => {
        store.commit('notification/SHOW', {
          color: 'accent',
          icon: 'mdi-alert-outline',
          text: error.response
            ? error.response.data.message
            : "Sorry, that didn't work. Please try again",
        })
      })
  },
  data() {
    return {}
  },
}
</script>

<style scoped></style>
