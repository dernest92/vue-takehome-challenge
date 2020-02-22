<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <h1>
          David Ernest
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
    <v-overlay :value="true">
      <v-card light class="p-5" width="500px">
        <v-card-title>
          Add Repo
        </v-card-title>
        <v-text-field
          v-model="searchStr"
          label="Repo Name"
          class="m-5"
        ></v-text-field>
        <v-btn @click="searchRepo">Search</v-btn>
      </v-card>
    </v-overlay>
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
  },

  data() {
    return {
      searchStr: ""
    };
  },
  methods: {
    async searchRepo() {
      console.log(this.searchStr);
      const searchRes = await fetch(
        `https://api.github.com/search/repositories?q=${"vue"}&page=${1}&per_page=5`
      );
      const searchData = await searchRes.json();
      console.log(searchData);
    }
  }
};
// repository_search_url: "https://api.github.com/search/repositories?q={query}{&page,per_page,sort,order}
</script>
