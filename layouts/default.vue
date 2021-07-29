<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      app
      :color="$vuetify.theme.dark ? 'secondary' : 'grey lighten-4'"
    >
      <partials-navigation-drawer />
    </v-navigation-drawer>

    <v-app-bar
      clipped
      fixed
      app
      :color="$vuetify.theme.dark ? 'secondary' : 'white'"
    >
      <v-app-bar-nav-icon color="primary" @click.stop="drawer = !drawer" />
      <v-toolbar-title
        color="primary"
        v-text="`Welcome, ${USER.profile[0].username}`"
      />
      <v-spacer />

      <v-btn icon @click="toggleNotification">
        <v-icon color="accent">mdi-bell</v-icon>
      </v-btn>

      <v-menu open-on-hover bottom offset-y min-width="250">
        <template #activator="{ on, attrs }">
          <v-btn icon class="mx-4" v-bind="attrs" v-on="on">
            <v-avatar color="secondary">
              <!-- <v-img
                  v-if="USER.image"
                  cover
                  :src="USER.image"
                  alt="Profile"
                /> -->
              <v-icon color="primary" size="50">mdi-account-circle</v-icon>
            </v-avatar>
          </v-btn>
        </template>

        <v-list>
          <v-list-item to="/account/settings/">
            <v-list-item-title>
              <div class="subtitle-1 text-capitalize font-weight-bold">
                {{ USER.profile[0].username }}
              </div>
              <div class="grey--text my-2">{{ USER.profile[0].email }}</div>
            </v-list-item-title>
          </v-list-item>

          <v-divider />
          <v-list-item @click="toggleDarkMode()">
            <v-list-item-title>
              <v-icon class="mr-3">{{
                $vuetify.theme.dark ? 'mdi-weather-sunny' : 'mdi-weather-night'
              }}</v-icon>
              <span>{{
                $vuetify.theme.dark ? 'Light Mode' : 'Dark mode'
              }}</span>
            </v-list-item-title>
          </v-list-item>

          <v-divider></v-divider>
          <v-list-item to="/account/settings/availability/">
            <v-list-item-title>
              <v-icon class="mr-3">mdi-calendar-account</v-icon>
              <span>Availability</span>
            </v-list-item-title>
          </v-list-item>

          <v-divider></v-divider>
          <v-list-item to="#">
            <v-list-item-title>
              <v-icon class="mr-3">mdi-account-plus</v-icon>
              <span>Invite Friends</span>
            </v-list-item-title>
          </v-list-item>

          <v-divider></v-divider>
          <v-list-item to="/account/logout/" router exact>
            <v-list-item-title>
              <v-icon class="mr-3">mdi-logout</v-icon>
              <span>Sign out</span>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>

    <v-main>
      <v-container>
        <nuxt />

        <footer class="text-center grey--text py-8">
          <span
            >Copyright &copy; Teklabspace, {{ new Date().getFullYear() }}</span
          >
        </footer>
      </v-container>
    </v-main>

    <partials-notification-toast />
  </v-app>
</template>

<script>
export default {
  middleware: 'auth',

  data() {
    return {
      drawer: true,
      USER: this.$store.state.auth.user.user,
    }
  },

  created() {
    this.$vuetify.theme.dark = this.$store.state.settings.darkMode
  },

  methods: {
    toggleDarkMode() {
      this.$store.commit('settings/TOGGLE_DARK_MODE')
      this.$vuetify.theme.dark = this.$store.state.settings.darkMode
    },

    toggleNotification() {
      this.$store.commit('notification/UPDATE_NOTIFICATION_STATE')
    },
  },
}
</script>
