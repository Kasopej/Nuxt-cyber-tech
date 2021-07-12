<template>
  <v-app>
    <div
      style="min-height: 100vh"
      class="d-flex flex-column flex-md-row justify-center align-center w-100 pa-4"
    >
      <section class="d-md-flex elevation-10 col-md-8 col-lg-6 pa-0 h-100">
        <aside
          class="d-flex justify-center align-center primary col-md-5"
          style="
            background: linear-gradient(to right, #c504da, #6921b6);
            background-image: url(/img/signup-background.png);
            background-size: cover;
            background-position: center;
          "
        >
          <img src="/img/main.c9500872.svg" />
        </aside>

        <main class="col-md-7 d-flex align-center">
          <nuxt />
        </main>
      </section>
    </div>

    <partials-notification-toast />
  </v-app>
</template>
