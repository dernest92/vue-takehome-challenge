<template>
  <v-container>
    <v-data-table
      :headers="headers"
      :items="repoData"
      :items-per-page="10"
      class="elevation-1 mt-6"
      :loading="loading"
      loading-text="Loading... "
    >
      <template v-slot:item.repoName="{ item }">
        <v-btn
          :href="`https://github.com/${item.repoUserName}/${item.repoName}`"
          rounded
          target="_blank"
          outlined
          text
        >
          <span>{{ item.repoName }}</span>
        </v-btn>
      </template>

      <template v-slot:item.lastUpdated="{ item }">
        <v-chip :color="getColor(item.lastUpdated)" dark>
          {{ fornmatDate(item.lastUpdated) }}
        </v-chip>
      </template>

      <template v-slot:item.hash="{ item }">
        <a :href="item.commitLink" target="_blank">{{ item.hash }}</a>
      </template>
    </v-data-table>
  </v-container>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      loading: true,
      headers: [
        { text: "Repo Name", value: "repoName" },
        { text: "Last Updated", value: "lastUpdated" },
        { text: "Commit", value: "hash" },
        { text: "Author Name", value: "authorName" },
        { text: "Author Email", value: "authorEmail" }
      ]
    };
  },
  async created() {
    await this.$store.dispatch("fetchDefaultRepos");
    this.loading = false;
  },
  computed: {
    repoData() {
      return this.$store.state.repoData;
    }
  },
  methods: {
    fornmatDate(dateStr) {
      return moment(dateStr).fromNow();
    },
    getColor(dateStr) {
      const ts = parseInt(moment(dateStr).format("x"));
      const now = parseInt(moment().format("x"));
      const diff = (now - ts) / (1000 * 60 * 60 * 24);
      const hue = 120 / (1 + diff / 100);

      return `hsl(${hue}, 80%, 40%)`;
    }
  }
};

// repository_search_url: "https://api.github.com/search/repositories?q={query}{&page,per_page,sort,order}
// user_search_url: "https://api.github.com/search/users?q={query}{&page,per_page,sort,order}
</script>
