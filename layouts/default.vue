<template>
  <v-app>
    <v-navigation-drawer
      v-model="drawer"
      fixed
      :color="$vuetify.theme.dark ? 'secondary' : 'grey lighten-4'"
    >
      <partials-navigation-drawer />
    </v-navigation-drawer>

    <v-card class="xbar-wrapper elevation-2">
      <v-container class="d-flex justify-space-between align-center px-md-15">
        <div class="d-flex align-center justify-space-between flex-grow-x">
          <a class="d-inline d-sm-none mr-2">
            <v-app-bar-nav-icon
              color="primary"
              @click.stop="drawer = !drawer"
            />
          </a>
          <a href="#" class="xbar-link-logo">
            <img src="/img/logo-app-bar.png" class="" alt="" />
          </a>
          <nav class="d-none d-sm-flex align-center flex-row align-self-auto">
            <nuxt-link to="/" class="xbar-link px-2">Dashboard</nuxt-link>
            <nuxt-link to="/program/" class="xbar-link px-2">Program</nuxt-link>
            <nuxt-link to="/submission/" class="xbar-link px-2"
              >Submissions</nuxt-link
            >
            <nuxt-link to="/leaders-board/" class="xbar-link px-2"
              >Leadersboard</nuxt-link
            >
          </nav>
        </div>

        <div class="d-flex align-center align-self-auto">
          <v-btn icon class="mr-3 pa-5">
            <v-icon color="accent">mdi-bell</v-icon>
          </v-btn>

          <v-menu open-on-hover bottom offset-y min-width="250">
            <template #activator="{ on, attrs }">
              <v-btn icon class="mx-4" v-bind="attrs" v-on="on">
                <v-avatar color="secondary">
                  <v-img
                    v-if="USER"
                    :src="USER.profile[0].image || '/img/dummy.jpg'"
                    alt="Profile"
                  />
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
                    $vuetify.theme.dark
                      ? 'mdi-weather-sunny'
                      : 'mdi-weather-night'
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
        </div>
      </v-container>
    </v-card>

    <v-container class="v-top px-md-15">
      <Nuxt />
    </v-container>
  </v-app>
</template>

<script>
export default {
  middleware: 'auth',

  data() {
    return {
      drawer: false,
      USER: this.$store.state.auth.user.user,
      items: [
        {
          icon: 'mdi-home',
          title: 'Dashboard',
          to: '/',
        },
        {
          icon: 'mdi-bookshelf',
          title: 'Programs',
          to: '/program/',
        },
        {
          icon: 'mdi-format-list-checkbox',
          title: 'Submissions',
          to: '/submission/',
        },
        {
          icon: 'mdi-billboard',
          title: 'Leaders Board',
          to: '/leaders-board/',
        },
      ],
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

<style scoped>
.xbar-wrapper {
  width: 100%;
  min-height: 56px;
  top: 0;
  left: 0;
  right: 0;
  position: fixed;
  z-index: 4;
  border-radius: 0 !important;
}

.xbar-wrapper .xbar-link {
  text-decoration: none;
  white-space: nowrap;
  font-size: 14px;
  line-height: 1.5;
  padding-top: 12px;
  padding-bottom: 12px;
}

.xbar-wrapper .xbar-link:hover {
  background-color: rgba(216, 216, 216, 0.274);
  border-radius: 0.3rem;
}

.xbar-wrapper .xbar-link-logo img {
  max-width: 95px;
  position: relative;
  height: inherit;
  margin-right: 10px;
}

.v-top {
  padding-top: 80px !important;
}

.flex-grow-x {
  flex-grow: 0.095;
}
</style>
