<template>
  <main class="text-center py-8">
    <v-skeleton-loader
      v-if="$fetchState.pending"
      class="mx-auto"
      :max-width="mobileView ? '95%' : '80%'"
      type="list-item-two-line, image"
      elevation="3"
    ></v-skeleton-loader>
    <v-card
      v-else
      class="mx-auto"
      :max-width="mobileView ? '95%' : '80%'"
      outlined
    >
      <!-- {{ USER }} -->
      <v-list-item>
        <v-row>
          <v-col cols="12" sm="4" class="py-0 py-sm-4">
            <v-list-item-avatar
              tile
              :size="mobileView ? '150px' : '200px'"
              color="grey"
              class="avatar mx-auto rounded"
            >
              <v-img :src="USER.image || '/img/dummy.jpg'"></v-img>
            </v-list-item-avatar>
          </v-col>
          <!-- </v-row>

        <v-row> -->
          <v-col cols="12" sm="8" class="py-0">
            <v-list-item-content class="right">
              <v-list-item-title
                class="mt-sm-3 text-h5 text-sm-h5 text-md-h4 font-weight-medium"
              >
                @{{ USER.user.profile[0].username }}
              </v-list-item-title>

              <v-list-item-subtitle class="text-caption text-sm-h6 text-md-h5">
                {{ USER.user.profile[0].email }}
              </v-list-item-subtitle>

              <!-- <v-list-item> -->
              <v-list-item-content class="work mt-sm-2 pa-1">
                <v-list-item-title
                  class="text-body-2 text-sm-h6 text-md-h5 font-weight-medium"
                >
                  Job Title
                </v-list-item-title>
                <v-list-item-subtitle
                  class="text-caption text-sm-body-1 font-weight-regular"
                >
                  Teklabspace
                  <!-- Place of work -->
                </v-list-item-subtitle>
              </v-list-item-content>

              <v-row
                align="center"
                justify="center"
                class="mt-4 text-caption text-sm-body-1"
              >
                <!-- <v-icon class="mr-1"> mdi-account-cowboy-hat </v-icon>
                <span class="subheading mr-2">45</span> -->

                <span class="mr-1">??</span>
                <v-icon class="mr-1"> mdi-bug-check </v-icon>
                <span class="subheading mr-2">{{
                  totalAcceptedSubmissions
                }}</span>

                <span class="mr-1">??</span>
                <v-icon class="mr-1"> mdi-star </v-icon>
                <span class="subheading mr-2">{{ USER.user.points }}</span>

                <span class="mr-1">??</span>
                <v-icon class="mr-1"> mdi-heart </v-icon>
                <span class="subheading mr-2">{{ totalFavoritePrograms }}</span>

                <!-- <span class="mr-1">??</span>
                <v-icon class="mr-1"> mdi-share-variant </v-icon>
                <span class="subheading">34</span> -->
              </v-row>
            </v-list-item-content>
          </v-col>
        </v-row>
      </v-list-item>

      <v-divider></v-divider>

      <!-- <v-card-actions>
        <v-btn color="accent" text>Education / Work History</v-btn>

        <v-spacer></v-spacer>

        <v-btn icon @click="show = !show">
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-card-actions> -->

      <!-- <v-expand-transition>
        <div v-show="show" class="px-2">
          <v-divider></v-divider>

          <v-timeline
            align-top
            :dense="$vuetify.breakpoint.smAndDown"
            class="px-md-2"
          >
            <v-timeline-item
              v-for="(item, i) in items"
              :key="i"
              :color="item.color"
              :icon="item.icon"
              fill-dot
              :small="$vuetify.breakpoint.xsOnly"
              class="pb-2 pb-sm-4"
            >
              <v-card :color="item.color" dark>
                <v-card-title class="px-2 py-1 text-caption text-sm-h6">
                  Event (Year)
                </v-card-title>
                <v-card-text class="pa-2 px-sm-3 white text--primary">
                  <p class="mb-0 text-caption text-sm-body-2 text-left">
                    Notable Acomplishment
                  </p>
                </v-card-text>
              </v-card>
            </v-timeline-item>
          </v-timeline>
        </div>
      </v-expand-transition> -->
    </v-card>
  </main>
</template>

<script>
export default {
  data() {
    return {
      USER: this.$store.state.auth.user,
      show: false,
      items: [
        {
          color: 'red lighten-2',
          icon: 'mdi-star',
        },
        {
          color: 'purple darken-1',
          icon: 'mdi-book-variant',
        },
        {
          color: 'green lighten-1',
          icon: 'mdi-airballoon',
        },
        {
          color: 'indigo',
          icon: 'mdi-buffer',
        },
      ],
      totalAcceptedSubmissions: 0,
      totalFavoritePrograms: 0,
    }
  },
  async fetch() {
    await Promise.all([
      this.getNumberOfAcceptedSubmissions(),
      this.getNumberOfFavoritePrograms(),
    ])
  },
  methods: {
    async getNumberOfAcceptedSubmissions() {
      const URL = `get-all-submissions/accepted?page=1&limit=1000`
      await this.$axios.$get(URL).then(({ data: { docs = [] } }) => {
        this.totalAcceptedSubmissions = docs.length
      })
    },
    async getNumberOfFavoritePrograms() {
      const URL = `getFavourite?page=1&limit=1000`
      await this.$axios.$get(URL).then((res) => {
        this.totalFavoritePrograms = res.totalDOcs
      })
    },
  },
}
</script>

<style scoped>
.work {
  margin-bottom: -10px;
}

i.v-icon {
  font-size: 20px;
}

i.v-icon:hover {
  color: #c504da;
}

@media screen and (max-width: 425px) {
  .v-avatar {
    margin-top: 20px;
  }

  .right {
    padding-top: 0;
    margin-bottom: 20px;
  }

  i.v-icon {
    font-size: 14px;
  }
}
</style>
