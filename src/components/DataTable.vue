<template>
  <div>
    <h2 class="mb-3">
      Data Table Goes Here
    </h2>
    <v-data-table
      :headers="headers"
      :items="repoData"
      :items-per-page="10"
      class="elevation-1"
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
        <v-chip :color="getColor(item.lastUpdated)">
          {{ fornmatDate(item.lastUpdated) }}
        </v-chip>
      </template>

      <template v-slot:item.hash="{ item }">
        <v-btn :href="item.commitLink" target="_blank" text rounded outlined>
          <span>{{ item.hash }}</span>
        </v-btn>
      </template>
    </v-data-table>
    <v-btn color="primary" dark class="mt-3">Add Repo</v-btn>
  </div>
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
      ],
      repoData: [],
      repoList: [
        { user: "vuejs", repo: "vue" },
        { user: "facebook", repo: "react" },
        { user: "sveltejs", repo: "svelte" },
        { user: "expressjs", repo: "express" },
        { user: "tensorflow", repo: "tensorflow" }
      ]
    };
  },
  async created() {
    const allData = await Promise.all(
      this.repoList.map(async r => {
        return this.fetchRepoData(r);
      })
    );
    this.repoData = [...this.repoData, ...allData];
    this.loading = false;
  },
  methods: {
    fornmatDate(dateStr) {
      return moment(dateStr).fromNow();
    },
    getColor(dateStr) {
      const ts = parseInt(moment(dateStr).format("x"));
      const now = parseInt(moment().format("x"));
      const diff = (now - ts) / (1000 * 60 * 60 * 24);
      const hue = 120 / (1 + Math.sqrt(diff) / 5);

      return `hsl(${hue}, 75%, 75%)`;
    },
    async fetchRepoData(searchRepo) {
      const apiUrl = "https://api.github.com";

      const repoRes = await fetch(
        `${apiUrl}/repos/${searchRepo.user}/${searchRepo.repo}`
      );
      const repo = await repoRes.json();

      const commitsRes = await fetch(
        `${apiUrl}/repos/${searchRepo.user}/${searchRepo.repo}/commits`
      );

      const commits = await commitsRes.json();

      const {
        sha,
        html_url,
        commit: {
          author: { name, email, date }
        }
      } = commits[0];

      return {
        repoUserName: searchRepo.user,
        repoName: repo.name,
        lastUpdated: date,
        authorName: name,
        hash: sha,
        authorEmail: email,
        commitLink: html_url
      };
    }
  }
};

// repository_search_url: "https://api.github.com/search/repositories?q={query}{&page,per_page,sort,order}
// user_search_url: "https://api.github.com/search/users?q={query}{&page,per_page,sort,order}
</script>
