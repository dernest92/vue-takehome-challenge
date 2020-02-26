<template>
  <v-app>
    <AppBar />
    <v-content class="grey lighten-5">
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
import AppBar from "./components/AppBar";

export default {
  name: "App",

  components: {
    AppBar
  }
};
</script>
