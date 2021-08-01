<template>
  <v-hover v-slot="{ hover }">
    <v-card
      v-if="program.companyId._id"
      class="card-item d-flex align-center mt-6 overflow-x-hidden"
      :class="hover && hoverable ? 'secondary' : ''"
    >
      <v-img
        :src="program.thumbnail || '/img/dummy.jpg'"
        :max-width="$vuetify.breakpoint.mobile ? '110px' : '150px'"
        class="rounded-0"
        cover
      />

      <section
        class="flex-grow-1 w-full d-flex flex-column justify-space-between px-1 py-0 pa-md-2"
      >
        <div class="d-sm-flex justify-space-between text-capitalize">
          <header
            v-if="program"
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
  </v-hover>
</template>

<script>
export default {
  props: {
    hoverable: { type: Boolean, default: false },
    program: { type: Object, default: () => {} },
    showVisibility: { type: Boolean, default: false },
  },

  methods: {
    iconSize() {
      return this.$vuetify.breakpoint.mobile ? 12 : 16
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

.card-item:nth-child(odd) {
  margin-right: 10px;
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
