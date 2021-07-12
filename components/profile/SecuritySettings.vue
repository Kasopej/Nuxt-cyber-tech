<template>
  <section class="px-3">
    <section class="pb-4">
      <header class="subtitle-1 font-weight-medium pb-2">
        1. Install a two-factor authentication app
      </header>
      <div class="grey--text text--darken-2">
        We recommend using Google Authentication for iPhone or Android.
      </div>
    </section>

    <section class="py-4">
      <header class="subtitle-1 font-weight-medium pb-2">
        2. Configure the app
      </header>
      <div class="grey--text text--darken-2">
        Add your Teklabspace acount to your two-factor authentication app by
        doing one of the following:
      </div>
      <div class="py-2">
        <img src="/img/qr-code.svg" alt="QR Code" />
      </div>
    </section>

    <section class="py-4">
      <header class="subtitle-1 font-weight-medium pb-2">
        3. Enter the 6-digit code that the app gene
      </header>
      <div class="grey--text text--darken-2">
        <v-text-field outlined label="6-digit OTP code" />
      </div>
    </section>

    <section class="py-4">
      <header class="subtitle-1 font-weight-medium pb-2">
        4. Enter the 6-digit code that the app generates
      </header>
      <div class="grey--text text--darken-2">
        You will need backup codes to login in to your account if you lose
        access to your two-factor device and can't receive the authentication
        codes. Please keep your backup codes in a safe and accessible place.
      </div>
    </section>

    <section class="py-4">
      <v-btn large color="primary">Enable Two-Factor Authentication</v-btn>
    </section>
  </section>
</template>
