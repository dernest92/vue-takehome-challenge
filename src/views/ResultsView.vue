<template>
  <v-container>
    <v-btn to="/" color="primary"
      ><v-icon left>mdi-arrow-left</v-icon>Back</v-btn
    >
    <div v-if="searchStr">
      <v-card class="mt-3" :loading="loading" :disabled="loading">
        <v-list three-line>
          <v-card-title
            >{{ loading ? "Loading" : formatNumber(count) }} results for "{{
              searchStr
            }}"</v-card-title
          >
          <SearchResult
            v-for="result in results"
            :key="result.title"
            :item="result"
          />
        </v-list>
      </v-card>
      <v-pagination
        v-if="numPages > 1"
        class="my-4"
        v-model="page"
        :length="numPages"
        :total-visible="7"
      ></v-pagination>
    </div>
  </v-container>
</template>

<script>
import SearchResult from "../components/SearchResult";
export default {
  data() {
    return {
      loading: true
    };
  },
  watch: {
    page() {
      this.loadResults();
    },
    searchStr() {
      this.loadResults();
    }
  },
  components: {
    SearchResult
  },
  methods: {
    formatNumber(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    },
    async loadResults() {
      const { page, searchStr } = this;
      this.loading = true;
      await this.$store.dispatch("fetchSearchResults", { searchStr, page });
      this.loading = false;
    }
  },
  async created() {
    this.loadResults();
  },
  computed: {
    results() {
      return this.$store.state.searchResults;
    },
    count() {
      return this.$store.state.searchCount;
    },
    numPages() {
      const perPage = this.$store.state.resultsPerPage;
      return Math.min(Math.ceil(this.count / perPage), 100); // returns a max of 100 pages;
    },
    searchStr() {
      return this.$route.query.q;
    },
    page: {
      get() {
        return parseInt(this.$route.query.p);
      },
      set(val) {
        const query = { ...this.$route.query };
        query.p = val;
        this.$router.replace({ query });
      }
    }
  }
};
</script>
