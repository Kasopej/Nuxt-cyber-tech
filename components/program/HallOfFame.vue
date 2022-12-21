<template>
  <section class="elevation-2">
    <v-skeleton-loader
      v-if="$fetchState.pending"
      type="table"
    ></v-skeleton-loader>

    <v-simple-table v-else>
      <template #default>
        <thead class="font-weight-medium secondary accent--text">
          <td class="pa-4">Rank</td>
          <td class="px-6 py-4">Researcher</td>
          <td class="pa-4">Points</td>
        </thead>
        <tbody>
          <template v-if="hallOfFame.length"
            ><tr v-for="(leader, index) in hallOfFame" :key="leader">
              <td>{{ index + 1 }}</td>
              <td>
                <v-avatar v-if="leader.image" size="35" class="mr-4">
                  <img :src="leader.image" :alt="leader.username" />
                </v-avatar>
                <v-avatar v-else size="35" class="mr-4">
                  <v-icon color="accent">mdi-account-circle</v-icon></v-avatar
                >{{ leader.username }}
              </td>
              <td>{{ leader.points }}</td>
            </tr></template
          >
          <tr v-else class="text-center">
            <td class="text-center" colspan="3">No data</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <div class="text-center py-8">
      <partials-pagination
        v-model="pagination.page"
        :length="pagination.length"
        :page-limit="pageLimit"
        @input="$fetch"
      ></partials-pagination>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    programId: { type: String, default: null },
  },
  data() {
    return {
      pagination: { page: 1, length: 1 },
      hallOfFame: [],
    }
  },
  async fetch() {
    // No API endpoint for getting leaderboard for a SPECIFIC program yet
    await this.fakeAPI(() => (this.hallOfFame = []))
  },
  computed: {
    ...mapState('program', ['pageLimit']),
  },
}
</script>
