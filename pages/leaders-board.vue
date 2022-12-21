<template>
  <main>
    <header class="row justify-space-between py-8 px-4">
      <div class="headline accent--text font-weight-medium">Leaderboard</div>
      <div class="py-2">
        <span>Total points earned:</span>
        <strong>{{ USER.user.points }}</strong>
      </div>
    </header>

    <v-overlay :value="overlay">
      <v-row>
        <v-col cols="12" class="d-flex">
          <PartialsFilterMenuBar
            ref="filterComponent"
            v-model="filterOptions"
            show-back-btn
            @toggle-overlay="overlay = !overlay"
          >
            <template #filterInput="{ filterEntry }">
              <p class="fit-content text-sm mb-0 text-black">
                {{ filterEntry[0].slice(0, -5) }}
              </p>
              <v-menu
                v-for="(itemEntry, itemEntryIndex) in Object.entries(
                  filterEntry[1]
                )"
                :key="itemEntryIndex"
                ref="menu"
                :close-on-content-click="true"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    class="w-fit"
                    :value="filterEntry[1][itemEntry[0]]"
                    light
                    :label="`Filter by ${itemEntry[0]} date`"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="filterEntry[1][itemEntry[0]]"
                  no-title
                  width="250"
                  color="primary"
                  class="my-1"
                  @change="
                    (evt) =>
                      $refs.filterComponent.update(
                        filterEntry[0],
                        itemEntry[0],
                        evt
                      )
                  "
                >
                </v-date-picker>
              </v-menu>
            </template>
          </PartialsFilterMenuBar>
        </v-col>
      </v-row>
    </v-overlay>
    <v-skeleton-loader
      v-if="$fetchState.pending"
      type="table"
    ></v-skeleton-loader>
    <template v-else>
      <v-icon color="accent" @click="overlay = !overlay">mdi-filter</v-icon>
      <section class="elevation-2 mt-1">
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
                      <v-icon color="accent"
                        >mdi-account-circle</v-icon
                      ></v-avatar
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
    </template>
  </main>
</template>

<script>
import { mapState } from 'vuex'
import countries from '~/assets/json/countries.json'
const countryFilterArray = countries.map((country) => [country, false])
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
      overlay: false,
      menu: false,
      leaderBoard: [],
      totalPoints: 0,
      filterOptions: {
        date_slot: {
          start: null,
          end: null,
        },
        country: Object.fromEntries(countryFilterArray),
      },
      filtersSet: false,
    }
  },
  computed: {
    ...mapState('auth', { USER: 'user' }),
  },
  watch: {
    filterOptions(val) {
      this.filtersSet = true
      console.log({ val })
      this.$fetch()
    },
  },
  methods: {
    filterURLEncoded() {
      if (!this.filtersSet) return ''
      let filterURL = ''
      if (Object.values(this.filterOptions.country).includes(true)) {
        filterURL += '?country='
        Object.keys(this.filterOptions.country).forEach((countryName) => {
          if (this.filterOptions.country[countryName] === true)
            filterURL += `${countryName},`
        })
      }
      if (
        Object.values(this.filterOptions.date_slot).find(
          (dateValue) => dateValue
        )
      ) {
        filterURL += filterURL ? '&' : '?'
        filterURL += this.filterOptions.date_slot.start
          ? `start=${this.filterOptions.date_slot.start}`
          : ''

        filterURL += filterURL ? '&' : '?'
        filterURL += this.filterOptions.date_slot.end
          ? `end=${this.filterOptions.date_slot.end}`
          : ''
      }
      return filterURL
    },
  },
  async fetch() {
    const URL = `/get-leaders-board` + this.filterURLEncoded()
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
