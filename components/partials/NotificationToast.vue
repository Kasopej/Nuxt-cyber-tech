<template>
  <v-snackbar
    :timeout="-1"
    :value="$store.state.notification.status"
    :color="$store.state.notification.color"
  >
    <v-icon class="mr-3">{{ $store.state.notification.icon }}</v-icon>
    {{ $store.state.notification.text }}
  </v-snackbar>
</template>
