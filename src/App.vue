<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <h1>
          GitHub Scraper
        </h1>
      </div>

      <v-spacer></v-spacer>

      <v-btn
        href="https://github.com/dernest92/vue-takehome-challenge"
        target="_blank"
        text
      >
        <span class="mr-2">Source Code</span>
        <v-icon>mdi-open-in-new</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content class="grey lighten-5">
      <v-container>
        <DataTable />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import DataTable from "./components/DataTable";

export default {
  name: "App",

  components: {
    DataTable
  }
};
</script>
