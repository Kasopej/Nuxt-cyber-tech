<template>
  <div>Logging out. Please, wait!</div>
</template>

<script>
export default {
  mounted() {
    this.$store.commit('auth/LOG_USER_OUT')
    this.$router.replace('/account/login')
  },
}
</script>
