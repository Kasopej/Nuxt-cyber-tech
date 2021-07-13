<template>
  <section>
    <div class="text-center font-weight-bold pl-6 pb-4">
      An Email confirmation has been sent to your E-mail. <br />
      Kindly check your inbox
    </div>
  </section>
</template>

<script>
export default {
  name: 'ConfirmEmail',
  layout: 'account',
  middleware: 'guest',
}
</script>

<style scoped></style>
