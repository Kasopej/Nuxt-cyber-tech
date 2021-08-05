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
          <tbody>
            <tr v-for="(leader, index) in leaderBoard" :key="`leader-${index}`">
              <td>{{ index + 1 }}</td>
              <td>
                <v-avatar v-if="leader.profile[0].image" size="35" class="mr-4">
                  <img :src="leader.profile[0].image" alt="" />
                </v-avatar>
                <v-avatar v-else size="35" class="mr-4">
                  <v-icon color="accent">mdi-account-circle</v-icon></v-avatar
                >{{ leader.profile[0].username }}
                <v-avatar size="30">
                  <img v-if="index === 0" src="/img/gold-medal.png" alt="" />
                  <img v-if="index === 1" src="/img/silver-medal.png" alt="" />
                  <img v-if="index === 2" src="/img/bronze-medal.png" alt="" />
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
    // Make upload request to the API
    await this.$axios
      .$get(URL)
      .then((res) => {
        console.log(res.data)
        const sum = res.data.docs
        this.leaderBoard = res.data.docs
        this.totalPoints = sum.reduce(function (a, b) {
          return a + b.points
        }, 0)

        console.log(this.totalPoints)
        // this.pagination.length = res.data.totalPages
      })
      .catch((error) => {
        this.$store.dispatch('notification/failureSnackbar', error)
      })
  },
  mounted() {},
  methods: {},
}
</script>
