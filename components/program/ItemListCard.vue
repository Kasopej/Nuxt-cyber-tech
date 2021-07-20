<template>
  <v-hover v-slot="{ hover }">
    <v-card
      class="d-flex align-center mt-6 overflow-x-hidden"
      :class="hover && hoverable ? 'secondary' : ''"
    >
      <v-img
        :src="program.thumbnail || '/img/dummy.jpg'"
        width="250"
        height="200"
        :max-width="$vuetify.breakpoint.mobile ? '100px' : '250px'"
        cover
      />

      <section
        style="min-height: 200px"
        class="flex-grow-1 fill-height w-full d-flex flex-column justify-space-between pa-2 pa-md-4"
      >
        <div class="d-sm-flex justify-space-between text-capitalize">
          <header
            class="headline font-weight-medium accent--text"
            v-text="program.companyId.company[0].name"
          />

          <aside class="text-no-wrap">
            <span
              :class="{
                'purple-bg': program.status === 'In Progress',
                'red-bg': program.status === 'Draft',
              }"
              class="primary--texts text-caption text--darken-2 font-weight-bold py-2 px-sm-4 py-sm-0"
              v-text="program.status"
            />

            <v-icon v-if="showVisibility" color="accent">{{
              program.private ? 'mdi-eye' : 'mdi-eye-off'
            }}</v-icon>
          </aside>
        </div>

        <div
          class="d-none d-sm-inline grey--text text--darken-2 text-no-wrap py-"
        >
          <v-icon small class="primary--text mr-2">mdi-factory</v-icon>
          <span class="text-capitalize" v-text="program.title" />
        </div>
        <div class="pb-1 text-no-wrap grey--text text--darken-2">
          <v-icon small class="primary--text mr-2">mdi-account-outline</v-icon>
          <span v-text="program.type" />
        </div>
        <div class="pb-1 text-no-wrap grey--text text--darken-2">
          <v-icon small class="primary--text mr-2">mdi-gift-outline</v-icon>
          <strong>$0</strong>
          <span>Per Vulnerability</span>
        </div>
        <div class="d-flex justify-space-between">
          <div class="pb-1 text-no-wrap grey--text text--darken-2">
            <v-icon small class="primary--text mr-2">mdi-flag-outline</v-icon>
            <span>Safe Habour</span>
          </div>
          <div class="pb-1 text-no-wrap grey--text text-caption text--darken-2">
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
}
</script>
<style scoped lang="scss">
.red-bg {
  background-color: red;
  color: white;
  border-radius: 80px;
}
.purple-bg {
  background-color: purple;
  color: white;
  border-radius: 80px;
}
</style>
