<template>
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
          <tr v-for="q in 5" :key="q">
            <td>{{ q }}</td>
            <td>
              <v-avatar
                ><v-icon color="accent">mdi-account-circle</v-icon></v-avatar
              >Olajide_{{ q }}_Hammed
            </td>
            <td>{{ q }}0 Points</td>
          </tr>
        </tbody>
      </template>
    </v-simple-table>

    <div class="text-center py-8">
      <v-pagination v-model="page" :length="6"></v-pagination>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    programId: { type: String, default: null },
  },
  data() {
    return {
      page: 1,
    }
  },
}
</script>
