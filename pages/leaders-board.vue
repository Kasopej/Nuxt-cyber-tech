<template>
  <main>
    <nav>
      <v-breadcrumbs divider="»" :items="breadcrumbsItems" class="pa-0 py-4" />
    </nav>

    <header class="row justify-space-between py-8 px-4">
      <div class="headline accent--text font-weight-medium">Leader board</div>
      <div class="py-2">
        <span>Total points earned:</span>
        <strong>{{ USER.user.points }}</strong>
      </div>
    </header>

    <section class="elevation-2">
      <!-- <div>You have no group yet</div> -->
      <v-simple-table>
        <template #default>
          <thead class="font-weight-medium secondary accent--text">
            <td class="pa-4">Rank</td>
            <td class="pa-4">Badge</td>
            <td class="px-6 py-4">Researcher</td>
            <td class="px-6 py-4">Country</td>
            <td class="pa-4">Points</td>
          </thead>
          <tbody>
            <template v-if="leaderBoard.length">
              <tr
                v-for="(leader, index) in leaderBoard"
                :key="`leader-${index}`"
              >
                <td>{{ index + 1 }}</td>
                <!-- <span>{{ leader }}</span> -->
                <td>
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
                    <div v-if="![0, 1, 2].includes(index)">--</div>
                  </v-avatar>
                </td>
                <td>
                  <v-avatar v-if="leader.image" size="35" class="mr-4">
                    <img :src="leader.image" :alt="leader.username" />
                  </v-avatar>
                  <v-avatar v-else size="35" class="mr-4">
                    <v-icon color="accent">mdi-account-circle</v-icon></v-avatar
                  >{{ leader.username }}
                </td>
                <td></td>
                <td>{{ leader.points }}</td>
              </tr>
            </template>
            <tr v-else class="text-center">
              <td class="text-center" colspan="5">No data</td>
            </tr>
          </tbody>
        </template>
      </v-simple-table>
    </section>
  </main>
</template>

<script>
import { mapState } from 'vuex'
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
  computed: {
    ...mapState('auth', { USER: 'user' }),
  },
  async fetch() {
    const URL = `/get-leaders-board`
    try {
      const response = await this.$axios.$get(URL)
      const sum = response.data
      this.leaderBoard = sum
    } catch (e) {
      this.$store.dispatch('notification/failureSnackbar', e)
    }
  },
}
</script>
