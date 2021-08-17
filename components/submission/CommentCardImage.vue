<template>
  <v-avatar color="secondary" size="40" class="avatar mt-1 mr-2">
    <v-img v-if="image" contain :src="image" :alt="name" />
    <v-icon v-else color="primary" :size="userType === 'company' ? 28 : 38">
      {{ userType === 'company' ? 'mdi-factory' : 'mdi-account-circle' }}
    </v-icon>
  </v-avatar>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },

    userType: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },
  },
}
</script>

<style></style>
