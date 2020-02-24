<template>
  <v-container>
    <v-card class="mt-3" :loading="loading">
      <v-list three-line>
        <v-card-title
          >{{ count }} results for "{{ searchString }}"</v-card-title
        >
        <SearchResult v-for="item in items" :key="item.title" :item="item" />
      </v-list>
    </v-card>
    <v-pagination
      class="mt-3"
      v-model="page"
      :length="numPages"
      :total-visible="7"
    ></v-pagination>
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
      return Math.ceil(this.count / 25);
    },
    loading() {
      return this.$store.state.loadingResults;
    }
  }
};
</script>
