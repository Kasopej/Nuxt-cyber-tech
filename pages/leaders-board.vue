<template>
  <main>
    <nav>
      <v-breadcrumbs divider="»" :items="breadcrumbsItems" class="pa-0 py-4" />
    </nav>

    <header class="row justify-space-between py-8 px-4">
      <div class="headline accent--text font-weight-medium">Leader board</div>
      <div class="py-2">
        <span>Total points earned:</span>
        <strong>00</strong>
      </div>
    </header>

    <program-hall-of-fame />
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
    }
  },
}
</script>
