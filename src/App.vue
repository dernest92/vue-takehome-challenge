<template>
  <v-app>
    <!-- <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <h1>
          David Ernest
        </h1>
      </div>

      <v-spacer>
        <v-text-field label="Repo Name"></v-text-field>
      </v-spacer>

      <v-btn
        href="https://github.com/dernest92/vue-takehome-challenge"
        target="_blank"
        text
      >
        <span class="mr-2">Source Code</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar> -->
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
  },
  async created() {
    const url = process.env.VUE_APP_API_URL;
    console.log(url);
  }
};
// repository_search_url: "https://api.github.com/search/repositories?q={query}{&page,per_page,sort,order}
</script>
