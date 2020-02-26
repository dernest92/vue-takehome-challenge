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
      <template v-slot:item.repoFullName="{ item }">
        <a :href="`https://github.com/${item.repoFullName}`" target="_blank">
          {{ item.repoFullName }}
        </a>
      </template>

      <template v-slot:item.lastUpdated="{ item }">
        <v-chip :color="getColor(item.lastUpdated)" dark>
          {{ formatDate(item.lastUpdated) }}
        </v-chip>
      </template>

      <template v-slot:item.hash="{ item }">
        <a :href="item.commitLink" target="_blank">{{ item.hash }}</a>
      </template>

      <template v-slot:item.actions="{ item }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" small @click="removeItem(item.repoFullName)">
              delete
            </v-icon>
          </template>
          <span>Remove Repo</span>
        </v-tooltip>
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
        { text: "Repo Name", value: "repoFullName" },
        { text: "Last Updated", value: "lastUpdated" },
        { text: "Commit", value: "hash" },
        { text: "Author Name", value: "authorName" },
        { text: "Author Email", value: "authorEmail" },
        { value: "actions" }
      ]
    };
  },
  async created() {
    await this.$store.dispatch("fetchRepos");
    this.loading = false;
  },
  computed: {
    repoData() {
      return this.$store.state.repoData;
    }
  },
  methods: {
    formatDate(dateStr) {
      return moment(dateStr).fromNow();
    },
    getColor(dateStr) {
      // Timestamp of last update in ms
      const ts = parseInt(moment(dateStr).format("x"));

      // Current timestamp in ms
      const now = parseInt(moment().format("x"));

      // difference between updated and now in days
      const diff = (now - ts) / (1000 * 60 * 60 * 24);

      // Return hue of 120 (green) at diff = 0.
      // Hue approches 0 (red) as diff approaches infinity
      const hue = 120 / (1 + diff / 100);

      // Return color of chip in HSL format
      return `hsl(${hue}, 80%, 40%)`;
    },
    removeItem(itm) {
      this.$store.dispatch("removeRepo", itm);
    }
  }
};
</script>
