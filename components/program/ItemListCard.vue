<template>
  <!-- <v-hover v-slot="{ hover }">
    <v-card
      class="d-flex align-center mt-6 mx-1 overflow-x-hidden"
      :class="hover && hoverable ? 'secondary' : ''"
    >
    <v-card-title primary-title>
      {{program.companyId.company[0].name}}
    </v-card-title>
      <v-img
        :src="program.thumbnail || '/img/dummy.jpg'"
        :max-width="$vuetify.breakpoint.mobile ? '110px' : '150px'"
        class="rounded-0"
      />

      <section
        class="w-full d-flex flex-column justify-space-between px-1 py-0 pa-md-2"
      >
        <div class="d-sm-flex justify-space-between text-capitalize">
          <header
            class="body-1 font-weight-medium accent--text text-medium"
            v-text="program.companyId.company[0].name"
          />

          <aside class="text-no-wrap">
            <span
              :class="{
                'green-bg': program.status === 'In Progress',
                'red-bg': program.status === 'Draft',
              }"
              class="primary--texts status-chip text-caption text--darken-2 text-small font-weight-bold py-3 px-sm-4 py-sm-0"
              v-text="program.status"
            />

            <v-icon v-if="showVisibility" color="accent">{{
              program.private ? 'mdi-eye' : 'mdi-eye-off'
            }}</v-icon>
          </aside>
        </div>

        <div
          class="d-none d-sm-inline body-2 grey--text text--darken-2 text-no-wrap py-1"
        >
          <v-icon small class="primary--text mr-2">mdi-factory</v-icon>
          <span class="text-capitalize text-small" v-text="program.title" />
        </div>

        <div class="body-2 text-no-wrap grey--text text--darken-2 text-small">
          <v-icon small class="primary--text mr-2">mdi-account-outline</v-icon>
          <span v-text="program.type" />
        </div>

        <div class="body-2 text-no-wrap grey--text text--darken-2">
          <v-icon small class="primary--text mr-2">mdi-gift-outline</v-icon>
          <strong>$0</strong>
          <span>Per Vulnerability</span>
        </div>

        <div class="d-flex justify-space-between body-2">
          <div class="text-no-wrap grey--text text--darken-2">
            <v-icon small class="primary--text mr-2">mdi-flag-outline</v-icon>
            <span>Safe Habour</span>
          </div>

          <div class="text-no-wrap grey--text text-caption text--darken-2">
            Managed by
            <strong class="primary--text">Tecklabspace</strong>
          </div>
        </div>
      </section>
    </v-card>
  </v-hover> -->
  <v-card>
    <v-card-title primary-title class="d-flex">
      <v-img
        :src="program.thumbnail || '/img/dummy.jpg'"
        width="30"
        :max-width="'30px'"
      />
      <span class="ml-auto">{{ program.title }}</span>
    </v-card-title>
    <v-card-text>
      <section class="d-flex mb-2">
        <v-icon color="primary" class="mr-1">{{ visibilityIcon }}</v-icon>
        <v-icon color="primary" class="mr-1">{{
          allowCollaborationsIcon
        }}</v-icon>
        <v-icon color="primary" class="ml-auto" @click="toggleFavorite">{{
          favoriteIcon
        }}</v-icon>
      </section>
      <small class="text-accent">{{ program.status }}</small>
      <v-img
        :src="program.thumbnail || '/img/dummy.jpg'"
        :max-width="$vuetify.breakpoint.mobile ? '100%' : '100%'"
        class="rounded mt-1 cursor-pointer"
        @click="openDetails(program)"
      />
      <section @mouseenter="reveal = true">
        <h4 class="text-h6">
          {{ program.title }}
        </h4>
        <v-chip small> {{ program.type }} </v-chip>
        <v-alert class="fit-content mt-2 text-white" color="info" dense>
          {{ displayReward(program.reward) }}
        </v-alert>
        <small class="text-accent">Managed by Teklab Team</small>
      </section>
    </v-card-text>
    <v-expand-transition>
      <v-card
        v-if="reveal"
        class="transition-fast-in-fast-out v-card--reveal"
        style="height: 100%"
        @mouseleave="reveal = false"
      >
        <v-card-text class="pb-0">
          <p class="p-3">
            {{ briefDescription }}
          </p>
          <v-btn color="primary" @click="reveal = false">Close</v-btn>
        </v-card-text>
      </v-card>
    </v-expand-transition>
  </v-card>
</template>

<script>
import ProgramItemBase from './ProgramItemBase'
export default {
  extends: ProgramItemBase,
  props: {
    hoverable: { type: Boolean, default: false },
    program: { type: Object, default: () => {} },
    showVisibility: { type: Boolean, default: false },
  },
  data() {
    return {
      reveal: false,
    }
  },
  computed: {
    briefDescription() {
      return this.program.description.slice(0, 148) + '...'
    },
    visibilityIcon() {
      return this.program.private ? 'mdi-eye-off' : 'mdi-eye'
    },
    allowCollaborationsIcon() {
      return this.program.allowCollaborations
        ? 'mdi-account-group'
        : 'mdi-account'
    },
  },

  methods: {
    iconSize() {
      return this.$vuetify.breakpoint.mobile ? 12 : 16
    },
    openDetails(program) {
      this.$store.commit('program/SAVE_DATA', program)
      // this.$router.push(`/program/00${program._id}/`)
      const NAMED_URL = program._id

      this.$router.push({
        // path: `/program/${program._id}`,
        path: `/program/${NAMED_URL}`,
        params: {
          id: program,
        },
      })
    },
    displayReward(rawReward) {
      if (isNaN(+rawReward)) return rawReward
      return `$${rawReward} per vulnerability`
    },
  },
}
</script>

<style scoped lang="scss">
.red-bg {
  background-color: red;
  color: white;
  border-radius: 80px;
}
.green-bg {
  background-color: #7dca7d;
  color: black;
  border-radius: 80px;
  border: 4px solid #66e766;
}
.status-chip {
  padding: 0px 10px !important;
}

@media screen and (max-width: 425px) {
  .text-medium {
    font-size: 10px !important;
  }

  .text-small {
    font-size: 10px !important;
  }
}
</style>
