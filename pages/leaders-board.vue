<template>
  <main>
    <nav>
      <v-breadcrumbs divider="»" :items="breadcrumbsItems" class="pa-0 py-4" />
    </nav>

    <header class="row justify-space-between py-8 px-4">
      <div class="headline accent--text font-weight-medium">Leader board</div>
      <div class="py-2">
        <span>Total points earned:</span>
        <strong>{{ totalPoints }}</strong>
      </div>
    </header>

    <section class="elevation-2">
      <!-- <div>You have no group yet</div> -->
      <v-simple-table>
        <template #default>
          <thead class="font-weight-medium secondary accent--text">
            <td class="pa-4">Rank</td>
            <td class="px-6 py-4">Researcher</td>
            <td class="pa-4">Points</td>
          </thead>
          <tbody v-if="leaderBoard">
            <tr v-for="(leader, index) in leaderBoard" :key="`leader-${index}`">
              <td>{{ index + 1 }}</td>
              <!-- <span>{{ leader }}</span> -->
              <td>
                <v-avatar v-if="leader.image" size="35" class="mr-4">
                  <img :src="leader.image" :alt="leader.username" />
                </v-avatar>
                <v-avatar v-else size="35" class="mr-4">
                  <v-icon color="accent">mdi-account-circle</v-icon></v-avatar
                >{{ leader.username }}
                <v-avatar size="30">
                  <img
                    v-if="index === 0"
                    src="/img/gold-medal.png"
                    alt="Top Leader"
                  />
                  <img
                    v-if="index === 1"
                    src="/img/silver-medal.png"
                    alt="First Runner-up"
                  />
                  <img
                    v-if="index === 2"
                    src="/img/bronze-medal.png"
                    alt="Second Runner-up"
                  />
                </v-avatar>
              </td>
              <td>{{ leader.points }}</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </section>
  </main>
</template>

<script>
export default {
  data() {
    return {
      breadcrumbsItems: [
        {
          text: 'Dashboard',
          disabled: false,
          to: '/',
        },
        { disabled: true, text: 'Leader board' },
      ],
      leaderBoard: [],
      totalPoints: 0,
    }
  },
  async fetch() {
    const URL = `/get-leaders-board`
    try {
      const response = await this.$axios.$get(URL)
      const sum = response.data
      this.leaderBoard = sum
      this.totalPoints = sum.reduce(function (a, b) {
        return a + b.points
      }, 0)
    } catch (e) {
      this.$store.dispatch('notification/failureSnackbar', e)
    }
  },
  mounted() {},
  methods: {},
}
</script>
