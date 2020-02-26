<template>
  <v-container>
    <v-btn to="/" color="primary"
      ><v-icon left>mdi-arrow-left</v-icon>Back</v-btn
    >
    <div v-if="searchString">
      <v-card class="mt-3" :loading="loading" :disabled="loading">
        <v-list three-line>
          <v-card-title
            >{{ loading ? "Loading" : formatNumber(count) }} results for "{{
              searchString
            }}"</v-card-title
          >
          <SearchResult v-for="item in items" :key="item.title" :item="item" />
        </v-list>
      </v-card>
      <v-pagination
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
      page: 1
    };
  },
  watch: {
    page(val) {
      this.$store.dispatch("fetchSearchResults", { page: val });
    }
  },
  components: {
    SearchResult
  },
  methods: {
    formatNumber(x) {
      return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
  },
  computed: {
    items() {
      return this.$store.state.searchResults;
    },
    searchString() {
      return this.$store.state.queryString;
    },
    count() {
      return this.$store.state.searchCount;
    },
    numPages() {
      return Math.min(Math.ceil(this.count / 10), 100); // returns a max of 100 pages;
    },
    loading() {
      return this.$store.state.loadingResults;
    }
  }
};
</script>
