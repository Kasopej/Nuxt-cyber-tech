<template>
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
          <p class="p-3 longform-content font-medium">
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
      return (
        this.program.description.slice(0, 400) +
        `${this.program.description.length > 400 ? '...' : ''}`
      )
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
