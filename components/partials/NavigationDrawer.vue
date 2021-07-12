<template>
  <nav class="d-flex flex-column fill-height justify-space-between">
    <section>
      <nuxt-link
        to="/"
        class="d-flex align-center grey lighten-3 px-4 py-2 mb-4"
      >
        <img src="/img/logo-app-bar.png" class="mx-auto" />
      </nuxt-link>

      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </section>

    <div class="py-4">
      <v-list-item to="/account/logout/" router exact>
        <v-list-item-action>
          <v-icon color="accent">mdi-logout</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title class="font-weight-bold accent--text"
            >Logout</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
    </div>
  </nav>
</template>

<script>
export default {
  middleware: 'auth',

  data() {
    return {
      clipped: false,
      drawer: true,
      fixed: false,
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

      USER: this.$store.state.auth.user.user,
    }
  },
}
</script>
