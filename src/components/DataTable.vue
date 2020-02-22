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
      <!-- <template v-slot:item.link="{ item }">
        <a href="#">{{ item.repoName }}</a>
      </template> -->
    </v-data-table>
    <v-btn color="primary" dark class="mt-3">Add Repo</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true,
      headers: [
        {
          text: "Repo Name",
          align: "left",
          value: "repoName"
        },
        // { value: "link", align: "left", sortable: false },
        { text: "Last Updated", value: "lastUpdated" },
        { text: "Hash", value: "hash" },
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
        // html_url,
        commit: {
          author: { name, email, date }
        }
      } = commits[0];

      return {
        repoName: repo.name,
        lastUpdated: date,
        authorName: name,
        hash: sha,
        authorEmail: email
      };
    }
  }
};

// repository_url: "https://api.github.com/repos/{owner}/{repo}
// repository_search_url: "https://api.github.com/search/repositories?q={query}{&page,per_page,sort,order}
// commit_search_url: "https://api.github.com/search/commits?q={query}{&page,per_page,sort,order}
// emails_url: "https://api.github.com/user/emails
// user_search_url: "https://api.github.com/search/users?q={query}{&page,per_page,sort,order}
</script>
