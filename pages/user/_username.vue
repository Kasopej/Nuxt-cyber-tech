<template>
  <main class="text-center py-8">
    <section class="pb-8">
      <v-avatar size="250">
        <v-img
          :src="FILE_BLOB || USER.image || '/img/dummy.jpg'"
          class="rounded"
          cover
        />
      </v-avatar>
      <div class="d-block grey--text text-center text-caption pt-3">
        @{{ USER.user.profile[0].username }}
      </div>
    </section>
    <div class="headline py-2">
      {{ USER.user.profile[0].firstname }}
      {{ USER.user.profile[0].lastname }}
    </div>
    <div class="py-2">{{ USER.user.profile[0].email }}</div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      USER: this.$store.state.auth.user,
    }
  },
}
</script>
